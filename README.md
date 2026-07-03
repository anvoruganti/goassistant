# GO Assistant Landing Page

Validation landing page for [goassistant.in](https://goassistant.in): a conversational AI widget for D2C e-commerce stores. Captures waitlist signups via Supabase with phone OTP verification.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Supabase (database + phone OTP auth)

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

This creates the `waitlist_signups` table (including `phone` and `phone_verified`), RLS policies, and RPC functions for live count and queue position.

### 4. Enable phone OTP in Supabase

For the waitlist form's phone verification to work:

1. In Supabase Dashboard, go to **Authentication → Providers → Phone**
2. Enable phone sign-in
3. Configure an SMS provider (Twilio, MessageBird, etc.)
4. Under **Authentication → URL Configuration**, add your site URL to allowed redirect URLs if needed

The form uses `signInWithOtp` and `verifyOtp` on the client. Submission is blocked until the phone is verified.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables.
3. Deploy. No additional config required.

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

Collects: name, store name, store URL, category, monthly order volume, platform, email, and phone (verified via OTP).

On success, shows the user's queue position via the `get_waitlist_position` RPC.

## Founding cohort counter

The **Founding 15** section shows spots remaining as `15 minus live signup count`. The bar and number update as people join (count revalidates every 60 seconds via `get_waitlist_count`).
