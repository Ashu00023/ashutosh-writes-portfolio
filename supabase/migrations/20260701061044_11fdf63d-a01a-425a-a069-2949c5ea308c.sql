CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('seo_blog','youtube_script')),
  payload jsonb NOT NULL,
  name text,
  email text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- No public policies: only service_role (via edge function) can read/write.
-- Deny-all for anon/authenticated is achieved by having no permissive policies.
CREATE INDEX idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX idx_inquiries_type ON public.inquiries (type);