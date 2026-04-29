# RAT Beta

Next.js + Sanity beta for the Rolling Arrays Technologies marketing website.

## What is included

- CMS-editable pages using Sanity documents and reusable page sections.
- Homepage, Reimburse, ePFile, Careers, Contact, and one blog/whitepaper post seed.
- Editable SEO fields: title, description, keywords, canonical, Open Graph, and JSON-LD schema.
- CMS-managed Google Tag Manager ID in Site settings.
- CMS-managed navigation and footer links.
- CMS-managed 301 redirects through the `redirect` document type and Next.js proxy.
- Sanity Studio embedded at `/studio`.
- Native beta form endpoint at `/api/forms`, with HubSpot form sections supported by portal ID and form ID.
- Dynamic `sitemap.xml` and `robots.txt`.

## Setup

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Set these values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=l84dbt13
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_TOKEN=your_sanity_write_token
```

`SANITY_API_TOKEN` is required only for seeding, preview/revalidation work, or server-side writes.

## Development

```bash
npm install
npm run dev
```

Open:

- Website: http://localhost:3000
- Studio: http://localhost:3000/studio

If Sanity has no published `home` page yet, the website route will 404 by design. Add pages in Studio or run the seed script.

## Seed Sanity

Create a Sanity API token with write access, add it to `.env.local`, then run:

```bash
npm run seed:sanity
```

This creates starter content for the agreed beta scope:

- `/`
- `/solutions/reimburse`
- `/solutions/epfile`
- `/career`
- `/contact-us`
- `/insights/hr-engagement-whitepaper`

## Verification

```bash
npm run lint
npm run build
```

Both commands should pass before deployment.
