create table public.whatsapp_bot_deliveries (
  message_id text primary key,
  state text not null check (state in ('processing', 'sent', 'failed')),
  outgoing_id text,
  updated_at timestamptz not null default now()
);
alter table public.whatsapp_bot_deliveries enable row level security;
revoke all on public.whatsapp_bot_deliveries from anon, authenticated;
grant select, insert, update on public.whatsapp_bot_deliveries to service_role;

create function public.claim_whatsapp_message(incoming_id text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare claimed_id text;
begin
  insert into public.whatsapp_bot_deliveries(message_id, state)
  values (incoming_id, 'processing')
  on conflict (message_id) do update set state = 'processing', updated_at = now()
  where public.whatsapp_bot_deliveries.state = 'failed'
     or (public.whatsapp_bot_deliveries.state = 'processing'
         and public.whatsapp_bot_deliveries.updated_at < now() - interval '2 minutes')
  returning message_id into claimed_id;
  return claimed_id is not null;
end;
$$;
revoke all on function public.claim_whatsapp_message(text) from public, anon, authenticated;
grant execute on function public.claim_whatsapp_message(text) to service_role;

