# Vercel Postgres Setup Guide

This guide will help you set up Vercel Postgres for GitRoulette.

## Step 1: Create a Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose your plan (Hobby/Free tier is fine)
6. Click **Create**

Vercel will automatically add the required environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Step 2: Initialize the Database Schema

After creating the database, you need to run the SQL schema to create the tables.

### Option A: Using Vercel Dashboard (Recommended)

1. In your Vercel dashboard, go to **Storage**
2. Click on your Postgres database
3. Go to the **Query** tab
4. Copy the contents of `web/lib/schema.sql`
5. Paste and execute the SQL

### Option B: Using Vercel CLI

```bash
cd web
npx vercel env pull .env.local
psql $(grep POSTGRES_URL .env.local | cut -d '=' -f 2-) < lib/schema.sql
```

### Option C: Using a SQL Client

1. Get your database connection string from Vercel dashboard
2. Connect using any Postgres client (TablePlus, DBeaver, psql, etc.)
3. Run the SQL from `web/lib/schema.sql`

## Step 3: Add Additional Environment Variable

Add this environment variable to your Vercel project:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add: `NEXT_PUBLIC_APP_URL` = `https://your-project.vercel.app`

This is needed for the homepage to fetch repositories correctly during server-side rendering.

## Step 4: Deploy

```bash
git add .
git commit -m "Switch to Vercel Postgres"
git push
```

Vercel will automatically deploy your changes.

## Local Development

For local development, the app will connect to your cloud Vercel Postgres database.

1. Pull your environment variables:
   ```bash
   cd web
   npx vercel env pull .env.local
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The app will connect to your cloud database even during local development.

## Verifying the Setup

After deployment, test that everything works:

1. Visit your deployed site
2. The homepage should now display any existing repositories
3. Try pushing a new repository from the CLI:
   ```bash
   gitr init
   gitr config set api.url https://api.deepseek.com/v1/chat/completions
   gitr config set api.key your-api-key
   gitr config set remote.url https://your-project.vercel.app
   gitr remote create test-repo
   gitr add .
   gitr commit -m "Test commit"
   gitr push
   ```

4. Refresh your website - the new repository should appear!

## Troubleshooting

### "relation does not exist" errors
- Make sure you ran the schema.sql script to create the tables

### Connection errors locally
- Make sure you ran `npx vercel env pull .env.local`
- Check that your `.env.local` file contains the POSTGRES_* variables

### Repositories not showing on homepage
- Make sure `NEXT_PUBLIC_APP_URL` is set in Vercel environment variables
- Redeploy after adding the variable

## Cost Information

- **Hobby tier**: 60 free compute hours per month
- Storage: $0.15 per GB
- For a small hobby project like GitRoulette, this should stay well within the free tier
