
import React, { useState, useEffect, useMemo } from 'react';
import type { Subject, Unit, Module, Topic, StudentProfile, GroundingChunk, GeneratedQuestion } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../data/Card';
import ProgressBar from './ui/ProgressBar';
import { Beaker, BookOpen, Film, Music, Video, Lightbulb, HelpCircle, Star, Check, ChevronLeft, Newspaper, Wand2, Loader, Link as LinkIcon, Trophy } from 'lucide-react';
import { useAi } from '../contexts/AiContext';
import { GoogleGenAI, Type } from '@google/genai';

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
    handleTopicComplete: (topicId: string) => void;
}> = ({ topic, context, handleTopicComplete }) => {
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
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", topic.completed ? 'bg-green-50 border-green-200' : 'bg-white')}>
        <div className="p-4">
            <div className="flex justify-between items-start">
                 <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{topic.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                 </div>
                 <div className={cn("flex items-center gap-1 font-bold text-sm ml-4 px-2 py-1 rounded-full", topic.completed ? "text-green-700 bg-green-200" : "text-amber-700 bg-amber-100" )}>
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
            <Button onClick={() => handleTopicComplete(topic.id)} variant={topic.completed ? "outline" : "default"} size="sm" disabled={topic.completed}>
                {topic.completed ? <><Check className="w-4 h-4 mr-2"/>Completed</> : 'Complete'}
            </Button>
        </div>
    </Card>
  );
};

interface QuestCardProps {
    unit: Unit;
    onStart: () => void;
}
const QuestCard: React.FC<QuestCardProps> = ({ unit, onStart }) => {
    const progress = unit.totalTopics > 0 ? Math.round((unit.completedTopics / unit.totalTopics) * 100) : 0;
    
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
  studentProfile: StudentProfile;
  handleTopicComplete: (topicId: string) => void;
  onQuestQuizComplete: (points: number) => void;
}

