import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { ReportIssuePage } from "./components/ReportIssuePage";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { AboutPage } from "./components/AboutPage";

type Page = 'home' | 'login' | 'adminLogin' | 'report' | 'dashboard' | 'admin' | 'about';

interface User {
  name: string;
  email: string;
  location: string;
  isAdmin?: boolean;
}

interface Report {
  id: number;
  provider: string;
  signalStrength: string;
  networkType: string;
  issueType: string;
  location: string;
  weather: string;
  comments: string;
  timestamp: string;
  userName: string;
}

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [speedTestResult, setSpeedTestResult] = useState<SpeedTestResult | null>(null);

  const handleNavigate = (page: Page) => {
    // Admin dashboard requires admin login
    if (page === 'admin' && (!user || !user.isAdmin)) {
      setCurrentPage('adminLogin');
      return;
    }
    // If trying to access protected pages without login, redirect to login
    if ((page === 'dashboard' || page === 'report') && !user) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleSubmitReport = (report: Report) => {
    setAllReports(prev => [report, ...prev]);
  };

  const handleSpeedTestComplete = (result: SpeedTestResult) => {
    setSpeedTestResult(result);
  };

  const userReports = allReports.filter(report => report.userName === user?.name);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LandingPage onNavigate={handleNavigate} isAdmin={user?.isAdmin} />
          </motion.div>
        )}
        
        {currentPage === 'login' && (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} isAdminLogin={false} />
          </motion.div>
        )}
        
        {currentPage === 'adminLogin' && (
          <motion.div
            key="adminLogin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} isAdminLogin={true} />
          </motion.div>
        )}
        
        {currentPage === 'report' && (
          <motion.div
            key="report"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ReportIssuePage 
              onNavigate={handleNavigate} 
              onSubmitReport={handleSubmitReport}
              user={user}
              speedTestResult={speedTestResult}
            />
          </motion.div>
        )}
        
        {currentPage === 'dashboard' && (
          <motion.div
            key="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <UserDashboard 
              onNavigate={handleNavigate}
              user={user}
              userReports={userReports}
              onLogout={handleLogout}
              onSpeedTestComplete={handleSpeedTestComplete}
            />
          </motion.div>
        )}
        
        {currentPage === 'admin' && (
          <motion.div
            key="admin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <AdminDashboard 
              onNavigate={handleNavigate}
              allReports={allReports}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
        
        {currentPage === 'about' && (
          <motion.div
            key="about"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <AboutPage onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </>
  );
}
