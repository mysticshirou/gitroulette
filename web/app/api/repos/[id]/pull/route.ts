import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { PullResponse } from '@/lib/types';

// GET /api/repos/:id/pull - Pull latest state
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: repoId } = await params;

    // Verify repository exists
    const repository = db.getRepository(repoId);
    if (!repository) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }

    // Get main branch (or first branch)
    const branches = db.getBranches(repoId);
    if (branches.length === 0) {
      return NextResponse.json(
        { error: 'No branches found' },
        { status: 404 }
      );
    }

    const branch = branches.find(b => b.name === 'main') || branches[0];

    // Get latest files
    const files = db.getLatestFiles(repoId, branch.id);

    // Get LLM history
    const history = db.getLLMHistory(repoId);

    const response: PullResponse = {
      branch: branch.name,
      files,
      history,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error pulling from repository:', error);
    return NextResponse.json(
      { error: 'Failed to pull from repository' },
      { status: 500 }
    );
  }
}
