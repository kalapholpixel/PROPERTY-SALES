# Real Estate Website - Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier available at https://supabase.com)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Setup Supabase

### Create a Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Enter your project name and database password
4. Wait for the project to be created

### Get Your Credentials
1. Go to **Settings > API** in your Supabase project
2. Copy the following values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`

### Create Database Tables
1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run**

### Setup Storage Bucket
1. Go to **Storage** in Supabase
2. Click **Create a new bucket**
3. Name it `property-images`
4. Make it public
5. Click **Create bucket**

## Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth (for OAuth)
NEXTAUTH_SECRET=generate-a-random-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Contact Information
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
NEXT_PUBLIC_PHONE_NUMBER=your_phone_number
NEXT_PUBLIC_EMAIL=your_email
```

## Step 4: Setup OAuth (Optional)

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000/auth/callback/google` to redirect URIs
6. Copy Client ID and Secret to `.env.local`

### GitHub OAuth
1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Set Authorization callback URL to `http://localhost:3000/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

## Step 5: Create Admin User

1. Go to **Authentication > Users** in Supabase
2. Click **Add user**
3. Enter email and password
4. The user is now ready to login to the admin panel

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

- Admin Dashboard: http://localhost:3000/admin
- Admin Login: http://localhost:3000/admin/login
- Use the email and password created in Step 5

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── properties/
│   │   ├── page.tsx            # Properties listing
│   │   └── [id]/page.tsx       # Property details
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   └── admin/
│       ├── layout.tsx          # Admin layout
│       ├── page.tsx            # Admin dashboard
│       ├── login/page.tsx      # Admin login
│       └── properties/page.tsx # Manage properties
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer
│   ├── PropertyCard.tsx        # Property card component
│   ├── sections/               # Page sections
│   └── admin/                  # Admin components
├── lib/
│   ├── api/                    # API functions
│   ├── auth.ts                 # Auth utilities
│   ├── supabase/               # Supabase client
│   └── types/                  # TypeScript types
├── styles/
│   └── globals.css             # Global styles
└── public/                     # Static assets
```

## Features

### Frontend
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Property listing with filters
- ✅ Property details page with gallery
- ✅ Contact form
- ✅ WhatsApp integration
- ✅ Google Maps integration

### Admin Panel
- ✅ Secure login (email/password + OAuth)
- ✅ Add/edit/delete properties
- ✅ Upload multiple images
- ✅ Mark properties as sold
- ✅ View inquiries
- ✅ Dashboard with statistics

### Technical
- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Supabase for database & auth
- ✅ Image optimization
- ✅ SEO optimized

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click **Import Project**
4. Select your GitHub repository
5. Add environment variables in **Settings > Environment Variables**
6. Click **Deploy**

### Custom Domain
1. In Vercel, go to **Settings > Domains**
2. Add your custom domain
3. Update DNS records as per Vercel's instructions

## Troubleshooting

### Database Connection Issues
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that RLS policies are enabled in Supabase

### Authentication Issues
- Clear browser cookies and cache
- Verify the user exists in Supabase Auth
- Check that `.env.local` has the correct secrets

### Image Upload Issues
- Verify the `property-images` storage bucket exists and is public
- Check file permissions in Supabase Storage

## Support

For more information:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
