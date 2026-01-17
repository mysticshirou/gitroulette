# Deployment Guide

Deploy the gitroulette web backend to Vercel for remote operations.

## Prerequisites

- Node.js 20+
- npm or yarn
- Vercel account (free tier works)

## Deploy to Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
cd web
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No (first time) or Yes (updating)
- **Project name:** gitroulette (or your choice)
- **Directory:** Leave default (.)
- **Override settings?** No

Vercel will build and deploy your backend. You'll get a URL like:
```
https://gitroulette-xyz.vercel.app
```

### 4. Configure CLI

```bash
gitr config set remote.url https://gitroulette-xyz.vercel.app
gitr remote create my-project
gitr push
```

## Configuration

### Environment Variables (Optional)

If you want the backend to make LLM calls (not currently used):

```bash
vercel env add NEXT_PUBLIC_APP_URL
# Enter: https://gitroulette-xyz.vercel.app

vercel env add DEEPSEEK_API_URL
# Enter: https://api.deepseek.com/v1/chat/completions

vercel env add DEEPSEEK_API_KEY
# Enter: your-api-key
```

Then redeploy:
```bash
vercel --prod
```

## Local Development

Test the backend locally before deploying:

```bash
cd web
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

Test with CLI:
```bash
gitr config set remote.url http://localhost:3000
gitr remote create local-test
gitr push
```

## Vercel Configuration

The project includes `web/vercel.json` with:
- Function timeout: 30 seconds
- Memory limit: 1024MB
- Region: US East (iad1)

Modify for your needs:

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60,      // Increase timeout
      "memory": 3008          // Increase memory
    }
  },
  "regions": ["sfo1"]         // Change region
}
```

## Data Storage

### Current: JSON File Storage

The backend uses JSON file storage (`web/data/db.json`):
- Simple and works for small projects
- Data persists during deployment lifetime on Vercel
- No external database needed

### Production: Database Migration

For high traffic, migrate to a real database:

**Options:**
- Vercel Postgres
- Supabase
- PlanetScale
- Any hosted PostgreSQL/MySQL

**Why migrate:**
- Better performance
- Data persistence across deployments
- Concurrent access handling
- Backup capabilities

## Monitoring

### Vercel Dashboard

Monitor your deployment at https://vercel.com/dashboard

Check:
- Function execution times
- Error logs
- Bandwidth usage
- Build status

### Logs

View real-time logs:
```bash
vercel logs <deployment-url>
```

## Scaling

### Free Tier Limits

- 100GB bandwidth/month
- 100 hours function execution
- Unlimited deployments

### Pro Tier ($20/month)

- 1TB bandwidth
- 1000 hours function execution
- Advanced analytics

## Troubleshooting

### Build Fails

```bash
# Test build locally
cd web
npm run build

# Check logs
vercel logs
```

### 413 Errors Still Occur

The backend has a 50MB limit configured. If you still get errors:

1. Check file sizes in your repo
2. Ensure binary filtering is working
3. Consider chunking for very large repos

### Function Timeout

Increase timeout in `vercel.json`:
```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

### Deploy Preview URL

Get a preview deployment (doesn't affect production):
```bash
vercel
```

Test with the preview URL before promoting to production.

## CLI Distribution

### Build Release Binaries

```bash
./release.sh
```

Creates binaries in `release/`:
- Linux (amd64, arm64)
- macOS (Intel, Apple Silicon)
- Windows (amd64)

### GitHub Releases

1. Create a git tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. Create GitHub release with binaries
3. Users download and install

### Update Instructions for Users

Tell users to update their remote URL:
```bash
gitr config set remote.url https://your-app.vercel.app
```

## Security

### No Authentication

Currently, the backend has no authentication. Anyone with the URL and a repo_id can push/pull.

### Adding Authentication

For production, consider adding:
- User authentication (Clerk, Auth0, NextAuth)
- Repository access control
- API rate limiting
- Request validation

## Cost

### Vercel
- Free tier: Good for personal use
- Pro tier: $20/month for high traffic

### LLM API
Users pay for their own API usage:
- DeepSeek: ~$0.14 per 1M tokens
- Typical commit: 1000-5000 tokens
- Cost per commit: < $0.001

## Next Steps

After deployment:

1. ✅ Test with `gitr push` and `gitr pull`
2. ✅ Share your deployment URL
3. ⏳ Consider adding authentication
4. ⏳ Monitor usage and costs
5. ⏳ Plan database migration if needed

---

**Questions?** Check the GitHub issues or README.md
