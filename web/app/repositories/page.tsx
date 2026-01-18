import Link from 'next/link';
import { GitBranch, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default async function RepositoriesPage() {
  const { repositories } = await getRepositories();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Repositories</h1>
          <p className="text-xl text-gray-medium">
            Browse AI-powered repositories managed by GitRoulette
          </p>
        </div>

        {/* Repositories */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">All Repositories</h2>
            {repositories.length > 0 && (
              <span className="text-gray-medium">{repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}</span>
            )}
          </div>

          {repositories.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="py-20 text-center">
                <GitBranch className="h-20 w-20 text-gray-medium mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-3">No repositories yet</h3>
                <p className="text-gray-medium mb-8 text-lg">
                  Start by pushing your first gitr repository to get started.
                </p>
                <code className="bg-gray-light px-6 py-3 rounded-xl text-base inline-block">
                  gitr config set remote.url {process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'}
                </code>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo: any) => (
                <Link key={repo.id} href={`/repo/${repo.id}`}>
                  <Card className="border-border hover:border-accent-blue hover:shadow-lg transition-all cursor-pointer h-full group">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center group-hover:text-accent-blue transition-colors">
                          <GitBranch className="mr-2 h-5 w-5 text-accent-blue" />
                          {repo.name}
                        </span>
                        <Sparkles className="h-4 w-4 text-accent-orange" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-gray-medium">
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
