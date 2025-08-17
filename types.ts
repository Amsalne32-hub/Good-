import type React from 'react';

export type ContentType = 'video' | 'audio' | 'animation' | 'simulation' | 'reading' | 'quiz' | 'test' | 'classwork' | 'assignment';

export interface Topic {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  score?: number; // for assessments
  contentUrl?: string; // for video, audio, etc.
  assessmentId?: string; // link to a quiz or test
  courseworkId?: string; // link to classwork or assignment
  questPoints?: number; // for General Knowledge gamification
}

export interface Module {
  id: string;
  title: string;
  description:string;
  topics: Topic[];
  get completedTopics(): number;
  get totalDuration(): number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  questImage?: string; // for General Knowledge dashboard cards
  suggestedChannels?: { name: string; link: string; description: string; icon?: React.ElementType; }[];
  get totalTopics(): number;
  get completedTopics(): number;
  get progress(): number;
}

export interface Textbook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  downloadUrl: string;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  downloadUrl: string;
}

export interface Journal {
    id: string;
    title: string;
    publisher: string;
    issue: string;
    link: string;
}

export interface DictionaryEntry {
    term: string;
    definition: string;
    subject: 'General' | 'Mathematics' | 'English' | 'Physics';
}

export interface SubjectResources {
    textbooks: Textbook[];
    ebooks: Ebook[];
    journals: Journal[];
}


export interface Subject {
  id: string;
  title: string;
  description: string;
  level: 'JSS' | 'SSS' | 'General';
  icon: React.ElementType;
  units: Unit[];
  resources: SubjectResources;
  get totalTopics(): number;
  get completedTopics(): number;
  get progress(): number;
}

// For quizzes and tests
export type QuestionType = 'multiple-choice' | 'true-false' | 'essay';

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: number | string; // index for mc/tf, string for essay
  explanation: string;
  points: number;
}

export interface Assessment {
  id:string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passingScore: number;
  questions: Question[];
}

// For classwork and assignments
export interface Coursework {
    id: string;
    title: string;
    description: string;
    type: 'classwork' | 'assignment';
    submissionType: 'text' | 'file-upload';
    instructions: string;
    points: number;
}

// For Teacher's Dashboard
export interface SchemeOfWorkWeek {
    week: number;
    topic: string;
    objectives: string[];
    activities: string;
}

export interface SchemeOfWork {
    id: string;
    subjectId: string;
    term: 1 | 2 | 3;
    weeks: SchemeOfWorkWeek[];
}

export interface LessonPlan {
    id: string;
    schemeWeekId: string; // Links to a week in the scheme of work
    topic: string;
    duration: string; // e.g., "40 minutes"
    learningObjectives: string[];
    instructionalMaterials: string[];
    priorKnowledge: string;
    procedure: { step: string; teacherActivity: string; studentActivity: string }[];
    evaluation: string;
    summary: string;
    assignment: string;
}

export interface LessonNote {
    id: string;
    lessonPlanId: string;
    topic: string;
    content: string; // Can be markdown or HTML
}

export interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}