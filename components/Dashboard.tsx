import React, { useState, useMemo, useEffect } from 'react';
import type { Subject } from '../types';
import { subjects } from '../data/subjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { ChevronRight, Lightbulb, Star } from 'lucide-react';
import { useAi } from '../contexts/AiContext';

interface SubjectsDashboardProps {
  onSubjectSelect: (subject: Subject) => void;
}

const SubjectQuestCard: React.FC<{ subject: Subject; onSelect: () => void }> = ({ subject, onSelect }) => {
  const Icon = subject.icon;
  const totalQP = useMemo(() => 
    subject.units
      .flatMap(u => u.modules.flatMap(m => m.topics))
      .reduce((sum, t) => sum + (t.questPoints || 0), 0)
  , [subject]);

  return (
    <Card 
      onClick={onSelect} 
      className="overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-shadow duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      aria-label={`Select subject: ${subject.title}`}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl">{subject.title}</CardTitle>
          <CardDescription>{subject.units.length} Units • {subject.totalTopics} Topics</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
          <div className="flex justify-between items-center text-xs font-medium text-amber-600 mb-1">
            <span>Total Quest Points</span>
            <span>{totalQP} QP</span>
          </div>
          <div className="flex justify-between w-full text-xs font-medium text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{subject.progress}%</span>
          </div>
          <ProgressBar value={subject.progress} />
      </CardContent>
    </Card>
  );
};


const SubjectsDashboard: React.FC<SubjectsDashboardProps> = ({ onSubjectSelect }) => {
  const [selectedLevel, setSelectedLevel] = useState<'JSS' | 'SSS'>('JSS');
  const [selectedClass, setSelectedClass] = useState<string>('JSS 1');
  const { setAiContext } = useAi();

  useEffect(() => {
    setAiContext({ level: selectedLevel, class: selectedClass });
  }, [selectedLevel, selectedClass, setAiContext]);

  useEffect(() => {
    if (selectedLevel === 'JSS') {
      setSelectedClass('JSS 1');
    } else {
      setSelectedClass('SSS 1');
    }
  }, [selectedLevel]);

  const levelSubjects = useMemo(() => {
    return subjects.filter((subject) => subject.level === selectedLevel);
  }, [selectedLevel]);

  const classSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      if (subject.level !== selectedLevel) return false;
      return subject.units.some(unit => unit.title.startsWith(selectedClass));
    });
  }, [selectedLevel, selectedClass]);

  const totalTopics = useMemo(() => levelSubjects.reduce((sum, subject) => sum + subject.totalTopics, 0), [levelSubjects]);
  const completedTopics = useMemo(() => levelSubjects.reduce((sum, subject) => sum + subject.completedTopics, 0), [levelSubjects]);
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  
  const totalQuestPoints = useMemo(() => 
    levelSubjects.reduce((sum, subject) => 
        sum + subject.units
            .flatMap(u => u.modules.flatMap(m => m.topics.filter(t => t.completed)))
            .reduce((s, t) => s + (t.questPoints || 0), 0)
    , 0)
  , [levelSubjects]);


  const classTabs = selectedLevel === 'JSS' 
    ? [{ key: 'JSS 1', label: 'JSS 1' }, { key: 'JSS 2', label: 'JSS 2' }, { key: 'JSS 3', label: 'JSS 3' }]
    : [{ key: 'SSS 1', label: 'SSS 1' }, { key: 'SSS 2', label: 'SSS 2' }, { key: 'SSS 3', label: 'SSS 3' }];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back, Learner!</h2>
        <p className="text-muted-foreground mt-1">Ready to conquer your subjects today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{overallProgress}%</div>
                <p className="text-sm text-muted-foreground">{completedTopics} of {totalTopics} topics completed</p>
                <ProgressBar value={overallProgress} className="mt-2 h-2.5"/>
            </CardContent>
          </Card>
           <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quest Points</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-4xl font-bold text-amber-600">{totalQuestPoints} QP</div>
                  <p className="text-xs text-muted-foreground">Earned from completed topics</p>
              </CardContent>
          </Card>
           <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Daily Knowledge Nugget</CardTitle>
                <Lightbulb className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                  <p className="text-sm">Nigeria is home to over 250 ethnic groups, each with unique languages and traditions.</p>
              </CardContent>
          </Card>
      </div>
      
      <Card>
          <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                      <CardTitle className="text-2xl">Your Subject Quests</CardTitle>
                      <CardDescription>Select your curriculum level to begin.</CardDescription>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classSubjects.map((subject) => (
                    <SubjectQuestCard key={subject.id} subject={subject} onSelect={() => onSubjectSelect(subject)} />
                  ))}
              </div>
              {classSubjects.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground bg-slate-50 rounded-lg">
                      <p className="font-semibold">No subjects found for this class.</p>
                      <p className="text-sm">Please select another level or class.</p>
                  </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
};

export default SubjectsDashboard;
