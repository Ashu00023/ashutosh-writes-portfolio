# Roadmap

- [x] Fix Vercel deployment failure — cause was Author.tsx referencing missing `author` key in seo-data.json; fixed. Local `vite build` + postbuild prerender pass. Asked user to redeploy / share log if still failing.
- [ ] Finish prerender.mjs: register author + legal routes (helpers already added)
- [ ] Update llms.txt with new pages
- [ ] Index.tsx: add WebSite + Organization schema
- [ ] Final typecheck + build verification
