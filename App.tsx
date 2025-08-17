import React, { useState } from 'react';
import type { Subject, Assessment, Coursework } from './types';
import LandingPage from './components/LandingPage';
import SubjectsDashboard from './components/Dashboard';
import SubjectDetail from './components/SubjectDetail';
import AssessmentComponent from './components/Assessment';
import CourseworkComponent from './components/Coursework';
import TeacherDashboard from './components/TeacherDashboard';
import { getAssessmentById } from './data/assessments';
import { getCourseworkById } from './coursework';
import Layout from './components/Layout';

type View = 'landing' | 'studentDashboard' | 'teacherDashboard' | 'subject' | 'assessment' | 'coursework';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [activeCoursework, setActiveCoursework] = useState<Coursework | null>(null);

  const handleEnterStudentDashboard = () => {
    setView('studentDashboard');
  };
  
  const handleEnterTeacherDashboard = () => {
      setView('teacherDashboard');
  }

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('subject');
  };
  
  const handleNavigate = (targetView: 'studentDashboard' | 'teacherDashboard') => {
    setView(targetView);
    setSelectedSubject(null);
    setActiveAssessment(null);
    setActiveCoursework(null);
  };

  const handleExitToLanding = () => {
    setView('landing');
    setSelectedSubject(null);
    setActiveAssessment(null);
    setActiveCoursework(null);
  };

  const handleStartAssessment = (assessmentId: string) => {
    const assessment = getAssessmentById(assessmentId);
    if (assessment) {
      setActiveAssessment(assessment);
      setView('assessment');
    }
  };
  
  const handleAssessmentComplete = (score: number) => {
    // Here you would typically update the topic's score and completion status.
    // For this mock app, we'll just return to the subject detail view.
    console.log(`Assessment completed with score: ${score}`);
    setActiveAssessment(null);
    setView('subject');
  };
  
  const handleBackFromAssessment = () => {
      setActiveAssessment(null);
      setView('subject');
  };

  const handleStartCoursework = (courseworkId: string) => {
    const coursework = getCourseworkById(courseworkId);
    if (coursework) {
        setActiveCoursework(coursework);
        setView('coursework');
    }
  };

  const handleCourseworkComplete = () => {
    console.log(`Coursework submitted.`);
    setActiveCoursework(null);
    setView('subject');
  };

  const handleBackFromCoursework = () => {
    setActiveCoursework(null);
    setView('subject');
  };


  const renderContent = () => {
    switch (view) {
      case 'coursework':
        if(activeCoursework) {
            return (
                <CourseworkComponent
                    coursework={activeCoursework}
                    onBack={handleBackFromCoursework}
                    onComplete={handleCourseworkComplete}
                />
            );
        }
        return null;

      case 'assessment':
        if (activeAssessment) {
          return (
            <AssessmentComponent 
              assessment={activeAssessment} 
              onBack={handleBackFromAssessment}
              onComplete={handleAssessmentComplete} 
            />
          );
        }
        return null;

      case 'subject':
        if (selectedSubject) {
          return (
            <SubjectDetail 
              subject={selectedSubject} 
              onBack={() => handleNavigate('studentDashboard')} 
              onStartAssessment={handleStartAssessment} 
              onStartCoursework={handleStartCoursework}
            />
          );
        }
        return null;

      case 'studentDashboard':
        return <SubjectsDashboard onSubjectSelect={handleSubjectSelect} />;
        
      case 'teacherDashboard':
          return <TeacherDashboard />;
      
      case 'landing':
      default:
        return <LandingPage onEnterDashboard={handleEnterStudentDashboard} onEnterTeacherDashboard={handleEnterTeacherDashboard} />;
    }
  };

  const isNavigableView = ['studentDashboard', 'teacherDashboard', 'subject'].includes(view);

  if (!isNavigableView) {
      return <div className="font-sans bg-background text-foreground">{renderContent()}</div>;
  }

  return (
    <div className="font-sans bg-background text-foreground">
      <Layout
        navType={view === 'teacherDashboard' ? 'teacher' : 'student'}
        onNavigate={handleNavigate}
        onExit={handleExitToLanding}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;