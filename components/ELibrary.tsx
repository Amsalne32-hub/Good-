import React, { useState, useMemo, useEffect } from 'react';
import type { Subject, Textbook, Ebook, Journal } from '../types';
import { libraryTextbooks, libraryEbooks, libraryJournals } from '../data/library';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Button, buttonVariants } from './ui/Button';
import { Search, Library, Book, Download, FileText, BookMarked, Wand2, Loader, MessageSquare } from 'lucide-react';
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
  onNavigate: (view: 'eLibrary') => void;
}

const ELibrary: React.FC<ELibraryProps> = ({ subjects, onNavigate }) => {
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
            const prompt = `Provide a concise summary on the topic "${topic}" for a Nigerian secondary school student. The summary should be a few paragraphs long, highlighting the key points. Do not use any special formatting characters.`;
            const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
            setResearchResult({ term: topic, definition: response.text });
        } catch (err) { setResearchError("Sorry, I couldn't research that topic."); } finally { setIsResearching(false); }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8 text-center">
                <Library className="w-16 h-16 mx-auto text-primary" />
                <h1 className="text-4xl font-bold text-gray-800 mt-4">E-Library</h1>
                <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">Your central hub for textbooks, literature, journals, and AI-powered research tools.</p>
            </header>

            <div className="relative mb-8 max-w-3xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search for books, authors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border rounded-full text-lg shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <AIFeatureCard 
                    icon={<BookMarked />}
                    title="AI Dictionary"
                    description="Look up any term and get a simple, clear definition."
                    placeholder="e.g., 'Photosynthesis'"
                    buttonText="Define"
                    onGenerate={handleDefineTerm}
                    isLoading={isDefining}
                    result={definition}
                    error={defineError}
                />
                <AIFeatureCard 
                    icon={<MessageSquare />}
                    title="AI Research Assistant"
                    description="Get a quick summary on any topic to kickstart your learning."
                    placeholder="e.g., 'The Nigerian Civil War'"
                    buttonText="Summarize"
                    onGenerate={handleResearchTopic}
                    isLoading={isResearching}
                    result={researchResult}
                    error={researchError}
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Library Collections</h2>
                <div className="space-y-10">
                    <section>
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><Book className="text-primary"/> Textbooks</h3>
                        {filteredResources.textbooks.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {filteredResources.textbooks.map(book => (
                                    <div key={book.id} className="group">
                                        <img src={book.coverUrl} alt={book.title} className="rounded-lg object-cover w-full aspect-[2/3] shadow-md group-hover:shadow-xl transition-shadow" />
                                        <h4 className="text-sm font-semibold mt-2 truncate">{book.title}</h4>
                                        <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-sm text-muted-foreground">No textbooks match your search.</p>}
                    </section>
                    
                    <section>
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><BookMarked className="text-primary"/> E-Books & Literature</h3>
                         {filteredResources.ebooks.length > 0 ? (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredResources.ebooks.map(book => (
                                     <Card key={book.id} className="flex hover:shadow-md transition-shadow">
                                        <img src={book.coverUrl} alt={book.title} className="rounded-l-xl object-cover h-full w-32" />
                                        <div className="flex flex-col p-4">
                                            <h4 className="font-bold">{book.title}</h4>
                                            <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
                                            <p className="text-sm text-muted-foreground flex-grow">{book.description}</p>
                                            <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants.variant.outline, buttonVariants.size.sm, "mt-2 w-fit")}>
                                                Read Online
                                            </a>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                         ) : <p className="text-sm text-muted-foreground">No e-books match your search.</p>}
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><FileText className="text-primary"/> Academic Journals</h3>
                         {filteredResources.journals.length > 0 ? (
                            <div className="space-y-3">
                                {filteredResources.journals.map(journal => (
                                    <Card key={journal.id} className="flex items-center justify-between p-3">
                                        <div>
                                            <h4 className="font-semibold text-sm">{journal.title}</h4>
                                            <p className="text-xs text-muted-foreground">{journal.publisher} - {journal.issue}</p>
                                        </div>
                                        <a href={journal.link} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants.variant.outline, buttonVariants.size.sm)}>
                                            Read Journal
                                        </a>
                                    </Card>
                                ))}
                            </div>
                        ) : <p className="text-sm text-muted-foreground">No journals match your search.</p>}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ELibrary;
