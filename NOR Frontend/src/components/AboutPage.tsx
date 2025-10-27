import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Signal, ArrowLeft, Mail, Linkedin, Github, Target, Users, BarChart3 } from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <Button 
          onClick={() => onNavigate('home')} 
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Signal className="w-12 h-12 text-blue-600" />
            <span className="text-blue-600">NetPulse</span>
          </div>
          <h1 className="text-gray-900 mb-4">About NetPulse</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform for studying the correlation between network performance 
            and weather patterns through community-driven data collection.
          </p>
        </div>

        {/* Project Overview */}
        <Card className="p-8 mb-8">
          <h2 className="mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-6">
            This project aims to study correlation between network performance and weather patterns.
            By collecting real-time network issue reports from users across different locations and weather conditions,
            we can analyze how environmental factors impact mobile connectivity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600">
                Improve network reliability through data-driven insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-2">Community Driven</h3>
              <p className="text-sm text-gray-600">
                Powered by real users reporting real problems
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">Data Analytics</h3>
              <p className="text-sm text-gray-600">
                Advanced analysis of weather-network correlations
              </p>
            </div>
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-8 mb-8">
          <h2 className="mb-4">Key Features</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600">1</span>
              </div>
              <div>
                <h3 className="mb-1">Real-time Issue Reporting</h3>
                <p className="text-sm text-gray-600">
                  Users can quickly report network issues with detailed information about signal strength,
                  network type, and specific problems encountered.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600">2</span>
              </div>
              <div>
                <h3 className="mb-1">Weather Correlation Analysis</h3>
                <p className="text-sm text-gray-600">
                  Each report can include weather conditions, enabling comprehensive analysis of how
                  different weather patterns affect network performance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600">3</span>
              </div>
              <div>
                <h3 className="mb-1">Gamification System</h3>
                <p className="text-sm text-gray-600">
                  Users earn points and badges for contributing reports, with a leaderboard system
                  that encourages consistent participation and data quality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600">4</span>
              </div>
              <div>
                <h3 className="mb-1">Comprehensive Analytics Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Admin dashboard provides visualizations of network issues over time, by provider,
                  weather conditions, and geographic location.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600">5</span>
              </div>
              <div>
                <h3 className="mb-1">Future AI Integration</h3>
                <p className="text-sm text-gray-600">
                  Planned machine learning models will predict network outages based on weather forecasts
                  and historical patterns, enabling proactive infrastructure management.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="p-8 mb-8">
          <h2 className="mb-4">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  React with TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Tailwind CSS for styling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Shadcn UI components
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Recharts for data visualization
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3">Planned Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Backend API integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Weather API integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Machine learning models
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Real-time notifications
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Developer Info */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="mb-2">Developed By</h2>
            <p className="mb-6">Shaik Nagur Basha</p>
            <p className="text-blue-100 mb-6 text-sm">
              This project demonstrates the integration of data collection, analytics, and gamification
              to solve real-world problems in network infrastructure and weather impact analysis.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" className="gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button variant="secondary" className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="secondary" className="gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="mb-4">Ready to Contribute?</h2>
          <p className="text-gray-600 mb-6">
            Join our community of contributors and help us improve network connectivity for everyone.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('login')} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => onNavigate('admin')} 
              variant="outline"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 NetPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
