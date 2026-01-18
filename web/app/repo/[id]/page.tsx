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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-accent-blue mx-auto mb-4 animate-pulse" />
          <p className="text-gray-medium">Loading repository...</p>
        </div>
      </div>
    );
  }

  const { repository, branches, commit_count } = repoData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Repository Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GitBranch className="h-8 w-8 text-accent-blue" />
            <h1 className="text-4xl font-bold">{repository.name}</h1>
            <div className="px-3 py-1 rounded-full bg-gray-light border border-border text-accent-blue text-sm">
              AI-Powered
            </div>
          </div>
          <p className="text-gray-medium">
            Updated {timeAgo(repository.updated_at)}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-medium">Commits</p>
                  <p className="text-3xl font-bold text-accent-blue">{commit_count}</p>
                </div>
                <GitCommit className="h-8 w-8 text-gray-medium" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-medium">Branches</p>
                  <p className="text-3xl font-bold text-accent-blue">{branches.length}</p>
                </div>
                <GitBranch className="h-8 w-8 text-gray-medium" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-medium">Files</p>
                  <p className="text-3xl font-bold text-accent-blue">{fileTree.length}</p>
                </div>
                <FileCode className="h-8 w-8 text-gray-medium" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex items-center space-x-2 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab('commits')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'commits'
                ? 'bg-accent-blue text-white'
                : 'hover:bg-gray-light text-gray-medium hover:text-foreground'
            }`}
          >
            <GitCommit className="inline h-4 w-4 mr-2" />
            Commits
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'files'
                ? 'bg-accent-blue text-white'
                : 'hover:bg-gray-light text-gray-medium hover:text-foreground'
            }`}
          >
            <FileCode className="inline h-4 w-4 mr-2" />
            Files
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'branches'
                ? 'bg-accent-blue text-white'
                : 'hover:bg-gray-light text-gray-medium hover:text-foreground'
            }`}
          >
            <GitBranch className="inline h-4 w-4 mr-2" />
            Branches
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'commits' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Recent Commits</h2>
            {commits.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="py-12 text-center">
                  <GitCommit className="h-12 w-12 text-gray-medium mx-auto mb-4" />
                  <p className="text-gray-medium">No commits yet. Push your first commit!</p>
                </CardContent>
              </Card>
            ) : (
              commits.map((commit: any) => (
                <Card
                  key={commit.id}
                  className="border-border hover:border-accent-blue hover:shadow-sm transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-2">
                          {commit.message}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-medium">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {timeAgo(commit.created_at)}
                          </span>
                          <span className="font-mono text-accent-blue">
                            {commit.commit_hash?.substring(0, 7)}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-light text-accent-blue text-xs">
                            {commit.branch_name || 'main'}
                          </span>
                        </div>
                      </div>
                      <Sparkles className="h-5 w-5 text-accent-orange" />
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Files</h2>
            {fileTree.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="py-12 text-center">
                  <FileCode className="h-12 w-12 text-gray-medium mx-auto mb-4" />
                  <p className="text-gray-medium">No files yet. Push your first commit!</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {fileTree.map((file: any) => (
                      <div
                        key={file.id}
                        className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-light transition-all"
                      >
                        <FileCode className="h-5 w-5 text-accent-blue" />
                        <span className="flex-1 font-mono text-sm">{file.path}</span>
                        <span className="text-xs text-gray-medium">
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
            <h2 className="text-2xl font-semibold">Branches</h2>
            {branches.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="py-12 text-center">
                  <GitBranch className="h-12 w-12 text-gray-medium mx-auto mb-4" />
                  <p className="text-gray-medium">No branches yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {branches.map((branch: any) => (
                  <Card
                    key={branch.id}
                    className="border-border hover:border-accent-blue hover:shadow-sm transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <GitBranch className="h-6 w-6 text-accent-blue" />
                          <div>
                            <CardTitle className="text-lg">{branch.name}</CardTitle>
                            <p className="text-sm text-gray-medium mt-1">
                              Created {timeAgo(branch.created_at)}
                            </p>
                          </div>
                        </div>
                        {branch.name === 'main' && (
                          <div className="px-2 py-1 rounded-full bg-gray-light text-accent-blue text-xs">
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
