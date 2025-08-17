
import React from 'react';
import type { Subject } from '../types';
import { 
    BookOpen, Atom, Languages, FlaskConical, HardHat, Globe, Scale, 
    Briefcase, Leaf, Utensils, Palette, BookMarked, HeartPulse, Dna, 
    LineChart, Landmark, BookHeart, Store, Calculator, Map, Sigma 
} from 'lucide-react';

export const subjects: Subject[] = [
  // JSS SUBJECTS
  {
    id: 'jss-math',
    title: 'JSS Mathematics',
    description: 'Foundational concepts in mathematics for junior secondary students.',
    level: 'JSS',
    icon: BookOpen,
    units: [
      {
        id: 'jss-math-u1',
        title: 'Numbers and Numeration',
        description: 'Understanding number systems, fractions, decimals, and basic arithmetic.',
        modules: [
          {
            id: 'jss-math-u1-m1',
            title: 'Whole Numbers and Place Value',
            description: 'Learn about large numbers, their place values, and rounding.',
            topics: [
              { id: 't1', title: 'Introduction to Whole Numbers', description: 'What are whole numbers?', contentType: 'video', duration: 10, difficulty: 'beginner', completed: true, score: 90 },
              { id: 't2', title: 'Place Value up to Millions', description: 'Understand the value of each digit.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: true, score: 85 },
              { id: 't3', title: 'Rounding Numbers', description: 'Practice rounding to the nearest 10, 100, 1000.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-cw1', title: 'Place Value Practice', description: 'Complete a worksheet on identifying place values.', contentType: 'classwork', duration: 25, difficulty: 'intermediate', completed: false, courseworkId: 'cw-place-value' },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-math-u1-m2',
            title: 'Fractions and Decimals',
            description: 'Explore equivalent fractions, conversions, and operations.',
            topics: [
              { id: 't4', title: 'Equivalent Fractions', description: 'Finding and simplifying fractions.', contentType: 'animation', duration: 12, difficulty: 'intermediate', completed: true, score: 100 },
              { id: 't5', title: 'Converting Fractions to Decimals', description: 'Learn the division method.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
              { id: 't6', title: 'Module Quiz', description: 'Test your knowledge on Numbers and Numeration.', contentType: 'quiz', duration: 15, difficulty: 'intermediate', completed: false, assessmentId: "math-jss-numbers-quiz" },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-math-u2',
        title: 'Basic Algebra',
        description: 'Introduction to algebraic expressions, equations, and variables.',
        modules: [
          {
            id: 'jss-math-u2-m1',
            title: 'Introduction to Variables',
            description: 'Understanding symbols that represent numbers.',
            topics: [
              { id: 't7', title: 'What is a Variable?', description: 'Using letters in math.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't8', title: 'Simple Expressions', description: 'Writing basic algebraic expressions.', contentType: 'reading', duration: 10, difficulty: 'beginner', completed: false },
              { id: 't-as1', title: 'Real-World Algebra', description: 'Write expressions for real-world scenarios.', contentType: 'assignment', duration: 45, difficulty: 'intermediate', completed: false, courseworkId: 'as-real-world-algebra' },
              { id: 't-test1', title: 'End of Unit Test', description: 'Comprehensive test on Basic Algebra.', contentType: 'test', duration: 45, difficulty: 'advanced', completed: false, assessmentId: "math-jss-algebra-test" },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: {
      textbooks: [
        { id: 'tb1', title: 'New General Mathematics for JSS 1', author: 'M.F. Macrae et al.', coverUrl: 'https://picsum.photos/seed/ngm1/300/400', downloadUrl: '#' },
        { id: 'tb2', title: 'MAN Mathematics for JSS 1 (3rd Edition)', author: 'Mathematical Association of Nigeria', coverUrl: 'https://picsum.photos/seed/man1/300/400', downloadUrl: '#' },
      ],
      ebooks: [
        { id: 'eb1', title: 'Understanding Fractions', author: 'Jane Doe', description: 'A deep dive into fractions, decimals, and percentages.', coverUrl: 'https://picsum.photos/seed/ef1/300/400', downloadUrl: '#' },
      ],
      journals: [
        { id: 'j1', title: 'Nigerian Journal of Mathematical Education', publisher: 'NJME', issue: 'Vol. 15, No. 2', link: '#' },
      ]
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-english',
    title: 'JSS English Language',
    description: 'Develop skills in grammar, comprehension, and composition.',
    level: 'JSS',
    icon: Languages,
    units: [
      {
        id: 'jss-english-u1',
        title: 'Grammar and Syntax',
        description: 'Mastering the parts of speech and sentence construction.',
        modules: [
          {
            id: 'jss-english-u1-m1',
            title: 'Parts of Speech',
            description: 'Identifying nouns, verbs, adjectives, and adverbs.',
            topics: [
              { id: 't9', title: 'Nouns and Pronouns', description: 'People, places, things, and ideas.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: true, score: 95 },
              { id: 't10', title: 'Verbs: Action and Linking', description: 'The engine of the sentence.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-english-u2',
        title: 'Comprehension and Composition',
        description: 'Reading for meaning and expressing ideas effectively in writing.',
        modules: [
            {
                id: 'jss-english-u2-m1',
                title: 'Writing a Narrative Essay',
                description: 'Learn to tell a compelling story.',
                topics: [
                    { id: 't-eng1', title: 'Elements of a Story', description: 'Learn about plot, characters, setting, and theme.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                    { id: 't-eng2', title: 'Writing Your First Draft', description: 'Put your story ideas on paper and structure your narrative.', contentType: 'assignment', duration: 60, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: {
      textbooks: [
        { id: 'tb3', title: 'New Oxford Secondary English Course for JSS 1', author: 'Ayo Banjo et al.', coverUrl: 'https://picsum.photos/seed/nosec1/300/400', downloadUrl: '#' },
      ],
      ebooks: [
        { id: 'eb2', title: 'Guide to Better Writing', author: 'John Smith', description: 'Practical tips for improving composition and grammar.', coverUrl: 'https://picsum.photos/seed/gbw1/300/400', downloadUrl: '#' },
        { id: 'eb3', title: 'Common Errors in English', author: 'Mary Jones', description: 'Learn to avoid common grammatical mistakes.', coverUrl: 'https://picsum.photos/seed/cee1/300/400', downloadUrl: '#' },
      ],
      journals: [
        { id: 'j2', title: 'Journal of English Language Teachers Association of Nigeria', publisher: 'JELTAN', issue: '2023 Edition', link: '#' },
      ]
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-basic-science',
    title: 'JSS Basic Science',
    description: 'An integrated approach to science, covering biology, chemistry, and physics.',
    level: 'JSS',
    icon: FlaskConical,
    units: [
      {
        id: 'jss-bsc-u1',
        title: 'Living and Non-Living Things',
        description: 'Understanding the characteristics of life and the environment.',
        modules: [
          {
            id: 'jss-bsc-u1-m1',
            title: 'Characteristics of Living Things',
            description: 'Learn about the seven life processes (MR. NIGER D).',
            topics: [
              { id: 't-bs1', title: 'Introduction to Life', description: 'Explore the basic concepts of what it means to be a living organism.', contentType: 'video', duration: 12, difficulty: 'beginner', completed: true, score: 88 },
              { id: 't-bs2', title: 'Movement and Respiration', description: 'Understand two key life processes: how living things move and breathe.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
    ],
    resources: {
      textbooks: [
        { id: 'tb-bs1', title: 'STAN Basic Science for JSS 1', author: 'Science Teachers Association of Nigeria', coverUrl: 'https://picsum.photos/seed/stanbs1/300/400', downloadUrl: '#' },
      ],
      ebooks: [],
      journals: []
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-basic-tech',
    title: 'JSS Basic Technology',
    description: 'Introduction to technical drawing, materials, and simple machines.',
    level: 'JSS',
    icon: HardHat,
    units: [
        {
            id: 'jss-btech-u1',
            title: 'Introduction to Technology',
            description: 'Understanding the meaning and importance of technology.',
            modules: [
                {
                    id: 'jss-btech-u1-m1',
                    title: 'Safety in the Workshop',
                    description: 'Learn about workshop safety rules and regulations.',
                    topics: [
                        { id: 't-bt1', title: 'Workshop Hazards', description: 'Identify common dangers in a technology workshop and how to avoid them.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-bt2', title: 'First Aid in the Workshop', description: 'Learn basic first aid for common workshop accidents.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        },
    ],
    resources: {
        textbooks: [{ id: 'tb-bt1', title: 'Basic Technology for JSS 1', author: 'NERDC', coverUrl: 'https://picsum.photos/seed/nerdcbt1/300/400', downloadUrl: '#' }],
        ebooks: [],
        journals: [],
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-social-studies',
    title: 'JSS Social Studies',
    description: 'Study of man in his physical and social environment.',
    level: 'JSS',
    icon: Globe,
    units: [
        {
            id: 'jss-ss-u1',
            title: 'The Family',
            description: 'Understanding the basic unit of society, its types, and functions.',
            modules: [
                {
                    id: 'jss-ss-u1-m1',
                    title: 'The Family and its Types',
                    description: 'Learn about the different family structures.',
                    topics: [
                        { id: 't-ss1', title: 'The Nuclear Family', description: 'Explore the concept of a nuclear family (parents and children).', contentType: 'video', duration: 10, difficulty: 'beginner', completed: false },
                        { id: 't-ss2', title: 'The Extended Family', description: 'Learn about the extended family structure common in Nigeria.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        }
    ],
    resources: { 
        textbooks: [{ id: 'tb-ss1', title: 'Social Studies for JSS 1', author: 'NERDC', coverUrl: 'https://picsum.photos/seed/ss-jss1/300/400', downloadUrl: '#' }], 
        ebooks: [], 
        journals: [] 
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-civic-edu',
    title: 'JSS Civic Education',
    description: 'Understanding the rights and responsibilities of a citizen.',
    level: 'JSS',
    icon: Scale,
    units: [
        {
            id: 'jss-ce-u1',
            title: 'Citizenship',
            description: 'Learning about the concept of citizenship and its importance.',
            modules: [
                {
                    id: 'jss-ce-u1-m1',
                    title: 'Rights and Duties of a Citizen',
                    description: 'Understanding the privileges and obligations of being a Nigerian citizen.',
                    topics: [
                        { id: 't-ce1', title: 'Your Rights as a Citizen', description: 'Learn about fundamental human rights as enshrined in the constitution.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
                        { id: 't-ce2', title: 'Your Duties as a Citizen', description: 'Explore the responsibilities like paying taxes and obeying laws.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        }
    ],
    resources: { 
        textbooks: [{ id: 'tb-ce1', title: 'Civic Education for JSS 1', author: 'Uche Okeke', coverUrl: 'https://picsum.photos/seed/ce-jss1/300/400', downloadUrl: '#' }], 
        ebooks: [], 
        journals: [] 
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-agric-science',
    title: 'JSS Agricultural Science',
    description: 'Fundamentals of farming, crops, and animal husbandry.',
    level: 'JSS',
    icon: Leaf,
    units: [{
        id: 'jss-ag-u1',
        title: 'Introduction to Agriculture',
        description: 'Understanding the meaning and importance of Agriculture.',
        modules: [{
            id: 'jss-ag-u1-m1',
            title: 'Meaning and Branches',
            description: 'Explore the scope of agricultural science.',
            topics: [
                { id: 't-ag1', title: 'What is Agriculture?', description: 'A video explaining the importance of agriculture to Nigeria.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                { id: 't-ag2', title: 'Branches of Agriculture', description: 'Learn about agronomy, horticulture, animal husbandry, and more.', contentType: 'reading', duration: 18, difficulty: 'beginner', completed: false }
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        }],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-crs',
    title: 'JSS Christian Religious Studies',
    description: 'Study of Christian beliefs, history, and moral teachings.',
    level: 'JSS',
    icon: BookMarked,
    units: [{
        id: 'jss-crs-u1',
        title: 'The Creation',
        description: 'Understanding the biblical account of creation.',
        modules: [{
            id: 'jss-crs-u1-m1',
            title: 'The Genesis Account',
            description: 'Studying the first book of the Bible.',
            topics: [
                { id: 't-crs1', title: 'The Story of Creation (Day 1-3)', description: 'An animated video on the first three days of creation.', contentType: 'animation', duration: 12, difficulty: 'beginner', completed: false },
                { id: 't-crs2', title: 'Man in the Image of God', description: 'A reading on the creation of man and woman.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false }
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        }],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-business-studies',
    title: 'JSS Business Studies',
    description: 'Introduction to the world of commerce, office practice, and keyboarding.',
    level: 'JSS',
    icon: Briefcase,
    units: [{
        id: 'jss-bs-u1',
        title: 'Introduction to Business',
        description: 'Learning the basics of business and office environment.',
        modules: [{
            id: 'jss-bs-u1-m1',
            title: 'Office Practice',
            description: 'Understanding the functions and personnel of a modern office.',
            topics: [
                { id: 't-bsn1', title: 'The Office and its Functions', description: 'Learn what an office is and its importance.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                { id: 't-bsn2', title: 'The Receptionist', description: 'Understanding the role and duties of a receptionist.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false }
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        }],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-home-economics',
    title: 'JSS Home Economics',
    description: 'Skills for managing the home, nutrition, and healthy living.',
    level: 'JSS',
    icon: Utensils,
    units: [{
        id: 'jss-he-u1',
        title: 'The Home',
        description: 'Understanding home management and family needs.',
        modules: [{
            id: 'jss-he-u1-m1',
            title: 'Food and Nutrition',
            description: 'Learning the basics of healthy eating.',
            topics: [
                { id: 't-he1', title: 'Food and its Classes', description: 'Introduction to the basic classes of food.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
                { id: 't-he2', title: 'A Balanced Diet', description: 'Learn how to plan a balanced meal.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false }
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        }],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'jss-cca',
    title: 'JSS Cultural & Creative Arts',
    description: 'Exploring creativity through fine arts, drama, and music.',
    level: 'JSS',
    icon: Palette,
    units: [{
        id: 'jss-cca-u1',
        title: 'Fundamentals of Art',
        description: 'Learning the basic principles and elements of art.',
        modules: [{
            id: 'jss-cca-u1-m1',
            title: 'Elements of Design',
            description: 'The building blocks of all art.',
            topics: [
                { id: 't-cca1', title: 'Line, Shape, and Form', description: 'Understanding the most basic elements of art.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                { id: 't-cca2', title: 'Introduction to Colour', description: 'Learn about the colour wheel and basic colour theory.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false }
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        }],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },

  // SSS SUBJECTS
  {
    id: 'sss-math',
    title: 'SSS Mathematics',
    description: 'Advanced mathematical concepts including algebra, geometry, and calculus.',
    level: 'SSS',
    icon: BookOpen,
    units: [
        {
            id: 'sss-math-u1',
            title: 'Algebra',
            description: 'Quadratic equations, sequences, series, and logarithms.',
            modules: [
                {
                    id: 'sss-math-u1-m1',
                    title: 'Quadratic Equations',
                    description: 'Solving equations of the second degree.',
                    topics: [
                        { id: 't-ssm1', title: 'Factorization Method', description: 'Learn how to solve quadratic equations by finding factors.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm2', title: 'Completing the Square', description: 'A powerful technique for solving any quadratic equation.', contentType: 'simulation', duration: 25, difficulty: 'advanced', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        },
    ],
    resources: {
        textbooks: [{ id: 'tb-ssm1', title: 'New General Mathematics for SSS 1', author: 'M.F. Macrae et al.', coverUrl: 'https://picsum.photos/seed/ngm-sss1/300/400', downloadUrl: '#' }],
        ebooks: [],
        journals: [],
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-english',
    title: 'SSS English Language',
    description: 'Advanced grammar, lexical skills, and literary appreciation for WAEC/NECO.',
    level: 'SSS',
    icon: Languages,
    units: [
      {
        id: 'sss-eng-u1',
        title: 'Lexis and Structure',
        description: 'Mastering advanced grammar and vocabulary for effective communication.',
        modules: [
          {
            id: 'sss-eng-u1-m1',
            title: 'Concord and Sentence Patterns',
            description: 'Ensuring subject-verb agreement and constructing complex sentences.',
            topics: [
              { id: 't-sse1', title: 'Rules of Concord', description: 'Explore the 16 rules of subject-verb agreement.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sse2', title: 'Complex Sentences', description: 'Learn to use clauses to build sophisticated sentences.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-physics',
    title: 'SSS Physics',
    description: 'Exploring the fundamental principles of motion, energy, and matter.',
    level: 'SSS',
    icon: Atom,
    units: [
      {
        id: 'sss-physics-u1',
        title: 'Mechanics',
        description: 'The study of motion, forces, and energy.',
        modules: [
          {
            id: 'sss-physics-u1-m1',
            title: 'Kinematics',
            description: 'Describing motion with graphs and equations.',
            topics: [
              { id: 't11', title: 'Distance vs. Displacement', description: 'Understanding scalar and vector quantities.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't12', title: 'Speed and Velocity', description: 'Calculating rates of motion.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-physics-u2',
        title: 'Waves and Optics',
        description: 'Study of light, sound, and other wave phenomena.',
        modules: [
            {
                id: 'sss-physics-u2-m1',
                title: 'Reflection of Light',
                description: 'Understanding mirrors and image formation.',
                topics: [
                    { id: 't-phy1', title: 'Laws of Reflection', description: 'Understand how light bounces off surfaces like mirrors.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: {
      textbooks: [
        { id: 'tb4', title: 'Senior Secondary Physics by Nelkon & Parker', author: 'P.N. Okeke', coverUrl: 'https://picsum.photos/seed/ssp1/300/400', downloadUrl: '#' },
      ],
      ebooks: [
        { id: 'eb4', title: 'The Physics of Everyday Things', author: 'Dr. Alex F.', description: 'Connecting physics principles to real-world phenomena.', coverUrl: 'https://picsum.photos/seed/pet1/300/400', downloadUrl: '#' },
      ],
      journals: [
        { id: 'j3', title: 'Nigerian Journal of Physics', publisher: 'NIP', issue: 'Volume 30', link: '#' },
      ]
    },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-chemistry',
    title: 'SSS Chemistry',
    description: 'Study of matter, its properties, and how substances combine or separate.',
    level: 'SSS',
    icon: FlaskConical,
    units: [
      {
        id: 'sss-chem-u1',
        title: 'The Particulate Nature of Matter',
        description: 'Understanding the building blocks of all substances.',
        modules: [
          {
            id: 'sss-chem-u1-m1',
            title: 'Atoms, Molecules and Ions',
            description: 'Learn about the fundamental particles of matter.',
            topics: [
              { id: 't-chem1', title: 'Introduction to Atomic Theory', description: 'From Dalton to the modern model of the atom.', contentType: 'video', duration: 20, difficulty: 'beginner', completed: false },
              { id: 't-chem2', title: 'States of Matter', description: 'Explore the properties of solids, liquids, and gases.', contentType: 'simulation', duration: 18, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [{ id: 'tb-chem1', title: 'New School Chemistry for SSS', author: 'Osei Yaw Ababio', coverUrl: 'https://picsum.photos/seed/chem-sss1/300/400', downloadUrl: '#' }], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-biology',
    title: 'SSS Biology',
    description: 'The science of life and living organisms.',
    level: 'SSS',
    icon: Dna,
    units: [
      {
        id: 'sss-bio-u1',
        title: 'Concepts of Life',
        description: 'Understanding the fundamental principles of living organisms.',
        modules: [
          {
            id: 'sss-bio-u1-m1',
            title: 'Cells as the Basic Unit of Life',
            description: 'Exploring the structure and function of plant and animal cells.',
            topics: [
              { id: 't-bio1', title: 'The Animal Cell', description: 'An interactive diagram of an animal cell.', contentType: 'simulation', duration: 20, difficulty: 'beginner', completed: false },
              { id: 't-bio2', title: 'The Plant Cell', description: 'Learn the unique structures of a plant cell.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [{ id: 'tb-bio1', title: 'Modern Biology for SSS', author: 'Ramalingam', coverUrl: 'https://picsum.photos/seed/bio-sss1/300/400', downloadUrl: '#' }], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
   {
    id: 'sss-agric-science',
    title: 'SSS Agricultural Science',
    description: 'Advanced study of crop production, animal science, and agribusiness.',
    level: 'SSS',
    icon: Leaf,
    units: [
      {
        id: 'sss-agric-u1',
        title: 'Soil Science',
        description: 'In-depth study of soil composition, properties, and management.',
        modules: [
          {
            id: 'sss-agric-u1-m1',
            title: 'Soil Formation and Profile',
            description: 'Understanding how soil is formed and its different layers.',
            topics: [
              { id: 't-ssag1', title: 'Factors of Soil Formation', description: 'Learn about weathering and other factors.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-ssag2', title: 'The Soil Profile', description: 'A video explaining the different horizons of soil.', contentType: 'video', duration: 15, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [{ id: 'tb-agric1', title: 'Agricultural Science for SSS', author: 'E. A. Akinsanmi', coverUrl: 'https://picsum.photos/seed/agric-sss1/300/400', downloadUrl: '#' }], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-economics',
    title: 'SSS Economics',
    description: 'Principles of production, distribution, and consumption of goods and services.',
    level: 'SSS',
    icon: LineChart,
    units: [
      {
        id: 'sss-econ-u1',
        title: 'Fundamental Concepts',
        description: 'Learning the core ideas upon which economics is built.',
        modules: [
          {
            id: 'sss-econ-u1-m1',
            title: 'Scarcity, Choice and Opportunity Cost',
            description: 'Understanding the fundamental economic problem.',
            topics: [
              { id: 't-econ1', title: 'Wants vs. Needs', description: 'Differentiating between human wants and basic needs.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-econ2', title: 'Opportunity Cost', description: 'Learn about the true cost of a decision.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [{ id: 'tb-econ1', title: 'Comprehensive Economics for SSS', author: 'J.U. Anyaele', coverUrl: 'https://picsum.photos/seed/econ-sss1/300/400', downloadUrl: '#' }], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-government',
    title: 'SSS Government',
    description: 'The study of political systems, institutions, and the state.',
    level: 'SSS',
    icon: Landmark,
    units: [
      {
        id: 'sss-gov-u1',
        title: 'Basic Concepts of Government',
        description: 'Understanding the foundational terms and ideas in government.',
        modules: [
          {
            id: 'sss-gov-u1-m1',
            title: 'Power, Authority, Legitimacy',
            description: 'Differentiating between key political concepts.',
            topics: [
              { id: 't-gov1', title: 'What is Government?', description: 'Defining government as an institution of the state.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-gov2', title: 'Sources of Authority', description: 'Explore charismatic, traditional, and legal-rational authority.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [{ id: 'tb-gov1', title: 'Essential Government for SSS', author: 'C.C. Dibie', coverUrl: 'https://picsum.photos/seed/gov-sss1/300/400', downloadUrl: '#' }], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-literature',
    title: 'SSS Literature-in-English',
    description: 'Analysis of prose, drama, and poetry from Africa and beyond.',
    level: 'SSS',
    icon: BookHeart,
    units: [
      {
        id: 'sss-lit-u1',
        title: 'Introduction to Literary Appreciation',
        description: 'Learning the tools to analyze and appreciate literary works.',
        modules: [
          {
            id: 'sss-lit-u1-m1',
            title: 'The Genres of Literature',
            description: 'Understanding the characteristics of prose, poetry, and drama.',
            topics: [
              { id: 't-lit1', title: 'Figures of Speech', description: 'Learn to identify simile, metaphor, personification, etc.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-lit2', title: 'Plot and Characterization', description: 'Analyzing the structure of a story and its characters.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-commerce',
    title: 'SSS Commerce',
    description: 'Study of trade, business activities, and aids to trade.',
    level: 'SSS',
    icon: Store,
    units: [
       {
        id: 'sss-com-u1',
        title: 'Introduction to Commerce',
        description: 'Understanding the fundamentals of trade and business.',
        modules: [
          {
            id: 'sss-com-u1-m1',
            title: 'Production and Division of Labour',
            description: 'Learning how goods are created and the benefits of specialization.',
            topics: [
              { id: 't-com1', title: 'What is Production?', description: 'Explore the types and factors of production.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-com2', title: 'Advantages of Division of Labour', description: 'How specialization increases efficiency.', contentType: 'reading', duration: 18, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-accounting',
    title: 'SSS Financial Accounting',
    description: 'The principles and practice of recording and reporting financial transactions.',
    level: 'SSS',
    icon: Calculator,
    units: [
      {
        id: 'sss-acc-u1',
        title: 'Introduction to Bookkeeping',
        description: 'Learning the foundational principles of accounting.',
        modules: [
          {
            id: 'sss-acc-u1-m1',
            title: 'The Accounting Equation',
            description: 'Understanding the relationship between Assets, Liabilities, and Equity.',
            topics: [
              { id: 't-acc1', title: 'Assets, Liabilities, and Equity', description: 'Defining the core components of the accounting equation.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
              { id: 't-acc2', title: 'Double Entry Principle', description: 'Learn the concept of debit and credit.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
   {
    id: 'sss-geography',
    title: 'SSS Geography',
    description: 'The study of the earth\'s landscapes, peoples, places, and environments.',
    level: 'SSS',
    icon: Map,
    units: [
       {
        id: 'sss-geo-u1',
        title: 'Physical Geography',
        description: 'Understanding the natural features and processes of the Earth.',
        modules: [
          {
            id: 'sss-geo-u1-m1',
            title: 'The Earth and the Solar System',
            description: 'Learning about our planet\'s place in the solar system.',
            topics: [
              { id: 't-geo1', title: 'Earth\'s Rotation and Revolution', description: 'The causes of day/night and the seasons.', contentType: 'animation', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-geo2', title: 'Latitude and Longitude', description: 'Understanding the grid system used to locate places on Earth.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
  {
    id: 'sss-further-maths',
    title: 'SSS Further Mathematics',
    description: 'Advanced topics for students with a strong aptitude for mathematics.',
    level: 'SSS',
    icon: Sigma,
    units: [
      {
        id: 'sss-fm-u1',
        title: 'Pure Mathematics',
        description: 'Core advanced mathematical concepts.',
        modules: [
          {
            id: 'sss-fm-u1-m1',
            title: 'Set Theory',
            description: 'The mathematical study of sets.',
            topics: [
              { id: 't-fm1', title: 'Set Notation and Operations', description: 'Union, intersection, complement, and Venn diagrams.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-fm2', title: 'Binary Operations', description: 'Properties like closure, associativity, and commutativity.', contentType: 'reading', duration: 20, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      }
    ],
    resources: { textbooks: [], ebooks: [], journals: [] },
    get totalTopics() { return this.units.reduce((sum, unit) => sum + unit.totalTopics, 0); },
    get completedTopics() { return this.units.reduce((sum, unit) => sum + unit.completedTopics, 0); },
    get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
  },
];
