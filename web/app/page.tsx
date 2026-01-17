import Link from 'next/link';
import { GitBranch, Clock, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { timeAgo } from '@/lib/utils';

async function getRepositories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/repos`, {
      cache: 'no-store',
    });
    if (!res.ok) return { repositories: [] };
    const data = await res.json();
    return data;
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
            <span className="text-gradient glow-text">Git, Powered by AI</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Version control reimagined with artificial intelligence. Every commit, diff, and merge
            guided by an LLM trying its best.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="neon" size="lg" className="group">
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Get Started
            </Button>
            <Button variant="ghost" size="lg">
              View Docs
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-purple">
                <Zap className="mr-2 h-6 w-6" />
                AI-Powered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Every git operation is processed through an LLM, creating unique and sometimes
                hilarious version control experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-cyan">
                <GitBranch className="mr-2 h-6 w-6" />
                Full Git Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Commit, branch, merge, and push - all the familiar git commands, now with
                AI-generated diffs and merge conflicts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-pink/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-pink">
                <Sparkles className="mr-2 h-6 w-6" />
                Creative History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Watch as the LLM maintains (or attempts to maintain) a coherent git history through
                pure conversation.
              </p>
            </CardContent>
          </Card>
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
