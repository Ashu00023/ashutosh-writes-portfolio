

## Plan: Mobile-only compact portfolio layout grouped by category

### What changes
Restructure the portfolio section so that on **mobile only** (below `sm` breakpoint), the 4 cards are displayed in two labeled rows — "SEO Blog" row (2 cards side by side) and "YouTube Script" row (2 cards side by side) — with smaller thumbnails and compact card styling. Desktop stays exactly as-is (2-column grid).

### Technical approach

**File: `src/components/PortfolioSection.tsx`**

1. Split the `projects` array into two groups: `seoBlogs` (first 2) and `ytScripts` (last 2).

2. Replace the single grid with a responsive layout:
   - **Mobile (`< sm`)**: Render two sections, each with a category label ("SEO Blogs", "YouTube Scripts") and a `grid grid-cols-2 gap-3` layout. Cards get compact styling: smaller thumbnail (`h-28` instead of `h-48`), smaller padding (`p-3` instead of `p-6`), smaller text, and the description is hidden to save space.
   - **Desktop (`sm+`)**: Render the original single `grid sm:grid-cols-2 gap-6` with full-size cards (unchanged).

3. Use a shared card renderer function to avoid duplicating card JSX. Pass a `compact` boolean to toggle between mobile/desktop styles:
   - Thumbnail: `h-28` (mobile) vs `h-48` (desktop)
   - Padding: `p-3` vs `p-6`
   - Title: `text-sm` vs `text-base`
   - Description: hidden on mobile, shown on desktop
   - Note: hidden on mobile

4. Use Tailwind's `hidden sm:grid` and `grid sm:hidden` to toggle between the two layouts without JS.

