'use client';

import Link from 'next/link';
import { GitBranch, Sparkles } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="border-b border-black/10 bg-black backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <GitBranch className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
            <Sparkles className="h-4 w-4 text-accent-orange absolute -top-1 -right-1" />
          </div>
          <span className="text-2xl font-bold text-white">gitroulette</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/repositories"
            className="text-white/70 hover:text-white transition-colors"
          >
            Repositories
          </Link>
          <Link
            href="/about"
            className="text-white/70 hover:text-white transition-colors"
          >
            About
          </Link>
          <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm">
            AI-Powered
          </div>
        </div>
      </div>
    </nav>
  );
}
