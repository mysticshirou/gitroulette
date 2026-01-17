import Link from 'next/link';
import { GitBranch, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { timeAgo } from '@/lib/utils';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getRepositories() {
  try {
    const repositories = await db.getAllRepositories();
    return { repositories };
  } catch {
    return { repositories: [] };
  }
}

export default async function Home() {
  const { repositories } = await getRepositories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-neon-purple/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-6xl font-bold">
            <span className="text-gradient glow-text">Enterprise-Grade AI-Powered VCS</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            GitRoulette represents a paradigm shift in source code management. Leveraging cutting-edge
            Large Language Model technology to deliver an intelligent, context-aware version control experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/mysticshirou/gitroulette#quick-start" target="_blank">
              <Button variant="neon" size="lg" className="group">
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="lg">
                View Docs
              </Button>
            </Link>
          </div>
        </div>

        {/* Repositories */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Repositories</h2>
            {repositories.length > 0 && (
              <span className="text-foreground/50">{repositories.length} repos</span>
            )}
          </div>

          {repositories.length === 0 ? (
            <Card className="border-dashed border-2 border-neon-purple/30">
              <CardContent className="py-16 text-center">
                <GitBranch className="h-16 w-16 text-neon-purple/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No repositories yet</h3>
                <p className="text-foreground/70 mb-6">
                  Start by pushing your first gitr repository to get started.
                </p>
                <code className="bg-secondary px-4 py-2 rounded text-sm">
                  gitr config set remote.url {process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'}
                </code>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {repositories.map((repo: any) => (
                <Link key={repo.id} href={`/repo/${repo.id}`}>
                  <Card className="border-border hover:border-neon-purple/50 hover:glow-border transition-all cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <GitBranch className="mr-2 h-5 w-5 text-neon-purple" />
                          {repo.name}
                        </span>
                        <Sparkles className="h-4 w-4 text-neon-cyan animate-pulse" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-foreground/70">
                        <Clock className="mr-1 h-4 w-4" />
                        Updated {timeAgo(repo.updated_at)}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
