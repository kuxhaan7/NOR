import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Signal, ArrowLeft, CheckCircle, Download, Upload, Gauge } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: string;
}

interface ReportIssuePageProps {
  onNavigate: (page: string) => void;
  onSubmitReport: (report: any) => void;
  user: { name: string; email: string; location: string } | null;
  speedTestResult?: SpeedTestResult | null;
}

export function ReportIssuePage({ onNavigate, onSubmitReport, user, speedTestResult }: ReportIssuePageProps) {
  const [provider, setProvider] = useState("");
  const [signalStrength, setSignalStrength] = useState("");
  const [networkType, setNetworkType] = useState("");
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState(user?.location || "");
  const [weather, setWeather] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-populate issue type based on speed test results
  useEffect(() => {
    if (speedTestResult && !issueType) {
      if (speedTestResult.downloadSpeed < 10 || speedTestResult.uploadSpeed < 5) {
        setIssueType("slow-internet");
      }
    }
  }, [speedTestResult]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const report = {
      id: Date.now(),
      provider,
      signalStrength,
      networkType,
      issueType,
      location,
      weather,
      comments,
      timestamp: new Date().toISOString(),
      userName: user?.name || "Anonymous",
      downloadSpeed: speedTestResult?.downloadSpeed,
      uploadSpeed: speedTestResult?.uploadSpeed,
      ping: speedTestResult?.ping,
    };

    onSubmitReport(report);
    setSubmitted(true);
    toast.success("Report submitted successfully! You earned 10 points!");

    // Reset form after 3 seconds and navigate to dashboard
    setTimeout(() => {
      setSubmitted(false);
      onNavigate('dashboard');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Card className="p-8 max-w-md text-center">
            <motion.div 
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-green-600 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">Your report has been submitted successfully.</p>
            <motion.div 
              className="bg-blue-50 p-4 rounded-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-blue-600">🎉 You earned 10 points!</p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.header 
        className="container mx-auto px-4 py-6 flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          onClick={() => onNavigate('home')} 
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Signal className="w-6 h-6 text-blue-600" />
          <span className="text-blue-600">NetPulse</span>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-gray-900 mb-2">Report Network Issue</h1>
          <p className="text-gray-600">Help us improve connectivity by reporting your network problems</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Speed Test Results Display */}
            {speedTestResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">Speed Test Results</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Download className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <div className="text-blue-600">{speedTestResult.downloadSpeed} Mbps</div>
                    <p className="text-xs text-gray-600">Download</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Upload className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                    <div className="text-purple-600">{speedTestResult.uploadSpeed} Mbps</div>
                    <p className="text-xs text-gray-600">Upload</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Signal className="w-4 h-4 mx-auto mb-1 text-green-600" />
                    <div className="text-green-600">{speedTestResult.ping} ms</div>
                    <p className="text-xs text-gray-600">Ping</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Tested at {new Date(speedTestResult.timestamp).toLocaleTimeString()}
                </p>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="provider">Network Provider *</Label>
                <Select value={provider} onValueChange={setProvider} required>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airtel">Airtel</SelectItem>
                    <SelectItem value="jio">Jio</SelectItem>
                    <SelectItem value="verizon">Verizon</SelectItem>
                    <SelectItem value="tmobile">T-Mobile</SelectItem>
                    <SelectItem value="att">AT&T</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="signal">Signal Strength *</Label>
                <Select value={signalStrength} onValueChange={setSignalStrength} required>
                  <SelectTrigger id="signal">
                    <SelectValue placeholder="Select strength" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bar (Very Weak)</SelectItem>
                    <SelectItem value="2">2 Bars (Weak)</SelectItem>
                    <SelectItem value="3">3 Bars (Moderate)</SelectItem>
                    <SelectItem value="4">4 Bars (Good)</SelectItem>
                    <SelectItem value="5">5 Bars (Excellent)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="network-type">Network Type *</Label>
                <Select value={networkType} onValueChange={setNetworkType} required>
                  <SelectTrigger id="network-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4g">4G</SelectItem>
                    <SelectItem value="5g">5G</SelectItem>
                    <SelectItem value="3g">3G</SelectItem>
                    <SelectItem value="lte">LTE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="issue-type">Issue Type *</Label>
                <Select value={issueType} onValueChange={setIssueType} required>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder="Select issue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call-drop">Call Drop</SelectItem>
                    <SelectItem value="no-signal">No Signal</SelectItem>
                    <SelectItem value="slow-internet">Slow Internet</SelectItem>
                    <SelectItem value="intermittent">Intermittent Connection</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                type="text"
                placeholder="Newark, NJ"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="weather">Weather Conditions (Optional)</Label>
              <Select value={weather} onValueChange={setWeather}>
                <SelectTrigger id="weather">
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunny">Sunny</SelectItem>
                  <SelectItem value="cloudy">Cloudy</SelectItem>
                  <SelectItem value="rainy">Rainy</SelectItem>
                  <SelectItem value="stormy">Stormy</SelectItem>
                  <SelectItem value="snowy">Snowy</SelectItem>
                  <SelectItem value="foggy">Foggy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comments">Additional Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Describe the issue in more detail..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
              <p><strong>Time of Issue:</strong> {new Date().toLocaleString()}</p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Submit Report
              </Button>
            </motion.div>
          </form>
        </Card>
        </motion.div>
      </main>
    </div>
  );
}
