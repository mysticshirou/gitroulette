import Link from 'next/link';
import { GitBranch, GitCommit, FileCode, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';
import { notFound } from 'next/navigation';

async function getRepository(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/repos/${id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getCommits(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/repos/${id}/commits`,
      { cache: 'no-store' }
    );
    if (!res.ok) return { commits: [] };
    return await res.json();
  } catch {
    return { commits: [] };
  }
}

export default async function RepoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [repoData, commitsData] = await Promise.all([
    getRepository(id),
    getCommits(id),
  ]);

  if (!repoData) {
    notFound();
  }

  const { repository, branches, commit_count } = repoData;
  const { commits } = commitsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-neon-purple/10">
      <div className="container mx-auto px-4 py-8">
        {/* Repository Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GitBranch className="h-8 w-8 text-neon-purple" />
            <h1 className="text-4xl font-bold">{repository.name}</h1>
            <div className="px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/50 text-neon-purple text-sm">
              AI-Powered
            </div>
          </div>
          <p className="text-foreground/70">
            Updated {timeAgo(repository.updated_at)}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Commits</p>
                  <p className="text-3xl font-bold text-neon-purple">{commit_count}</p>
                </div>
                <GitCommit className="h-8 w-8 text-neon-purple/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Branches</p>
                  <p className="text-3xl font-bold text-neon-cyan">{branches.length}</p>
                </div>
                <GitBranch className="h-8 w-8 text-neon-cyan/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-neon-pink/50 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">AI Magic</p>
                  <p className="text-3xl font-bold text-neon-pink">100%</p>
                </div>
                <Sparkles className="h-8 w-8 text-neon-pink/50 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex items-center space-x-2 border-b border-border pb-4">
          <button className="px-4 py-2 rounded-md bg-neon-purple/20 text-neon-purple border border-neon-purple/50">
            <GitCommit className="inline h-4 w-4 mr-2" />
            Commits
          </button>
          <button className="px-4 py-2 rounded-md hover:bg-secondary text-foreground/70 hover:text-foreground transition-colors">
            <FileCode className="inline h-4 w-4 mr-2" />
            Files
          </button>
          <button className="px-4 py-2 rounded-md hover:bg-secondary text-foreground/70 hover:text-foreground transition-colors">
            <GitBranch className="inline h-4 w-4 mr-2" />
            Branches
          </button>
        </div>

        {/* Commits List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Commits</h2>
          {commits.length === 0 ? (
            <Card className="border-dashed border-2 border-neon-purple/30">
              <CardContent className="py-12 text-center">
                <GitCommit className="h-12 w-12 text-neon-purple/50 mx-auto mb-4" />
                <p className="text-foreground/70">No commits yet. Push your first commit!</p>
              </CardContent>
            </Card>
          ) : (
            commits.map((commit: any) => (
              <Card
                key={commit.id}
                className="border-border hover:border-neon-purple/50 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold mb-2">
                        {commit.message}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-foreground/70">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {timeAgo(commit.created_at)}
                        </span>
                        <span className="font-mono text-neon-cyan">
                          {commit.commit_hash?.substring(0, 7)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple text-xs">
                          {commit.branch_name || 'main'}
                        </span>
                      </div>
                    </div>
                    <Sparkles className="h-5 w-5 text-neon-purple animate-pulse" />
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
