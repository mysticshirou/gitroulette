import { GitBranch, Sparkles, Zap, Brain, Code, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-neon-purple/10">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <GitBranch className="h-16 w-16 text-neon-purple" />
            <Sparkles className="h-12 w-12 text-neon-cyan animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold">
            <span className="text-gradient glow-text">About GitRoulette</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Git and GitHub, but it's actually just an LLM API trying its best.
          </p>
        </div>

        {/* What is it */}
        <div className="mb-16">
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <Brain className="mr-3 h-8 w-8 text-neon-purple" />
                What is GitRoulette?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-foreground/80">
              <p>
                GitRoulette is a hackathon project that implements git commands where everything
                is converted into prompts and submitted to an LLM. The LLM attempts to simulate
                git behavior, track commits, and show diffs - all from chat history alone.
              </p>
              <p>
                Every command sends:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All repository files (except binaries &gt;1MB)</li>
                <li>Complete chat history with the LLM</li>
                <li>The git command you want to run</li>
              </ul>
              <p>
                The LLM simulates git behavior from conversation context. It's intentionally
                chaotic and entertaining!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-cyan">
                  <Code className="mr-2 h-6 w-6" />
                  Full Git Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• init, add, commit, status, log, diff</li>
                  <li>• branch, checkout, merge</li>
                  <li>• push, pull (remote operations)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-neon-pink/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-pink">
                  <Zap className="mr-2 h-6 w-6" />
                  Smart Filtering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Automatically skips binary files</li>
                  <li>• Ignores files &gt;1MB</li>
                  <li>• Prevents 413 errors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-neon-purple/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-purple">
                  <Sparkles className="mr-2 h-6 w-6" />
                  AI-Powered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Uses DeepSeek or OpenAI</li>
                  <li>• LLM simulates git behavior</li>
                  <li>• Creative (sometimes hilarious) outputs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-cyan">
                  <Heart className="mr-2 h-6 w-6" />
                  Open Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• MIT License</li>
                  <li>• Built with Go & Next.js</li>
                  <li>• PRs welcome!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why */}
        <div className="mb-16">
          <Card className="border-neon-pink/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <Sparkles className="mr-3 h-8 w-8 text-neon-pink animate-pulse" />
                Why Does This Exist?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-foreground/80">
              <p>
                Because watching an LLM try to be git is entertaining. This is a hackathon
                project exploring the absurd intersection of version control and large language
                models.
              </p>
              <p className="text-foreground/60 italic">
                Watch the LLM attempt to track file changes across branches, generate creative
                (but inaccurate) diffs, hallucinate merge conflicts, and try to remember which
                commits belong to which branches!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cost */}
        <div className="mb-16">
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-foreground/80">
                <p>Using DeepSeek API:</p>
                <ul className="space-y-2">
                  <li>• ~$0.14 per 1M input tokens</li>
                  <li>• Typical commit: 1000-5000 tokens</li>
                  <li className="text-neon-cyan font-semibold">
                    • Cost per commit: &lt; $0.001 (less than 1/10 cent!)
                  </li>
                </ul>
                <p className="text-neon-purple font-semibold">Very affordable for personal use!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Try It?</h2>
          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/mysticshirou/gitroulette" target="_blank">
              <Button variant="neon" size="lg" className="group">
                <Code className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="lg">
                View Repositories
              </Button>
            </Link>
          </div>
          <div className="mt-8 p-6 bg-secondary/50 rounded-lg border border-border">
            <code className="text-sm">
              # Install CLI
              <br />
              curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-linux-amd64 -o gitr
              <br />
              chmod +x gitr
              <br />
              sudo mv gitr /usr/local/bin/
              <br />
              <br />
              # Start using
              <br />
              gitr init
              <br />
              gitr config set api.url https://api.deepseek.com/v1/chat/completions
              <br />
              gitr config set api.key your-api-key
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
