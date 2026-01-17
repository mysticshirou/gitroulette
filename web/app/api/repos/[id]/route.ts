import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/repos/:id - Get repository info
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const repository = db.getRepository(id);

    if (!repository) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }

    const branches = db.getBranches(id);
    const commit_count = db.getCommitCount(id);

    return NextResponse.json({
      repository,
      branches,
      commit_count,
    });
  } catch (error) {
    console.error('Error fetching repository:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository' },
      { status: 500 }
    );
  }
}
