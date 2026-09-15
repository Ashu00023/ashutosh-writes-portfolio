# Roadmap

- [x] Fix Vercel deployment failure — cause was Author.tsx referencing missing `author` key in seo-data.json; fixed. Local `vite build` + postbuild prerender pass (11 routes). User to redeploy; share log if still failing.
- [x] Prerender: author + 4 legal routes registered and verified in dist output.
- [x] llms.txt updated with Work, Author, and policy pages.
- [x] Index.tsx: WebSite + Organization schema added alongside Person/ProfessionalService.
- [x] Verified /privacy-policy, /author/ashutosh-mahapatra, /blog render with correct titles, no page errors.
