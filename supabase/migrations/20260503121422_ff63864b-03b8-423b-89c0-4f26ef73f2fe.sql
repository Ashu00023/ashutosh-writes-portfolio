
ALTER FUNCTION public.set_updated_at() SECURITY INVOKER;

DROP POLICY "Blog images are publicly readable" ON storage.objects;

CREATE POLICY "Blog image files are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images' AND (storage.foldername(name))[1] IS NOT NULL);
