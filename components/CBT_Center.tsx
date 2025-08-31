
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { CBT_Category, CBT_Subject, CBT_Question, CBT_TestConfig, CBT_Result, CBT_HistoryItem } from '../types';
import { cbtCategories } from '../data/cbtSubjects';
import { cbtQuestionBank } from '../data/cbtQuestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../data/Card';
import { Button } from './ui/Button';
import { ChevronLeft, Check, X, Clock, CheckCircle, Trophy, School, Book, GraduationCap, BarChart, History, XCircle } from 'lucide-react';
import ProgressBar from './ui/ProgressBar';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const mockHistory: CBT_HistoryItem[] = [
    { id: 'h1', date: 'Yesterday', categoryName: 'Senior School', subjectNames: ['Physics', 'Chemistry'], score: 75, totalQuestions: 40 },
    { id: 'h2', date: '3 days ago', categoryName: 'JAMB UTME', subjectNames: ['Use of English'], score: 88, totalQuestions: 50 },
    { id: 'h3', date: 'Last week', categoryName: 'Junior School', subjectNames: ['Mathematics'], score: 60, totalQuestions: 30 },
];

// Fisher-Yates Shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const CBT_Dashboard: React.FC<{ onSelectCategory: (category: CBT_Category) => void; history: CBT_HistoryItem[] }> = ({ onSelectCategory, history }) => {
    const categoryIcons = {
        JUNIOR_SCHOOL: <School className="w-10 h-10 text-blue-500" />,
        SENIOR_SCHOOL: <Book className="w-10 h-10 text-green-500" />,
        JAMB: <GraduationCap className="w-10 h-10 text-purple-500" />,
    };

    const stats = useMemo(() => {
        if (history.length === 0) return { testsTaken: 0, avgScore: 0, highestScore: 0 };
        const totalScore = history.reduce((sum, item) => sum + item.score, 0);
        const highestScore = Math.max(...history.map(item => item.score));
        return {
            testsTaken: history.length,
            avgScore: Math.round(totalScore / history.length),
            highestScore: highestScore,
        };
    }, [history]);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">CBT Dashboard</h1>
                <p className="text-muted-foreground mt-1">Your personal command center for exam preparation.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tests Taken</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.testsTaken}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgScore}%</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.highestScore}%</div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Start a New Test</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cbtCategories.map(category => (
                        <Card key={category.id} className="text-left hover:shadow-lg hover:border-primary transition-all flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{category.name}</CardTitle>
                                        <CardDescription className="mt-1 h-10">{category.description}</CardDescription>
                                    </div>
                                    {categoryIcons[category.id]}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end">
                                <Button className="w-full mt-4" onClick={() => onSelectCategory(category)}>Start Practice</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                 <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><History/> Recent Test History</h2>
                 <Card>
                     <CardContent className="p-0">
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Category</th>
                                        <th className="p-4 font-medium">Subjects</th>
                                        <th className="p-4 font-medium text-right">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map(item => (
                                        <tr key={item.id} className="border-b last:border-0">
                                            <td className="p-4">{item.date}</td>
                                            <td className="p-4">{item.categoryName}</td>
                                            <td className="p-4">{item.subjectNames.join(', ')}</td>
                                            <td className="p-4 text-right font-semibold">{item.score}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                     </CardContent>
                 </Card>
            </div>

        </div>
    );
};


const CBT_Config: React.FC<{ category: CBT_Category; onStartTest: (config: CBT_TestConfig) => void; onBack: () => void; }> = ({ category, onStartTest, onBack }) => {
    const [standard, setStandard] = useState(category.standards[0]);
    const [selectedSubjects, setSelectedSubjects] = useState<CBT_Subject[]>([]);
    const [questionCount, setQuestionCount] = useState(30);

    const calculatedTime = useMemo(() => Math.ceil(questionCount * 0.5), [questionCount]);

    const handleSubjectToggle = (subject: CBT_Subject) => {
        setSelectedSubjects(prev =>
            prev.some(s => s.id === subject.id) ? prev.filter(s => s.id !== subject.id) : [...prev, subject]
        );
    };
    
    const subjectGroups = category.subjects.reduce((acc, subject) => {
        (acc[subject.category] = acc[subject.category] || []).push(subject);
        return acc;
    }, {} as Record<string, CBT_Subject[]>);

    const handleSubmit = () => {
        onStartTest({ category, standard, subjects: selectedSubjects, timeLimit: calculatedTime, questionCount });
    };

    return (
        <div>
            <Button variant="ghost" onClick={onBack} className="mb-4"><ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Configure Your Practice Test</CardTitle>
                    <CardDescription>Customize your test for {category.name}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {category.standards.length > 1 && (
                        <div>
                            <label className="block text-lg font-semibold mb-2">Examination Standard</label>
                            <div className="flex gap-2">
                                {category.standards.map(std => <Button key={std} variant={standard === std ? 'default' : 'outline'} onClick={() => setStandard(std)}>{std.replace('_', ' ')}</Button>)}
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Subjects ({selectedSubjects.length} selected)</label>
                        <div className="space-y-4">
                            {Object.entries(subjectGroups).map(([groupName, subjects]) => (
                                <div key={groupName}>
                                    <h4 className="font-medium text-md mb-2">{groupName}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {subjects.map(sub => (
                                            <Button key={sub.id} variant={selectedSubjects.some(s => s.id === sub.id) ? 'default' : 'outline'} size="sm" onClick={() => handleSubjectToggle(sub)}>{sub.name}</Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="question-count" className="block text-lg font-semibold mb-2">Number of Questions: {questionCount}</label>
                        <input id="question-count" type="range" min="10" max="100" step="5" value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} className="w-full"/>
                        <p className="text-sm text-muted-foreground mt-2">Estimated time: <strong>{calculatedTime} minutes</strong> (~30 seconds per question)</p>
                    </div>
                    <Button onClick={handleSubmit} disabled={selectedSubjects.length === 0} size="lg" className="w-full">Start Test</Button>
                </CardContent>
            </Card>
        </div>
    );
};

const CBT_Test: React.FC<{ config: CBT_TestConfig; questions: CBT_Question[]; onFinishTest: (answers: { [key: string]: number | null }, timeTaken: number) => void; }> = ({ config, questions, onFinishTest }) => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});
    const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60);
    
    const startTime = useMemo(() => Date.now(), []);

    const handleSubmit = useCallback(() => {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        onFinishTest(answers, timeTaken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers, startTime, onFinishTest]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [handleSubmit]);
    
    const currentQ = questions[currentQIndex];

    return (
        <div className="bg-slate-50 min-h-screen -m-8 p-8 flex flex-col">
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{config.category.name} Practice</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-semibold text-lg p-2 rounded-md bg-white border"><Clock className="w-5 h-5 text-primary"/><span>{Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}</span></div>
                </div>
            </header>
            <ProgressBar value={((currentQIndex + 1) / questions.length) * 100} className="mb-6 h-1.5"/>
            <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <p className="font-semibold mb-2">Question {currentQIndex + 1} of {questions.length}</p>
                    <Card>
                        <CardHeader><CardTitle>{currentQ.question}</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {currentQ.options.map((opt, i) => (
                                <label key={i} className={cn("flex items-center p-4 border rounded-lg cursor-pointer transition-colors text-lg", answers[currentQ.id] === i ? 'bg-primary/10 border-primary' : 'hover:bg-slate-50')}>
                                    <input type="radio" name={currentQ.id} checked={answers[currentQ.id] === i} onChange={() => setAnswers(p => ({...p, [currentQ.id]: i}))} className="w-5 h-5 text-primary focus:ring-primary"/>
                                    <span className="ml-4">{opt}</span>
                                </label>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-4">
                     <Card>
                        <CardHeader><CardTitle>Question Navigator</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-5 gap-2">
                            {questions.map((q, index) => (
                                <Button
                                    key={q.id}
                                    variant={
                                        currentQIndex === index
                                            ? 'default'
                                            : answers[q.id] !== undefined && answers[q.id] !== null
                                            ? 'secondary'
                                            : 'outline'
                                    }
                                    size="icon"
                                    onClick={() => setCurrentQIndex(index)}
                                    className="h-10 w-10"
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <footer className="mt-8 flex justify-between items-center">
                <Button variant="outline" onClick={() => setCurrentQIndex(p => Math.max(0, p - 1))} disabled={currentQIndex === 0}>Previous</Button>
                {currentQIndex === questions.length - 1 ? (
                    <Button onClick={handleSubmit} size="lg" className="bg-success hover:bg-success/90">Submit Test</Button>
                ) : (
                    <Button onClick={() => setCurrentQIndex(p => Math.min(questions.length - 1, p + 1))}>Next</Button>
                )}
            </footer>
        </div>
    );
};

const CBT_Results: React.FC<{ result: CBT_Result; onRestart: () => void; onBack: () => void; }> = ({ result, onRestart, onBack }) => {
    const passed = result.score >= 50;
    return (
       <div>
            <Button variant="ghost" onClick={onBack} className="mb-4"><ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Button>
            <Card className="text-center">
                 <CardHeader>
                    <div className={cn("mx-auto flex h-20 w-20 items-center justify-center rounded-full", passed ? "bg-success/20" : "bg-destructive/20")}>
                        {passed ? <CheckCircle className="h-12 w-12 text-success" /> : <XCircle className="h-12 w-12 text-destructive" />}
                    </div>
                    <CardTitle className="text-3xl mt-4">Test Complete!</CardTitle>
                    <CardDescription>Here's your performance breakdown.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                        <div><p className={cn("text-4xl font-bold", passed ? "text-success" : "text-destructive")}>{result.score}%</p><p className="text-sm text-muted-foreground">Your Score</p></div>
                        <div><p className="text-4xl font-bold">{result.correctAnswers}/{result.totalQuestions}</p><p className="text-sm text-muted-foreground">Correct</p></div>
                        <div><p className="text-4xl font-bold">{result.totalQuestions - result.correctAnswers}</p><p className="text-sm text-muted-foreground">Incorrect</p></div>
                        <div><p className="text-4xl font-bold">{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</p><p className="text-sm text-muted-foreground">Time Taken</p></div>
                    </div>
                     <div className="flex justify-center gap-4 mb-8">
                        <Button variant="outline" onClick={onBack}>Dashboard</Button>
                        <Button onClick={onRestart}>Take Another Test</Button>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Review Your Answers</h3>
                        <div className="space-y-4 text-left max-h-96 overflow-y-auto pr-2">
                            {result.questions.map((q, index) => {
                                const userAnswerIndex = result.userAnswers[q.id];
                                const isCorrect = userAnswerIndex === q.correctAnswer;
                                return (
                                    <div key={q.id} className="p-4 border rounded-lg bg-slate-50">
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold">{index + 1}. {q.question}</p>
                                            {isCorrect ? <Check className="w-5 h-5 text-success flex-shrink-0 ml-2"/> : <X className="w-5 h-5 text-destructive flex-shrink-0 ml-2"/>}
                                        </div>
                                        <div className="mt-2 space-y-1 text-sm">
                                            {q.options.map((opt, i) => (
                                                <p key={i} className={cn(
                                                    "p-1 rounded",
                                                    i === q.correctAnswer && "bg-success/20 text-success-foreground font-semibold",
                                                    i === userAnswerIndex && !isCorrect && "bg-destructive/20 text-destructive-foreground line-through"
                                                )}>{opt}</p>
                                            ))}
                                        </div>
                                        {!isCorrect && <p className="text-xs mt-2 p-2 bg-slate-100 rounded"><strong>Explanation:</strong> {q.explanation}</p>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
       </div>
    )
};


interface CBT_CenterProps {
    onBack: () => void;
}

const CBT_Center: React.FC<CBT_CenterProps> = ({ onBack }) => {
    const [view, setView] = useState<'dashboard' | 'config' | 'test' | 'results'>('dashboard');
    const [selectedCategory, setSelectedCategory] = useState<CBT_Category | null>(null);
    const [testConfig, setTestConfig] = useState<CBT_TestConfig | null>(null);
    const [testQuestions, setTestQuestions] = useState<CBT_Question[]>([]);
    const [testResult, setTestResult] = useState<CBT_Result | null>(null);
    const [history, setHistory] = useState<CBT_HistoryItem[]>(mockHistory);

    const handleSelectCategory = (category: CBT_Category) => {
        setSelectedCategory(category);
        setView('config');
    };
    
    const handleStartTest = (config: CBT_TestConfig) => {
        const questionsForTest = cbtQuestionBank.filter(q =>
            config.subjects.some(s => s.id === q.subjectId) &&
            q.standard === config.standard
        );
        const selectedQuestions = shuffleArray(questionsForTest).slice(0, config.questionCount);
        
        setTestConfig(config);
        setTestQuestions(selectedQuestions);
        setView('test');
    };

    const handleFinishTest = (answers: { [key: string]: number | null }, timeTaken: number) => {
        if (!testConfig) return;
        let correctAnswers = 0;
        testQuestions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctAnswers++;
            }
        });
        const score = Math.round((correctAnswers / testQuestions.length) * 100);
        const result: CBT_Result = {
            score, totalQuestions: testQuestions.length, correctAnswers, timeTaken,
            config: testConfig, questions: testQuestions, userAnswers: answers
        };
        setTestResult(result);

        const newHistoryItem: CBT_HistoryItem = {
            id: `h${Date.now()}`,
            date: 'Today',
            categoryName: testConfig.category.name,
            subjectNames: testConfig.subjects.map(s => s.name),
            score: result.score,
            totalQuestions: result.totalQuestions
        };
        setHistory(prev => [newHistoryItem, ...prev]);

        setView('results');
    };
    
    const handleRestart = () => {
        setView('dashboard');
        setSelectedCategory(null);
        setTestConfig(null);
        setTestQuestions([]);
        setTestResult(null);
    };

    const renderView = () => {
        switch (view) {
            case 'config': return <CBT_Config category={selectedCategory!} onStartTest={handleStartTest} onBack={handleRestart} />;
            case 'test': return <CBT_Test config={testConfig!} questions={testQuestions} onFinishTest={handleFinishTest} />;
            case 'results': return <CBT_Results result={testResult!} onRestart={handleRestart} onBack={handleRestart} />;
            case 'dashboard':
            default: return <CBT_Dashboard onSelectCategory={handleSelectCategory} history={history} />;
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             {view !== 'test' && view !== 'dashboard' && <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4"><ChevronLeft className="w-4 h-4 mr-2"/> Back to Main Dashboard</Button>}
             {view === 'dashboard' && <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4"><ChevronLeft className="w-4 h-4 mr-2"/> Back to Main Dashboard</Button>}
            {renderView()}
        </div>
    );
};

export default CBT_Center;
