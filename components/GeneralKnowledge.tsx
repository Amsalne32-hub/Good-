import React, { useState, useEffect, useMemo } from 'react';
import type { Subject, Unit, Module, Topic } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { Beaker, BookOpen, Film, Music, Video, Lightbulb, HelpCircle, Star, Check, ChevronLeft } from 'lucide-react';
import { useAi } from '../contexts/AiContext';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const contentTypeIcons: Record<Topic['contentType'], React.ReactNode> = {
  video: <Video className="w-4 h-4" />,
  audio: <Music className="w-4 h-4" />,
  animation: <Film className="w-4 h-4" />,
  simulation: <Beaker className="w-4 h-4" />,
  reading: <BookOpen className="w-4 h-4" />,
  quiz: <></>, test: <></>, classwork: <></>, assignment: <></>,
};

const GKTopicCard: React.FC<{ 
    topic: Topic;
    context: Record<string, string | undefined>;
    onComplete: (points: number) => void;
    isCompleted: boolean;
}> = ({ topic, context, onComplete, isCompleted }) => {
  const { sendMessage } = useAi();

  const handleAiAction = (action: 'explain' | 'example' | 'quiz') => {
    let prompt = '';
    switch (action) {
      case 'explain':
        prompt = `In a simple way, explain the topic "${topic.title}".`;
        break;
      case 'example':
        prompt = `Give me a simple, real-world Nigerian example for "${topic.title}".`;
        break;
      case 'quiz':
        prompt = `Generate one multiple-choice quiz question to test my understanding of "${topic.title}". Include 4 options, the correct answer, and a brief explanation.`;
        break;
    }
    sendMessage(prompt, context);
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", isCompleted ? 'bg-green-50 border-green-200' : 'bg-white')}>
        <div className="p-4">
            <div className="flex justify-between items-start">
                 <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{topic.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                 </div>
                 <div className={cn("flex items-center gap-1 font-bold text-sm ml-4 px-2 py-1 rounded-full", isCompleted ? "text-green-700 bg-green-200" : "text-amber-700 bg-amber-100" )}>
                    <Star className="w-4 h-4 fill-current" />
                    <span>{topic.questPoints || 0} QP</span>
                 </div>
            </div>
             <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    {contentTypeIcons[topic.contentType]}
                    <span className="capitalize text-xs">{topic.contentType}</span>
                </span>
             </div>
        </div>
        <div className="px-4 pb-3 pt-2 border-t bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-muted-foreground mr-1">AI Tools:</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleAiAction('explain')} title="Explain Simply">
                    <Lightbulb className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleAiAction('example')} title="Give Example">
                    <Beaker className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleAiAction('quiz')} title="Quiz Me">
                    <HelpCircle className="w-4 h-4" />
                </Button>
            </div>
            <Button onClick={() => onComplete(topic.questPoints || 0)} variant={isCompleted ? "outline" : "default"} size="sm" disabled={isCompleted}>
                {isCompleted ? <><Check className="w-4 h-4 mr-2"/>Completed</> : 'Complete'}
            </Button>
        </div>
    </Card>
  );
};

interface QuestCardProps {
    unit: Unit;
    onStart: () => void;
    completedTopics: number;
}
const QuestCard: React.FC<QuestCardProps> = ({ unit, onStart, completedTopics }) => {
    const progress = unit.totalTopics > 0 ? Math.round((completedTopics / unit.totalTopics) * 100) : 0;
    
    return (
        <Card className="overflow-hidden flex flex-col group">
            <div className="relative">
                <img src={unit.questImage} alt={unit.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{unit.title}</h3>
            </div>
            <CardContent className="pt-4 flex-grow flex flex-col">
                <p className="text-muted-foreground text-sm flex-grow">{unit.description}</p>
                <div className="mt-4">
                    <div className="flex justify-between w-full text-xs font-medium text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <ProgressBar value={progress} />
                </div>
            </CardContent>
            <div className="p-4 pt-0">
                <Button onClick={onStart} className="w-full">Start Quest</Button>
            </div>
        </Card>
    )
}

interface GeneralKnowledgeProps {
  subject: Subject;
}

const GeneralKnowledge: React.FC<GeneralKnowledgeProps> = ({ subject }) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [questPoints, setQuestPoints] = useState<number>(0);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const { setAiContext } = useAi();
  
  useEffect(() => {
    setAiContext({
        section: 'KnowQuest',
        topic: selectedUnit?.title || 'Dashboard',
    });
  }, [selectedUnit, setAiContext]);

  const handleTopicComplete = (topicId: string, points: number) => {
    if (completedTopics.has(topicId)) return;
    
    const newCompleted = new Set(completedTopics);
    newCompleted.add(topicId);
    setCompletedTopics(newCompleted);
    setQuestPoints(prev => prev + points);
  };
  
  const getQuestProgress = (unit: Unit) => {
      const unitTopics = unit.modules.flatMap(m => m.topics);
      const completedCount = unitTopics.filter(t => completedTopics.has(t.id)).length;
      return {
          completed: completedCount,
          total: unit.totalTopics,
          percentage: unit.totalTopics > 0 ? Math.round((completedCount / unit.totalTopics) * 100) : 0,
      }
  };

  if (!selectedUnit) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome back, Explorer!</h2>
        <p className="text-muted-foreground mt-1">Ready for today's quest?</p>
        
        <Card className="my-6 bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2"><Lightbulb /> Daily Knowledge Nugget</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">Did you know? The Great Wall of China is not a single continuous wall but a system of walls, fortifications, and natural barriers built over centuries.</p>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.units.map(unit => (
                <QuestCard 
                    key={unit.id} 
                    unit={unit} 
                    onStart={() => setSelectedUnit(unit)}
                    completedTopics={getQuestProgress(unit).completed}
                />
            ))}
        </div>
      </div>
    );
  }

  // Quest View
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8">
            <Button variant="outline" onClick={() => setSelectedUnit(null)}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
            <div className="text-center">
                <h1 className="text-3xl font-bold">{selectedUnit.title}</h1>
                <p className="text-muted-foreground">{selectedUnit.description}</p>
            </div>
            <div className="flex items-center gap-2 font-bold text-lg px-4 py-2 rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                <Star className="w-6 h-6 fill-current" />
                <span>{questPoints} QP</span>
            </div>
        </header>

        <div className="relative pl-6 sm:pl-8">
            {/* The vertical timeline */}
            <div className="absolute left-3 sm:left-4 top-4 h-[calc(100%-2rem)] w-1 bg-slate-200 rounded-full"></div>
            
            {selectedUnit.modules.map(module => {
                 const isExpanded = expandedModuleId === module.id;
                 return (
                    <div key={module.id} className="relative mb-10">
                        <div className="absolute left-3 sm:left-4 top-4 -translate-x-1/2 w-7 h-7 bg-white border-4 border-primary rounded-full z-10"></div>
                        <div className="pl-8 sm:pl-12">
                            <Card className="cursor-pointer" onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}>
                                <CardHeader>
                                    <CardTitle>{module.title}</CardTitle>
                                    <CardDescription>{module.description}</CardDescription>
                                </CardHeader>
                            </Card>
                            {isExpanded && (
                                <div className="mt-4 space-y-3">
                                    {module.topics.map(topic => (
                                        <GKTopicCard 
                                            key={topic.id} 
                                            topic={topic} 
                                            context={{
                                                subject: subject.title,
                                                unit: selectedUnit.title,
                                                module: module.title,
                                            }}
                                            isCompleted={completedTopics.has(topic.id)}
                                            onComplete={(points) => handleTopicComplete(topic.id, points)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default GeneralKnowledge;