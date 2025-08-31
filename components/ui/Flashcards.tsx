
import React, { useState, useEffect, useMemo } from 'react';
import type { Unit, Flashcard } from '../../types';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../data/Card';
import { Wand2, Loader, ArrowLeft, ArrowRight, Shuffle, Brain } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

interface FlashcardsProps {
  subjectId: string;
  units: Unit[];
  existingFlashcards: Flashcard[];
  onAddFlashcards: (flashcards: Flashcard[]) => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ subjectId, units, existingFlashcards, onAddFlashcards }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayedFlashcards, setDisplayedFlashcards] = useState<Flashcard[]>([]);

  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);

  const availableModules = useMemo(() => {
    if (!selectedUnitId) return [];
    return units.find(u => u.id === selectedUnitId)?.modules || [];
  }, [selectedUnitId, units]);
  
  const selectedModule = useMemo(() => {
      return availableModules.find(m => m.id === selectedModuleId);
  }, [selectedModuleId, availableModules]);

  useEffect(() => {
    if (selectedModule) {
        // A module's topics all belong to a single "topic" for flashcard purposes. 
        // We'll use the module ID as a proxy for the topic ID here.
        const topicId = selectedModule.id;
        const relevantFlashcards = existingFlashcards.filter(f => f.topicId === topicId);
        setDisplayedFlashcards(relevantFlashcards);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    } else {
        setDisplayedFlashcards([]);
    }
  }, [selectedModuleId, existingFlashcards, selectedModule]);

  const handleGenerateFlashcards = async () => {
    if (!selectedModule) return;
    setIsGenerating(true);
    try {
        const prompt = `Generate 5-7 key flashcards for the topic "${selectedModule.title}" from the subject "${subjectId}". Each flashcard should have a 'frontText' (a key term or question) and a 'backText' (a clear, concise definition or answer suitable for a secondary school student in Nigeria). For each card, also provide a simple, descriptive 'imageQuery' that could be used to find a relevant image (e.g., 'diagram of a plant cell', 'map of Nigeria'). Do not include an actual image URL.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        flashcards: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    frontText: { type: Type.STRING },
                                    backText: { type: Type.STRING },
                                    imageQuery: { type: Type.STRING },
                                },
                                required: ['frontText', 'backText', 'imageQuery']
                            }
                        }
                    },
                    required: ['flashcards']
                }
            }
        });

        const newFlashcardsData = JSON.parse(response.text).flashcards;
        const newFlashcards: Flashcard[] = newFlashcardsData.map((card: any, index: number) => ({
            id: `${selectedModule.id}-flashcard-${Date.now()}-${index}`,
            topicId: selectedModule.id,
            subjectId: subjectId,
            frontText: card.frontText,
            backText: card.backText,
            // Use picsum.photos with the imageQuery as a seed for a placeholder image
            imageUrl: `https://picsum.photos/seed/${encodeURIComponent(card.imageQuery)}/400/200`
        }));
        
        onAddFlashcards(newFlashcards);

    } catch (error) {
        console.error("Flashcard generation failed:", error);
        // Add user-facing error handling here if desired
    } finally {
        setIsGenerating(false);
    }
  };
  
  const currentCard = displayedFlashcards[currentCardIndex];
  
  const goToPrevCard = () => {
      setIsFlipped(false);
      setTimeout(() => {
          setCurrentCardIndex(prev => (prev === 0 ? displayedFlashcards.length - 1 : prev - 1));
      }, 150);
  };
  
  const goToNextCard = () => {
      setIsFlipped(false);
      setTimeout(() => {
          setCurrentCardIndex(prev => (prev === displayedFlashcards.length - 1 ? 0 : prev + 1));
      }, 150);
  };
  
  const shuffleCards = () => {
      setIsFlipped(false);
      setTimeout(() => {
          setDisplayedFlashcards(prev => [...prev].sort(() => Math.random() - 0.5));
          setCurrentCardIndex(0);
      }, 150);
  };

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Flashcard Generator</CardTitle>
                <CardDescription>Select a topic to review or generate new AI-powered flashcards.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-1">
                        <label htmlFor="unit-select-flashcard" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                        <select
                            id="unit-select-flashcard"
                            value={selectedUnitId}
                            onChange={(e) => { setSelectedUnitId(e.target.value); setSelectedModuleId(''); }}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary h-10"
                        >
                            <option value="" disabled>Select a unit</option>
                            {units.map(unit => <option key={unit.id} value={unit.id}>{unit.title}</option>)}
                        </select>
                    </div>
                     <div className="md:col-span-1">
                        <label htmlFor="module-select-flashcard" className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                        <select
                            id="module-select-flashcard"
                            value={selectedModuleId}
                            onChange={(e) => setSelectedModuleId(e.target.value)}
                            disabled={!selectedUnitId || availableModules.length === 0}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary disabled:bg-slate-100 h-10"
                        >
                            <option value="" disabled>Select a module</option>
                            {availableModules.map(module => <option key={module.id} value={module.id}>{module.title}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <Button onClick={handleGenerateFlashcards} disabled={isGenerating || !selectedModuleId} className="w-full">
                            {isGenerating ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                            Generate Flashcards
                        </Button>
                    </div>
                 </div>
            </CardContent>
        </Card>
        
        {displayedFlashcards.length > 0 ? (
            <div>
                <div className="relative h-64 w-full max-w-2xl mx-auto" style={{ perspective: '1000px' }}>
                    <div 
                        className="relative w-full h-full text-center transition-transform duration-500 cursor-pointer"
                        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        role="button"
                        tabIndex={0}
                        aria-label="Flashcard, click to flip"
                    >
                        {/* Front of the card */}
                        <div className="absolute w-full h-full p-6 bg-white border rounded-lg shadow-lg flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                            {currentCard.imageUrl && <img src={currentCard.imageUrl} alt={currentCard.frontText} className="max-h-24 w-auto rounded-md mb-4" />}
                            <p className="text-xl font-semibold">{currentCard.frontText}</p>
                        </div>
                        {/* Back of the card */}
                        <div className="absolute w-full h-full p-6 bg-primary/90 text-primary-foreground border rounded-lg shadow-lg flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <p className="text-lg">{currentCard.backText}</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 mt-4 max-w-2xl mx-auto">
                    <Button variant="outline" onClick={goToPrevCard}><ArrowLeft className="w-4 h-4 mr-2"/> Prev</Button>
                    <div className="text-sm font-medium text-muted-foreground">{currentCardIndex + 1} / {displayedFlashcards.length}</div>
                    <Button variant="outline" onClick={goToNextCard}>Next <ArrowRight className="w-4 h-4 ml-2"/></Button>
                    <Button variant="ghost" size="icon" onClick={shuffleCards} title="Shuffle cards"><Shuffle className="w-4 h-4"/></Button>
                </div>
            </div>
        ) : (
             <Card className="text-center py-16 text-muted-foreground bg-slate-50">
                <CardContent>
                    <Brain className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <p className="font-semibold">{selectedModuleId ? "No flashcards yet for this topic." : "Your flashcards will appear here."}</p>
                    <p className="text-sm">{selectedModuleId ? "Click 'Generate Flashcards' to create some!" : "Select a unit and module to begin."}</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
};

export default Flashcards;