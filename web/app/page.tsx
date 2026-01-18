import Link from 'next/link';
import { GitBranch, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-light to-background">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-7xl font-bold leading-tight">
              <span className="text-gradient-blue-orange">Enterprise-Grade AI-Powered VCS</span>
            </h1>
            <p className="text-2xl text-gray-medium max-w-3xl mx-auto leading-relaxed">
              Experience the future of version control with GitRoulette.
              Leveraging cutting-edge Large Language Model technology for intelligent,
              context-aware source code management.
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <Link href="https://github.com/mysticshirou/gitroulette#quick-start" target="_blank">
                <Button variant="default" size="lg">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link href="/repositories">
                <Button variant="secondary" size="lg">
                  <GitBranch className="mr-2 h-5 w-5" />
                  View Repositories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Why GitRoulette?</h2>
          <p className="text-xl text-gray-medium max-w-2xl mx-auto">
            Reimagining version control through artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:border-accent-blue hover:shadow-lg transition-all">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-accent-blue" />
              </div>
              <CardTitle className="text-2xl">AI-Native</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-medium">
                Natural language commands processed by advanced LLMs for
                contextual understanding and intelligent operations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:border-accent-blue hover:shadow-lg transition-all">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-accent-blue" />
              </div>
              <CardTitle className="text-2xl">Smart Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-medium">
                Automatic binary detection, intelligent file filtering,
                and optimized payload management for cost efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:border-accent-blue hover:shadow-lg transition-all">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-accent-blue" />
              </div>
              <CardTitle className="text-2xl">Cloud-First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-medium">
                Always connected to the latest AI models and capabilities.
                Real-time collaboration with intelligent assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-light">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-bold">Ready to revolutionize your workflow?</h2>
            <p className="text-xl text-gray-medium">
              Join developers exploring the intersection of AI and version control.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="https://github.com/mysticshirou/gitroulette" target="_blank">
                <Button variant="accent" size="lg">
                  View on GitHub
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-5xl font-bold text-accent-blue mb-2">100%</div>
            <div className="text-gray-medium">AI-Powered Operations</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-accent-blue mb-2">&lt;$0.001</div>
            <div className="text-gray-medium">Cost Per Operation</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-accent-blue mb-2">∞</div>
            <div className="text-gray-medium">Unique Responses</div>
          </div>
        </div>
      </div>
    </div>
  );
}
