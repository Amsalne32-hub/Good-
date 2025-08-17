import React, { useState } from 'react';
import type { Subject, Unit, Module, Topic } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { ChevronDown, Check, Play, BookOpen, Film, Beaker, Music, Video, Star, LayoutDashboard, Library, ClipboardCheck, ClipboardList, PenSquare, FileText, ExternalLink, Lightbulb, HelpCircle } from 'lucide-react';
import Resources from '../data/Resources';
import { useAi } from '../contexts/AiContext';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface SubjectDetailProps {
  subject: Subject;
  onBack: () => void;
  onStartAssessment: (assessmentId: string) => void;
  onStartCoursework: (courseworkId: string) => void;
}

const difficultyColors: Record<Topic['difficulty'], string> = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  advanced: "bg-red-100 text-red-800 border-red-200"
};

const contentTypeIcons: Record<Topic['contentType'], React.ReactNode> = {
  video: <Video className="w-5 h-5" />,
  audio: <Music className="w-5 h-5" />,
  animation: <Film className="w-5 h-5" />,
  simulation: <Beaker className="w-5 h-5" />,
  reading: <BookOpen className="w-5 h-5" />,
  quiz: <ClipboardCheck className="w-5 h-5" />,
  test: <ClipboardList className="w-5 h-5" />,
  classwork: <PenSquare className="w-5 h-5" />,
  assignment: <FileText className="w-5 h-5" />,
};

