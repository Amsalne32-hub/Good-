
import React, { useState, useMemo } from 'react';
import type { Subject, Unit, Module, Topic, GeneratedQuestion, StudyPlan, StudyPlanStep, Flashcard } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { ChevronDown, Check, Play, BookOpen, Film, Beaker, Music, Video, Star, LayoutDashboard, Library, ClipboardCheck, ClipboardList, PenSquare, FileText, ExternalLink, Lightbulb, HelpCircle, Wand2, Loader, BookCopy, Edit, GraduationCap, CheckSquare, BrainCircuit, Quote, Brain } from 'lucide-react';
import Resources from '../data/Resources';
import { useAi } from '../contexts/AiContext';
import { GoogleGenAI, Type } from '@google/genai';
import Flashcards from './Flashcards';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface SubjectDetailProps {
  subject: Subject;
  onBack: () => void;
  onStartAssessment: (assessmentId: string) => void;
  onStartCoursework: (courseworkId: string) => void;
  handleTopicComplete: (topicId: string) => void;
  flashcards: Flashcard[];
  onAddFlashcards: (flashcards: Flashcard[]) => void;
  onNavigate: (view: 'eLibrary') => void;
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
    handleTopicComplete: (topicId: string) => void;
    context: Record<string, string | undefined>;
}> = ({ topic, index, onStartAssessment, onStartCoursework, handleTopicComplete, context }) => {
  const { sendMessage } = useAi();

  const isPassiveContent = ['video', 'audio', 'animation', 'simulation', 'reading'].includes(topic.contentType);

  const handleAction = () => {
    if (topic.completed) return;

    if (topic.assessmentId) {
      onStartAssessment(topic.assessmentId);
    } else if (topic.courseworkId) {
      onStartCoursework(topic.courseworkId);
    } else if (isPassiveContent) {
      handleTopicComplete(topic.id);
    }
  };

  const getButtonContent = () => {
    if (topic.completed) {
      return { text: 'Completed', icon: <Check className="w-4 h-4 mr-2"/>, variant: 'outline', disabled: true };
    }
    if (isPassiveContent) {
      return { text: 'Mark as Complete', icon: <Check className="w-4 h-4 mr-2"/>, variant: 'default', disabled: false };
    }
    return { text: 'Start', icon: <Play className="w-4 h-4 ml-2"/>, variant: 'default', disabled: false };
  };

  const buttonContent = getButtonContent();


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
            <Button onClick={handleAction} variant={buttonContent.variant as any} size="sm" disabled={buttonContent.disabled}>
                {buttonContent.text} {buttonContent.icon}
            </Button>
        </div>
    </Card>
  );
};


