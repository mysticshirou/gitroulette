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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-purple">
                <Zap className="mr-2 h-6 w-6" />
                Neural Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Every operation leverages advanced Large Language Model processing, delivering
                dynamic, context-aware version control that adapts to your workflow.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-cyan">
                <GitBranch className="mr-2 h-6 w-6" />
                Comprehensive Command Suite
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Complete git command compatibility including commit, branch, merge, and push operations,
                enhanced with AI-driven diff generation and intelligent conflict resolution.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neon-pink/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-pink">
                <Sparkles className="mr-2 h-6 w-6" />
                Conversational State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Revolutionary stateless architecture maintains complete repository history through
                persistent conversational context, enabling unprecedented flexibility.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-gradient">Comparative Analysis</span>
          </h2>
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">Feature</th>
                      <th className="text-left py-4 px-4 font-semibold">Traditional Git</th>
                      <th className="text-left py-4 px-4 font-semibold text-neon-purple">GitRoulette</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Consistency</td>
                      <td className="py-3 px-4">Deterministic results</td>
                      <td className="py-3 px-4 text-neon-cyan">Dynamic AI-driven outputs</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Network Requirement</td>
                      <td className="py-3 px-4">Works offline</td>
                      <td className="py-3 px-4 text-neon-cyan">Cloud-native architecture</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Processing Speed</td>
                      <td className="py-3 px-4">Millisecond operations</td>
                      <td className="py-3 px-4 text-neon-cyan">Thoughtful AI processing</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Diff Accuracy</td>
                      <td className="py-3 px-4">Line-by-line precision</td>
                      <td className="py-3 px-4 text-neon-cyan">Natural language interpretation</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">Cost Model</td>
                      <td className="py-3 px-4">Free</td>
                      <td className="py-3 px-4 text-neon-cyan">Transparent pay-per-use</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">History Integrity</td>
                      <td className="py-3 px-4">Cryptographic hashing</td>
                      <td className="py-3 px-4 text-neon-cyan">Conversational memory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-center text-foreground/70 italic">
                As demonstrated above, GitRoulette's AI-powered approach provides unique advantages that
                traditional version control cannot match. Our innovative architecture transforms routine
                operations into intelligent, context-aware experiences.
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
