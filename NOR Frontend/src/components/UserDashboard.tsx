import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Signal, Award, Trophy, CloudRain, Sun, Zap, ArrowLeft, User } from "lucide-react";
import { SpeedTestMeter } from "./SpeedTestMeter";

interface Report {
  id: number;
  provider: string;
  issueType: string;
  location: string;
  timestamp: string;
}

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: string;
}

interface UserDashboardProps {
  onNavigate: (page: string) => void;
  user: { name: string; email: string; location: string } | null;
  userReports: Report[];
  onLogout: () => void;
  onSpeedTestComplete?: (result: SpeedTestResult) => void;
}

const badges = [
  { id: 'first-report', name: 'First Report', icon: '🌱', description: 'Submitted your first report', earned: true },
  { id: 'consistent', name: 'Consistent Reporter', icon: '⚡', description: 'Submitted 5+ reports', earned: true },
  { id: 'weather-watcher', name: 'Weather Watcher', icon: '☀️', description: 'Reported during different weather conditions', earned: true },
  { id: 'network-guru', name: 'Network Guru', icon: '📡', description: 'Submitted 20+ reports', earned: false },
  { id: 'community-star', name: 'Community Star', icon: '⭐', description: 'Top 10 contributor', earned: false },
];

const leaderboard = [
  { rank: 1, name: 'Sarah Johnson', points: 850, reports: 85 },
  { rank: 2, name: 'Mike Chen', points: 720, reports: 72 },
  { rank: 3, name: 'Emma Davis', points: 680, reports: 68 },
  { rank: 4, name: 'Alex Kumar', points: 560, reports: 56 },
  { rank: 5, name: 'John Doe', points: 450, reports: 45 },
];

export function UserDashboard({ onNavigate, user, userReports, onLogout, onSpeedTestComplete }: UserDashboardProps) {
  const userPoints = userReports.length * 10;
  const earnedBadges = badges.filter(b => b.earned);
  const nextLevel = Math.ceil(userPoints / 100) * 100;
  const progressToNextLevel = ((userPoints % 100) / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => onNavigate('home')} 
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              <Signal className="w-6 h-6 text-blue-600" />
              <span className="text-blue-600">NetPulse</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => onNavigate('report')} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Report Issue
            </Button>
            <Button onClick={onLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Badges */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mb-1">{user?.name || 'User'}</h2>
                <p className="text-gray-600 text-sm mb-4">{user?.location}</p>
                
                <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">Total Points</span>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="mb-1">{userPoints}</div>
                  <Progress value={progressToNextLevel} className="h-2 bg-white/20" />
                  <p className="text-xs mt-2 opacity-90">{nextLevel - userPoints} points to next level</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-blue-600 mb-1">{userReports.length}</div>
                    <p className="text-xs text-gray-600">Reports</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-purple-600 mb-1">{earnedBadges.length}</div>
                    <p className="text-xs text-gray-600">Badges</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-purple-600" />
                <h3>Badges Earned</h3>
              </div>
              <div className="space-y-3">
                {badges.map(badge => (
                  <div 
                    key={badge.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      badge.earned ? 'bg-purple-50' : 'bg-gray-50 opacity-50'
                    }`}
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <p className={badge.earned ? 'text-gray-900' : 'text-gray-500'}>{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                    {badge.earned && (
                      <Badge className="bg-purple-600">Earned</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Reports & Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Reports */}
            <Card className="p-6">
              <h2 className="mb-4">Recent Reports</h2>
              {userReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Signal className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No reports yet. Start reporting network issues!</p>
                  <Button 
                    onClick={() => onNavigate('report')} 
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Your First Report
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userReports.slice(0, 5).map(report => (
                    <div key={report.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Signal className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{report.issueType.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
                        <p className="text-sm text-gray-600 truncate">{report.location} • {report.provider}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500 flex-shrink-0">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">+10 pts</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Leaderboard and Speed Test */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <h2>Community Leaderboard</h2>
                </div>
                <div className="space-y-2">
                  {leaderboard.map(entry => (
                    <div 
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        entry.name === user?.name ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        entry.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <p className="flex items-center gap-2">
                          {entry.name}
                          {entry.name === user?.name && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </p>
                        <p className="text-sm text-gray-600">{entry.reports} reports</p>
                      </div>
                      <div className="text-blue-600">{entry.points} pts</div>
                    </div>
                  ))}
                </div>
              </Card>

              <SpeedTestMeter onTestComplete={onSpeedTestComplete} />
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('report')}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Signal className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3>Report Issue</h3>
                    <p className="text-sm text-gray-600">Submit a new network report</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('admin')}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3>View Analytics</h3>
                    <p className="text-sm text-gray-600">See all community reports</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
