create table if not exists public.whatsapp_bot_sessions (
 chat_key text primary key,
 state jsonb not null default '{}'::jsonb,
 paused boolean not null default false,
 pause_reason text,
 lease_message text,
 lease_until timestamptz,
 updated_at timestamptz not null default now()
);
alter table public.whatsapp_bot_sessions enable row level security;
revoke all on public.whatsapp_bot_sessions from public,anon,authenticated;
grant select,insert,update on public.whatsapp_bot_sessions to service_role;
create or replace function public.begin_whatsapp_turn(chat_key_input text,incoming_id text)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare s public.whatsapp_bot_sessions;
begin
 insert into public.whatsapp_bot_sessions(chat_key) values(chat_key_input) on conflict do nothing;
 select * into s from public.whatsapp_bot_sessions where chat_key=chat_key_input for update;
 if s.paused then return jsonb_build_object('status','paused'); end if;
 if s.lease_message is not null and s.lease_message<>incoming_id and s.lease_until>now() then return jsonb_build_object('status','busy'); end if;
 update public.whatsapp_bot_sessions set lease_message=incoming_id,lease_until=now()+interval '2 minutes' where chat_key=chat_key_input;
 update public.whatsapp_bot_deliveries set context_key=chat_key_input where message_id=incoming_id;
 return jsonb_build_object('status','ready','state',s.state);
end $$;
create or replace function public.complete_whatsapp_turn(chat_key_input text,incoming_id text,next_state jsonb,outgoing text,should_pause boolean,pause_cause text)
returns void language plpgsql security invoker set search_path='' as $$
begin
 perform 1 from public.whatsapp_bot_sessions where chat_key=chat_key_input and lease_message=incoming_id for update;
 if not found then raise exception 'Turn lease lost'; end if;
 update public.whatsapp_bot_deliveries set state='sent',outgoing_id=outgoing,conversation=next_state,updated_at=now() where message_id=incoming_id;
 update public.whatsapp_bot_sessions set state=next_state,paused=paused or should_pause,pause_reason=case when paused then pause_reason when should_pause then pause_cause else null end,lease_message=null,lease_until=null,updated_at=now() where chat_key=chat_key_input and lease_message=incoming_id;
end $$;
create or replace function public.release_whatsapp_turn(chat_key_input text,incoming_id text)
returns void language sql security invoker set search_path='' as $$
 update public.whatsapp_bot_sessions set lease_message=null,lease_until=null where chat_key=chat_key_input and lease_message=incoming_id;
$$;
create or replace function public.set_whatsapp_human_pause(chat_key_input text,pause_enabled boolean)
returns void language plpgsql security invoker set search_path='' as $$
begin
 insert into public.whatsapp_bot_sessions(chat_key,paused,pause_reason) values(chat_key_input,pause_enabled,case when pause_enabled then 'human_control' else null end)
 on conflict(chat_key) do update set paused=pause_enabled,pause_reason=case when pause_enabled then 'human_control' else null end,updated_at=now();
end $$;
revoke all on function public.begin_whatsapp_turn(text,text),public.complete_whatsapp_turn(text,text,jsonb,text,boolean,text),public.release_whatsapp_turn(text,text),public.set_whatsapp_human_pause(text,boolean) from public,anon,authenticated;
grant execute on function public.begin_whatsapp_turn(text,text),public.complete_whatsapp_turn(text,text,jsonb,text,boolean,text),public.release_whatsapp_turn(text,text),public.set_whatsapp_human_pause(text,boolean) to service_role;
alter table public.whatsapp_bot_deliveries add column if not exists delivery_status text,add column if not exists delivery_error_codes jsonb;

