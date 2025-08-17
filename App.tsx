import React, { useState, useEffect } from 'react';
import type { Subject, Assessment, Coursework, StudentProfile, StoreItem, Topic, Module, Unit } from './types';
import { subjects as initialSubjects } from './data/subjects';
import { storeItems, getItemById } from './data/storeItems';
import { achievementsData } from './data/achievements';
import LandingPage from './components/LandingPage';
import SubjectsDashboard from './components/Dashboard';
import SubjectDetail from './components/SubjectDetail';
import AssessmentComponent from './components/Assessment';
import CourseworkComponent from './components/Coursework';
import TeacherDashboard from './components/TeacherDashboard';
import GeneralKnowledge from './components/GeneralKnowledge';
import Store from './components/Store';
import Profile from './components/Profile';
import StudyArena from './components/StudyArena';
import CareerCompass from './components/CareerCompass';
import { getAssessmentById } from './data/assessments';
import { getCourseworkById } from './coursework';
import Layout from './components/Layout';
import AiAssistant from './components/AiAssistant';

type View = 'landing' | 'studentDashboard' | 'teacherDashboard' | 'subject' | 'assessment' | 'coursework' | 'generalKnowledge' | 'store' | 'profile' | 'studyArena' | 'careerCompass';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [activeCoursework, setActiveCoursework] = useState<Coursework | null>(null);
  
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: 'Bayo Adekunle',
    level: 1,
    xp: 0,
    questPoints: 0,
    inventory: ['theme-default'],
    equippedTheme: 'theme-default',
    equippedAvatarFrame: null,
    achievements: [],
  });

  useEffect(() => {
    // Calculate initial QP and completed topics from the static data
    let initialQP = 0;
    const updatedSubjects = subjects.map(subject => ({
      ...subject,
      units: subject.units.map(unit => ({
        ...unit,
        modules: subject.level === 'General' ? unit.modules.map(module => ({ ...module, topics: module.topics.map(topic => ({...topic, completed: false})) })) : unit.modules, // Ensure GK topics start uncompleted
      }))
    }));

    // This is a simplified way to apply initial state without persisting it
    const topicsToComplete = ['t1', 't2', 't4', 't9', 't-bs1'];
    
    updatedSubjects.forEach(subject => {
        subject.units.forEach(unit => {
            unit.modules.forEach(module => {
                module.topics.forEach(topic => {
                    if (topicsToComplete.includes(topic.id)) {
                        topic.completed = true;
                        initialQP += topic.questPoints || 0;
                    }
                });
            });
        });
    });

    setSubjects(updatedSubjects);
    setStudentProfile(prev => ({ ...prev, questPoints: initialQP }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-galaxy-bg', 'theme-sunset-bg', 'theme-jungle-bg');
    const equippedThemeItem = getItemById(studentProfile.equippedTheme || 'theme-default');
    if (equippedThemeItem && equippedThemeItem.asset) {
        document.body.classList.add(equippedThemeItem.asset);
    }
  }, [studentProfile.equippedTheme]);
  
  const handleTopicComplete = (topicId: string) => {
    let updatedSubjects = JSON.parse(JSON.stringify(subjects)); // Deep copy to ensure re-render
    let completedTopic: Topic | null = null;
    let topicParentModule: Module | null = null;
    let topicParentUnit: Unit | null = null;
    let topicParentSubject: Subject | null = null;

    for (const subject of updatedSubjects) {
        for (const unit of subject.units) {
            for (const module of unit.modules) {
                const topic = module.topics.find(t => t.id === topicId);
                if (topic && !topic.completed) {
                    topic.completed = true;
                    completedTopic = topic;
                    topicParentModule = module;
                    topicParentUnit = unit;
                    topicParentSubject = subject;
                    break;
                }
            }
            if (completedTopic) break;
        }
        if (completedTopic) break;
    }

    if (!completedTopic) return; 

    setSubjects(updatedSubjects);

    setStudentProfile(prev => {
        const newQP = prev.questPoints + (completedTopic?.questPoints || 10);
        const newXP = prev.xp + 25;
        const xpForNextLevel = prev.level * 100;
        
        let newLevel = prev.level;
        let finalXP = newXP;
        
        if (finalXP >= xpForNextLevel) {
            newLevel += 1;
            finalXP -= xpForNextLevel;
        }
        
        let newAchievements = [...prev.achievements];
        const totalCompletedCount = updatedSubjects.flatMap(s => s.units.flatMap(u => u.modules.flatMap(m => m.topics))).filter(t => t.completed).length;

        if (totalCompletedCount > 0 && !newAchievements.includes('first-steps')) {
            newAchievements.push('first-steps');
        }

        if (topicParentUnit) {
            const allUnitTopics = topicParentUnit.modules.flatMap(m => m.topics);
            const allUnitTopicsCompleted = allUnitTopics.every(t => t.completed);
            const achievementId = `master-${topicParentUnit.id}`;
            if (allUnitTopicsCompleted && achievementsData.some(a => a.id === achievementId) && !newAchievements.includes(achievementId)) {
                newAchievements.push(achievementId);
            }
        }
        
        return { ...prev, questPoints: newQP, xp: finalXP, level: newLevel, achievements: newAchievements };
    });
  };
  
  const handleGameComplete = (rank: number) => {
    setStudentProfile(prev => {
        let qpReward = 10;
        let xpReward = 10;
        if (rank === 1) { qpReward = 100; xpReward = 50; }
        else if (rank === 2) { qpReward = 50; xpReward = 25; }
        else if (rank === 3) { qpReward = 25; xpReward = 15; }

        const newQP = prev.questPoints + qpReward;
        const newXP = prev.xp + xpReward;
        const xpForNextLevel = prev.level * 100;
        
        let newLevel = prev.level;
        let finalXP = newXP;
        
        if (finalXP >= xpForNextLevel) {
            newLevel += 1;
            finalXP -= xpForNextLevel;
        }

        return { ...prev, questPoints: newQP, xp: finalXP, level: newLevel };
    });
  };

  const handlePurchaseItem = (item: StoreItem) => {
    if (studentProfile.questPoints >= item.price && !studentProfile.inventory.includes(item.id)) {
        setStudentProfile(prev => ({
            ...prev,
            questPoints: prev.questPoints - item.price,
            inventory: [...prev.inventory, item.id],
        }));
    }
  };

  const handleEquipItem = (item: StoreItem) => {
    if (studentProfile.inventory.includes(item.id)) {
        if (item.type === 'theme') {
            setStudentProfile(prev => ({ ...prev, equippedTheme: item.id }));
        }
    }
  };
  
  const handleEnterStudentDashboard = () => setView('studentDashboard');
  const handleEnterTeacherDashboard = () => setView('teacherDashboard');
  const handleEnterGeneralKnowledge = () => setView('generalKnowledge');

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('subject');
  };
  
  const handleNavigate = (targetView: 'studentDashboard' | 'teacherDashboard' | 'generalKnowledge' | 'store' | 'profile' | 'studyArena' | 'careerCompass') => {
    setSelectedSubject(null);
    setActiveAssessment(null);
    setActiveCoursework(null);
    setView(targetView);
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
    const gkSubject = subjects.find(s => s.level === 'General');

    switch (view) {
      case 'careerCompass':
        return <CareerCompass subjects={subjects.filter(s => s.level !== 'General')} />;
      case 'studyArena':
        return <StudyArena onGameComplete={handleGameComplete} studentProfile={studentProfile} />;
      case 'profile':
        return <Profile profile={studentProfile} />;
      case 'store':
        return <Store studentProfile={studentProfile} onPurchase={handlePurchaseItem} onEquip={handleEquipItem} />;
      case 'generalKnowledge':
        if (gkSubject) {
            return <GeneralKnowledge subject={gkSubject} studentProfile={studentProfile} handleTopicComplete={handleTopicComplete} />;
        }
        return null;
      case 'coursework':
        if(activeCoursework) {
            return <CourseworkComponent coursework={activeCoursework} onBack={handleBackFromCoursework} onComplete={handleCourseworkComplete} />;
        }
        return null;
      case 'assessment':
        if (activeAssessment) {
          return <AssessmentComponent assessment={activeAssessment} onBack={handleBackFromAssessment} onComplete={handleAssessmentComplete} />;
        }
        return null;
      case 'subject':
        if (selectedSubject) {
          return <SubjectDetail subject={selectedSubject} onBack={() => handleNavigate('studentDashboard')} onStartAssessment={handleStartAssessment} onStartCoursework={handleStartCoursework} handleTopicComplete={handleTopicComplete} />;
        }
        return null;
      case 'studentDashboard':
        return <SubjectsDashboard onSubjectSelect={handleSubjectSelect} studentProfile={studentProfile} subjects={subjects} onNavigate={handleNavigate} />;
      case 'teacherDashboard':
          return <TeacherDashboard subjects={subjects} />;
      case 'landing':
      default:
        return <LandingPage onEnterDashboard={handleEnterStudentDashboard} onEnterTeacherDashboard={handleEnterTeacherDashboard} onEnterGeneralKnowledge={handleEnterGeneralKnowledge} />;
    }
  };

  const isNavigableView = ['studentDashboard', 'teacherDashboard', 'subject', 'generalKnowledge', 'store', 'profile', 'studyArena', 'careerCompass'].includes(view);
  
  let navType: 'student' | 'teacher' | 'general' | 'store' | 'profile' | 'arena' | 'compass' = 'student';
  if (view === 'teacherDashboard') navType = 'teacher';
  if (view === 'generalKnowledge') navType = 'general';
  if (view === 'store') navType = 'store';
  if (view === 'profile') navType = 'profile';
  if (view === 'studyArena') navType = 'arena';
  if (view === 'careerCompass') navType = 'compass';

  return (
    <div className="font-sans bg-background text-foreground">
      {isNavigableView ? (
        <Layout navType={navType} onNavigate={handleNavigate} onExit={handleExitToLanding} studentProfile={studentProfile}>
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
