import React, { useState, useMemo } from 'react';
import { subjects } from '../data/subjects';
import type { Subject, Unit, Module, GeneratedQuestion } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { ChevronLeft, Wand2, Loader, Lightbulb } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface TeacherDashboardProps {}

const AiGeneratorCard = ({ title, description, onGenerate, isLoading, generatedContent, children }: { title: string, description: string, onGenerate: () => void, isLoading: boolean, generatedContent: any, children: React.ReactNode }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{title}</span>
                     <Button onClick={onGenerate} disabled={isLoading}>
                        {isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                        Generate
                    </Button>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex items-center justify-center h-40 bg-slate-50 rounded-md">
                        <Loader className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}
                {!isLoading && generatedContent && <div>{children}</div>}
                 {!isLoading && !generatedContent && (
                    <div className="flex flex-col items-center justify-center h-40 bg-slate-50 rounded-md text-center">
                        <Lightbulb className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-sm text-muted-foreground">Click "Generate" to create content.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const TeacherDashboard: React.FC<TeacherDashboardProps> = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  
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
          const prompt = `Generate a detailed 40-minute lesson plan for the topic '${selectedModule.title}' within the unit '${selectedUnit.title}' for the subject '${selectedSubject.title}'. The lesson plan should be for a Nigerian ${selectedSubject.level} class and include: Learning Objectives, Instructional Materials, Prior Knowledge, Lesson Procedure (with teacher and student activities), Evaluation, Summary, and Assignment. Format the output neatly using markdown headings.`;
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
           const prompt = `Generate comprehensive lesson notes for the topic '${selectedModule.title}' under the unit '${selectedUnit.title}' for the subject '${selectedSubject.title}'. The notes should be detailed, easy for a Nigerian ${selectedSubject.level} student to understand, and structured with markdown headings, subheadings, bullet points, and clear explanations. Cover these sub-topics if relevant: ${subTopics}.`;
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
          // In case of error, you could set a specific error state for the quiz
      } finally {
          setIsGeneratingQuiz(false);
      }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Content Generation Studio</CardTitle>
            <CardDescription>Select a subject, unit, and module to generate curriculum resources.</CardDescription>
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
        
        {selectedModuleId && (
            <div className="space-y-6">
                <AiGeneratorCard
                    title="Lesson Plan Generator"
                    description="Create a detailed lesson plan for the selected module."
                    onGenerate={handleGenerateLessonPlan}
                    isLoading={isGeneratingPlan}
                    generatedContent={generatedPlan}
                >
                    <div className="prose prose-sm max-w-none p-4 bg-slate-50 rounded-md" dangerouslySetInnerHTML={{ __html: generatedPlan.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </AiGeneratorCard>
                
                 <AiGeneratorCard
                    title="Lesson Notes Generator"
                    description="Generate comprehensive notes covering the topics in this module."
                    onGenerate={handleGenerateLessonNotes}
                    isLoading={isGeneratingNotes}
                    generatedContent={generatedNotes}
                >
                    <div className="prose prose-sm max-w-none p-4 bg-slate-50 rounded-md" dangerouslySetInnerHTML={{ __html: generatedNotes.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </AiGeneratorCard>

                <AiGeneratorCard
                    title="Quiz Generator"
                    description="Instantly create a 5-question multiple choice quiz for this module."
                    onGenerate={handleGenerateQuiz}
                    isLoading={isGeneratingQuiz}
                    generatedContent={generatedQuiz}
                >
                    <div className="space-y-4">
                        {generatedQuiz?.map((q, index) => (
                            <div key={index} className="p-4 border rounded-md">
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
            </div>
        )}
    </div>
  );
};

export default TeacherDashboard;