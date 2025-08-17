import React, { useState, useMemo } from 'react';
import { subjects } from '../data/subjects';
import type { Subject, GeneratedQuestion } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Wand2, Loader, Lightbulb, BookCopy, FileText, ClipboardCheck, Edit } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface TeacherDashboardProps {}

const AiGeneratorCard = ({ title, description, onGenerate, isLoading, generatedContent, children }: { title: string, description: string, onGenerate: () => void, isLoading: boolean, generatedContent: any, children: React.ReactNode }) => {
    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                 <Button onClick={onGenerate} disabled={isLoading}>
                    {isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                    Generate
                </Button>
            </div>
            
            <div className="min-h-[20rem] p-4 border rounded-lg bg-slate-50/50">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                           <Loader className="w-8 h-8 animate-spin text-primary mx-auto" />
                           <p className="mt-2 text-sm text-muted-foreground">Generating content...</p>
                        </div>
                    </div>
                )}
                {!isLoading && generatedContent && <div>{children}</div>}
                 {!isLoading && !generatedContent && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Lightbulb className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-600">Content will appear here</p>
                        <p className="text-xs text-muted-foreground">Click "Generate" to create with AI.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const TeacherDashboard: React.FC<TeacherDashboardProps> = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'plan' | 'notes' | 'quiz'>('plan');
  
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState('');

  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuestion[] | null>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const selectedSubject = useMemo(() => subjects.find(s => s.id === selectedSubjectId), [selectedSubjectId]);
  const availableUnits = useMemo(() => selectedSubject?.units || [], [selectedSubject]);
  const selectedUnit = useMemo(() => availableUnits.find(u => u.id === selectedUnitId), [selectedUnitId, availableUnits]);
  const availableModules = useMemo(() => selectedUnit?.modules || [], [selectedUnit]);
  const selectedModule = useMemo(() => availableModules.find(m => m.id === selectedModuleId), [selectedModuleId, availableModules]);

  const handleSubjectChange = (subjectId: string) => {
      setSelectedSubjectId(subjectId);
      setSelectedUnitId('');
      setSelectedModuleId('');
      setGeneratedPlan('');
      setGeneratedNotes('');
      setGeneratedQuiz(null);
  };
  
  const handleUnitChange = (unitId: string) => {
      setSelectedUnitId(unitId);
      setSelectedModuleId('');
      setGeneratedPlan('');
      setGeneratedNotes('');
      setGeneratedQuiz(null);
  };

  const handleModuleChange = (moduleId: string) => {
      setSelectedModuleId(moduleId);
      setGeneratedPlan('');
      setGeneratedNotes('');
      setGeneratedQuiz(null);
  };

  const handleGenerateLessonPlan = async () => {
      if (!selectedSubject || !selectedUnit || !selectedModule) return;
      setIsGeneratingPlan(true);
      setGeneratedPlan('');
      try {
          const prompt = `Generate a detailed 40-minute lesson plan for the topic '${selectedModule.title}' within the unit '${selectedUnit.title}' for the subject '${selectedSubject.title}'. The lesson plan should be for a Nigerian ${selectedSubject.level} class and include: Learning Objectives, Instructional Materials, Prior Knowledge, Lesson Procedure (with teacher and student activities), Evaluation, Summary, and Assignment. Format the output neatly using markdown.`;
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: { systemInstruction: "You are an expert curriculum designer for the Nigerian education system." }
          });
          setGeneratedPlan(response.text);
      } catch (error) {
          console.error(error);
          setGeneratedPlan("Error generating lesson plan. Please try again.");
      } finally {
          setIsGeneratingPlan(false);
      }
  };

  const handleGenerateLessonNotes = async () => {
      if (!selectedSubject || !selectedUnit || !selectedModule) return;
      setIsGeneratingNotes(true);
      setGeneratedNotes('');
      const subTopics = selectedModule.topics.map(t => t.title).join(', ');
      try {
           const prompt = `Generate comprehensive lesson notes for the topic '${selectedModule.title}' under the unit '${selectedUnit.title}' for the subject '${selectedSubject.title}'. The notes should be detailed, easy for a Nigerian ${selectedSubject.level} student to understand, and structured with markdown. Cover these sub-topics if relevant: ${subTopics}.`;
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: { systemInstruction: "You are an expert textbook author for the Nigerian education system." }
          });
          setGeneratedNotes(response.text);
      } catch (error) {
          console.error(error);
          setGeneratedNotes("Error generating lesson notes. Please try again.");
      } finally {
          setIsGeneratingNotes(false);
      }
  };

  const handleGenerateQuiz = async () => {
      if (!selectedSubject || !selectedUnit || !selectedModule) return;
      setIsGeneratingQuiz(true);
      setGeneratedQuiz(null);
      try {
          const prompt = `Generate 5 multiple-choice quiz questions based on the topic '${selectedModule.title}' from the subject '${selectedSubject.title}'. The questions should be suitable for a Nigerian ${selectedSubject.level} student.`;
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

  const totalSubjects = subjects.filter(s => s.level !== 'General').length;
  const totalUnits = subjects.filter(s => s.level !== 'General').reduce((acc, s) => acc + s.units.length, 0);

  const tabs = [
    { id: 'plan', label: 'Lesson Plan', icon: BookCopy },
    { id: 'notes', label: 'Lesson Notes', icon: Edit },
    { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Teacher's Dashboard</h2>
            <p className="text-muted-foreground mt-1">Your AI-powered content generation studio.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                    <BookCopy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalSubjects} Subjects</div>
                    <p className="text-xs text-muted-foreground">Across JSS & SSS levels</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Curriculum Units</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUnits} Units</div>
                    <p className="text-xs text-muted-foreground">Ready for content generation</p>
                </CardContent>
            </Card>
             <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Teacher Tip</CardTitle>
                <Lightbulb className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                  <p className="text-sm">Use the "Quiz Generator" to quickly create exit tickets for your class to assess understanding.</p>
              </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Select Your Topic</CardTitle>
            <CardDescription>Choose a subject, unit, and module to focus your content generation.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    id="subject-select"
                    value={selectedSubjectId}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.title}</option>
                    ))}
                  </select>
                </div>
                 <div>
                  <label htmlFor="unit-select" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    id="unit-select"
                    value={selectedUnitId}
                    onChange={(e) => handleUnitChange(e.target.value)}
                    disabled={!selectedSubjectId || availableUnits.length === 0}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary disabled:bg-slate-100"
                  >
                    <option value="" disabled>Select a unit</option>
                    {availableUnits.map(unit => (
                        <option key={unit.id} value={unit.id}>{unit.title}</option>
                    ))}
                  </select>
                </div>
                 <div>
                  <label htmlFor="module-select" className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                  <select
                    id="module-select"
                    value={selectedModuleId}
                    onChange={(e) => handleModuleChange(e.target.value)}
                    disabled={!selectedUnitId || availableModules.length === 0}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary disabled:bg-slate-100"
                  >
                     <option value="" disabled>Select a module</option>
                     {availableModules.map(module => (
                        <option key={module.id} value={module.id}>{module.title}</option>
                    ))}
                  </select>
                </div>
             </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                 <CardTitle>2. Generate Your Content</CardTitle>
                 <CardDescription>Use the tabs below to create different resources for your selected module.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedModuleId ? (
                <div>
                   <div className="border-b border-gray-200 mb-6">
                      <nav className="-mb-px flex space-x-6">
                          {tabs.map(tab => {
                              const TabIcon = tab.icon;
                              return (
                               <button
                                  key={tab.id}
                                  onClick={() => setActiveTab(tab.id as 'plan'|'notes'|'quiz')}
                                  className={cn(
                                      'py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2',
                                      activeTab === tab.id
                                          ? 'border-primary text-primary'
                                          : 'border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300'
                                  )}
                              >
                                  <TabIcon className="w-4 h-4" /> {tab.label}
                              </button>
                          )})}
                      </nav>
                  </div>

                  <div>
                    {activeTab === 'plan' && (
                        <AiGeneratorCard
                            title="Lesson Plan Generator"
                            description="Create a detailed lesson plan for the selected module."
                            onGenerate={handleGenerateLessonPlan}
                            isLoading={isGeneratingPlan}
                            generatedContent={generatedPlan}
                        >
                            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: generatedPlan.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </AiGeneratorCard>
                    )}
                    {activeTab === 'notes' && (
                        <AiGeneratorCard
                            title="Lesson Notes Generator"
                            description="Generate comprehensive notes covering the topics in this module."
                            onGenerate={handleGenerateLessonNotes}
                            isLoading={isGeneratingNotes}
                            generatedContent={generatedNotes}
                        >
                            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: generatedNotes.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </AiGeneratorCard>
                    )}
                    {activeTab === 'quiz' && (
                      <AiGeneratorCard
                          title="Quiz Generator"
                          description="Instantly create a multiple choice quiz for this module."
                          onGenerate={handleGenerateQuiz}
                          isLoading={isGeneratingQuiz}
                          generatedContent={generatedQuiz}
                      >
                          <div className="space-y-4">
                              {generatedQuiz?.map((q, index) => (
                                  <div key={index} className="p-4 border rounded-md bg-white">
                                      <p className="font-semibold">{index + 1}. {q.question}</p>
                                      <div className="mt-2 space-y-1 text-sm">
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
                      </AiGeneratorCard>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground bg-slate-50 rounded-lg">
                    <p className="font-semibold">Please select a subject, unit, and module above.</p>
                    <p className="text-sm">Once a module is selected, the AI generation tools will appear here.</p>
                </div>
              )}
            </CardContent>
        </Card>
    </div>
  );
};

export default TeacherDashboard;