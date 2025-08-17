

import React, { useState, useMemo, useEffect } from 'react';
import type { Subject, Topic, StudentProfile } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { Award, Bot, ChevronRight, Compass, Star, Trophy, TrendingUp, BookMarked } from 'lucide-react';
import { useAi } from '../contexts/AiContext';
import { Button } from './ui/Button';

interface SubjectsDashboardProps {
  onSubjectSelect: (subject: Subject) => void;
  studentProfile: StudentProfile;
  subjects: Subject[];
  onNavigate: (view: 'careerCompass') => void;
}

const findNextTopic = (allSubjects: Subject[], currentClass: string): { subject: Subject, topic: Topic } | null => {
    const classSubjects = allSubjects.filter(subject => 
        subject.level !== 'General' && subject.units.some(unit => unit.title.startsWith(currentClass))
    );

    for (const subject of classSubjects) {
        for (const unit of subject.units) {
            if (unit.title.startsWith(currentClass)) {
                for (const module of unit.modules) {
                    const firstUncompleted = module.topics.find(topic => !topic.completed);
                    if (firstUncompleted) {
                        return { subject, topic: firstUncompleted };
                    }
                }
            }
        }
    }
    return null;
};

const JourneyGuideCard: React.FC<{ nextStep: { subject: Subject, topic: Topic } | null, onSubjectSelect: (subject: Subject) => void }> = ({ nextStep, onSubjectSelect }) => (
    <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3">
                <Bot className="w-8 h-8" />
                <div>
                    <CardTitle className="text-2xl text-white">Your AI Journey Guide</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Here's your personalized next step.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {nextStep ? (
                <div>
                    <p className="text-sm text-primary-foreground/80 mb-1">Recommended for you:</p>
                    <h4 className="text-xl font-semibold text-white">{nextStep.topic.title}</h4>
                    <p className="text-md font-medium text-white/90 mb-4">in {nextStep.subject.title}</p>
                    <Button 
                      onClick={() => onSubjectSelect(nextStep.subject)}
                      className="bg-white text-primary hover:bg-white/90 w-full"
                    >
                        Let's Go! <Compass className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                     <h4 className="text-xl font-semibold text-white">You've conquered it all!</h4>
                    <p className="text-md font-medium text-white/90">Amazing work! All topics for this class are complete.</p>
                </div>
            )}
        </CardContent>
    </Card>
);

