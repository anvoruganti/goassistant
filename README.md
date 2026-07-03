# GO Assistant Landing Page

Validation landing page for [goassistant.in](https://goassistant.in): a conversational AI widget for D2C e-commerce stores. Captures waitlist signups via Supabase with email OTP verification.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Supabase (database + email OTP auth)
- Vercel Analytics

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

### 3. Run the Supabase migration

Apply the migration in [`supabase/migrations/001_waitlist_signups.sql`](supabase/migrations/001_waitlist_signups.sql) via the Supabase SQL editor or CLI:

```bash
supabase db push
```

This creates the `waitlist_signups` table (including `email_verified`), RLS policies, and RPC functions for live count and queue position.

### 4. Enable email OTP in Supabase

For the waitlist form's email verification to work:

1. In Supabase Dashboard, go to **Authentication → Providers → Email** and ensure Email is enabled.
2. Under **Authentication → Email Templates → Confirm signup**, include `{{ .Token }}` so users receive a 6-digit code (not just a link).
3. Optionally add `{{ .Token }}` to **Magic link or OTP** for returning emails.
4. Under **Authentication → URL Configuration**, add your site URL (`http://localhost:3000` for local dev).

The form uses `signUp` / `signInWithOtp` and `verifyOtp` on the client. Submission is blocked until the email is verified.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables.
3. Enable **Analytics** in the Vercel project dashboard (the `<Analytics />` component is already in `app/layout.tsx`).
4. Deploy.

## Project structure

```
app/              # Next.js App Router (layout, page, OG image, server actions)
components/       # UI, hero animation, sections, waitlist counter
content/          # Copy and config data (editable without touching components)
lib/              # Supabase client, waitlist data layer, validation
types/            # Shared TypeScript interfaces
supabase/         # SQL migrations
public/images/    # Product photos (kurta, phone case, sofa)
```

## Waitlist form

Collects: name, store name, store URL, category, monthly order volume, platform, and email (verified via OTP).

On success, shows the user's queue position via the `get_waitlist_position` RPC.

## Founding cohort counter

The **Founding 15** section shows spots remaining as `15 minus live signup count`. The bar and number update as people join (count revalidates every 60 seconds via `get_waitlist_count`).

## Contact

Questions? Email [help@gobigai.org](mailto:help@gobigai.org).
