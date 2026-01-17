import Link from 'next/link';
import { GitBranch, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-neon-purple/10 flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="flex items-center justify-center">
          <GitBranch className="h-24 w-24 text-neon-purple/50 animate-pulse" />
        </div>
        <h1 className="text-6xl font-bold">
          <span className="text-gradient">404</span>
        </h1>
        <h2 className="text-3xl font-semibold">Repository Not Found</h2>
        <p className="text-foreground/70 max-w-md mx-auto">
          The LLM couldn't find this page in its git history. It might have been lost in a merge
          conflict or never committed in the first place.
        </p>
        <Link href="/">
          <Button variant="neon" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
