import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Gauge, Wifi, Download, Upload, RotateCw } from "lucide-react";
import { motion } from "motion/react";

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: string;
}

interface SpeedTestMeterProps {
  onTestComplete?: (result: SpeedTestResult) => void;
}

export function SpeedTestMeter({ onTestComplete }: SpeedTestMeterProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState<"download" | "upload" | "ping" | null>(null);
  const [result, setResult] = useState<SpeedTestResult | null>(null);

  const runSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Simulate ping test
    setCurrentTest("ping");
    await simulateProgress(0, 30);

    // Simulate download test
    setCurrentTest("download");
    await simulateProgress(30, 60);

    // Simulate upload test
    setCurrentTest("upload");
    await simulateProgress(60, 100);

    // Generate random but realistic speed test results
    const testResult: SpeedTestResult = {
      downloadSpeed: Math.floor(Math.random() * 80) + 20, // 20-100 Mbps
      uploadSpeed: Math.floor(Math.random() * 40) + 10, // 10-50 Mbps
      ping: Math.floor(Math.random() * 30) + 10, // 10-40 ms
      timestamp: new Date().toISOString(),
    };

    setResult(testResult);
    setCurrentTest(null);
    setIsRunning(false);
    
    if (onTestComplete) {
      onTestComplete(testResult);
    }
  };

  const simulateProgress = (start: number, end: number) => {
    return new Promise<void>((resolve) => {
      let current = start;
      const interval = setInterval(() => {
        current += 2;
        setProgress(current);
        if (current >= end) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  const getSpeedColor = (speed: number, isDownload: boolean) => {
    const threshold = isDownload ? 50 : 25;
    if (speed >= threshold) return "text-green-600";
    if (speed >= threshold / 2) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="w-5 h-5 text-blue-600" />
        <h2>Network Speed Test</h2>
      </div>

      {!result && !isRunning && (
        <div className="text-center py-8">
          <motion.div
            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Wifi className="w-10 h-10 text-blue-600" />
          </motion.div>
          <p className="text-gray-600 mb-4">Test your network speed</p>
          <Button
            onClick={runSpeedTest}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Speed Test
          </Button>
        </div>
      )}

      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="text-center">
            <motion.div
              className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Wifi className="w-12 h-12 text-blue-600" />
            </motion.div>
            <p className="text-gray-700 mb-2">
              {currentTest === "ping" && "Testing connection..."}
              {currentTest === "download" && "Testing download speed..."}
              {currentTest === "upload" && "Testing upload speed..."}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-gray-500">{Math.round(progress)}%</p>
        </motion.div>
      )}

      {result && !isRunning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </div>
              <div className={`text-2xl ${getSpeedColor(result.downloadSpeed, true)}`}>
                {result.downloadSpeed}
              </div>
              <p className="text-sm text-gray-600">Mbps</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </div>
              <div className={`text-2xl ${getSpeedColor(result.uploadSpeed, false)}`}>
                {result.uploadSpeed}
              </div>
              <p className="text-sm text-gray-600">Mbps</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ping</p>
                <div className="text-xl text-green-700">{result.ping} ms</div>
              </div>
              <Wifi className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">
              Tested at {new Date(result.timestamp).toLocaleTimeString()}
            </p>
          </div>

          <Button
            onClick={runSpeedTest}
            variant="outline"
            className="w-full gap-2"
          >
            <RotateCw className="w-4 h-4" />
            Test Again
          </Button>
        </motion.div>
      )}
    </Card>
  );
}
