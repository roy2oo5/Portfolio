This is a [Next.js](https://nextjs.org) portfolio configured as a static export for GitHub Pages.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploy on GitHub Pages

Pushes to `main` automatically build and deploy the site through [GitHub Actions](.github/workflows/deploy-pages.yml). The custom domain is configured through [`public/CNAME`](public/CNAME).

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The site is available at [roymenz.me](https://roymenz.me).
