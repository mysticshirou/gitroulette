import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/repos/:id/tree - Get file tree for latest commit
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: repoId } = await params;
    const { searchParams } = new URL(request.url);
    const branchName = searchParams.get('branch') || 'main';

    // Get branch
    const branch = db.getBranch(repoId, branchName);
    if (!branch) {
      return NextResponse.json(
        { error: 'Branch not found' },
        { status: 404 }
      );
    }

    // Get latest commit
    const commit = db.getLatestCommit(repoId, branch.id);
    if (!commit) {
      return NextResponse.json({ tree: [], commit: null });
    }

    // Get files
    const files = db.getFiles(repoId, commit.id);
    const tree = files.map(f => ({
      id: f.id,
      path: f.path,
      created_at: f.created_at,
    }));

    return NextResponse.json({
      tree,
      commit,
    });
  } catch (error) {
    console.error('Error fetching tree:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tree' },
      { status: 500 }
    );
  }
}
