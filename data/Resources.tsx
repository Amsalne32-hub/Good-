

import React, { useState } from 'react';
import type { SubjectResources } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button, buttonVariants } from '../components/ui/Button';
import { Book, Download, Library, FileText, BookMarked, ArrowRight } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const baseButtonClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

interface ResourcesProps {
    resources: SubjectResources;
    subjectTitle: string;
    onNavigate: (view: 'eLibrary') => void;
}

type ActiveTab = 'textbooks' | 'ebooks' | 'journals';

const Resources: React.FC<ResourcesProps> = ({ resources, subjectTitle, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('textbooks');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'textbooks':
                return resources.textbooks.length > 0 ? (
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
                ) : <p className="text-sm text-muted-foreground text-center py-8">No recommended textbooks for this subject.</p>;
            case 'ebooks':
                return resources.ebooks.length > 0 ? (
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
                ) : <p className="text-sm text-muted-foreground text-center py-8">No recommended e-books for this subject.</p>;
            case 'journals':
                return resources.journals.length > 0 ? (
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
                ) : <p className="text-sm text-muted-foreground text-center py-8">No recommended journals for this subject.</p>;
        }
    }
    
    const tabs = [
        { id: 'textbooks', label: 'Textbooks', icon: <Book className="w-5 h-5"/> },
        { id: 'ebooks', label: 'E-Books', icon: <BookMarked className="w-5 h-5"/> },
        { id: 'journals', label: 'Journals', icon: <FileText className="w-5 h-5"/> },
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
                
                <Card className="my-6 bg-primary/10 border-primary/20 text-center sm:text-left">
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2"><Library className="text-primary"/> Explore the Full E-Library</CardTitle>
                            <CardDescription className="mt-1">Discover thousands of additional textbooks, e-books, and academic journals.</CardDescription>
                        </div>
                        <Button onClick={() => onNavigate('eLibrary')}>
                            Go to E-Library <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
                
                <div>{renderContent()}</div>
            </CardContent>
        </Card>
    );
};

export default Resources;
