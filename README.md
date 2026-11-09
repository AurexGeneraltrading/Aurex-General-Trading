# AUREX General Trading — Premium UAE Website

## Pages
- `index.html` — homepage
- `building-materials.html` — dedicated building materials page
- `electrical-materials.html` — dedicated electrical materials page
- `led-screens.html` — dedicated LED screens and components page
- `about.html` — company overview
- `contact.html` — address, phone, email and enquiry form

## SEO included
- Unique page titles and meta descriptions
- Canonical URLs
- Organization structured data (JSON-LD)
- XML sitemap and robots.txt
- UAE-focused page copy and search phrases
- Semantic headings and mobile-responsive layout

## Publish using GitHub Pages
1. Extract the ZIP.
2. Upload all files and folders to the root of your GitHub repository.
3. Open repository Settings → Pages.
4. Select Deploy from a branch, branch `main`, folder `/ (root)`, then Save.
5. Wait for GitHub Pages to publish.
6. Keep your custom domain connected in Settings → Pages. Check the DNS records if GitHub reports a domain issue.

## Important
- The quotation form opens the visitor's email app and prepares a message to sales@aurexgeneraltrading.com. It does not store submissions online.
- SEO setup improves crawlability and relevance but cannot guarantee Google rankings. Submit `/sitemap.xml` in Google Search Console after deployment.
- Review product scope and public contact/address details before publishing. Product availability is confirmed per enquiry.

## Latest updates
- Added contact number +971 56 296 2476 throughout the site.
- Added relevant construction materials, electrical supply and LED display photographs to their category pages. Images are loaded from their original third-party image hosts; check their usage permissions before commercial publication.
- Added NovaStar, Colorlight and Huidu to the LED screen page as control-system brands for specification and compatibility enquiries. The wording does not claim authorized dealership or brand partnership.


## SEO updates (8 November 2026)
- Standardised canonical URLs, Open Graph and Twitter metadata on the `https://www.aurexgeneraltrading.com/` host.
- Added page-specific Organization, WebSite, WebPage/AboutPage/ContactPage and breadcrumb JSON-LD.
- Updated page titles and meta descriptions for UAE building materials, electrical materials and LED screen component searches.
- Added internal links between the three product category pages.
- Updated sitemap.xml and robots.txt to the selected www host.
- Added homepage hero image preload for improved loading priority.

### Domain setting
The package uses `https://www.aurexgeneraltrading.com/` as its preferred (canonical) domain. In GitHub Pages, set the custom domain to `www.aurexgeneraltrading.com` and ensure the Hostinger DNS has the `www` CNAME pointing to your GitHub Pages hostname. Configure the apex domain to redirect to the www hostname (or use GitHub Pages' automatic redirect when the DNS and custom domain are correctly configured). Do not publish a second, separately hosted site on the apex domain.

After publishing, open each canonical URL, then submit `https://www.aurexgeneraltrading.com/sitemap.xml` in Google Search Console. Validate the structured data with Google's Rich Results Test / Schema Markup Validator.


## Projects & Installations gallery (new)
- `projects.html` — public project gallery, with category filters and media display.
- `admin.html` — private sign-in and project management dashboard.
- `projects.js` / `admin.js` — Supabase-powered gallery and admin actions.
- `supabase-config.js` — paste your Supabase Project URL and anon/public key here.
- `supabase-schema.sql` — database, access policies and public media bucket setup.

### One-time Supabase setup
1. Create a Supabase project at https://supabase.com/ and choose a strong database password.
2. In Supabase Dashboard → SQL Editor, run the complete `supabase-schema.sql` script.
3. In Authentication → Providers, keep Email enabled. In Authentication settings, turn OFF public sign-ups. Create your own admin user from Authentication → Users → Add user (email + strong password).
4. Copy the new user's UUID from Authentication → Users. In SQL Editor run: `insert into public.admin_users (user_id) values ('PASTE-USER-UUID-HERE');` replacing the placeholder with the real UUID.
5. In Project Settings → API, copy the Project URL and anon/public key. Paste them into `supabase-config.js`. Do not use or publish the `service_role` key.
6. Upload all website files and folders to the root of your GitHub repository, including the new files. Commit the changes and wait for GitHub Pages to deploy.
7. Open `https://www.aurexgeneraltrading.com/admin.html`, sign in, add a project, choose a category, select photos/videos and save. Tick Publish to show it publicly.
8. Open `https://www.aurexgeneraltrading.com/projects.html` to view the gallery.

### Security and upload notes
- The admin page is not a substitute for access control: database and storage policies enforce admin-only changes. Keep Supabase public sign-ups disabled and only add trusted admin UUIDs to `admin_users`.
- The anon/public key is intended for browser use; never put a Supabase `service_role` key in website files.
- Public gallery media is intentionally readable by website visitors. Do not upload private or confidential site content.
- The configured maximum file size is 100 MB per file. For faster page loading, compress videos and use WebP/JPG images. Public video playback depends on the visitor's browser and connection.
- `admin.html` is excluded from search indexing with `noindex`; do not link it in the public navigation.
