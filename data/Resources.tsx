

import React, { useState, useMemo } from 'react';
import type { SubjectResources } from '../types';
import { dictionary } from './dictionary';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button, buttonVariants } from '../components/ui/Button';
import { Book, Download, Search, Library, FileText, BookMarked, Wand2, Loader } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const baseButtonClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

interface ResourcesProps {
    resources: SubjectResources;
    subjectTitle: string;
}

type ActiveTab = 'textbooks' | 'ebooks' | 'journals' | 'dictionary';

const Resources: React.FC<ResourcesProps> = ({ resources, subjectTitle }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('textbooks');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDefining, setIsDefining] = useState(false);
    const [definition, setDefinition] = useState<{ term: string; definition: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // This assumes the API_KEY is set in the environment
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const subjectArea = useMemo(() => {
        const lowerTitle = subjectTitle.toLowerCase();
        if (lowerTitle.includes('math')) return 'Mathematics';
        if (lowerTitle.includes('english')) return 'English';
        if (lowerTitle.includes('physics')) return 'Physics';
        return 'General';
    }, [subjectTitle]);

    const suggestedTerms = useMemo(() => {
        return dictionary.filter(entry => entry.subject === 'General' || entry.subject === subjectArea).slice(0, 5);
    }, [subjectArea]);
    
    const handleDefineTerm = async (termToDefine: string) => {
        if (!termToDefine.trim()) return;
        setIsDefining(true);
        setDefinition(null);
        setError(null);
        setSearchTerm(termToDefine);

        try {
            const prompt = `Define the term "${termToDefine}" within the context of ${subjectTitle} for a Nigerian secondary school student. Keep the definition clear, concise, and easy to understand. Start the definition directly, without any introductory phrases like "Here is the definition...". Do not use any special formatting characters like asterisks or quotes.`;
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            setDefinition({ term: termToDefine, definition: response.text });
        } catch (err) {
            console.error("AI Dictionary Error:", err);
            setError("Sorry, I couldn't fetch a definition for that term. Please try again.");
        } finally {
            setIsDefining(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleDefineTerm(searchTerm);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'textbooks':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {resources.textbooks.map(book => (
                            <Card key={book.id}>
                                <img src={book.coverUrl} alt={book.title} className="rounded-t-xl object-cover h-64 w-full" />
                                <CardHeader>
                                    <CardTitle className="text-lg">{book.title}</CardTitle>
                                    <CardDescription>{book.author}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer" className={cn(baseButtonClasses, buttonVariants.variant.default, buttonVariants.size.default, "w-full")}>
                                        <Download className="w-4 h-4 mr-2"/> Download
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            case 'ebooks':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resources.ebooks.map(book => (
                             <Card key={book.id} className="flex">
                                <img src={book.coverUrl} alt={book.title} className="rounded-l-xl object-cover h-full w-[33.33%]" />
                                <div className="flex flex-col justify-between w-[66.67%]">
                                    <CardHeader>
                                        <CardTitle>{book.title}</CardTitle>
                                        <CardDescription>by {book.author}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                                        <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer" className={cn(baseButtonClasses, buttonVariants.variant.default, buttonVariants.size.sm)}>
                                            <Download className="w-4 h-4 mr-2"/> View E-book
                                        </a>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                );
            case 'journals':
                return (
                     <div className="space-y-4">
                        {resources.journals.map(journal => (
                            <Card key={journal.id} className="flex items-center justify-between p-4">
                                <div>
                                    <h3 className="font-semibold">{journal.title}</h3>
                                    <p className="text-sm text-muted-foreground">{journal.publisher} - {journal.issue}</p>
                                </div>
                                <a href={journal.link} target="_blank" rel="noopener noreferrer" className={cn(baseButtonClasses, buttonVariants.variant.outline, buttonVariants.size.default)}>
                                    Read Journal
                                </a>
                            </Card>
                        ))}
                    </div>
                );
            case 'dictionary':
                return (
                    <div>
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Look up any term..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg h-10"
                                />
                            </div>
                            <Button type="submit" disabled={isDefining || !searchTerm.trim()}>
                                {isDefining ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                                Define
                            </Button>
                        </form>

                        <div className="min-h-[20rem]">
                            {isDefining && (
                                <div className="flex flex-col items-center justify-center text-center h-full">
                                    <Loader className="w-8 h-8 animate-spin text-primary" />
                                    <p className="mt-2 text-sm text-muted-foreground">Defining "{searchTerm}"...</p>
                                </div>
                            )}
                            {error && (
                                <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-center">
                                    <p className="font-semibold">An Error Occurred</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}
                            {definition && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">{definition.term}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-base leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{definition.definition}</p>
                                    </CardContent>
                                </Card>
                            )}
                            {!isDefining && !definition && !error && (
                                <div className="p-4 text-center text-muted-foreground bg-slate-50 rounded-lg h-full flex flex-col justify-center">
                                    <h3 className="font-semibold text-slate-700">AI-Powered Dictionary</h3>
                                    <p className="text-sm">Enter a term above to get a clear, simple definition.</p>
                                    <div className="mt-6">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Suggested Terms</h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {suggestedTerms.map(entry => (
                                                <button 
                                                    key={entry.term} 
                                                    onClick={() => handleDefineTerm(entry.term)}
                                                    className="px-3 py-1 bg-white border rounded-full text-sm hover:bg-accent hover:border-primary/50 transition-colors"
                                                >
                                                    {entry.term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
        }
    }
    
    const tabs = [
        { id: 'textbooks', label: 'Textbooks', icon: <Book className="w-5 h-5"/> },
        { id: 'ebooks', label: 'E-Books', icon: <BookMarked className="w-5 h-5"/> },
        { id: 'journals', label: 'Journals', icon: <FileText className="w-5 h-5"/> },
        { id: 'dictionary', label: 'AI Dictionary', icon: <Library className="w-5 h-5"/> },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Learning Resources</CardTitle>
                <CardDescription>Supplementary materials to enhance your understanding.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-6">
                        {tabs.map(tab => (
                             <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as ActiveTab)}
                                className={cn(
                                    'py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2',
                                    activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300'
                                )}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div>{renderContent()}</div>
            </CardContent>
        </Card>
    );
};

export default Resources;