const SubjectDetail: React.FC<SubjectDetailProps> = ({ subject, onBack, onStartAssessment, onStartCoursework, handleTopicComplete, flashcards, onAddFlashcards, onNavigate }) => {
  const [openUnitId, setOpenUnitId] = useState<string | null>(subject.units[0]?.id || null);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'curriculum' | 'resources' | 'ai-study-room' | 'flashcards'>('curriculum');
  const Icon = subject.icon;

  const subjectProgress = useMemo(() => {
      const totalTopics = subject.units.reduce((sum, unit) => sum + unit.totalTopics, 0);
      const completedTopics = subject.units.reduce((sum, unit) => sum + unit.completedTopics, 0);
      return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  }, [subject]);


  // State for AI Study Room
  const [studyRoomUnitId, setStudyRoomUnitId] = useState<string>('');
  const [studyRoomModuleId, setStudyRoomModuleId] = useState<string>('');

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);

  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuestion[] | null>(null);

  const [isGeneratingAnalogy, setIsGeneratingAnalogy] = useState(false);
  const [generatedAnalogy, setGeneratedAnalogy] = useState<string>('');
  const [analogyPrompt, setAnalogyPrompt] = useState('');

  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [generatedExplanation, setGeneratedExplanation] = useState<string>('');
  const [explanationPrompt, setExplanationPrompt] = useState('');
  
  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);

  const studyRoomSelectedUnit = useMemo(() => subject.units.find(u => u.id === studyRoomUnitId), [studyRoomUnitId, subject.units]);
  const studyRoomAvailableModules = useMemo(() => studyRoomSelectedUnit?.modules || [], [studyRoomSelectedUnit]);
  const studyRoomSelectedModule = useMemo(() => studyRoomAvailableModules.find(m => m.id === studyRoomModuleId), [studyRoomModuleId, studyRoomAvailableModules]);

  const resetAiContent = () => {
    setGeneratedPlan(null);
    setGeneratedQuiz(null);
    setGeneratedAnalogy('');
    setGeneratedExplanation('');
  };

  const handleUnitChangeForAi = (unitId: string) => {
      setStudyRoomUnitId(unitId);
      setStudyRoomModuleId('');
      resetAiContent();
  };

  const handleModuleChangeForAi = (moduleId: string) => {
      setStudyRoomModuleId(moduleId);
      resetAiContent();
  };
  
  const handleGenerateStudyPlan = async () => {
      if (!subject || !studyRoomSelectedUnit || !studyRoomSelectedModule) return;
      setIsGeneratingPlan(true);
      setGeneratedPlan(null);
      const subTopics = studyRoomSelectedModule.topics.map(t => t.title).join(', ');
      try {
           const prompt = `Generate a personalized study plan for a Nigerian ${subject.level} student on the topic '${studyRoomSelectedModule.title}'. The plan should be structured as a series of actionable steps. The sub-topics to cover are: ${subTopics}. The output must be a JSON object with a single key "plan", which is an array of step objects. Each step object must have: 1. A "type" which can be 'summary', 'task', or 'quiz'. 2. A "title" which is a short, encouraging heading for the step. 3. A "content" which is a string. For a summary, it's the summary text. For a task, it's the task description. For a quiz, it's a brief instruction. 4. For 'quiz' type steps, include a "questions" array. Each item in the array should be an object with "question", an array of 4 "options", "correctAnswer", and "explanation". Generate 1 summary step, 1 task step, and 1 quiz step with 2 questions. Ensure all text is simple, clear, and avoids special formatting characters like markdown.`;
          
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    plan: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          type: { type: Type.STRING },
                          title: { type: Type.STRING },
                          content: { type: Type.STRING },
                          questions: {
                            type: Type.ARRAY,
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                question: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                correctAnswer: { type: Type.STRING },
                                explanation: { type: Type.STRING }
                              },
                              required: ['question', 'options', 'correctAnswer', 'explanation']
                            }
                          }
                        },
                         required: ['type', 'title', 'content']
                      }
                    }
                  },
                   required: ['plan']
                }
              }
          });
          setGeneratedPlan(JSON.parse(response.text));
      } catch (error) {
          console.error(error);
          // You might want to show an error message to the user
      } finally {
          setIsGeneratingPlan(false);
      }
  };
  
  const handleGenerateFullQuiz = async () => {
      if (!subject || !studyRoomSelectedUnit || !studyRoomSelectedModule) return;
      setIsGeneratingQuiz(true);
      setGeneratedQuiz(null);
      try {
          const prompt = `Generate 5 multiple-choice quiz questions based on the topic '${studyRoomSelectedModule.title}' from the subject '${subject.title}'. The questions should be suitable for a Nigerian ${subject.level} student. Ensure all text in the questions, options, and explanations uses simple language and contains no special formatting characters.`;
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    questions: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          question: { type: Type.STRING },
                          options: { type: Type.ARRAY, items: { type: Type.STRING } },
                          correctAnswer: { type: Type.STRING },
                          explanation: { type: Type.STRING }
                        }
                      }
                    }
                  }
                }
              }
          });
          const parsed = JSON.parse(response.text);
          setGeneratedQuiz(parsed.questions);
      } catch (error) {
          console.error(error);
      } finally {
          setIsGeneratingQuiz(false);
      }
  };
  
  const handleAiToolSubmit = async (type: 'explanation' | 'analogy') => {
      if (!studyRoomSelectedModule) return;
      let prompt = '';
      let promptInput = '';
      if (type === 'explanation') {
          if (!explanationPrompt.trim()) return;
          promptInput = explanationPrompt;
          setIsGeneratingExplanation(true);
          setGeneratedExplanation('');
          prompt = `Explain the concept of "${promptInput}" in the context of the topic "${studyRoomSelectedModule.title}" for a Nigerian ${subject.level} student. Use simple language and provide a clear, concise explanation. Do not use special formatting characters.`;
      } else {
          if (!analogyPrompt.trim()) return;
          promptInput = analogyPrompt;
          setIsGeneratingAnalogy(true);
          setGeneratedAnalogy('');
          prompt = `Create a simple analogy or metaphor to explain the concept of "${promptInput}" for a Nigerian secondary school student studying ${subject.title}. The analogy should be relatable and easy to understand. Do not use special formatting characters.`;
      }

      try {
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
          });
          if (type === 'explanation') setGeneratedExplanation(response.text);
          if (type === 'analogy') setGeneratedAnalogy(response.text);
      } catch (error) {
          console.error("AI Tool Error", error);
          if (type === 'explanation') setGeneratedExplanation("Sorry, I couldn't generate an explanation. Please try again.");
          if (type === 'analogy') setGeneratedAnalogy("Sorry, I couldn't generate an analogy. Please try again.");
      } finally {
          if (type === 'explanation') setIsGeneratingExplanation(false);
          if (type === 'analogy') setIsGeneratingAnalogy(false);
      }
  };


  const toggleUnit = (unitId: string) => {
    setOpenUnitId(prevId => (prevId === unitId ? null : unitId));
    setOpenModuleId(null); // Close module when unit changes
  };

  const toggleModule = (moduleId: string) => {
    setOpenModuleId(prevId => (prevId === moduleId ? null : moduleId));
  };
  
  const renderCurriculum = () => (
    <div className="space-y-4">
        <Card>
            <CardHeader><CardTitle>Overall Progress</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-baseline">
                    <span className="text-5xl font-bold text-primary">{subjectProgress}%</span>
                    <span className="font-medium text-muted-foreground">{subject.completedTopics} of {subject.totalTopics} topics completed</span>
                </div>
                <ProgressBar value={subjectProgress} className="h-3" />
            </CardContent>
        </Card>

        <div>
            <h3 className="text-2xl font-bold mb-4">Curriculum Units</h3>
            <div className="space-y-3">
            {subject.units.map((unit) => {
                const unitProgress = unit.totalTopics > 0 ? Math.round((unit.completedTopics / unit.totalTopics) * 100) : 0;
                return (
                    <Card key={unit.id} className="overflow-hidden">
                        <button onClick={() => toggleUnit(unit.id)} className="w-full text-left">
                            <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-slate-50">
                            <div>
                                <CardTitle>{unit.title}</CardTitle>
                                <p className="text-sm text-muted-foreground pt-1">{unit.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-bold text-primary">{unitProgress}%</p>
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
                                                    handleTopicComplete={handleTopicComplete}
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
                )
            })}
            </div>
        </div>
    </div>
  );
  
  const renderAiStudyRoom = () => {
    
    const renderStudyPlanStep = (step: StudyPlanStep, index: number) => {
        let icon;
        switch(step.type) {
            case 'summary': icon = <BookCopy className="w-5 h-5 text-blue-500" />; break;
            case 'task': icon = <Edit className="w-5 h-5 text-purple-500" />; break;
            case 'quiz': icon = <ClipboardCheck className="w-5 h-5 text-green-500" />; break;
            default: icon = <Lightbulb className="w-5 h-5 text-gray-500" />;
        }
        
        return (
            <div key={index} className="relative pl-10">
                <div className="absolute left-0 top-0 flex items-center">
                    <span className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center ring-4 ring-white">{icon}</span>
                </div>
                <Card className="ml-2">
                    <CardHeader>
                        <CardTitle>{step.title}</CardTitle>
                        <CardDescription>{step.content}</CardDescription>
                    </CardHeader>
                    {step.questions && step.questions.length > 0 && (
                         <CardContent className="space-y-3">
                            {step.questions.map((q, qIndex) => (
                               <div key={qIndex} className="p-3 border rounded-md bg-white text-sm">
                                    <p className="font-semibold">{q.question}</p>
                                    <div className="mt-2 space-y-1 text-xs">
                                        {q.options.map((opt, i) => (
                                            <p key={i}>{String.fromCharCode(65 + i)}. {opt}</p>
                                        ))}
                                    </div>
                                    <div className="mt-2 text-xs p-2 bg-green-50 rounded-md">
                                        <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                                        <p><strong>Explanation:</strong> {q.explanation}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    )}
                </Card>
            </div>
        );
    }
      
    return (
        <div className="space-y-6">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>1. Select Your Topic</CardTitle>
                    <CardDescription>Choose a unit and module to generate study materials for.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <label htmlFor="unit-select" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                        <select
                            id="unit-select"
                            value={studyRoomUnitId}
                            onChange={(e) => handleUnitChangeForAi(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        >
                            <option value="" disabled>Select a unit</option>
                            {subject.units.map(unit => (
                                <option key={unit.id} value={unit.id}>{unit.title}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <label htmlFor="module-select" className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                        <select
                            id="module-select"
                            value={studyRoomModuleId}
                            onChange={(e) => handleModuleChangeForAi(e.target.value)}
                            disabled={!studyRoomUnitId || studyRoomAvailableModules.length === 0}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary disabled:bg-slate-100"
                        >
                            <option value="" disabled>Select a module</option>
                            {studyRoomAvailableModules.map(module => (
                                <option key={module.id} value={module.id}>{module.title}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {!studyRoomModuleId ? (
                <Card className="text-center py-16 text-muted-foreground bg-slate-50">
                    <CardContent>
                        <GraduationCap className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                        <p className="font-semibold">Your personal study space</p>
                        <p className="text-sm">Please select a unit and module above to begin.</p>
                    </CardContent>
                </Card>
            ) : (
             <>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                               <CardTitle className="text-2xl">Adaptive Study Plan</CardTitle>
                               <CardDescription>Your AI-generated path to mastering this module.</CardDescription>
                            </div>
                            <Button onClick={handleGenerateStudyPlan} disabled={isGeneratingPlan}>
                                {isGeneratingPlan ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                                {generatedPlan ? 'Regenerate Plan' : 'Generate My Study Plan'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 border rounded-lg bg-slate-50/50 min-h-[20rem]">
                            {isGeneratingPlan ? (
                                <div className="flex items-center justify-center h-full text-center">
                                    <Loader className="w-8 h-8 animate-spin text-primary" />
                                    <p className="mt-2 font-medium">Crafting your personalized plan...</p>
                                </div>
                            ) : generatedPlan && generatedPlan.plan ? (
                                <div className="relative space-y-6 py-4">
                                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200"></div>
                                    {generatedPlan.plan.map(renderStudyPlanStep)}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <CheckSquare className="w-10 h-10 text-slate-400 mb-2" />
                                    <p className="text-sm font-medium text-slate-600">Your study plan will appear here.</p>
                                    <p className="text-xs text-muted-foreground">Click the generate button to start.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4">AI Toolkit</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                          <CardHeader>
                             <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-primary"/> Explain a Concept</CardTitle>
                             <CardDescription>Stuck on a specific idea? Get a simple explanation.</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <div className="flex gap-2">
                                <input type="text" value={explanationPrompt} onChange={e => setExplanationPrompt(e.target.value)} placeholder="e.g., 'What is photosynthesis?'" className="w-full px-3 py-2 border rounded-md text-sm"/>
                                <Button onClick={() => handleAiToolSubmit('explanation')} disabled={isGeneratingExplanation || !explanationPrompt.trim()}><Wand2 className="w-4 h-4"/></Button>
                              </div>
                              {isGeneratingExplanation && <p className="text-sm text-muted-foreground mt-2 flex items-center"><Loader className="w-4 h-4 animate-spin mr-2"/>Thinking...</p>}
                              {generatedExplanation && <div className="mt-3 p-3 bg-slate-100 rounded-md text-sm whitespace-pre-wrap">{generatedExplanation}</div>}
                          </CardContent>
                      </Card>

                      <Card>
                          <CardHeader>
                             <CardTitle className="flex items-center gap-2"><Quote className="text-primary"/> Create an Analogy</CardTitle>
                             <CardDescription>Understand complex topics with simple comparisons.</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <div className="flex gap-2">
                                <input type="text" value={analogyPrompt} onChange={e => setAnalogyPrompt(e.target.value)} placeholder="e.g., 'Analogy for an atom'" className="w-full px-3 py-2 border rounded-md text-sm"/>
                                <Button onClick={() => handleAiToolSubmit('analogy')} disabled={isGeneratingAnalogy || !analogyPrompt.trim()}><Wand2 className="w-4 h-4"/></Button>
                              </div>
                              {isGeneratingAnalogy && <p className="text-sm text-muted-foreground mt-2 flex items-center"><Loader className="w-4 h-4 animate-spin mr-2"/>Thinking...</p>}
                              {generatedAnalogy && <div className="mt-3 p-3 bg-slate-100 rounded-md text-sm whitespace-pre-wrap">{generatedAnalogy}</div>}
                          </CardContent>
                      </Card>
                      
                      <Card className="lg:col-span-2">
                          <CardHeader>
                               <CardTitle className="flex items-center gap-2"><ClipboardCheck className="text-primary"/> Generate Practice Quiz</CardTitle>
                               <CardDescription>Create a full 5-question quiz on the entire module to test your knowledge.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button onClick={handleGenerateFullQuiz} disabled={isGeneratingQuiz}>
                                {isGeneratingQuiz ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                                Generate 5-Question Quiz
                            </Button>
                            {isGeneratingQuiz && <p className="text-sm text-muted-foreground mt-2 flex items-center"><Loader className="w-4 h-4 animate-spin mr-2"/>Building your quiz...</p>}
                            {generatedQuiz && (
                                <div className="mt-4 space-y-3">
                                    {generatedQuiz.map((q, index) => (
                                        <div key={index} className="p-3 border rounded-md bg-white text-sm">
                                            <p className="font-semibold">{index + 1}. {q.question}</p>
                                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                                                {q.options.map((opt, i) => (
                                                    <p key={i} className={cn(q.correctAnswer === opt ? 'text-success font-medium' : '')}>
                                                        {String.fromCharCode(65 + i)}. {opt}
                                                    </p>
                                                ))}
                                            </div>
                                            <div className="mt-2 text-xs p-2 bg-green-50 rounded-md">
                                                <p><strong className="text-success">Correct Answer:</strong> {q.correctAnswer}</p>
                                                <p><strong className="text-success">Explanation:</strong> {q.explanation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                          </CardContent>
                      </Card>
                  </div>
                </div>
              </>
            )}
        </div>
    );
  };

  const renderFlashcards = () => (
    <Flashcards
        subjectId={subject.id}
        units={subject.units}
        existingFlashcards={flashcards.filter(f => f.subjectId === subject.id)}
        onAddFlashcards={onAddFlashcards}
    />
  );


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-6">
            <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-12 h-12" />
            </div>
            <div>
                <button onClick={onBack} className="text-sm font-medium text-primary hover:underline mb-1">Back to Journey</button>
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
           <button
            onClick={() => setActiveTab('ai-study-room')}
             className={cn(
                'py-4 px-1 border-b-2 font-medium text-lg flex items-center gap-2',
                activeTab === 'ai-study-room' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
           <Wand2 className="w-5 h-5" /> AI Study Room
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
             className={cn(
                'py-4 px-1 border-b-2 font-medium text-lg flex items-center gap-2',
                activeTab === 'flashcards' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
           <Brain className="w-5 h-5" /> Flashcards
          </button>
        </nav>
      </div>
      
      <div>
        {activeTab === 'curriculum' && renderCurriculum()}
        {activeTab === 'resources' && <Resources resources={subject.resources} subjectTitle={subject.title} onNavigate={onNavigate} />}
        {activeTab === 'ai-study-room' && renderAiStudyRoom()}
        {activeTab === 'flashcards' && renderFlashcards()}
      </div>
    </div>
  );
};

export default SubjectDetail;
