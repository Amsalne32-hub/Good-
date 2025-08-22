import React from 'react';
import { Button } from './ui/Button';
import { LogOut, User, Shield, BookOpen, Sparkles, Store, Star, Trophy, Compass, Users, Library, ClipboardCheck } from 'lucide-react';
import type { StudentProfile } from '../types';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface NavbarProps {
  navType: 'student' | 'teacher' | 'general' | 'store' | 'profile' | 'arena' | 'compass' | 'groups' | 'eLibrary' | 'cbtCenter';
  onNavigate: (view: 'studentDashboard' | 'teacherDashboard' | 'generalKnowledge' | 'store' | 'profile' | 'studyArena' | 'careerCompass' | 'studyGroups' | 'eLibrary' | 'cbtCenter') => void;
  onExit: () => void;
  studentProfile: StudentProfile;
}

const Navbar: React.FC<NavbarProps> = ({ navType, onNavigate, onExit, studentProfile }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
            <button onClick={() => navType === 'student' ? onNavigate('studentDashboard') : onExit()} className="flex items-center gap-2 text-xl font-bold text-gray-900">
               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <BookOpen className="w-6 h-6"/>
               </div>
               <span className="hidden sm:inline">Synapse</span>
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
               <Button variant={navType === 'student' ? 'secondary' : 'ghost'} onClick={() => onNavigate('studentDashboard')}>
                 <BookOpen className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Journey</span>
               </Button>
               <Button variant={navType === 'eLibrary' ? 'secondary' : 'ghost'} onClick={() => onNavigate('eLibrary')}>
                 <Library className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">E-Library</span>
               </Button>
                <Button variant={navType === 'cbtCenter' ? 'secondary' : 'ghost'} onClick={() => onNavigate('cbtCenter')}>
                 <ClipboardCheck className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">CBT Center</span>
               </Button>
               <Button variant={navType === 'profile' ? 'secondary' : 'ghost'} onClick={() => onNavigate('profile')}>
                 <User className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Profile</span>
               </Button>
               <Button variant={navType === 'groups' ? 'secondary' : 'ghost'} onClick={() => onNavigate('studyGroups')}>
                 <Users className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Groups</span>
               </Button>
                <Button variant={navType === 'arena' ? 'secondary' : 'ghost'} onClick={() => onNavigate('studyArena')}>
                 <Trophy className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Arena</span>
               </Button>
               <Button variant={navType === 'compass' ? 'secondary' : 'ghost'} onClick={() => onNavigate('careerCompass')}>
                 <Compass className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Compass</span>
               </Button>
               <Button variant={navType === 'general' ? 'secondary' : 'ghost'} onClick={() => onNavigate('generalKnowledge')}>
                 <Sparkles className="w-4 h-4 mr-0 sm:mr-2"/>
                 <span className="hidden sm:inline">Knowledge</span>
               </Button>
                <Button variant={navType === 'teacher' ? 'secondary' : 'ghost'} onClick={() => onNavigate('teacherDashboard')}>
                 <Shield className="w-4 h-4 mr-0 sm:mr-2" />
                 <span className="hidden sm:inline">Teacher</span>
               </Button>

               <div className="h-6 w-px bg-slate-200 mx-1 sm:mx-2"></div>

                <Button variant={navType === 'store' ? 'secondary' : 'ghost'} onClick={() => onNavigate('store')} className="flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    <span className="hidden sm:inline">Store</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        <Star className="w-3 h-3 fill-current"/>
                        {studentProfile.questPoints}
                    </div>
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
  navType: 'student' | 'teacher' | 'general' | 'store' | 'profile' | 'arena' | 'compass' | 'groups' | 'eLibrary' | 'cbtCenter';
  onNavigate: (view: 'studentDashboard' | 'teacherDashboard' | 'generalKnowledge' | 'store' | 'profile' | 'studyArena' | 'careerCompass' | 'studyGroups' | 'eLibrary' | 'cbtCenter') => void;
  onExit: () => void;
  studentProfile: StudentProfile;
}

const Layout: React.FC<LayoutProps> = ({ children, navType, onNavigate, onExit, studentProfile }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar navType={navType} onNavigate={onNavigate} onExit={onExit} studentProfile={studentProfile} />
      <div className="transition-colors duration-500">
        {children}
      </div>
    </div>
  );
};

export default Layout;