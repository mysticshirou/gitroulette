import Link from 'next/link';
import { GitBranch, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <GitBranch className="h-20 w-20 text-gray-medium" />
              <Sparkles className="h-16 w-16 text-accent-orange" />
            </div>

            <h1 className="text-6xl font-bold mb-4">
              <span className="text-gradient-blue-orange">404</span>
            </h1>

            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

            <p className="text-gray-medium mb-8 text-lg">
              The LLM tried to find this page but got lost in the git history.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link href="/">
                <Button variant="default" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
