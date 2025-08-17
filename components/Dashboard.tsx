import React, { useState, useMemo } from 'react';
import type { Subject } from '../types';
import { subjects } from '../data/subjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import AiAssistant from './AiAssistant';
import { ChevronRight } from 'lucide-react';

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

  const currentSubjects = useMemo(() => {
    return subjects.filter((subject) => subject.level === selectedLevel);
  }, [selectedLevel]);

  const totalTopics = useMemo(() => currentSubjects.reduce((sum, subject) => sum + subject.totalTopics, 0), [currentSubjects]);
  const completedTopics = useMemo(() => currentSubjects.reduce((sum, subject) => sum + subject.completedTopics, 0), [currentSubjects]);
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

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
                        <p className="text-sm text-muted-foreground">Across {currentSubjects.length} subjects</p>
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
                        <CardDescription>Select a subject to start or continue learning.</CardDescription>
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
                <ul className="divide-y divide-gray-200">
                    {currentSubjects.map((subject) => (
                      <SubjectListItem key={subject.id} subject={subject} onSelect={() => onSubjectSelect(subject)} />
                    ))}
                    {currentSubjects.length === 0 && (
                        <li className="text-center py-10 text-muted-foreground">
                            No subjects found for this level.
                        </li>
                    )}
                </ul>
            </CardContent>
        </Card>
      </div>
      <AiAssistant context={{ level: selectedLevel }} />
    </div>
  );
};

export default SubjectsDashboard;