import React, { useState, useMemo } from 'react';
import { subjects as initialSubjects } from '../data/subjects';
import { classData } from '../data/classData';
import type { Subject, GeneratedQuestion } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Wand2, Loader, Lightbulb, BookCopy, FileText, ClipboardCheck, Edit, User, BarChart, AlertTriangle, Trophy } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import ProgressBar from './ui/ProgressBar';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface GeneratedActivity {
    title: string;
    description: string;
}

interface TeacherDashboardProps {
    subjects: Subject[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ subjects }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('jss-math');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  
  // Main tabs
  const [activeMainTab, setActiveMainTab] = useState<'lessonCrafter' | 'studentInsights'>('lessonCrafter');
  
  // Lesson Crafter state
  const [crafterStep, setCrafterStep] = useState(1);
  const [isGeneratingObjectives, setIsGeneratingObjectives] = useState(false);
  const [generatedObjectives, setGeneratedObjectives] = useState<string[]>([]);
  
  const [isGeneratingActivities, setIsGeneratingActivities] = useState(false);
  const [generatedActivities, setGeneratedActivities] = useState<GeneratedActivity[]>([]);

  // Content Generation state
  const [activeContentTab, setActiveContentTab] = useState<'plan' | 'notes' | 'quiz'>('plan');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuestion[] | null>(null);

  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);

  const selectedSubject = useMemo(() => subjects.find(s => s.id === selectedSubjectId), [selectedSubjectId, subjects]);
  const availableUnits = useMemo(() => selectedSubject?.units || [], [selectedSubject]);
  const selectedUnit = useMemo(() => availableUnits.find(u => u.id === selectedUnitId), [selectedUnitId, availableUnits]);
  const availableModules = useMemo(() => selectedUnit?.modules || [], [selectedUnit]);
  const selectedModule = useMemo(() => availableModules.find(m => m.id === selectedModuleId), [selectedModuleId, availableModules]);

  const studentInsights = useMemo(() => {
    if (!selectedSubject) return null;

    const allSubjectTopics = selectedSubject.units.flatMap(u => u.modules.flatMap(m => m.topics));
    const totalTopicCount = allSubjectTopics.length;
    if (totalTopicCount === 0) return { averageProgress: 0, struggleSpots: [], topPerformers: [] };
    
    // Calculate overall class progress for the subject
    let totalCompletedByClass = 0;
    classData.forEach(student => {
        const studentProgress = student.progress[selectedSubject.id];
        if (studentProgress) {
            // Filter to only count topics relevant to the current subject structure
            const validCompleted = studentProgress.completedTopics.filter(tid => allSubjectTopics.some(t => t.id === tid));
            totalCompletedByClass += validCompleted.length;
        }
    });
    const averageProgress = totalTopicCount > 0 ? Math.round((totalCompletedByClass / (totalTopicCount * classData.length)) * 100) : 0;

    // Identify struggle spots (topics completed by the fewest students)
    const topicCompletionCounts = new Map<string, number>();
    allSubjectTopics.forEach(topic => topicCompletionCounts.set(topic.id, 0));

    classData.forEach(student => {
        const studentProgress = student.progress[selectedSubject.id];
        if (studentProgress) {
            studentProgress.completedTopics.forEach(topicId => {
                if (topicCompletionCounts.has(topicId)) {
                    topicCompletionCounts.set(topicId, topicCompletionCounts.get(topicId)! + 1);
                }
            });
        }
    });

    const sortedTopics = [...topicCompletionCounts.entries()].sort((a, b) => a[1] - b[1]);
    const struggleSpots = sortedTopics.slice(0, 3).map(([topicId]) => {
        const topic = allSubjectTopics.find(t => t.id === topicId);
        const completionPercentage = Math.round((topicCompletionCounts.get(topicId)! / classData.length) * 100);
        return {
            title: topic?.title || 'Unknown Topic',
            completion: completionPercentage
        };
    });
    
    // Identify top performers
    const topPerformers = classData.map(student => {
        const studentProgress = student.progress[selectedSubject.id];
        const completedCount = studentProgress ? studentProgress.completedTopics.filter(tid => allSubjectTopics.some(t => t.id === tid)).length : 0;
        return {
            name: student.name,
            progress: totalTopicCount > 0 ? Math.round((completedCount / totalTopicCount) * 100) : 0
        };
    }).sort((a, b) => b.progress - a.progress).slice(0, 3);

    return {
        averageProgress,
        struggleSpots,
        topPerformers
    };

  }, [selectedSubject]);

  const resetCrafter = () => {
    setCrafterStep(1);
    setGeneratedObjectives([]);
    setGeneratedActivities([]);
    setGeneratedPlan('');
    setGeneratedNotes('');
    setGeneratedQuiz(null);
  };

  const handleSubjectChange = (subjectId: string) => {
      setSelectedSubjectId(subjectId);
      setSelectedUnitId('');
      setSelectedModuleId('');
      resetCrafter();
  };
  
  const handleUnitChange = (unitId: string) => {
      setSelectedUnitId(unitId);
      setSelectedModuleId('');
      resetCrafter();
  };

  const handleModuleChange = (moduleId: string) => {
      setSelectedModuleId(moduleId);
      resetCrafter();
  };
  
  const handleGenerateObjectives = async () => {
      if (!selectedSubject || !selectedUnit || !selectedModule) return;
      setIsGeneratingObjectives(true);
      setGeneratedObjectives([]);
      try {
          const prompt = `Based on the topic '${selectedModule.title}' for a Nigerian ${selectedSubject.level} ${selectedSubject.title} class, generate 3-4 clear, measurable learning objectives.`;
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: { objectives: { type: Type.ARRAY, items: { type: Type.STRING } } },
                      required: ['objectives']
                  }
              }
          });
          const parsed = JSON.parse(response.text);
          setGeneratedObjectives(parsed.objectives);
          setCrafterStep(2);
      } catch (error) {
          console.error(error);
      } finally {
          setIsGeneratingObjectives(false);
      }
  };
  
  const handleGenerateActivities = async () => {
      if (!selectedSubject || !selectedUnit || !selectedModule || generatedObjectives.length === 0) return;
      setIsGeneratingActivities(true);
      setGeneratedActivities([]);
      try {
          const prompt = `Given these learning objectives for '${selectedModule.title}': [${generatedObjectives.join(', ')}], suggest 3 engaging lesson activities suitable for a Nigerian classroom. For each activity, provide a title and a brief description.`;
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: {
                          activities: {
                              type: Type.ARRAY,
                              items: {
                                  type: Type.OBJECT,
                                  properties: { title: { type: Type.STRING }, description: { type: Type.STRING } },
                                  required: ['title', 'description']
                              }
                          }
                      },
                      required: ['activities']
                  }
              }
          });
          const parsed = JSON.parse(response.text);
          setGeneratedActivities(parsed.activities);
          setCrafterStep(3);
      } catch (error) {
          console.error(error);
      } finally {
          setIsGeneratingActivities(false);
      }
  };

  const handleGenerateContent = async (type: 'plan' | 'notes' | 'quiz') => {
      if (!selectedSubject || !selectedUnit || !selectedModule || generatedObjectives.length === 0) return;
      
      const objectivesText = generatedObjectives.join('\n - ');
      const activitiesText = generatedActivities.map(a => `${a.title}: ${a.description}`).join('\n - ');
      
      if (type === 'plan') {
          setIsGeneratingPlan(true); setGeneratedPlan('');
          try {
              const prompt = `Generate a detailed 40-minute lesson plan for a Nigerian ${selectedSubject.level} class on '${selectedModule.title}'. Base the plan on these objectives:\n - ${objectivesText}\n\nIncorporate these activities where appropriate:\n - ${activitiesText}\n\nThe plan should include: Instructional Materials, Prior Knowledge, Lesson Procedure (with teacher/student activities), Evaluation, Summary, and Assignment. Format as clean plain text without markdown or special characters.`;
              const response = await ai.models.generateContent({
                  model: "gemini-2.5-flash",
                  contents: prompt,
              });
              setGeneratedPlan(response.text);
          } catch (e) { console.error(e); setGeneratedPlan("Error generating plan."); }
          finally { setIsGeneratingPlan(false); }
      } else if (type === 'notes') {
          setIsGeneratingNotes(true); setGeneratedNotes('');
          try {
              const prompt = `Generate comprehensive lesson notes for a Nigerian ${selectedSubject.level} student on '${selectedModule.title}'. The notes should be structured around these objectives:\n - ${objectivesText}\n\nEnsure the notes are clear, detailed, and easy to understand. Format as clean plain text without markdown or special characters.`;
              const response = await ai.models.generateContent({
                  model: "gemini-2.5-flash",
                  contents: prompt,
              });
              setGeneratedNotes(response.text);
          } catch (e) { console.error(e); setGeneratedNotes("Error generating notes."); }
          finally { setIsGeneratingNotes(false); }
      } else if (type === 'quiz') {
          setIsGeneratingQuiz(true); setGeneratedQuiz(null);
          try {
              const prompt = `Generate 5 multiple-choice quiz questions for a Nigerian ${selectedSubject.level} student on '${selectedModule.title}', based on these objectives: ${objectivesText}. Ensure no special formatting characters are used.`;
              const response = await ai.models.generateContent({
                  model: "gemini-2.5-flash",
                  contents: prompt,
                  config: {
                      responseMimeType: "application/json",
                      responseSchema: {
                          type: Type.OBJECT, properties: { questions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { question: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } }, correctAnswer: { type: Type.STRING }, explanation: { type: Type.STRING } } } } } }
                  }
              });
              const parsed = JSON.parse(response.text);
              setGeneratedQuiz(parsed.questions);
          } catch (e) { console.error(e); }
          finally { setIsGeneratingQuiz(false); }
      }
  };

  const totalSubjects = subjects.filter(s => s.level !== 'General').length;
  const totalUnits = subjects.filter(s => s.level !== 'General').reduce((acc, s) => acc + s.units.length, 0);

  const Step = ({ step, title, current, children }: { step: number; title: string; current: number; children: React.ReactNode }) => (
    <div className={cn("p-4 border rounded-lg", current >= step ? 'bg-white' : 'bg-slate-50 opacity-60')}>
        <h3 className={cn("text-lg font-semibold", current === step ? 'text-primary' : '')}>Step {step}: {title}</h3>
        <div className={cn("mt-4", current > step ? 'max-h-12 overflow-hidden relative' : '')}>
            {children}
            {current > step && <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>}
        </div>
    </div>
  );

  const renderLessonCrafter = () => (
    <div className="space-y-4">
        <Step step={1} title="Generate Learning Objectives" current={crafterStep}>
            <p className="text-sm text-muted-foreground mb-4">Let AI create clear, measurable learning goals for your lesson.</p>
            <Button onClick={handleGenerateObjectives} disabled={isGeneratingObjectives}>
                {isGeneratingObjectives ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                Generate Objectives
            </Button>
            {generatedObjectives.length > 0 && (
                <div className="mt-4 p-3 bg-slate-100/50 rounded-md text-sm">
                    <ul className="list-disc list-inside space-y-1">
                        {generatedObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                </div>
            )}
        </Step>
        
        <Step step={2} title="Suggest Lesson Activities" current={crafterStep}>
            <p className="text-sm text-muted-foreground mb-4">Get creative ideas for engaging activities based on the objectives.</p>
            <Button onClick={handleGenerateActivities} disabled={isGeneratingActivities || generatedObjectives.length === 0}>
                {isGeneratingActivities ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                Suggest Activities
            </Button>
            {generatedActivities.length > 0 && (
                <div className="mt-4 space-y-2">
                    {generatedActivities.map((act, i) => (
                        <div key={i} className="p-3 bg-slate-100/50 rounded-md text-sm">
                            <h4 className="font-semibold">{act.title}</h4>
                            <p className="text-muted-foreground">{act.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </Step>
        
        <Step step={3} title="Create Lesson Content" current={crafterStep}>
            <p className="text-sm text-muted-foreground mb-4">Generate a complete lesson plan, notes, and a quiz.</p>
            <div className="border rounded-lg overflow-hidden">
                <div className="flex border-b">
                    <button onClick={() => setActiveContentTab('plan')} className={cn('flex-1 p-2 text-sm font-medium flex items-center justify-center gap-2', activeContentTab === 'plan' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50')}><BookCopy className="w-4 h-4"/> Lesson Plan</button>
                    <button onClick={() => setActiveContentTab('notes')} className={cn('flex-1 p-2 text-sm font-medium flex items-center justify-center gap-2 border-l', activeContentTab === 'notes' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50')}><Edit className="w-4 h-4"/> Lesson Notes</button>
                    <button onClick={() => setActiveContentTab('quiz')} className={cn('flex-1 p-2 text-sm font-medium flex items-center justify-center gap-2 border-l', activeContentTab === 'quiz' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50')}><ClipboardCheck className="w-4 h-4"/> Quiz</button>
                </div>
                <div className="p-4">
                    <Button onClick={() => handleGenerateContent(activeContentTab)} disabled={isGeneratingPlan || isGeneratingNotes || isGeneratingQuiz || generatedActivities.length === 0}>
                        <Wand2 className="w-4 h-4 mr-2" /> Generate {activeContentTab.charAt(0).toUpperCase() + activeContentTab.slice(1)}
                    </Button>
                    <div className="mt-4 p-3 bg-slate-100/50 rounded-md min-h-[10rem]">
                        {isGeneratingPlan || isGeneratingNotes || isGeneratingQuiz ? <Loader className="w-6 h-6 animate-spin text-primary"/> :
                        activeContentTab === 'plan' && generatedPlan ? <div className="whitespace-pre-wrap text-sm">{generatedPlan}</div> :
                        activeContentTab === 'notes' && generatedNotes ? <div className="whitespace-pre-wrap text-sm">{generatedNotes}</div> :
                        activeContentTab === 'quiz' && generatedQuiz ? (
                            <div className="space-y-3">
                                {generatedQuiz.map((q, index) => (
                                    <div key={index} className="p-3 border rounded-md bg-white text-sm">
                                        <p className="font-semibold">{index + 1}. {q.question}</p>
                                        <div className="mt-2 text-xs p-2 bg-green-50 rounded-md">
                                            <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                                            <p><strong>Explanation:</strong> {q.explanation}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-xs text-muted-foreground">Generated content will appear here.</p>}
                    </div>
                </div>
            </div>
        </Step>
    </div>
  );

  const renderStudentInsights = () => (
    <div>
        {!studentInsights ? <p>Select a subject to see insights.</p> :
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart/> Class Progress</CardTitle>
                    <CardDescription>Overall completion for {selectedSubject?.title || 'this subject'}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-primary">{studentInsights.averageProgress}%</div>
                    <p className="text-sm text-muted-foreground">Average completion rate</p>
                    <ProgressBar value={studentInsights.averageProgress} className="mt-2 h-2.5"/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600"><AlertTriangle/> AI-Identified Struggle Spots</CardTitle>
                    <CardDescription>Topics with the lowest completion rates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm space-y-2">
                        {studentInsights.struggleSpots.map((spot, i) => (
                            <li key={i} className="flex justify-between items-center">
                                <span>{spot.title}</span>
                                <span className="font-semibold text-amber-700">{spot.completion}% done</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Trophy/> Top Performing Students</CardTitle>
                    <CardDescription>Students with the highest overall progress in this subject.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {studentInsights.topPerformers.map(student => (
                            <li key={student.name} className="flex items-center justify-between p-2 rounded-md bg-slate-100/50">
                                <span className="font-semibold text-sm">{student.name}</span>
                                <span className="font-bold text-sm text-primary">{student.progress}%</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        }
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Teacher's Command Center</h2>
            <p className="text-muted-foreground mt-1">Your AI-powered teaching co-pilot.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                    <BookCopy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalSubjects}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Curriculum Units</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUnits}</div>
                </CardContent>
            </Card>
             <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Pro Tip</CardTitle>
                <Lightbulb className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                  <p className="text-sm">Use the "Student Insights" tab to identify topics for revision before an exam.</p>
              </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Topic Selection</CardTitle>
            <CardDescription>Choose a subject, unit, and module to focus your work.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select id="subject-select" value={selectedSubjectId} onChange={(e) => handleSubjectChange(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                    <option value="" disabled>Select a subject</option>
                    {subjects.filter(s => s.level !== 'General').map(subject => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="unit-select" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select id="unit-select" value={selectedUnitId} onChange={(e) => handleUnitChange(e.target.value)} disabled={!selectedSubjectId || availableUnits.length === 0} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary disabled:bg-slate-100">
                    <option value="" disabled>Select a unit</option>
                    {availableUnits.map(unit => <option key={unit.id} value={unit.id}>{unit.title}</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="module-select" className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                  <select id="module-select" value={selectedModuleId} onChange={(e) => handleModuleChange(e.target.value)} disabled={!selectedUnitId || availableModules.length === 0} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary disabled:bg-slate-100">
                     <option value="" disabled>Select a module</option>
                     {availableModules.map(module => <option key={module.id} value={module.id}>{module.title}</option>)}
                  </select>
                </div>
             </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                 <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-6">
                          <button onClick={() => setActiveMainTab('lessonCrafter')} className={cn('py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2', activeMainTab === 'lessonCrafter' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-gray-700')}>
                              <Wand2 className="w-4 h-4"/> AI Lesson Crafter
                          </button>
                          <button onClick={() => setActiveMainTab('studentInsights')} className={cn('py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2', activeMainTab === 'studentInsights' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-gray-700')}>
                              <User className="w-4 h-4"/> Student Insights
                          </button>
                      </nav>
                  </div>
            </CardHeader>
            <CardContent>
              {!selectedSubjectId ? (
                <div className="text-center py-16 text-muted-foreground bg-slate-50 rounded-lg">
                    <p className="font-semibold">Please select a subject to see the tools.</p>
                </div>
              ) : activeMainTab === 'lessonCrafter' && !selectedModuleId ? (
                <div className="text-center py-16 text-muted-foreground bg-slate-50 rounded-lg">
                    <p className="font-semibold">Please select a unit and module to use the Lesson Crafter.</p>
                </div>
              ) : (
                activeMainTab === 'lessonCrafter' ? renderLessonCrafter() : renderStudentInsights()
              )}
            </CardContent>
        </Card>
    </div>
  );
};

export default TeacherDashboard;
