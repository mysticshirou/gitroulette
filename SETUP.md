# gitroulette Setup Guide

Your AI-powered git remote is ready! Here's what I've built:

## 🎨 What's Been Created

### Frontend Website (Next.js)
- **Sleek futuristic UI** with AI-themed dark design
- **Neon color palette** (purple, cyan, pink)
- **Fully responsive** layout
- **Animated components** with glow effects

### Pages Built:
1. **Home page** (`/`)
   - Hero section with gradient text
   - Feature cards
   - Repository list
   
2. **Repository detail** (`/repo/[id]`)
   - Commit history
   - Branch overview
   - Stats cards

3. **404 page** - Custom AI-themed not-found

### API Routes (All working):
- `POST /api/repos` - Create repository
- `GET /api/repos` - List repositories
- `GET /api/repos/:id` - Get repo details
- `POST /api/repos/:id/push` - Push from CLI
- `GET /api/repos/:id/pull` - Pull to CLI
- `GET /api/repos/:id/commits` - List commits
- `GET /api/repos/:id/tree` - Browse files

### CLI Integration
- Push/pull commands ready in `gitr`
- Remote client implemented
- Config support for remote URL and repo ID

## 🚀 Next Steps

### 1. Set Up Database

**Option A: AWS RDS (Recommended for production)**
```bash
# Create PostgreSQL instance on AWS RDS
# Get your connection string, then:
psql "postgresql://user:password@your-rds.amazonaws.com:5432/gitroulette" < web/schema.sql
```

**Option B: Vercel Postgres (Easiest for Vercel deployment)**
```bash
cd web
vercel postgres create
# DATABASE_URL will be added automatically
```

**Option C: Local PostgreSQL (For development)**
```bash
createdb gitroulette
psql gitroulette < web/schema.sql
```

### 2. Configure Environment

```bash
cd web
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://your-connection-string"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Test Locally

```bash
cd web
npm run dev
```

Visit http://localhost:3000 - you should see the futuristic homepage!

### 4. Deploy to Vercel

```bash
cd web
vercel deploy
```

Set environment variables in Vercel dashboard:
- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL` (your Vercel URL)

### 5. Test CLI Integration

Once deployed, configure your CLI:
```bash
gitr config set remote.url https://your-app.vercel.app

# Create a repo (via API or web), get the ID, then:
gitr config set remote.repo_id <repo-id>

# Push your first commit!
gitr push
```

## 📁 Project Structure

```
gitroulette/
├── cmd/gitr/              ✅ CLI with push/pull
├── internal/
│   ├── commands/          ✅ Push/pull commands added
│   ├── config/            ✅ Remote config support
│   └── remote/            ✅ HTTP client for API
└── web/                   ✅ Next.js website
    ├── app/
    │   ├── api/repos/     ✅ All API routes
    │   ├── repo/[id]/     ✅ Repo detail page
    │   └── page.tsx       ✅ Home page
    ├── components/        ✅ UI components
    ├── lib/               ✅ Utils, DB client, types
    └── schema.sql         ✅ Database schema
```

## 🎨 Design Highlights

- **Dark theme**: Near-black background (#0a0a0a)
- **Neon accents**: Purple (#a855f7), Cyan (#06b6d4), Pink (#ec4899)
- **Gradient text**: AI-themed headlines
- **Glow effects**: Subtle shadows on hover
- **Animations**: Pulse effects on AI indicators
- **Custom scrollbar**: Themed to match

## 🔧 Tech Stack

- **Frontend**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (pg library)
- **Icons**: Lucide React
- **CLI**: Go with remote HTTP client

## 📚 Documentation

- `web/README.md` - Full web app documentation
- `web/API_DOCS.md` - Detailed API specifications
- `PROJECT_STRUCTURE.md` - Architecture overview

## ✨ Ready to Deploy!

Everything is built and ready. Just set up your database and deploy to Vercel!

**Questions?** Check the README files or test locally first.
