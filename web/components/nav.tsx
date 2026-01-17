'use client';

import Link from 'next/link';
import { GitBranch, Sparkles } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <GitBranch className="h-8 w-8 text-neon-purple transition-transform group-hover:scale-110" />
            <Sparkles className="h-4 w-4 text-neon-cyan absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-2xl font-bold text-gradient">gitroulette</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Repositories
          </Link>
          <Link
            href="/about"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <div className="px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/50 text-neon-purple text-sm font-medium">
            AI-Powered
          </div>
        </div>
      </div>
    </nav>
  );
}
