import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Signal, ArrowLeft, Download, TrendingUp, Users, CloudRain, BarChart3, LogOut } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface Report {
  id: number;
  provider: string;
  signalStrength: string;
  networkType: string;
  issueType: string;
  location: string;
  weather: string;
  timestamp: string;
  userName: string;
}

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  allReports: Report[];
  onLogout: () => void;
}

// Mock data for charts
const reportsOverTime = [
  { date: 'Oct 15', reports: 12 },
  { date: 'Oct 16', reports: 19 },
  { date: 'Oct 17', reports: 15 },
  { date: 'Oct 18', reports: 25 },
  { date: 'Oct 19', reports: 22 },
  { date: 'Oct 20', reports: 30 },
  { date: 'Oct 21', reports: 28 },
  { date: 'Oct 22', reports: 35 },
];

const providerData = [
  { name: 'Airtel', value: 30, color: '#ef4444' },
  { name: 'Jio', value: 25, color: '#3b82f6' },
  { name: 'Verizon', value: 20, color: '#10b981' },
  { name: 'T-Mobile', value: 15, color: '#f59e0b' },
  { name: 'AT&T', value: 10, color: '#8b5cf6' },
];

const issueTypeData = [
  { type: 'Call Drop', count: 45 },
  { type: 'No Signal', count: 38 },
  { type: 'Slow Internet', count: 52 },
  { type: 'Intermittent', count: 28 },
];

const weatherImpact = [
  { weather: 'Sunny', reports: 25, avgSignal: 4.2 },
  { weather: 'Cloudy', reports: 30, avgSignal: 3.8 },
  { weather: 'Rainy', reports: 45, avgSignal: 2.5 },
  { weather: 'Stormy', reports: 35, avgSignal: 1.8 },
];

export function AdminDashboard({ onNavigate, allReports, onLogout }: AdminDashboardProps) {
  const [filterProvider, setFilterProvider] = useState("all");
  const [filterWeather, setFilterWeather] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const totalReports = allReports.length || 186;
  const uniqueUsers = 342;
  const avgResponseTime = "2.3 hrs";

  const handleDownloadCSV = () => {
    const csvContent = [
      ['ID', 'Date', 'Provider', 'Signal', 'Network Type', 'Issue Type', 'Location', 'Weather', 'User'],
      ...allReports.map(r => [
        r.id,
        new Date(r.timestamp).toLocaleString(),
        r.provider,
        r.signalStrength,
        r.networkType,
        r.issueType,
        r.location,
        r.weather || 'N/A',
        r.userName
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `netpulse-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("CSV downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.header 
        className="bg-white border-b"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => onNavigate('home')} 
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Signal className="w-6 h-6 text-blue-600" />
              <span className="text-blue-600">NetPulse Admin</span>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleDownloadCSV}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
            </motion.div>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor network performance and analyze weather correlations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Reports', value: totalReports, trend: '↑ 12% from last week', icon: BarChart3, color: 'blue', delay: 0.1 },
            { label: 'Active Users', value: uniqueUsers, trend: '↑ 8% from last week', icon: Users, color: 'purple', delay: 0.2 },
            { label: 'Weather Reports', value: 124, trend: '67% include weather data', icon: CloudRain, color: 'green', delay: 0.3 },
            { label: 'Avg Response', value: avgResponseTime, trend: '↓ 15% faster', icon: TrendingUp, color: 'orange', delay: 0.4 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 transition-shadow hover:shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600">{stat.label}</p>
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
                <div className={`text-${stat.color}-600 mb-1`}>{stat.value}</div>
                <p className="text-sm text-gray-500">{stat.trend}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <h3 className="mb-4">Filters</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Network Provider</label>
              <Select value={filterProvider} onValueChange={setFilterProvider}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="airtel">Airtel</SelectItem>
                  <SelectItem value="jio">Jio</SelectItem>
                  <SelectItem value="verizon">Verizon</SelectItem>
                  <SelectItem value="tmobile">T-Mobile</SelectItem>
                  <SelectItem value="att">AT&T</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Weather Type</label>
              <Select value={filterWeather} onValueChange={setFilterWeather}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Weather</SelectItem>
                  <SelectItem value="sunny">Sunny</SelectItem>
                  <SelectItem value="cloudy">Cloudy</SelectItem>
                  <SelectItem value="rainy">Rainy</SelectItem>
                  <SelectItem value="stormy">Stormy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">City</label>
              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="newark">Newark, NJ</SelectItem>
                  <SelectItem value="nyc">New York, NY</SelectItem>
                  <SelectItem value="jersey">Jersey City, NJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="mb-4">Reports Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Reports by Provider</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={providerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {providerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Issue Types Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={issueTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Weather Impact Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weatherImpact}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weather" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="reports" fill="#3b82f6" name="Reports" />
                <Bar yAxisId="right" dataKey="avgSignal" fill="#10b981" name="Avg Signal" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Future AI Analysis */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3>Future AI Analysis Results</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Advanced machine learning models will be integrated here to predict network issues based on weather patterns,
            time of day, and historical data. This section will display:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Predictive alerts for network outages
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Weather-based network performance forecasting
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Correlation coefficients and statistical insights
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Recommended actions for network providers
            </li>
          </ul>
        </Card>

        {/* Recent Reports Table */}
        <Card className="p-6">
          <h3 className="mb-4">Recent Reports</h3>
          {allReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No reports yet. Data will appear here as users submit reports.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Weather</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allReports.slice(0, 10).map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{report.userName}</TableCell>
                      <TableCell className="capitalize">{report.provider}</TableCell>
                      <TableCell className="capitalize">{report.issueType.replace('-', ' ')}</TableCell>
                      <TableCell>{report.signalStrength} bars</TableCell>
                      <TableCell>{report.location}</TableCell>
                      <TableCell className="capitalize">{report.weather || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
