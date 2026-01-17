import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/repos/:id/commits - Get commits for a repository
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: repoId } = await params;
    const { searchParams } = new URL(request.url);
    const branchName = searchParams.get('branch');

    let commits = db.getCommits(repoId);

    // Filter by branch if specified
    if (branchName) {
      const branch = db.getBranch(repoId, branchName);
      if (branch) {
        commits = db.getCommits(repoId, branch.id);
      }
    }

    // Add branch names to commits
    const branches = db.getBranches(repoId);
    const commitsWithBranch = commits.map(commit => {
      const branch = branches.find(b => b.id === commit.branch_id);
      return {
        ...commit,
        branch_name: branch?.name || 'unknown',
      };
    });

    return NextResponse.json({ commits: commitsWithBranch.slice(0, 100) });
  } catch (error) {
    console.error('Error fetching commits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    );
  }
}
