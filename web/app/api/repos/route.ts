import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// POST /api/repos - Create a new repository
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Repository name is required' },
        { status: 400 }
      );
    }

    const repo = await db.createRepository(name);

    return NextResponse.json({ id: repo.id, name: repo.name }, { status: 201 });
  } catch (error) {
    console.error('Error creating repository:', error);
    return NextResponse.json(
      { error: 'Failed to create repository' },
      { status: 500 }
    );
  }
}

// GET /api/repos - List all repositories
export async function GET() {
  try {
    const repositories = await db.getAllRepositories();
    return NextResponse.json({ repositories });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
