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

export interface StudyPlanStep {
  type: 'summary' | 'quiz' | 'task';
  title: string;
  content: string;
  questions?: GeneratedQuestion[];
}

export interface StudyPlan {
  plan: StudyPlanStep[];
}

// For Student Store and Profile
export type StoreItemType = 'theme' | 'avatar_frame' | 'map_style';

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  type: StoreItemType;
  price: number;
  asset: string; // e.g., a CSS class name for a theme, or an image URL for a frame
  preview: string; // e.g., a color swatch or a small image for the store card
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

export interface StudentProfile {
  name: string;
  level: number;
  xp: number;
  questPoints: number;
  inventory: string[]; // array of StoreItem IDs
  equippedTheme: string | null; // StoreItem ID for the theme
  equippedAvatarFrame: string | null; // StoreItem ID for the avatar frame
  achievements: string[]; // array of Achievement IDs
}

// For Study Arena
export interface Player {
  id: string;
  name: string;
  score: number;
  isUser?: boolean;
}

export interface QuizGame {
  id: string;
  title: string;
  subjectId: string;
  topic: string;
  questionIds: string[];
  players: Player[];
}

// For Teacher Dashboard Student Insights
export interface StudentProgress {
  [subjectId: string]: {
    completedTopics: string[]; // array of topic IDs
  };
}

export interface ClassStudent {
  id: string;
  name: string;
  progress: StudentProgress;
}

// For Google Search Grounding
export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

// For Career Compass
export interface CareerInfo {
  field: string;
  description: string;
}
export interface UniversityCourse {
  courseName: string;
  institutions: string[]; // List of Nigerian universities
}
export interface InspirationalProfile {
    name: string;
    title: string;
    story: string;
}
export interface CareerPathway {
  relatedCareers: CareerInfo[];
  keySkills: string[];
  universityPathways: UniversityCourse[];
  inspirationalProfile: InspirationalProfile;
}

// For Parent Dashboard
export interface ParentData {
    overallProgress: number;
    weeklyStudyTime: number; // in hours
    totalQuestPoints: number;
    topSubjects: { subject: string; progress: number }[];
    focusAreas: { subject: string; topic: string }[];
    recentActivities: { description: string; timestamp: string }[];
    aiCoachTip: string;
}

// For Study Groups
export interface GroupMessage {
    id: string;
    sender: string;
    text: string;
    timestamp: string;
}

export interface StudyGroup {
    id: string;
    name: string;
    subject: string;
    description: string;
    members: string[]; // array of student names
    messages: GroupMessage[];
}

// For AI Flashcards
export interface Flashcard {
  id: string;
  topicId: string;
  subjectId: string;
  frontText: string;
  backText: string;
  imageUrl: string;
}

// For CBT Center
export type CBTSubjectCategory = 'Core' | 'Science' | 'Vocational' | 'Arts' | 'Commercial' | 'Technical' | 'Religious' | 'Languages' | 'History';

export interface CBT_Subject {
  id: string;
  name: string;
  category: CBTSubjectCategory;
}

export interface CBT_Category {
    id: 'JUNIOR_SCHOOL' | 'SENIOR_SCHOOL' | 'JAMB';
    name: string;
    description: string;
    standards: string[];
    subjects: CBT_Subject[];
}

export interface CBT_Question {
    id: string;
    subjectId: string;
    standard: string; // e.g. 'NECO_BECE', 'WAEC'
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option
    explanation: string;
}

export interface CBT_TestConfig {
    category: CBT_Category;
    standard: string;
    subjects: CBT_Subject[];
    timeLimit: number; // in minutes
    questionCount: number;
}

export interface CBT_Result {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: number; // in seconds
    config: CBT_TestConfig;
    questions: CBT_Question[];
    userAnswers: { [questionId: string]: number | null };
}

export interface CBT_HistoryItem {
    id: string;
    date: string;
    categoryName: string;
    subjectNames: string[];
    score: number;
    totalQuestions: number;
}
