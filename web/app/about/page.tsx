import { GitBranch, Sparkles, Zap, Brain, Code, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center space-y-6 mb-20">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <GitBranch className="h-16 w-16 text-accent-blue" />
            <Sparkles className="h-12 w-12 text-accent-orange" />
          </div>
          <h1 className="text-5xl font-bold text-foreground">
            About GitRoulette
          </h1>
          <p className="text-xl text-gray-medium max-w-3xl mx-auto">
            Enterprise-grade version control infrastructure powered by advanced artificial intelligence.
          </p>
        </div>

        {/* What is it */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <Brain className="mr-3 h-8 w-8 text-accent-blue" />
                What is GitRoulette?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-gray-medium">
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
          <h2 className="text-3xl font-semibold mb-8 text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:border-accent-blue hover:shadow-sm transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-accent-blue">
                  <Code className="mr-2 h-6 w-6" />
                  Comprehensive Command Suite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-medium">
                  <li>• Complete lifecycle management: init, add, commit, status, log, diff</li>
                  <li>• Advanced branching operations: branch, checkout, merge</li>
                  <li>• Distributed workflow support: push, pull operations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:border-accent-blue hover:shadow-sm transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-accent-blue">
                  <Zap className="mr-2 h-6 w-6" />
                  Intelligent Content Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-medium">
                  <li>• Enterprise-grade binary detection and exclusion</li>
                  <li>• Automatic 1MB file size threshold enforcement</li>
                  <li>• Optimized payload management for cost efficiency</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:border-accent-blue hover:shadow-sm transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-accent-blue">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Neural Processing Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-medium">
                  <li>• Multi-provider AI integration (DeepSeek, OpenAI)</li>
                  <li>• Advanced contextual inference engine</li>
                  <li>• Dynamic, adaptive version control behaviors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:border-accent-blue hover:shadow-sm transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-accent-blue">
                  <Heart className="mr-2 h-6 w-6" />
                  Open Innovation Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-medium">
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
          <h2 className="text-3xl font-semibold mb-8 text-center">
            GitRoulette vs. Traditional VCS
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-semibold text-lg">Attribute</th>
                      <th className="text-left py-4 px-4 font-semibold text-lg">Git/GitHub</th>
                      <th className="text-left py-4 px-4 font-semibold text-lg text-accent-blue">GitRoulette</th>
                      <th className="text-left py-4 px-4 font-semibold text-lg text-gray-medium">Strategic Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Determinism</td>
                      <td className="py-4 px-4">Consistent outputs</td>
                      <td className="py-4 px-4">Unique AI responses</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Every interaction delivers novel, contextually-aware results</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Connectivity</td>
                      <td className="py-4 px-4">Offline capable</td>
                      <td className="py-4 px-4">Cloud-required</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Ensures access to latest AI models and capabilities</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Storage Model</td>
                      <td className="py-4 px-4">Binary deltas</td>
                      <td className="py-4 px-4">Full context transmission</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Comprehensive context enables superior AI understanding</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Performance</td>
                      <td className="py-4 px-4">Instant</td>
                      <td className="py-4 px-4">Seconds per operation</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Processing time allows for intelligent analysis</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Diff Generation</td>
                      <td className="py-4 px-4">Exact line tracking</td>
                      <td className="py-4 px-4">AI interpretation</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Natural language diffs provide intuitive comprehension</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Pricing</td>
                      <td className="py-4 px-4">Free</td>
                      <td className="py-4 px-4">Usage-based</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Transparent costs ensure sustainable AI development</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">Conflict Resolution</td>
                      <td className="py-4 px-4">Manual intervention</td>
                      <td className="py-4 px-4">AI-guided suggestions</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Intelligent recommendations streamline merge workflows</td>
                    </tr>
                    <tr className="hover:bg-gray-light transition-colors">
                      <td className="py-4 px-4 font-medium">History Model</td>
                      <td className="py-4 px-4">Cryptographic chain</td>
                      <td className="py-4 px-4">Conversational state</td>
                      <td className="py-4 px-4 text-sm text-gray-medium">Human-centered approach prioritizes accessibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 p-4 bg-gray-light rounded-lg border border-border">
                <p className="text-center text-foreground font-medium">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <Sparkles className="mr-3 h-8 w-8 text-accent-orange" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-gray-medium">
              <p>
                GitRoulette emerged from a mission to challenge conventional paradigms in software
                development tooling. By applying cutting-edge artificial intelligence to version control,
                we explore the frontier of what's possible when machine learning meets traditional
                software engineering practices.
              </p>
              <p>
                Our system provides valuable insights into AI capabilities through real-world application:
                observing how large language models interpret branching strategies, generate contextual
                diffs, resolve merge scenarios, and maintain commit history across complex workflows.
              </p>
              <p className="italic">
                This represents more than version control—it's a case study in the intersection of
                artificial intelligence and software development infrastructure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cost */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Economic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-medium">
                <p>Operational cost structure with DeepSeek API infrastructure:</p>
                <div className="bg-gray-light rounded-lg p-4 mt-4">
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
                      <span className="text-accent-blue font-semibold">Per-operation cost:</span>
                      <span className="text-accent-blue font-mono font-semibold">&lt; $0.001 USD</span>
                    </li>
                  </ul>
                </div>
                <p className="text-foreground font-semibold mt-4">
                  Transparent, usage-based pricing model ensures cost-effective scalability for individual
                  developers and small teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">
            Deploy GitRoulette Today
          </h2>
          <p className="text-gray-medium max-w-2xl mx-auto">
            Experience the next generation of version control infrastructure. Installation takes minutes,
            innovation lasts forever.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="https://github.com/mysticshirou/gitroulette" target="_blank">
              <Button variant="default" size="lg" className="group">
                <Code className="mr-2 h-5 w-5" />
                Access Repository
              </Button>
            </Link>
            <Link href="/repositories">
              <Button variant="secondary" size="lg">
                Browse Repositories
              </Button>
            </Link>
          </div>
          <div className="mt-8 p-6 bg-gray-light rounded-xl border border-border">
            <div className="text-left">
              <p className="text-sm font-semibold text-accent-blue mb-4">Quick Start Guide:</p>
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
