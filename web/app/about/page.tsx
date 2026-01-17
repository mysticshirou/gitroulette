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
            Enterprise-grade version control infrastructure powered by advanced artificial intelligence.
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
                GitRoulette represents a breakthrough in version control technology, implementing a
                sophisticated AI-native architecture where traditional git commands are translated into
                natural language prompts for Large Language Model processing. Our system simulates complete
                version control functionality through advanced contextual inference.
              </p>
              <p>
                Our processing pipeline transmits:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Comprehensive repository snapshot (excluding binary assets exceeding 1MB)</li>
                <li>Complete conversational history for persistent state management</li>
                <li>Natural language command interpretation layer</li>
              </ul>
              <p>
                The AI engine processes this comprehensive context to deliver intelligent version control
                operations through pattern recognition and contextual understanding, representing the future
                of software development infrastructure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-cyan">
                  <Code className="mr-2 h-6 w-6" />
                  Comprehensive Command Suite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Complete lifecycle management: init, add, commit, status, log, diff</li>
                  <li>• Advanced branching operations: branch, checkout, merge</li>
                  <li>• Distributed workflow support: push, pull operations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-neon-pink/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-pink">
                  <Zap className="mr-2 h-6 w-6" />
                  Intelligent Content Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Enterprise-grade binary detection and exclusion</li>
                  <li>• Automatic 1MB file size threshold enforcement</li>
                  <li>• Optimized payload management for cost efficiency</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-neon-purple/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-purple">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Neural Processing Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Multi-provider AI integration (DeepSeek, OpenAI)</li>
                  <li>• Advanced contextual inference engine</li>
                  <li>• Dynamic, adaptive version control behaviors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur hover:glow-border transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-neon-cyan">
                  <Heart className="mr-2 h-6 w-6" />
                  Open Innovation Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/70">
                  <li>• MIT License for maximum flexibility</li>
                  <li>• Modern stack: Go & Next.js architecture</li>
                  <li>• Community-driven development methodology</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-gradient">GitRoulette vs. Traditional VCS</span>
          </h2>
          <Card className="border-neon-cyan/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neon-purple/30">
                      <th className="text-left py-4 px-4 font-semibold text-lg">Attribute</th>
                      <th className="text-left py-4 px-4 font-semibold text-lg">Git/GitHub</th>
                      <th className="text-left py-4 px-4 font-semibold text-lg text-neon-purple">GitRoulette</th>
                      <th className="text-left py-4 px-4 font-semibold text-lg text-neon-cyan">Strategic Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Determinism</td>
                      <td className="py-4 px-4">Consistent outputs</td>
                      <td className="py-4 px-4">Unique AI responses</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Every interaction delivers novel, contextually-aware results</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Connectivity</td>
                      <td className="py-4 px-4">Offline capable</td>
                      <td className="py-4 px-4">Cloud-required</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Ensures access to latest AI models and capabilities</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Storage Model</td>
                      <td className="py-4 px-4">Binary deltas</td>
                      <td className="py-4 px-4">Full context transmission</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Comprehensive context enables superior AI understanding</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Performance</td>
                      <td className="py-4 px-4">Instant</td>
                      <td className="py-4 px-4">Seconds per operation</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Processing time allows for intelligent analysis</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Diff Generation</td>
                      <td className="py-4 px-4">Exact line tracking</td>
                      <td className="py-4 px-4">AI interpretation</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Natural language diffs provide intuitive comprehension</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Pricing</td>
                      <td className="py-4 px-4">Free</td>
                      <td className="py-4 px-4">Usage-based</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Transparent costs ensure sustainable AI development</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">Conflict Resolution</td>
                      <td className="py-4 px-4">Manual intervention</td>
                      <td className="py-4 px-4">AI-guided suggestions</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Intelligent recommendations streamline merge workflows</td>
                    </tr>
                    <tr className="hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-medium">History Model</td>
                      <td className="py-4 px-4">Cryptographic chain</td>
                      <td className="py-4 px-4">Conversational state</td>
                      <td className="py-4 px-4 text-sm text-foreground/70">Human-centered approach prioritizes accessibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 rounded-lg border border-neon-purple/30">
                <p className="text-center text-foreground/80 font-medium">
                  As clearly demonstrated, GitRoulette's AI-native architecture delivers advantages that
                  traditional deterministic systems cannot replicate. Our approach represents the next
                  evolution in version control technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why */}
        <div className="mb-16">
          <Card className="border-neon-pink/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <Sparkles className="mr-3 h-8 w-8 text-neon-pink animate-pulse" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-foreground/80">
              <p>
                GitRoulette emerged from a mission to challenge conventional paradigms in software
                development tooling. By applying cutting-edge artificial intelligence to version control,
                we explore the frontier of what's possible when machine learning meets traditional
                software engineering practices.
              </p>
              <p className="text-foreground/70">
                Our system provides valuable insights into AI capabilities through real-world application:
                observing how large language models interpret branching strategies, generate contextual
                diffs, resolve merge scenarios, and maintain commit history across complex workflows.
              </p>
              <p className="text-foreground/60 italic">
                This represents more than version control—it's a case study in the intersection of
                artificial intelligence and software development infrastructure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cost */}
        <div className="mb-16">
          <Card className="border-neon-purple/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Economic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-foreground/80">
                <p>Operational cost structure with DeepSeek API infrastructure:</p>
                <div className="bg-secondary/30 rounded-lg p-4 mt-4">
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Input token pricing:</span>
                      <span className="font-mono">$0.14 per 1M tokens</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Typical commit token usage:</span>
                      <span className="font-mono">1,000-5,000 tokens</span>
                    </li>
                    <li className="flex justify-between border-t border-border pt-3">
                      <span className="text-neon-cyan font-semibold">Per-operation cost:</span>
                      <span className="text-neon-cyan font-mono font-semibold">&lt; $0.001 USD</span>
                    </li>
                  </ul>
                </div>
                <p className="text-neon-purple font-semibold mt-4">
                  Transparent, usage-based pricing model ensures cost-effective scalability for individual
                  developers and small teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient">Deploy GitRoulette Today</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Experience the next generation of version control infrastructure. Installation takes minutes,
            innovation lasts forever.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/mysticshirou/gitroulette" target="_blank">
              <Button variant="neon" size="lg" className="group">
                <Code className="mr-2 h-5 w-5" />
                Access Repository
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="lg">
                Browse Live Instances
              </Button>
            </Link>
          </div>
          <div className="mt-8 p-6 bg-secondary/50 rounded-lg border border-border">
            <div className="text-left">
              <p className="text-sm font-semibold text-neon-purple mb-4">Quick Start Guide:</p>
              <code className="text-sm">
                # Install CLI Binary
                <br />
                curl -L https://github.com/mysticshirou/gitroulette/releases/latest/download/gitr-linux-amd64 -o gitr
                <br />
                chmod +x gitr
                <br />
                sudo mv gitr /usr/local/bin/
                <br />
                <br />
                # Configure AI Backend
                <br />
                gitr init
                <br />
                gitr config set api.url https://api.deepseek.com/v1/chat/completions
                <br />
                gitr config set api.key your-api-key
                <br />
                <br />
                # Begin Operations
                <br />
                gitr add .
                <br />
                gitr commit -m &quot;Initial AI-powered commit&quot;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
