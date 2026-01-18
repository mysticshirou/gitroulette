import Link from 'next/link';
import { GitBranch, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <GitBranch className="h-6 w-6 text-accent-blue" />
              <span className="text-xl font-bold">gitroulette</span>
            </div>
            <p className="text-sm text-gray-medium">
              AI-powered version control for the future.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-medium hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/repositories" className="text-gray-medium hover:text-foreground transition-colors">
                  Repositories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-medium hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://github.com/mysticshirou/gitroulette" target="_blank" className="text-gray-medium hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="https://github.com/mysticshirou/gitroulette#quick-start" target="_blank" className="text-gray-medium hover:text-foreground transition-colors">
                  Quick Start
                </Link>
              </li>
              <li>
                <Link href="https://github.com/mysticshirou/gitroulette/releases" target="_blank" className="text-gray-medium hover:text-foreground transition-colors">
                  Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/mysticshirou/gitroulette"
                target="_blank"
                className="text-gray-medium hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-medium">
          <p>© 2024 gitroulette. MIT License.</p>
          <p className="mt-2 md:mt-0">
            Built with Next.js and AI
          </p>
        </div>
      </div>
    </footer>
  );
}
