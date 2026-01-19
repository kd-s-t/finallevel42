# Deploying to Vercel with Neon Database

## Setup Steps

### 1. Create a Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@host/dbname`)

### 2. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. In Vercel project settings, add environment variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Neon connection string from step 1

### 3. Deploy

Vercel will automatically deploy. The app will:
- Use SQLite locally (when `DATABASE_URL` is not set)
- Use Neon/Postgres on Vercel (when `DATABASE_URL` is set)

## Notes

- The database schema is automatically created on first run
- Each user's training sessions are initialized automatically
- No manual database setup required!
