# Bumitele Shop

Production-ready Next.js storefront optimized for [Vercel](https://vercel.com) deployment.

## Stack

- **Next.js 16** (App Router, Server Actions, Server Components)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Drizzle ORM**
- **Neon PostgreSQL**

## Project structure (clean architecture)

```
src/
├── app/                    # Routes & layouts (App Router)
├── components/             # UI & layout components
├── db/                     # Drizzle client & schema
├── lib/                    # Shared utilities (env, cn)
├── server/
│   ├── actions/            # Server Actions (API boundary)
│   ├── repositories/       # Data access
│   └── services/           # Business logic
└── types/                  # Shared TypeScript types
```

## Quick start

```bash
npm install
cp .env.example .env.local   # then set DATABASE_URL
npm run db:push              # sync schema to Neon
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | No | Public site URL for metadata |
| `AUTH_SECRET` | Yes (prod) | JWT session secret (32+ chars) |

Never commit `.env.local` or real credentials. Use Vercel Environment Variables in production.

## Klaim garansi (`/claim`)

Formulir publik tanpa login — desain mobile-first. Data ke Neon (`warranty_claims`).

**Langkah 1:** Platform, Username, Order ID, Produk (dropdown DB), Keluhan → Selanjutnya  
**Langkah 2:** Nama, Email, WhatsApp, Alamat pengiriman → Kirim Claim Garansi

```bash
npm run db:migrate-warranty   # setelah perubahan schema
npm run db:seed               # produk contoh untuk dropdown
```

## Database scripts

| Command | Description |
|---------|-------------|
| `npm run db:push` | Push schema to Neon (dev) |
| `npm run db:generate` | Generate SQL migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Demo user, products, and serial numbers |

## Deploy to Vercel

1. Push this repo to GitHub: `https://github.com/irfannexofia/bumiteleshop.git`
2. Import the project in [Vercel](https://vercel.com/new)
3. Add `DATABASE_URL` (Neon pooled URL) in **Settings → Environment Variables**
4. Optionally set `NEXT_PUBLIC_APP_URL` to your production domain
5. Deploy — Vercel auto-detects Next.js

## License

Private — Bumitele Shop.