const LeaderboardCard: React.FC = () => {
    const leaderboardData = [
        { rank: 1, name: 'Student A', qp: 1250 },
        { rank: 2, name: 'You', qp: 1080, isUser: true },
        { rank: 3, name: 'Student B', qp: 970 },
        { rank: 4, name: 'Student C', qp: 850 },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Trophy className="text-amber-500"/> Weekly Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {leaderboardData.map(player => (
                        <li key={player.rank} className={`flex items-center justify-between p-2 rounded-md ${player.isUser ? 'bg-primary/10' : ''}`}>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-sm w-5 text-center">{player.rank}</span>
                                <span className={`font-semibold text-sm ${player.isUser ? 'text-primary' : ''}`}>{player.name}</span>
                            </div>
                            <div className="flex items-center gap-1 font-bold text-amber-600 text-sm">
                                <Star className="w-4 h-4 fill-current"/>
                                {player.qp}
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

const SubjectNode: React.FC<{ subject: Subject; onSelect: () => void; }> = ({ subject, onSelect }) => {
    const Icon = subject.icon;
    const progress = subject.totalTopics > 0 ? (subject.completedTopics / subject.totalTopics) * 100 : 0;
    return (
        <div className="relative flex flex-col items-center group cursor-pointer journey-node">
            <div 
                onClick={onSelect}
                className="w-28 h-28 rounded-full bg-white border-4 border-primary/20 flex flex-col items-center justify-center text-center p-2 shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary transition-all duration-300 z-10"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
                aria-label={`Select subject: ${subject.title}`}
            >
                <div className="p-2 bg-primary/10 rounded-full mb-1">
                    <Icon className="w-5 h-5 text-primary"/>
                </div>
                <h3 className="text-xs font-bold leading-tight">{subject.title}</h3>
            </div>
            <div className="mt-2 w-full text-center">
                <ProgressBar value={progress} className="h-1.5" />
            </div>
        </div>
    );
};

const SubjectsDashboard: React.FC<SubjectsDashboardProps> = ({ onSubjectSelect, studentProfile, subjects, onNavigate }) => {
  const [selectedLevel, setSelectedLevel] = useState<'JSS' | 'SSS'>('JSS');
  const [selectedClass, setSelectedClass] = useState<string>('JSS 1');
  const { setAiContext } = useAi();

  useEffect(() => {
    setAiContext({ level: selectedLevel, class: selectedClass });
  }, [selectedLevel, selectedClass, setAiContext]);

  useEffect(() => {
    setSelectedClass(selectedLevel === 'JSS' ? 'JSS 1' : 'SSS 1');
  }, [selectedLevel]);

  const classSubjects = useMemo(() => {
    return subjects.filter(subject => 
      subject.level === selectedLevel && subject.units.some(unit => unit.title.startsWith(selectedClass))
    );
  }, [selectedLevel, selectedClass, subjects]);
  
  const levelSubjects = useMemo(() => subjects.filter(s => s.level === selectedLevel), [selectedLevel, subjects]);

  const completedTopics = useMemo(() => levelSubjects.reduce((sum, subject) => sum + subject.completedTopics, 0), [levelSubjects]);
  const totalTopics = useMemo(() => levelSubjects.reduce((sum, subject) => sum + subject.totalTopics, 0), [levelSubjects]);
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  
  const totalQuestPoints = studentProfile.questPoints;

  const nextStep = useMemo(() => findNextTopic(subjects, selectedClass), [selectedClass, subjects]);

  const classTabs = selectedLevel === 'JSS' 
    ? [{ key: 'JSS 1', label: 'JSS 1' }, { key: 'JSS 2', label: 'JSS 2' }, { key: 'JSS 3', label: 'JSS 3' }]
    : [{ key: 'SSS 1', label: 'SSS 1' }, { key: 'SSS 2', label: 'SSS 2' }, { key: 'SSS 3', label: 'SSS 3' }];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Sidebar */}
         <aside className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp/>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-primary">{overallProgress}%</div>
                    <p className="text-sm text-muted-foreground">{completedTopics} of {totalTopics} topics done</p>
                    <ProgressBar value={overallProgress} className="mt-2 h-2.5"/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Star className="text-amber-500" /> Quest Points</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-amber-600">{totalQuestPoints} QP</div>
                    <p className="text-xs text-muted-foreground">Earned from completed topics</p>
                </CardContent>
            </Card>
            <LeaderboardCard />
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Compass className="text-blue-500"/> Career Compass</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Discover career paths related to your favorite subjects.</p>
                    <Button variant="outline" className="w-full" onClick={() => onNavigate('careerCompass')}>
                        Explore Careers
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award className="text-green-500" /> Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {studentProfile.achievements.length > 0 ? (
                            studentProfile.achievements.slice(0, 3).map(ach => <span key={ach} className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">{ach.replace(/-/g, ' ')}</span>)
                        ) : (
                            <p className="text-xs text-muted-foreground">Start learning to unlock achievements!</p>
                        )}
                    </div>
                </CardContent>
            </Card>
         </aside>

         {/* Main Content */}
         <main className="lg:col-span-9">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Your Learning Journey</h1>
                <p className="text-muted-foreground mt-1">Select a subject to begin your next quest!</p>
            </div>

            <JourneyGuideCard nextStep={nextStep} onSubjectSelect={onSubjectSelect} />

            <Card className="mt-8">
              <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-2xl">Subject Worlds</CardTitle>
                      <CardDescription>Select your curriculum and class to see your journey map.</CardDescription>
                    </div>
                    <div className="mt-4 sm:mt-0 flex border-b sm:border-b-0 border-gray-200">
                        <button
                          onClick={() => setSelectedLevel('JSS')}
                          className={`py-2 px-4 text-sm font-medium ${selectedLevel === 'JSS' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Junior Secondary (JSS)
                        </button>
                        <button
                          onClick={() => setSelectedLevel('SSS')}
                          className={`py-2 px-4 text-sm font-medium ${selectedLevel === 'SSS' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Senior Secondary (SSS)
                        </button>
                    </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8" aria-label="Class Tabs">
                      {classTabs.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setSelectedClass(tab.key)}
                          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md ${
                            selectedClass === tab.key
                              ? 'border-primary text-primary'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                          aria-current={selectedClass === tab.key ? 'page' : undefined}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-6 bg-slate-50/50 rounded-lg min-h-[300px]">
                      {classSubjects.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 py-8 relative">
                               <style>{`
                                .journey-node:not(:last-child)::after {
                                    content: '';
                                    position: absolute;
                                    left: 50%;
                                    top: 3.5rem; /* half of w-28 */
                                    height: 2px;
                                    width: 100%;
                                    background: repeating-linear-gradient(90deg, #9ca3af, #9ca3af 4px, transparent 4px, transparent 8px);
                                    z-index: 0;
                                }
                                @media (max-width: 640px) {
                                    .journey-node:nth-child(2n)::after { display: none; }
                                }
                                @media (min-width: 768px) and (max-width: 1024px) {
                                     .journey-node:nth-child(3n)::after { display: none; }
                                }
                                 @media (min-width: 1024px) {
                                     .journey-node:nth-child(4n)::after { display: none; }
                                }
                               
                            `}</style>
                              {classSubjects.map((subject) => (
                                <SubjectNode key={subject.id} subject={subject} onSelect={() => onSubjectSelect(subject)} />
                              ))}
                          </div>
                      ) : (
                          <div className="text-center py-16 text-muted-foreground">
                              <BookMarked className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                              <p className="font-semibold">No subjects found for this class.</p>
                              <p className="text-sm">Please select another level or class.</p>
                          </div>
                      )}
                  </div>
              </CardContent>
            </Card>
         </main>
       </div>
    </div>
  );
};

export default SubjectsDashboard;
