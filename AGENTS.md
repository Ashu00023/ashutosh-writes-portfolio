<!-- Project architecture rules -->
- Keep shared contact details in src/data/site.ts so consumers can reuse a single source.
- Compose the home page from HeroSection, BuildSection, LedgerSection, ResearchStrip, FitSection and CloseSection so the article-focused sections stay independent.
- Keep page metadata in src/data/seo-data.json and use PageMeta for dedicated informational pages so their social and breadcrumb tags stay consistent.
- Keep Services, Method, About and Contact as independent informational page modules so each can reuse the shared editorial sections.
- Send Article Check requests through send-inquiry-email as seo_blog with intent article_check and explicit consent, so existing storage remains compatible while server validation distinguishes the request.
- Keep team portraits optional and retain initials as the fallback so missing images do not leave empty team entries.
- Keep st-prefixed site styles in src/site.css, loaded after redesign.css, to isolate the new page styling.
- Keep ConsentBar self-contained with device-local notice acknowledgement so it does not require a remote service.
- Keep blog-index metadata local when the shared route catalog omits that entry; use a static article's path when it has no canonicalPath, so the existing blog remains compatible.