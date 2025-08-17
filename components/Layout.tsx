import React from 'react';
import { Button } from './ui/Button';
import { LogOut, User, Shield, BookOpen } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface NavbarProps {
  navType: 'student' | 'teacher';
  onNavigate: (view: 'studentDashboard' | 'teacherDashboard') => void;
  onExit: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ navType, onNavigate, onExit }) => {
  const isStudent = navType === 'student';
  const dashboardTarget = isStudent ? 'studentDashboard' : 'teacherDashboard';
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
            <button onClick={() => onNavigate(dashboardTarget)} className="flex items-center gap-2 text-xl font-bold text-gray-900">
               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <BookOpen className="w-6 h-6"/>
               </div>
               <span className="hidden sm:inline">EduNigeria</span>
            </button>
            <div className="flex items-center gap-4">
               <Button variant="ghost" onClick={() => onNavigate(dashboardTarget)}>
                 {isStudent ? <User className="w-4 h-4 mr-2"/> : <Shield className="w-4 h-4 mr-2" />}
                 {isStudent ? 'Student Dashboard' : 'Teacher Portal'}
               </Button>
               <Button variant="outline" onClick={onExit}>
                 <LogOut className="w-4 h-4 mr-2"/> Exit
               </Button>
            </div>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  navType: 'student' | 'teacher';
  onNavigate: (view: 'studentDashboard' | 'teacherDashboard') => void;
  onExit: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, navType, onNavigate, onExit }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar navType={navType} onNavigate={onNavigate} onExit={onExit} />
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
