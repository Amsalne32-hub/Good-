import React, { useState, useMemo } from 'react';
import type { Subject, CareerPathway } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Compass, Loader, Wand2, Briefcase, Wrench, GraduationCap, UserCheck } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

interface CareerCompassProps {
  subjects: Subject[];
}

const CareerCompass: React.FC<CareerCompassProps> = ({ subjects }) => {
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pathway, setPathway] = useState<CareerPathway | null>(null);

    const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);

    const handleExplore = async () => {
        const subject = subjects.find(s => s.id === selectedSubjectId);
        if (!subject) return;

        setIsLoading(true);
        setError(null);
        setPathway(null);
        
        const prompt = `For a student interested in ${subject.title}, provide a detailed career pathway suitable for Nigeria. This should include:
1.  A list of 3-4 related careers with brief, one-sentence descriptions.
2.  A list of 5-6 key skills needed for these careers.
3.  A list of 3-4 relevant university courses and for each course, a list of 2-3 Nigerian universities known for that program.
4.  A short, inspirational profile (3-4 sentences) of a successful Nigerian professional in a related field.
Ensure all text uses simple language and contains no special formatting characters.`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            relatedCareers: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        field: { type: Type.STRING },
                                        description: { type: Type.STRING }
                                    },
                                    required: ['field', 'description']
                                }
                            },
                            keySkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                            universityPathways: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        courseName: { type: Type.STRING },
                                        institutions: { type: Type.ARRAY, items: { type: Type.STRING } }
                                    },
                                    required: ['courseName', 'institutions']
                                }
                            },
                            inspirationalProfile: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    title: { type: Type.STRING },
                                    story: { type: Type.STRING }
                                },
                                required: ['name', 'title', 'story']
                            }
                        },
                         required: ['relatedCareers', 'keySkills', 'universityPathways', 'inspirationalProfile']
                    }
                }
            });
            setPathway(JSON.parse(response.text));
        } catch (err) {
            console.error("Career Compass Error:", err);
            setError("Sorry, an error occurred while charting your course. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8 text-center">
                <Compass className="w-16 h-16 mx-auto text-primary" />
                <h1 className="text-4xl font-bold text-gray-800 mt-4">Career Compass</h1>
                <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">Discover your future! Select a subject you're passionate about to explore related career opportunities in Nigeria.</p>
            </header>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Chart Your Course</CardTitle>
                    <CardDescription>What subject sparks your interest?</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select
                            value={selectedSubjectId}
                            onChange={(e) => setSelectedSubjectId(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        >
                            <option value="" disabled>Select a subject...</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.title}</option>
                            ))}
                        </select>
                        <Button onClick={handleExplore} disabled={!selectedSubjectId || isLoading} className="sm:w-auto">
                            {isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                            Explore Careers
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 max-w-4xl mx-auto">
                {isLoading && (
                    <div className="text-center text-muted-foreground">
                        <Loader className="w-8 h-8 mx-auto animate-spin text-primary mb-4" />
                        <p className="font-semibold">Discovering your future...</p>
                        <p className="text-sm">Our AI is analyzing career paths for you.</p>
                    </div>
                )}
                {error && <p className="text-center text-destructive">{error}</p>}
                {pathway && (
                    <div className="space-y-6">
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Briefcase className="text-primary"/> Related Careers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {pathway.relatedCareers.map(career => (
                                        <li key={career.field} className="p-3 bg-slate-50 rounded-md">
                                            <h4 className="font-semibold">{career.field}</h4>
                                            <p className="text-sm text-muted-foreground">{career.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Wrench className="text-primary"/> Key Skills</CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <div className="flex flex-wrap gap-2">
                                        {pathway.keySkills.map(skill => (
                                            <span key={skill} className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full">{skill}</span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><GraduationCap className="text-primary"/> University Pathways</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {pathway.universityPathways.map(course => (
                                            <li key={course.courseName}>
                                                <h4 className="font-semibold text-sm">{course.courseName}</h4>
                                                <p className="text-xs text-muted-foreground">{course.institutions.join(', ')}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><UserCheck className="text-primary"/> Inspirational Profile</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-bold">{pathway.inspirationalProfile.name}</h4>
                                <p className="text-sm font-semibold text-primary mb-2">{pathway.inspirationalProfile.title}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{pathway.inspirationalProfile.story}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

        </div>
    );
};

export default CareerCompass;
