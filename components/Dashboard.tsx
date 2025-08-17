import React, { useState, useMemo, useEffect } from 'react';
import type { Subject } from '../types';
import { subjects } from '../data/subjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { ChevronRight } from 'lucide-react';
import { useAi } from '../contexts/AiContext';

interface SubjectsDashboardProps {
  onSubjectSelect: (subject: Subject) => void;
}

const SubjectListItem: React.FC<{ subject: Subject; onSelect: () => void }> = ({ subject, onSelect }) => {
  const Icon = subject.icon;
  return (
    <li
      onClick={onSelect}
      className="flex items-center p-4 cursor-pointer hover:bg-slate-100/50 transition-colors rounded-lg"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      aria-label={`Select subject: ${subject.title}`}
    >
      <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="font-semibold text-gray-800">{subject.title}</h3>
        <p className="text-sm text-muted-foreground">{subject.units.length} Units • {subject.totalTopics} Topics</p>
      </div>
      <div className="w-40 ml-4 hidden sm:block">
        <div className="flex justify-between w-full text-xs font-medium text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{subject.progress}%</span>
        </div>
        <ProgressBar value={subject.progress} />
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
    </li>
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

  // Subjects for the entire level (JSS/SSS) - used for top-level stats
  const levelSubjects = useMemo(() => {
    return subjects.filter((subject) => subject.level === selectedLevel);
  }, [selectedLevel]);

  // Subjects filtered by the specific class tab (JSS1, SSS2, etc.) - used for the list
  const classSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      // Must match the overall level (JSS/SSS)
      if (subject.level !== selectedLevel) {
        return false;
      }
      // Must have at least one unit relevant to the selected class
      // We check if the unit title starts with the formatted class name
      return subject.units.some(unit => unit.title.startsWith(selectedClass));
    });
  }, [selectedLevel, selectedClass]);


  const totalTopics = useMemo(() => levelSubjects.reduce((sum, subject) => sum + subject.totalTopics, 0), [levelSubjects]);
  const completedTopics = useMemo(() => levelSubjects.reduce((sum, subject) => sum + subject.completedTopics, 0), [levelSubjects]);
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const classTabs = selectedLevel === 'JSS' 
    ? [{ key: 'JSS 1', label: 'JSS 1' }, { key: 'JSS 2', label: 'JSS 2' }, { key: 'JSS 3', label: 'JSS 3' }]
    : [{ key: 'SSS 1', label: 'SSS 1' }, { key: 'SSS 2', label: 'SSS 2' }, { key: 'SSS 3', label: 'SSS 3' }];

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-muted-foreground mt-1">Here's your learning progress overview.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{overallProgress}%</div>
                        <ProgressBar value={overallProgress} className="mt-2"/>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Topics Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{completedTopics} / {totalTopics}</div>
                        <p className="text-sm text-muted-foreground">Across {levelSubjects.length} subjects</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{selectedLevel}</div>
                        <p className="text-sm text-muted-foreground">{selectedLevel === 'JSS' ? 'Junior Secondary School' : 'Senior Secondary School'}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-2xl">Your Subjects</CardTitle>
                        <CardDescription>Select your curriculum level to view subjects.</CardDescription>
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

                <ul className="divide-y divide-gray-200">
                    {classSubjects.map((subject) => (
                      <SubjectListItem key={subject.id} subject={subject} onSelect={() => onSubjectSelect(subject)} />
                    ))}
                    {classSubjects.length === 0 && (
                        <li className="text-center py-10 text-muted-foreground">
                            No subjects found for this class level.
                        </li>
                    )}
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubjectsDashboard;
