import React from 'react';
import { Button } from './ui/Button';
import { LogOut, User, Shield, BookOpen, Sparkles } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface NavbarProps {
  navType: 'student' | 'teacher' | 'general';
  onNavigate: (view: 'studentDashboard' | 'teacherDashboard' | 'generalKnowledge') => void;
  onExit: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ navType, onNavigate, onExit }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
            <button onClick={() => navType === 'student' ? onNavigate('studentDashboard') : onExit()} className="flex items-center gap-2 text-xl font-bold text-gray-900">
               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <BookOpen className="w-6 h-6"/>
               </div>
               <span className="hidden sm:inline">EduNigeria</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-4">
               <Button variant={navType === 'student' ? 'secondary' : 'ghost'} onClick={() => onNavigate('studentDashboard')}>
                 <User className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Student</span>
               </Button>
               <Button variant={navType === 'general' ? 'secondary' : 'ghost'} onClick={() => onNavigate('generalKnowledge')}>
                 <Sparkles className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Knowledge</span>
               </Button>
                <Button variant={navType === 'teacher' ? 'secondary' : 'ghost'} onClick={() => onNavigate('teacherDashboard')}>
                 <Shield className="w-4 h-4 mr-0 sm:mr-2" />
                 <span className="hidden sm:inline">Teacher</span>
               </Button>
               <Button variant="outline" onClick={onExit} className="ml-2">
                 <LogOut className="w-4 h-4 mr-0 sm:mr-2"/> 
                 <span className="hidden sm:inline">Exit</span>
               </Button>
            </div>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  navType: 'student' | 'teacher' | 'general';
  onNavigate: (view: 'studentDashboard' | 'teacherDashboard' | 'generalKnowledge') => void;
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