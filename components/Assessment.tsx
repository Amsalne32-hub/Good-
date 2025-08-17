
import React, { useState, useEffect } from 'react';
import type { Assessment, Question } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import { CheckCircle, XCircle, Clock, ChevronLeft } from 'lucide-react';

interface AssessmentProps {
  assessment: Assessment;
  onBack: () => void;
  onComplete: (score: number) => void;
}

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const AssessmentComponent: React.FC<AssessmentProps> = ({ assessment, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimit * 60);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let earnedPoints = 0;
    const totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);

    assessment.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'essay' && typeof userAnswer === 'string' && userAnswer.trim().length > 10) {
        earnedPoints += question.points * 0.8; // Partial credit for effort
      } else if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
    setShowResults(true);
    onComplete(finalScore);
  };
  
  const currentQ = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  if (showResults) {
    const passed = score >= assessment.passingScore;
    return (
        <div className="max-w-4xl mx-auto p-8">
            <Card className="text-center">
                <CardHeader>
                    <div className={cn("mx-auto flex h-20 w-20 items-center justify-center rounded-full", passed ? "bg-success/20" : "bg-destructive/20")}>
                        {passed ? <CheckCircle className="h-12 w-12 text-success" /> : <XCircle className="h-12 w-12 text-destructive" />}
                    </div>
                    <CardTitle className="text-3xl mt-4">{passed ? "Congratulations!" : "Keep Practicing!"}</CardTitle>
                    <CardDescription>{passed ? "You've successfully passed this assessment." : "Don't give up! Review your answers and try again."}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 my-6">
                        <div>
                            <p className={cn("text-4xl font-bold", passed ? "text-success" : "text-destructive")}>{score}%</p>
                            <p className="text-sm text-muted-foreground">Your Score</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">{assessment.passingScore}%</p>
                            <p className="text-sm text-muted-foreground">Passing Score</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">{Object.values(answers).filter((ans, i) => ans === assessment.questions[i].correctAnswer).length}</p>
                            <p className="text-sm text-muted-foreground">Correct Answers</p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={onBack}>Back to Course</Button>
                        {!passed && <Button>Retake Assessment</Button>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 sm:p-8">
        <header className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={onBack}><ChevronLeft className="w-4 h-4 mr-2" /> Exit</Button>
            <div className="text-center">
                <h1 className="text-2xl font-bold">{assessment.title}</h1>
                <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {assessment.questions.length}</p>
            </div>
            <div className="flex items-center gap-2 font-semibold text-lg p-2 rounded-md bg-white border">
                <Clock className="w-5 h-5 text-primary"/>
                <span>{formatTime(timeLeft)}</span>
            </div>
        </header>
        <ProgressBar value={progress} className="mb-8" />

        <div className="flex-grow flex justify-center items-start">
             <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Question {currentQuestion + 1}</CardTitle>
                    <CardDescription>{currentQ.points} points</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium mb-6">{currentQ.question}</p>
                    <div className="space-y-3">
                    {currentQ.type === 'multiple-choice' && currentQ.options?.map((option, index) => (
                        <label key={index} className={cn("flex items-center p-4 border rounded-lg cursor-pointer transition-colors", answers[currentQ.id] === index ? 'bg-primary/10 border-primary' : 'hover:bg-slate-50')}>
                            <input type="radio" name={currentQ.id} checked={answers[currentQ.id] === index} onChange={() => handleAnswerChange(currentQ.id, index)} className="w-5 h-5 text-primary focus:ring-primary"/>
                            <span className="ml-3">{option}</span>
                        </label>
                    ))}
                    {currentQ.type === 'true-false' && currentQ.options?.map((option, index) => (
                        <label key={index} className={cn("flex items-center p-4 border rounded-lg cursor-pointer transition-colors", answers[currentQ.id] === index ? 'bg-primary/10 border-primary' : 'hover:bg-slate-50')}>
                            <input type="radio" name={currentQ.id} checked={answers[currentQ.id] === index} onChange={() => handleAnswerChange(currentQ.id, index)} className="w-5 h-5 text-primary focus:ring-primary"/>
                            <span className="ml-3">{option}</span>
                        </label>
                    ))}
                    {currentQ.type === 'essay' && (
                        <textarea
                            value={(answers[currentQ.id] as string) || ''}
                            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                            rows={6}
                            className="w-full p-2 border rounded-md"
                            placeholder="Type your answer here..."
                        />
                    )}
                    </div>
                </CardContent>
            </Card>
        </div>

        <footer className="mt-8 flex justify-between items-center">
            <Button variant="outline" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0}>Previous</Button>
            {currentQuestion === assessment.questions.length - 1 ? (
                <Button onClick={handleSubmit} size="lg" className="bg-success hover:bg-success/90">Submit Assessment</Button>
            ) : (
                <Button onClick={() => setCurrentQuestion(Math.min(assessment.questions.length - 1, currentQuestion + 1))}>Next</Button>
            )}
        </footer>
    </div>
  );
};

export default AssessmentComponent;
