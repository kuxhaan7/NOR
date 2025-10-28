import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Signal, TrendingUp, Award, Cloud, Shield } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
}

export function LandingPage({ onNavigate, isAdmin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <motion.header 
        className="container mx-auto px-4 py-6 flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Signal className="w-8 h-8 text-blue-600" />
          </motion.div>
          <span className="text-blue-600">NetPulse</span>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button 
              onClick={() => onNavigate('admin')} 
              variant="outline"
              className="gap-2"
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Button>
          )}
          <Button onClick={() => onNavigate('login')} variant="outline">
            Login
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-blue-600 mb-6">
            Report Your Network Problem,<br />Help Improve Connectivity!
          </h1>
          <p className="text-gray-600 mb-8">
            Your reports help us analyze weather impact on mobile networks.
            Join our community and contribute to better connectivity for everyone.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => onNavigate('report')} 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Report Issue
              </Button>
            </motion.div>
            {isAdmin && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => onNavigate('admin')} 
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Signal, color: 'blue', title: 'Track Network Issues', desc: 'Report signal strength, call drops, and connectivity problems in real-time.', delay: 0.3 },
            { icon: Cloud, color: 'green', title: 'Weather Correlation', desc: 'Help us understand how weather conditions affect network performance.', delay: 0.4 },
            { icon: Award, color: 'purple', title: 'Earn Rewards', desc: 'Get points and badges for contributing reports and climb the leaderboard.', delay: 0.5 }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center h-full transition-shadow hover:shadow-lg">
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-16 bg-blue-600 rounded-lg p-8 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span>1,247</span>
              </div>
              <p className="text-blue-100 text-sm">Reports Submitted</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Signal className="w-5 h-5" />
                <span>342</span>
              </div>
              <p className="text-blue-100 text-sm">Active Contributors</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cloud className="w-5 h-5" />
                <span>89%</span>
              </div>
              <p className="text-blue-100 text-sm">Weather Correlation Accuracy</p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Copyright NOR 2025</p>
          <Button 
            onClick={() => onNavigate('about')} 
            variant="link"
            className="text-blue-600"
          >
            Learn More
          </Button>
        </div>
      </footer>
    </div>
  );
}
