# gitroulette Web

Sleek, futuristic web interface for gitroulette - AI-powered git remote.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

**That's it!** No database setup needed. Data is stored in a local JSON file (`data/db.json`) that's created automatically on first run.

## Environment Variables (Optional)

All environment variables are optional! The app works out of the box.

If you want to customize, create a `.env.local` file:

```env
# Optional: Set custom API URL (defaults to http://localhost:3000)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: For web-based LLM operations (not currently used)
DEEPSEEK_API_URL="https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_API_KEY="sk-..."
```

## Project Structure

```
web/
├── app/
│   ├── api/                # API routes (backend)
│   │   └── repos/
│   │       ├── route.ts            # GET/POST repos
│   │       └── [id]/
│   │           ├── route.ts        # GET repo details
│   │           ├── push/route.ts   # POST push
│   │           ├── pull/route.ts   # GET pull
│   │           ├── commits/route.ts
│   │           └── tree/route.ts
│   ├── repo/[id]/          # Repository detail pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   └── nav.tsx             # Navigation
├── lib/
│   ├── db.ts               # Database client
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── schema.sql              # Database schema
└── API_DOCS.md             # Detailed API documentation
```

## Design Theme

The website features a futuristic, AI-themed design:

- **Dark theme** with neon accents (purple, cyan, pink)
- **Gradient text** for headlines
- **Glow effects** on interactive elements
- **Backdrop blur** for glassmorphism
- **Pulsing animations** for AI indicators

### Color Palette

- Background: `#0a0a0a` (near black)
- Card: `#111111` (dark gray)
- Neon Purple: `#a855f7` (primary accent)
- Neon Cyan: `#06b6d4` (secondary accent)
- Neon Pink: `#ec4899` (tertiary accent)

## CLI Integration

Configure your `gitr` CLI to push to this remote:

```bash
# Set remote URL
gitr config set remote.url http://localhost:3000  # or your Vercel URL

# Create repo via API and get repo_id, then:
gitr config set remote.repo_id <repo-id>

# Push your first commit
gitr push
```

## API Endpoints

See [API_DOCS.md](./API_DOCS.md) for full API documentation.

**Key endpoints:**

- `POST /api/repos` - Create repository
- `POST /api/repos/:id/push` - Push commits
- `GET /api/repos/:id/pull` - Pull state
- `GET /api/repos/:id/commits` - List commits
- `GET /api/repos/:id/tree` - Browse files

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - DATABASE_URL
# - NEXT_PUBLIC_APP_URL
```

### Manual Deployment

```bash
npm run build
npm start
```

## Features

✨ **Home Page**
- Hero section with AI branding
- Feature cards with neon accents
- Repository list with live data

🗂️ **Repository Page**
- Commit history
- Branch overview
- File browser (coming soon)
- LLM chat history (coming soon)

🎨 **Design System**
- Futuristic dark theme
- Custom neon color palette
- Animated components
- Responsive layout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Storage**: JSON file (no database required!)
- **Icons**: Lucide React
- **Deployment**: Vercel

## License

MIT
