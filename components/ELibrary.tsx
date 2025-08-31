
import React, { useState, useMemo, useEffect } from 'react';
import type { Subject, Textbook, Ebook, Journal } from '../types';
import { libraryTextbooks, libraryEbooks, libraryJournals } from '../data/library';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../data/Card';
import { Button, buttonVariants } from './ui/Button';
import { Search, Library, Book, Download, FileText, BookMarked, Wand2, Loader, MessageSquare, ChevronLeft } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const AIFeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    onGenerate: (term: string) => void;
    isLoading: boolean;
    result: { term: string; definition: string } | null;
    error: string | null;
}> = ({ icon, title, description, placeholder, buttonText, onGenerate, isLoading, result, error }) => {
    const [term, setTerm] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(term);
    };
    
    useEffect(() => {
        if(result) setTerm(result.term);
    }, [result]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            className="w-full pl-4 pr-4 py-2 border rounded-lg h-10"
                        />
                    </div>
                    <Button type="submit" disabled={isLoading || !term.trim()}>
                        {isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                        {buttonText}
                    </Button>
                </form>
                 <div className="min-h-[10rem]">
                    {isLoading && <div className="flex items-center justify-center h-full"><Loader className="w-6 h-6 animate-spin text-primary" /></div>}
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    {result && (
                        <div className="p-3 bg-slate-100 rounded-md">
                            <h4 className="font-semibold">{result.term}</h4>
                            <p className="text-sm mt-1 whitespace-pre-wrap">{result.definition}</p>
                        </div>
                    )}
                 </div>
            </CardContent>
        </Card>
    );
};

interface ELibraryProps {
  subjects: Subject[];
  onBack: () => void;
}

const ELibrary: React.FC<ELibraryProps> = ({ subjects, onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState<'all' | 'JSS' | 'SSS'>('all');
    
    const [isDefining, setIsDefining] = useState(false);
    const [definition, setDefinition] = useState<{ term: string; definition: string } | null>(null);
    const [defineError, setDefineError] = useState<string | null>(null);

    const [isResearching, setIsResearching] = useState(false);
    const [researchResult, setResearchResult] = useState<{ term: string; definition: string } | null>(null);
    const [researchError, setResearchError] = useState<string | null>(null);

    const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);

    const filteredResources = useMemo(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        const filterPredicate = (item: { title: string; author?: string; publisher?: string }) => 
            item.title.toLowerCase().includes(lowerSearchTerm) ||
            (item.author && item.author.toLowerCase().includes(lowerSearchTerm)) ||
            (item.publisher && item.publisher.toLowerCase().includes(lowerSearchTerm));

        const textbooks = libraryTextbooks.filter(filterPredicate);
        const ebooks = libraryEbooks.filter(filterPredicate);
        const journals = libraryJournals.filter(filterPredicate);
        
        return { textbooks, ebooks, journals };
    }, [searchTerm]);

    const handleDefineTerm = async (termToDefine: string) => {
        if (!termToDefine.trim()) return;
        setIsDefining(true); setDefinition(null); setDefineError(null);
        try {
            const prompt = `Define the term "${termToDefine}" for a Nigerian secondary school student. Keep the definition clear, concise, and easy to understand. Start the definition directly. Do not use any special formatting characters.`;
            const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
            setDefinition({ term: termToDefine, definition: response.text });
        } catch (err) { setDefineError("Sorry, I couldn't fetch a definition."); } finally { setIsDefining(false); }
    };

    const handleResearchTopic = async (topic: string) => {
        if (!topic.trim()) return;
        setIsResearching(true); setResearchResult(null); setResearchError(null);
        try {
            const prompt = `Provide a brief, one-paragraph summary of the topic "${topic}" for a secondary school student. Focus on the key points. Do not use special formatting characters.`;
            const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
            setResearchResult({ term: topic, definition: response.text });
        } catch (err) { setResearchError("Sorry, I couldn't research that topic."); } finally { setIsResearching(false); }
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4">
                <ChevronLeft className="w-4 h-4 mr-2" /> Back to Journey
            </Button>
            <header className="mb-8 text-center">
                <Library className="w-16 h-16 mx-auto text-primary" />
                <h1 className="text-4xl font-bold text-gray-800 mt-4">E-Library</h1>
                <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">Access a vast collection of textbooks, e-books, and academic journals to support your learning.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <AIFeatureCard 
                    icon={<BookMarked className="text-blue-500"/>}
                    title="AI Dictionary"
                    description="Get simple, clear definitions for any term or concept you encounter."
                    placeholder="e.g., Photosynthesis, Alliteration"
                    buttonText="Define"
                    onGenerate={handleDefineTerm}
                    isLoading={isDefining}
                    result={definition}
                    error={defineError}
                />
                 <AIFeatureCard 
                    icon={<MessageSquare className="text-green-500"/>}
                    title="AI Research Assistant"
                    description="Get quick summaries and overviews of any topic to kickstart your research."
                    placeholder="e.g., The Nigerian Civil War, Pythagoras' Theorem"
                    buttonText="Summarize"
                    onGenerate={handleResearchTopic}
                    isLoading={isResearching}
                    result={researchResult}
                    error={researchError}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Browse the Collection</CardTitle>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by title, author, or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Book/> Textbooks</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredResources.textbooks.map(book => (
                             <Card key={book.id}>
                                <img src={book.coverUrl} alt={book.title} className="rounded-t-xl object-cover h-56 w-full" />
                                <CardHeader className="p-4">
                                    <CardTitle className="text-md leading-tight h-10">{book.title}</CardTitle>
                                    <CardDescription className="text-xs">{book.author}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    {/* FIX: The 'buttonVariants' is an object, not a function. Manually apply classes for 'a' tag to look like a button. */}
                                    <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", buttonVariants.variant.default, buttonVariants.size.sm, "w-full")}>
                                        <Download className="w-4 h-4 mr-2"/> Download
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    
                     <h3 className="text-xl font-semibold my-6 flex items-center gap-2"><BookMarked/> E-Books & Literature</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredResources.ebooks.map(book => (
                             <Card key={book.id} className="flex">
                                <img src={book.coverUrl} alt={book.title} className="rounded-l-xl object-cover h-full w-1/3" />
                                <div className="flex flex-col justify-between w-2/3">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{book.title}</CardTitle>
                                        <CardDescription>by {book.author}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{book.description}</p>
                                        {/* FIX: The 'buttonVariants' is an object, not a function. Manually apply classes for 'a' tag to look like a button. */}
                                        <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", buttonVariants.variant.default, buttonVariants.size.sm)}>
                                            <Download className="w-4 h-4 mr-2"/> View E-book
                                        </a>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold my-6 flex items-center gap-2"><FileText/> Journals & Publications</h3>
                    <div className="space-y-4">
                        {filteredResources.journals.map(journal => (
                            <Card key={journal.id} className="flex items-center justify-between p-4">
                                <div>
                                    <h3 className="font-semibold">{journal.title}</h3>
                                    <p className="text-sm text-muted-foreground">{journal.publisher} - {journal.issue}</p>
                                </div>
                                {/* FIX: The 'buttonVariants' is an object, not a function. Manually apply classes for 'a' tag to look like a button. */}
                                <a href={journal.link} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", buttonVariants.variant.outline, buttonVariants.size.default)}>
                                    Read Journal
                                </a>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ELibrary;
