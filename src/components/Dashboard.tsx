import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Brain, 
  FileText, 
  History, 
  Settings,
  Menu,
  X,
  Activity,
  Zap,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import ScanUpload from './dashboard/ScanUpload';
import PastReports from './dashboard/PastReports';
import DiagnosisResults from './dashboard/DiagnosisResults';
import Analytics from './dashboard/Analytics';
import PatientManagement from './dashboard/PatientManagement';
import SecuritySettings from './dashboard/SecuritySettings';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Upload Scan', href: '/dashboard', icon: Upload, exact: true },
    { name: 'Diagnosis Results', href: '/dashboard/results', icon: Brain },
    { name: 'Past Reports', href: '/dashboard/reports', icon: History },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Patients', href: '/dashboard/patients', icon: Users },
    { name: 'Security', href: '/dashboard/security', icon: Shield },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActiveRoute = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              MediScan AI
            </span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 group
                  ${isActiveRoute(item.href, item.exact)
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }
                `}
              >
                <item.icon className={`
                  w-5 h-5 mr-3 transition-colors
                  ${isActiveRoute(item.href, item.exact)
                    ? 'text-white'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                  }
                `} />
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <div className="flex items-center mb-2">
              <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mr-2" />
              <span className="text-sm font-medium text-cyan-900 dark:text-cyan-100">Pro Plan</span>
            </div>
            <p className="text-xs text-cyan-700 dark:text-cyan-300 mb-3">
              Unlimited scans • Priority support
            </p>
            <button className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-4 shadow-sm">
          <button
            type="button"
            className="p-2.5 text-slate-700 dark:text-slate-300 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                Medical Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<ScanUpload />} />
              <Route path="/results" element={<DiagnosisResults />} />
              <Route path="/reports" element={<PastReports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/security" element={<SecuritySettings />} />
              <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Settings</h2><p className="text-slate-600 dark:text-slate-400">Settings page coming soon...</p></div>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;