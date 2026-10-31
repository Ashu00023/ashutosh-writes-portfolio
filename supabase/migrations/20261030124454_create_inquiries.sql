create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 255),
  article_url text not null check (char_length(article_url) <= 500),
  company text check (char_length(company) <= 200),
  has_agency text check (has_agency in ('agency', 'inhouse', 'none', 'unsure')),
  source text check (char_length(source) <= 40),
  notes text check (char_length(notes) <= 2000),
  consent boolean not null check (consent),
  status text not null default 'new' check (status in ('new', 'replied', 'closed')),
  emailed_at timestamptz
);

create index inquiries_created_at_idx on public.inquiries (created_at desc);
create index inquiries_email_created_idx on public.inquiries (email, created_at desc);

-- Locked down: with RLS on and no policies, the public (anon) key can neither read nor write.
-- Only the Edge Function, which uses the secret key (service_role), can touch this table.
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant all on public.inquiries to service_role;