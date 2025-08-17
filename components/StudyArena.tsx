import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { arenaGames as initialGames } from '../data/arenaGames';
import { assessments } from '../data/assessments';
import type { QuizGame, Player, Question, StudentProfile } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Users, Play, Clock, Trophy, BarChart, Award, Star, ChevronLeft, Check, X } from 'lucide-react';
import ProgressBar from './ui/ProgressBar';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const allQuestions = new Map<string, Question>();
assessments.forEach(assessment => {
    assessment.questions.forEach(q => {
        if (q.type !== 'essay') {
            allQuestions.set(q.id, q);
        }
    });
});

const Lobby: React.FC<{ games: QuizGame[]; onJoin: (game: QuizGame) => void; }> = ({ games, onJoin }) => (
    <div>
        <h1 className="text-4xl font-bold text-gray-800">Study Arena</h1>
        <p className="text-muted-foreground mt-1">Challenge your peers in live quiz battles!</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
                <Card key={game.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{game.title}</CardTitle>
                        <CardDescription>{game.topic}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{game.players.length + 1} players waiting</span>
                        </div>
                        <Button className="w-full" onClick={() => onJoin(game)}>
                            <Play className="w-4 h-4 mr-2" /> Join Game
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

const Results: React.FC<{ players: Player[], onBackToLobby: () => void }> = ({ players, onBackToLobby }) => {
    const sortedPlayers = useMemo(() => [...players].sort((a, b) => b.score - a.score), [players]);
    const podium = sortedPlayers.slice(0, 3);
    const userRank = sortedPlayers.findIndex(p => p.isUser) + 1;

    return (
        <div className="text-center relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => {
                    const style = {
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    };
                    return <div key={i} className="absolute top-0 w-2 h-2 rounded-full animate-[confetti-fall_5s_linear_infinite]" style={style}></div>
                })}
            </div>
            <Trophy className="w-24 h-24 mx-auto text-amber-400" />
            <h1 className="text-4xl font-bold mt-4">Game Over!</h1>
            <p className="text-muted-foreground">Well done, here are the results.</p>
            
            <div className="mt-8 flex justify-center items-end gap-4">
                {podium[1] && <div className="p-4 rounded-lg bg-slate-200 w-1/4">2nd<h3 className="font-bold text-lg">{podium[1].name}</h3><p>{podium[1].score} pts</p></div>}
                {podium[0] && <div className="p-6 rounded-lg bg-amber-300 w-1/3 order-first sm:order-none">1st<h3 className="font-bold text-2xl">{podium[0].name}</h3><p>{podium[0].score} pts</p></div>}
                {podium[2] && <div className="p-4 rounded-lg bg-orange-200 w-1/4">3rd<h3 className="font-bold text-lg">{podium[2].name}</h3><p>{podium[2].score} pts</p></div>}
            </div>

            <div className="mt-8">
                <p className="font-semibold">Your Rank: {userRank}</p>
                <Button onClick={onBackToLobby} className="mt-4">Back to Lobby</Button>
            </div>
        </div>
    );
}