const GeneralKnowledge: React.FC<GeneralKnowledgeProps> = ({ subject, studentProfile, handleTopicComplete, onQuestQuizComplete }) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // AI News Briefing State
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [briefingSources, setBriefingSources] = useState<GroundingChunk[]>([]);
  const [briefingError, setBriefingError] = useState<string | null>(null);
  
  // AI Fact of the Day State
  const [isGeneratingFact, setIsGeneratingFact] = useState(false);
  const [fact, setFact] = useState<string | null>(null);

  // AI Quest Quiz State
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [questQuiz, setQuestQuiz] = useState<GeneratedQuestion[] | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);
  const { setAiContext } = useAi();
  
  const handleGenerateBriefing = async () => {
    setIsGeneratingBriefing(true); setBriefing(null); setBriefingSources([]); setBriefingError(null);
    try {
        const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: "Generate a concise summary of the top 3 news headlines relevant to Nigeria today. The summary should be suitable for a secondary school student.", config: { tools: [{ googleSearch: {} }], }, });
        setBriefing(response.text);
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources = groundingMetadata?.groundingChunks || [];
        setBriefingSources(sources as GroundingChunk[]);
    } catch (error) { console.error("Briefing Generation Error:", error); setBriefingError("Could not generate today's briefing. Please try again later."); }
    finally { setIsGeneratingBriefing(false); }
  };
  
  const handleGenerateFact = async () => {
      setIsGeneratingFact(true); setFact(null);
      try {
          const prompt = "Tell me an interesting and fun fact suitable for a curious teenager in Nigeria. It could be about science, history, or culture. Keep it to 1-2 sentences.";
          const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
          setFact(response.text);
      } catch (error) { console.error("Fact generation error", error); setFact("Could not fetch a fact right now. Please try again!"); }
      finally { setIsGeneratingFact(false); }
  };

  const handleGenerateQuestQuiz = async () => {
    if (!selectedUnit) return;
    setIsGeneratingQuiz(true);
    setIsQuizVisible(true);
    setQuestQuiz(null);
    setQuizScore(null);

    const topicTitles = selectedUnit.modules.flatMap(m => m.topics.map(t => t.title)).join(', ');
    try {
        const prompt = `Generate a 5-question multiple-choice quiz about the unit '${selectedUnit.title}'. The questions should cover these topics: ${topicTitles}. Each question must have 4 options, a 'correctAnswer' (the text of the correct option), and a brief 'explanation'.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", contents: prompt, config: {
                responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { questions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { question: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } }, correctAnswer: { type: Type.STRING }, explanation: { type: Type.STRING } } } } } } }
        });
        const parsed = JSON.parse(response.text);
        setQuestQuiz(parsed.questions);
    } catch (error) { console.error(error); setQuestQuiz(null); }
    finally { setIsGeneratingQuiz(false); }
  };

  useEffect(() => { setAiContext({ section: 'KnowQuest', topic: selectedUnit?.title || 'Dashboard', }); }, [selectedUnit, setAiContext]);

  const TodaysBriefingCard = () => ( <Card className="bg-blue-50 border-blue-200"> <CardHeader> <CardTitle className="text-blue-800 flex items-center gap-2"><Newspaper /> Today's AI News Briefing</CardTitle> <CardDescription>Get up-to-the-minute summaries of what's happening, powered by Google Search.</CardDescription> </CardHeader> <CardContent> {isGeneratingBriefing ? <div className="flex items-center gap-2 text-muted-foreground"><Loader className="w-5 h-5 animate-spin" /><span>Generating your briefing...</span></div> : briefing ? <div> <div className="whitespace-pre-wrap p-4 bg-white rounded-md border text-sm">{briefing}</div> {briefingSources.length > 0 && <div className="mt-4"><h4 className="text-sm font-semibold mb-2 text-slate-600">Sources:</h4><ul className="space-y-1">{briefingSources.map((source, index) => <li key={index} className="text-xs"><a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline"><LinkIcon className="w-3 h-3 flex-shrink-0"/><span className="truncate">{source.web.title || new URL(source.web.uri).hostname}</span></a></li>)}</ul></div>} </div> : briefingError ? <p className="text-destructive">{briefingError}</p> : <Button onClick={handleGenerateBriefing} disabled={isGeneratingBriefing}><Wand2 className="w-4 h-4 mr-2" /> Generate Briefing</Button>} </CardContent> </Card> );
  const FactOfTheDayCard = () => ( <Card className="bg-purple-50 border-purple-200"> <CardHeader> <CardTitle className="text-purple-800 flex items-center gap-2"><Lightbulb /> Fact of the Day</CardTitle> <CardDescription>A little nugget of knowledge to brighten your day.</CardDescription> </CardHeader> <CardContent className="min-h-[6rem] flex items-center justify-center"> {isGeneratingFact ? <Loader className="w-5 h-5 animate-spin text-purple-600"/> : fact ? <p className="text-center text-purple-900 font-medium text-md">"{fact}"</p> : <Button onClick={handleGenerateFact} variant="secondary"><Wand2 className="w-4 h-4 mr-2"/> Reveal Today's Fact</Button>} </CardContent> </Card> );

  // A simple modal component for the quiz
  const QuestQuizModal = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        let score = 0;
        questQuiz?.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) {
                score++;
            }
        });
        const finalScore = (score / (questQuiz?.length || 1)) * 100;
        setQuizScore(finalScore);
        onQuestQuizComplete(Math.round(finalScore / 2)); // e.g. 50 QP for a perfect score
        setSubmitted(true);
    };

    if (!isQuizVisible) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
                <CardHeader>
                    <CardTitle>Final Challenge: {selectedUnit?.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto">
                    {isGeneratingQuiz && <div className="flex items-center justify-center h-full"><Loader className="w-8 h-8 animate-spin text-primary"/></div>}
                    {questQuiz && !submitted && (
                        <div className="space-y-4">
                            {questQuiz.map((q, qIndex) => (
                                <div key={qIndex}>
                                    <p className="font-semibold">{qIndex + 1}. {q.question}</p>
                                    <div className="space-y-2 mt-2">
                                        {q.options.map(opt => (
                                            <label key={opt} className={cn("flex items-center p-2 border rounded-md cursor-pointer text-sm", answers[qIndex] === opt ? 'bg-primary/10 border-primary' : '')}>
                                                <input type="radio" name={`q-${qIndex}`} value={opt} onChange={(e) => setAnswers(prev => ({...prev, [qIndex]: e.target.value}))} className="w-4 h-4 mr-2"/>
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {submitted && quizScore !== null && (
                        <div className="text-center">
                            <Trophy className="w-16 h-16 mx-auto text-amber-500"/>
                            <h3 className="text-2xl font-bold mt-2">Challenge Complete!</h3>
                            <p className="text-5xl font-bold my-4">{quizScore}%</p>
                            <p>You earned {Math.round(quizScore / 2)} Quest Points!</p>
                        </div>
                    )}
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setIsQuizVisible(false)}>Close</Button>
                    {questQuiz && !submitted && <Button onClick={handleSubmit}>Submit Answers</Button>}
                </div>
            </Card>
        </div>
    );
  };


  if (!selectedUnit) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome back, Explorer!</h2>
        <p className="text-muted-foreground mt-1">Ready for today's quest?</p>
        
        <div className="my-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><TodaysBriefingCard /></div>
            <div><FactOfTheDayCard /></div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Choose Your Quest</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.units.map(unit => (
                <QuestCard key={unit.id} unit={unit} onStart={() => setSelectedUnit(unit)} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuestQuizModal />
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
                <span>{studentProfile.questPoints} QP</span>
            </div>
        </header>

        <div className="relative pl-6 sm:pl-8">
            <div className="absolute left-3 sm:left-4 top-4 h-[calc(100%)] w-1 bg-slate-200 rounded-full"></div>
            
            {selectedUnit.modules.map(module => {
                 const isExpanded = expandedModuleId === module.id;
                 return (
                    <div key={module.id} className="relative mb-10">
                        <div className="absolute left-3 sm:left-4 top-4 -translate-x-1/2 w-7 h-7 bg-white border-4 border-primary rounded-full z-10"></div>
                        <div className="pl-8 sm:pl-12">
                            <Card className="cursor-pointer" onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}>
                                <CardHeader> <CardTitle>{module.title}</CardTitle> <CardDescription>{module.description}</CardDescription> </CardHeader>
                            </Card>
                            {isExpanded && <div className="mt-4 space-y-3"> {module.topics.map(topic => <GKTopicCard key={topic.id} topic={topic} context={{ subject: subject.title, unit: selectedUnit.title, module: module.title, }} handleTopicComplete={handleTopicComplete} /> )} </div>}
                        </div>
                    </div>
                )
            })}
            
            <div className="relative">
                 <div className="absolute left-3 sm:left-4 top-4 -translate-x-1/2 w-7 h-7 bg-white border-4 border-amber-500 rounded-full z-10"></div>
                 <div className="pl-8 sm:pl-12">
                    <Card className="bg-amber-50 border-amber-200">
                        <CardHeader>
                            <CardTitle className="text-amber-800">Final Challenge</CardTitle>
                            <CardDescription>Test your knowledge on all topics in the "{selectedUnit.title}" quest!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleGenerateQuestQuiz} className="bg-amber-500 hover:bg-amber-600">
                                <Trophy className="w-4 h-4 mr-2"/> Start Challenge
                            </Button>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default GeneralKnowledge;
