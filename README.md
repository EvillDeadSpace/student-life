# 🎓 Student Life — Live demo & deploy

Student Life is a modern community platform where students share real experiences about faculty life, internships, scholarships and student housing. This README has been updated to highlight the live deployment, how to test the app, and the current features.

Live demo (deployed on Vercel):

➡️ https://student-life-orpin.vercel.app/

Deployed with Vercel. Please open the demo and test flows: registration, creating a post (if enabled), commenting, and the like button on list/detail pages.

![Next.js](https://img.shields.io/badge/Next.js-15.x-black) ![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC) ![Prisma](https://img.shields.io/badge/Prisma-%F0%9F%92%BB)

## Quick highlights

- Live demo on Vercel: https://student-life-orpin.vercel.app/ (please test likes, comments, and auth flows)
- Deployment: Vercel (Git integration, automatic builds on push)
- Key features: category feeds, post detail pages with comments, like toggle + counts, user auth (localStorage), dark mode, responsive UI

## Updated Tech & Features

- Next.js (App Router) + TypeScript
- Tailwind CSS + Heroicons
- Prisma ORM (migration-ready — project contains Prisma schema and migrations)
- Likes, comments, and basic authentication (localStorage session)
- Deploy pipeline configured for Vercel

## Run locally

1. Install deps

```powershell
npm install
```

2. Generate Prisma client and push schema

```powershell
npx prisma generate
npx prisma db push
```

3. Start dev server

```powershell
npm run dev
```

Open http://localhost:3000 and compare with the live Vercel demo.

## Environment

Create a `.env` file at project root. Example options below:

For development (SQLite):

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

For Postgres (production-like):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_API_URL="https://student-life-orpin.vercel.app"
```

## Test the main flows

- Registration / Login: POST to `/api/auth/registration` and `/api/auth/login` or use the UI.
- Likes: GET `/api/likes?postId=<id>` to see counts; POST `/api/likes` with JSON `{ postId, userId }` to toggle.
- Comments: GET/POST to `/api/comment` (use UI on post pages).

When testing on the live demo, open browser devtools -> Network to watch the API calls and confirm responses.

## Notes & Caveats

- Current auth uses localStorage sessions for convenience; for production consider server-side sessions or JWTs with HttpOnly cookies.
- Likes and comments require a valid user id in requests — the UI stores the user locally after login.
- Migrations are present in `prisma/migrations`. If you switch to Postgres, ensure `DATABASE_URL` is updated and run migrations with Prisma.

## Contributing

- Fork, branch, PR — standard flow. If you want me to help wire Vercel environment variables or adjust the deployment settings, tell me which account/organization to use.

---

If you want the README to be more promotional (longer demo screenshots, feature highlights, or step-by-step testing scripts), tell me which sections to expand and I will update it.
