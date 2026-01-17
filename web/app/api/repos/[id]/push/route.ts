import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { PushRequest } from '@/lib/types';

// Increase body size limit for this route
export const runtime = 'nodejs';
export const maxDuration = 30;

// POST /api/repos/:id/push - Push commits, files, and history
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: repoId } = await params;
    const data: PushRequest = await request.json();

    // Verify repository exists
    const repository = await db.getRepository(repoId);
    if (!repository) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }

    // Get or create branch
    let branch = await db.getBranch(repoId, data.branch);
    if (!branch) {
      branch = await db.createBranch(repoId, data.branch);
    }

    // Store commits (if any)
    for (const commitData of data.commits || []) {
      const commit = await db.createCommit(
        repoId,
        branch.id,
        commitData.message,
        commitData.hash
      );

      // Store files for this commit
      await db.saveFiles(repoId, commit.id, data.files);
    }

    // Store LLM history
    const llmMessages = data.history.map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
      timestamp: h.timestamp,
    }));
    await db.saveLLMHistory(repoId, llmMessages);

    // Update repository timestamp
    await db.updateRepository(repoId);

    return NextResponse.json({ success: true, message: 'Pushed successfully' });
  } catch (error) {
    console.error('Error pushing to repository:', error);
    return NextResponse.json(
      { error: 'Failed to push to repository' },
      { status: 500 }
    );
  }
}
