'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { GitBranch, GitCommit, FileCode, Clock, Sparkles, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';

type Tab = 'commits' | 'files' | 'branches';

export default function RepoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>('commits');
  const [repoData, setRepoData] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
  const [fileTree, setFileTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch repository data
        const repoRes = await fetch(`/api/repos/${id}`);
        if (repoRes.ok) {
          const data = await repoRes.json();
          setRepoData(data);
        }

        // Fetch commits
        const commitsRes = await fetch(`/api/repos/${id}/commits`);
        if (commitsRes.ok) {
          const data = await commitsRes.json();
          setCommits(data.commits || []);
        }

        // Fetch file tree
        const treeRes = await fetch(`/api/repos/${id}/tree`);
        if (treeRes.ok) {
          const data = await treeRes.json();
          setFileTree(data.tree || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading || !repoData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-neon-purple/10 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-neon-purple mx-auto mb-4 animate-pulse" />
          <p className="text-foreground/70">Loading repository...</p>
        </div>
      </div>
    );
  }

  const { repository, branches, commit_count } = repoData;

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
                  <p className="text-sm text-foreground/70">Files</p>
                  <p className="text-3xl font-bold text-neon-pink">{fileTree.length}</p>
                </div>
                <FileCode className="h-8 w-8 text-neon-pink/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex items-center space-x-2 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab('commits')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'commits'
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50'
                : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
            }`}
          >
            <GitCommit className="inline h-4 w-4 mr-2" />
            Commits
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'files'
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
            }`}
          >
            <FileCode className="inline h-4 w-4 mr-2" />
            Files
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'branches'
                ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50'
                : 'hover:bg-secondary text-foreground/70 hover:text-foreground'
            }`}
          >
            <GitBranch className="inline h-4 w-4 mr-2" />
            Branches
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'commits' && (
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
        )}

        {activeTab === 'files' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Files</h2>
            {fileTree.length === 0 ? (
              <Card className="border-dashed border-2 border-neon-cyan/30">
                <CardContent className="py-12 text-center">
                  <FileCode className="h-12 w-12 text-neon-cyan/50 mx-auto mb-4" />
                  <p className="text-foreground/70">No files yet. Push your first commit!</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-neon-cyan/50">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {fileTree.map((file: any) => (
                      <div
                        key={file.id}
                        className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all"
                      >
                        <FileCode className="h-5 w-5 text-neon-cyan" />
                        <span className="flex-1 font-mono text-sm">{file.path}</span>
                        <span className="text-xs text-foreground/50">
                          {timeAgo(file.created_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'branches' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Branches</h2>
            {branches.length === 0 ? (
              <Card className="border-dashed border-2 border-neon-pink/30">
                <CardContent className="py-12 text-center">
                  <GitBranch className="h-12 w-12 text-neon-pink/50 mx-auto mb-4" />
                  <p className="text-foreground/70">No branches yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {branches.map((branch: any) => (
                  <Card
                    key={branch.id}
                    className="border-border hover:border-neon-pink/50 transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <GitBranch className="h-6 w-6 text-neon-pink" />
                          <div>
                            <CardTitle className="text-lg">{branch.name}</CardTitle>
                            <p className="text-sm text-foreground/70 mt-1">
                              Created {timeAgo(branch.created_at)}
                            </p>
                          </div>
                        </div>
                        {branch.name === 'main' && (
                          <div className="px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-xs">
                            default
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
