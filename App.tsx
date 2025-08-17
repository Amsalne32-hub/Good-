import React, { useState } from 'react';
import type { Subject, Assessment, Coursework } from './types';
import { subjects } from './data/subjects';
import LandingPage from './components/LandingPage';
import SubjectsDashboard from './components/Dashboard';
import SubjectDetail from './components/SubjectDetail';
import AssessmentComponent from './components/Assessment';
import CourseworkComponent from './components/Coursework';
import TeacherDashboard from './components/TeacherDashboard';
import GeneralKnowledge from './components/GeneralKnowledge';
import { getAssessmentById } from './data/assessments';
import { getCourseworkById } from './coursework';
import Layout from './components/Layout';
import AiAssistant from './components/AiAssistant';

type View = 'landing' | 'studentDashboard' | 'teacherDashboard' | 'subject' | 'assessment' | 'coursework' | 'generalKnowledge';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [activeCoursework, setActiveCoursework] = useState<Coursework | null>(null);
  const [generalKnowledgeSubject, setGeneralKnowledgeSubject] = useState<Subject | null>(null);

  const handleEnterStudentDashboard = () => {
    setView('studentDashboard');
  };
  
  const handleEnterTeacherDashboard = () => {
      setView('teacherDashboard');
  }

  const handleEnterGeneralKnowledge = () => {
    const gkSubject = subjects.find(s => s.level === 'General');
    if (gkSubject) {
      setGeneralKnowledgeSubject(gkSubject);
      setView('generalKnowledge');
    }
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('subject');
  };
  
  const handleNavigate = (targetView: 'studentDashboard' | 'teacherDashboard' | 'generalKnowledge') => {
    setSelectedSubject(null);
    setActiveAssessment(null);
    setActiveCoursework(null);
    if (targetView === 'generalKnowledge') {
      handleEnterGeneralKnowledge();
    } else {
      setGeneralKnowledgeSubject(null);
      setView(targetView);
    }
  };

  const handleExitToLanding = () => {
    setView('landing');
    setSelectedSubject(null);
    setActiveAssessment(null);
    setActiveCoursework(null);
    setGeneralKnowledgeSubject(null);
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
      case 'generalKnowledge':
        if (generalKnowledgeSubject) {
            return <GeneralKnowledge subject={generalKnowledgeSubject} />;
        }
        return null;

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
        return <LandingPage onEnterDashboard={handleEnterStudentDashboard} onEnterTeacherDashboard={handleEnterTeacherDashboard} onEnterGeneralKnowledge={handleEnterGeneralKnowledge} />;
    }
  };

  const isNavigableView = ['studentDashboard', 'teacherDashboard', 'subject', 'generalKnowledge'].includes(view);
  
  let navType: 'student' | 'teacher' | 'general' = 'student';
  if (view === 'teacherDashboard') navType = 'teacher';
  if (view === 'generalKnowledge') navType = 'general';


  return (
    <div className="font-sans bg-background text-foreground">
      {isNavigableView ? (
        <Layout
          navType={navType}
          onNavigate={handleNavigate}
          onExit={handleExitToLanding}
        >
          {renderContent()}
        </Layout>
      ) : (
        renderContent()
      )}
      <AiAssistant />
    </div>
  );
};

export default App;