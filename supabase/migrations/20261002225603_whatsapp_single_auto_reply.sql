create or replace function public.claim_whatsapp_reply(chat_key text, incoming_id text)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(chat_key, 0));
  if exists (
    select 1 from public.whatsapp_bot_deliveries
    where context_key = chat_key and message_id <> incoming_id
      and ((state = 'sent' and outgoing_id is not null and updated_at > now() - interval '24 hours')
        or (state = 'processing' and updated_at > now() - interval '2 minutes'))
  ) then return false; end if;
  update public.whatsapp_bot_deliveries set context_key = chat_key
    where message_id = incoming_id and state = 'processing';
  return found;
end;
$$;
revoke all on function public.claim_whatsapp_reply(text,text) from public, anon, authenticated;
grant execute on function public.claim_whatsapp_reply(text,text) to service_role;