const Game: React.FC<{ game: QuizGame; onGameEnd: (finalPlayers: Player[]) => void; studentName: string }> = ({ game, onGameEnd, studentName }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [answered, setAnswered] = useState<number | null>(null);

    useEffect(() => {
        const gameQuestions = game.questionIds.map(id => allQuestions.get(id)).filter((q): q is Question => !!q);
        setQuestions(gameQuestions);
        
        const initialPlayers = [...game.players, { id: 'user', name: studentName, score: 0, isUser: true }];
        setPlayers(initialPlayers.sort(() => Math.random() - 0.5));
    }, [game, studentName]);

    const handleNextQuestion = useCallback(() => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(q => q + 1);
            setTimeLeft(20);
            setAnswered(null);
        } else {
            onGameEnd(players);
        }
    }, [currentQ, questions.length, onGameEnd, players]);
    
    useEffect(() => {
        if (timeLeft > 0 && answered === null) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && answered === null) {
            setAnswered(-1); // Mark as unanswered
            setTimeout(handleNextQuestion, 2000);
        }
    }, [timeLeft, answered, handleNextQuestion]);

    const handleAnswer = (optionIndex: number) => {
        if (answered !== null) return;
        setAnswered(optionIndex);

        const question = questions[currentQ];
        if (optionIndex === question.correctAnswer) {
            const points = question.points + timeLeft; // Bonus for speed
            setPlayers(prev => prev.map(p => p.isUser ? { ...p, score: p.score + points } : p));
        }

        setTimeout(handleNextQuestion, 2000);
    };

    const question = questions[currentQ];
    if (!question) return <div>Loading questions...</div>;

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 order-last lg:order-first">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><BarChart/> Leaderboard</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {sortedPlayers.map((p, i) => (
                                <li key={p.id} className={cn("flex justify-between p-2 rounded-md text-sm", p.isUser ? "bg-primary/10" : "")}>
                                    <span className="font-semibold">{i + 1}. {p.name}</span>
                                    <span className="font-bold">{p.score}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-9">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold">Question {currentQ + 1}/{questions.length}</p>
                    <div className="flex items-center gap-2 font-bold text-lg"><Clock className="w-5 h-5"/> {timeLeft}s</div>
                </div>
                <ProgressBar value={(timeLeft / 20) * 100} className="mb-6 h-3"/>
                <Card>
                    <CardHeader><CardTitle>{question.question}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {question.options?.map((opt, i) => {
                             const isCorrect = i === question.correctAnswer;
                             const isSelected = i === answered;
                             const isWrong = isSelected && !isCorrect;
                             return (
                                <Button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={answered !== null}
                                    className={cn("w-full justify-start h-auto py-3", 
                                        answered !== null && isCorrect && "bg-success hover:bg-success/90",
                                        answered !== null && isWrong && "bg-destructive hover:bg-destructive/90",
                                        answered !== null && !isSelected && !isCorrect && "opacity-50"
                                    )}
                                    variant="outline"
                                >
                                    {answered !== null && (isCorrect ? <Check className="w-5 h-5 mr-3"/> : isWrong ? <X className="w-5 h-5 mr-3"/> : <div className="w-5 mr-3"/>)}
                                    {opt}
                                </Button>
                             )
                        })}
                    </CardContent>
                    {answered !== null && <CardContent><p className="text-sm text-muted-foreground p-2 bg-slate-100 rounded-md"><strong>Explanation:</strong> {question.explanation}</p></CardContent>}
                </Card>
            </div>
        </div>
    );
};

interface StudyArenaProps {
    onGameComplete: (rank: number) => void;
    studentProfile: StudentProfile;
}

const StudyArena: React.FC<StudyArenaProps> = ({ onGameComplete, studentProfile }) => {
    const [view, setView] = useState<'lobby' | 'game' | 'results'>('lobby');
    const [activeGame, setActiveGame] = useState<QuizGame | null>(null);
    const [finalPlayers, setFinalPlayers] = useState<Player[]>([]);
    const [games] = useState(initialGames);

    const handleJoin = (game: QuizGame) => {
        setActiveGame(game);
        setView('game');
    };

    const handleGameEnd = (players: Player[]) => {
        setFinalPlayers(players);
        const sorted = [...players].sort((a,b) => b.score - a.score);
        const userRank = sorted.findIndex(p => p.isUser) + 1;
        onGameComplete(userRank);
        setView('results');
    };

    const handleBackToLobby = () => {
        setActiveGame(null);
        setFinalPlayers([]);
        setView('lobby');
    }

    const renderView = () => {
        switch (view) {
            case 'game':
                return activeGame && <Game game={activeGame} onGameEnd={handleGameEnd} studentName={studentProfile.name}/>;
            case 'results':
                return <Results players={finalPlayers} onBackToLobby={handleBackToLobby}/>;
            case 'lobby':
            default:
                return <Lobby games={games} onJoin={handleJoin} />;
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderView()}
        </div>
    );
};

export default StudyArena;