const TopicCard: React.FC<{ 
    topic: Topic; 
    index: number; 
    onStartAssessment: (assessmentId: string) => void; 
    onStartCoursework: (courseworkId: string) => void;
    context: Record<string, string | undefined>;
}> = ({ topic, index, onStartAssessment, onStartCoursework, context }) => {
  const { sendMessage } = useAi();

  const handleStart = () => {
    if (topic.assessmentId) {
      onStartAssessment(topic.assessmentId);
    } else if (topic.courseworkId) {
      onStartCoursework(topic.courseworkId);
    }
  };

  const handleAiAction = (action: 'explain' | 'example' | 'quiz') => {
    let prompt = '';
    switch (action) {
      case 'explain':
        prompt = `Explain the topic "${topic.title}" like I'm 10 years old, using a Nigerian context if possible.`;
        break;
      case 'example':
        prompt = `Give me a simple, real-world Nigerian example for the topic "${topic.title}".`;
        break;
      case 'quiz':
        prompt = `Generate one multiple-choice quiz question to test my understanding of "${topic.title}". Include 4 options, the correct answer, and a brief explanation.`;
        break;
    }
    sendMessage(prompt, context);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center p-4">
             <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${topic.completed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {topic.completed ? <Check className="w-6 h-6" /> : index + 1}
            </div>
            <div className="ml-4 flex-grow">
                <h4 className="font-semibold text-lg">{topic.title}</h4>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
                 <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${difficultyColors[topic.difficulty]}`}>
                        {topic.difficulty}
                    </span>
                    <span className="flex items-center gap-1.5">
                        {contentTypeIcons[topic.contentType]}
                        <span className="capitalize">{topic.contentType}</span>
                    </span>
                     <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {topic.duration} min
                    </span>
                    {topic.completed && topic.score && (
                      <span className="flex items-center gap-1 font-semibold text-yellow-600">
                        <Star className="w-4 h-4 fill-current"/>
                        {topic.score}%
                      </span>
                    )}
                </div>
            </div>
        </div>
        <div className="px-4 pb-3 pt-3 border-t bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-muted-foreground mr-2" id={`ai-tools-label-${topic.id}`}>AI Tools:</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAiAction('explain')} aria-labelledby={`ai-tools-label-${topic.id}`} title="Explain Simply">
                    <Lightbulb className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAiAction('example')} aria-labelledby={`ai-tools-label-${topic.id}`} title="Give Example">
                    <Beaker className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAiAction('quiz')} aria-labelledby={`ai-tools-label-${topic.id}`} title="Quiz Me">
                    <HelpCircle className="w-4 h-4" />
                </Button>
            </div>
            <Button onClick={handleStart} variant={topic.completed ? 'outline' : 'default'} size="sm">
                {topic.completed ? 'Review' : 'Start'} <Play className="w-4 h-4 ml-2"/>
            </Button>
        </div>
    </Card>
  );
};


const SubjectDetail: React.FC<SubjectDetailProps> = ({ subject, onBack, onStartAssessment, onStartCoursework }) => {
  const [openUnitId, setOpenUnitId] = useState<string | null>(subject.units[0]?.id || null);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'curriculum' | 'resources'>('curriculum');
  const Icon = subject.icon;
  
  const toggleUnit = (unitId: string) => {
    setOpenUnitId(prevId => (prevId === unitId ? null : unitId));
    setOpenModuleId(null); // Close module when unit changes
  };

  const toggleModule = (moduleId: string) => {
    setOpenModuleId(prevId => (prevId === moduleId ? null : moduleId));
  };
  
  const renderCurriculum = () => {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <Card>
                    <CardHeader><CardTitle>Overall Progress</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-baseline">
                            <span className="text-5xl font-bold text-primary">{subject.progress}%</span>
                            <span className="font-medium text-muted-foreground">{subject.completedTopics} of {subject.totalTopics} topics completed</span>
                        </div>
                        <ProgressBar value={subject.progress} className="h-3" />
                    </CardContent>
                </Card>

                <div>
                    <h3 className="text-2xl font-bold mb-4">Curriculum Units</h3>
                    <div className="space-y-3">
                    {subject.units.map((unit) => (
                        <Card key={unit.id} className="overflow-hidden">
                           <button onClick={() => toggleUnit(unit.id)} className="w-full text-left">
                             <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-slate-50">
                                <div>
                                    <CardTitle>{unit.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground pt-1">{unit.description}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-bold text-primary">{unit.progress}%</p>
                                        <p className="text-xs text-muted-foreground">{unit.completedTopics}/{unit.totalTopics} topics</p>
                                    </div>
                                    <ChevronDown className={cn("w-6 h-6 text-muted-foreground transition-transform", openUnitId === unit.id && "rotate-180")} />
                                </div>
                             </CardHeader>
                           </button>
                           {openUnitId === unit.id && (
                             <CardContent className="border-t pt-4 space-y-3">
                                {unit.modules.map(module => (
                                   <div key={module.id} className="border rounded-lg overflow-hidden">
                                        <button onClick={() => toggleModule(module.id)} className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50">
                                            <div>
                                               <h4 className="font-semibold">{module.title}</h4>
                                               <p className="text-xs text-muted-foreground">{module.completedTopics}/{module.topics.length} topics done</p>
                                            </div>
                                            <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", openModuleId === module.id && "rotate-180")} />
                                        </button>
                                        {openModuleId === module.id && (
                                            <div className="p-4 border-t space-y-3 bg-slate-50/50">
                                                 {module.topics.map((topic, index) => (
                                                    <TopicCard 
                                                        key={topic.id} 
                                                        topic={topic} 
                                                        index={index} 
                                                        onStartAssessment={onStartAssessment} 
                                                        onStartCoursework={onStartCoursework}
                                                        context={{
                                                            subject: subject.title,
                                                            unit: unit.title,
                                                            module: module.title,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                   </div>
                                ))}
                                {unit.suggestedChannels && unit.suggestedChannels.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-lg mb-3">Recommended Channels</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {unit.suggestedChannels.map(channel => {
                                                const ChannelIcon = channel.icon;
                                                return (
                                                    <Card key={channel.name} className="p-3 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-start gap-3">
                                                            {ChannelIcon && <ChannelIcon className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />}
                                                            <div>
                                                                <h5 className="font-semibold text-md">{channel.name}</h5>
                                                                <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                                                                <a href={channel.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                                                                    Visit Channel <ExternalLink className="w-3 h-3 ml-1.5" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                             </CardContent>
                           )}
                        </Card>
                    ))}
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Subject Stats</CardTitle></CardHeader>
                    <CardContent className="divide-y">
                        <div className="py-3 flex justify-between"><span>Units Available</span> <span className="font-bold">{subject.units.length}</span></div>
                        <div className="py-3 flex justify-between"><span>Total Modules</span> <span className="font-bold">{subject.units.reduce((acc, unit) => acc + unit.modules.length, 0)}</span></div>
                        <div className="py-3 flex justify-between"><span>Total Topics</span> <span className="font-bold">{subject.totalTopics}</span></div>
                    </CardContent>
                </Card>
            </div>
        </div>
      );
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-6">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-12 h-12" />
            </div>
            <div>
                <h1 className="text-5xl font-bold">{subject.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">{subject.description}</p>
            </div>
        </div>
      </header>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={cn(
                'py-4 px-1 border-b-2 font-medium text-lg flex items-center gap-2',
                activeTab === 'curriculum' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            <LayoutDashboard className="w-5 h-5" /> Curriculum
          </button>
          <button
            onClick={() => setActiveTab('resources')}
             className={cn(
                'py-4 px-1 border-b-2 font-medium text-lg flex items-center gap-2',
                activeTab === 'resources' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
           <Library className="w-5 h-5" /> Resources
          </button>
        </nav>
      </div>
      
      <div>
        {activeTab === 'curriculum' && renderCurriculum()}
        {activeTab === 'resources' && <Resources resources={subject.resources} subjectTitle={subject.title} />}
      </div>
    </div>
  );
};

export default SubjectDetail;