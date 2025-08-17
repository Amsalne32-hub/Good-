
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
        title: 'JSS 1: Numbers and Numeration',
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
            title: 'Fractions, Decimals, and Percentages',
            description: 'Explore equivalent fractions, conversions, and operations.',
            topics: [
              { id: 't4', title: 'Equivalent Fractions', description: 'Finding and simplifying fractions.', contentType: 'animation', duration: 12, difficulty: 'intermediate', completed: true, score: 100 },
              { id: 't5', title: 'Converting Fractions to Decimals', description: 'Learn the division method.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
              { id: 't-jm-1', title: 'Introduction to Percentages', description: 'Understanding the concept of "per hundred".', contentType: 'video', duration: 15, difficulty: 'intermediate', completed: false },
              { id: 't-jm-2', title: 'Ratios and Proportions', description: 'Comparing quantities and understanding direct/indirect proportions.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
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
        title: 'JSS 1: Basic Algebra & Geometry',
        description: 'Introduction to algebraic expressions, equations, and basic shapes.',
        modules: [
          {
            id: 'jss-math-u2-m1',
            title: 'Algebraic Expressions',
            description: 'Understanding symbols that represent numbers and simplifying expressions.',
            topics: [
              { id: 't7', title: 'What is a Variable?', description: 'Using letters in math.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't8', title: 'Simple Expressions', description: 'Writing basic algebraic expressions.', contentType: 'reading', duration: 10, difficulty: 'beginner', completed: false },
              { id: 't-jm-3', title: 'Collecting Like Terms', description: 'Simplifying expressions by grouping similar terms.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-as1', title: 'Real-World Algebra', description: 'Write expressions for real-world scenarios.', contentType: 'assignment', duration: 45, difficulty: 'intermediate', completed: false, courseworkId: 'as-real-world-algebra' },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
           {
            id: 'jss-math-u2-m2',
            title: 'Simple Equations & Geometry',
            description: 'Solving linear equations and exploring plane shapes.',
            topics: [
              { id: 't-jm-4', title: 'Solving Equations (Addition/Subtraction)', description: 'Finding the unknown by balancing equations.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
              { id: 't-jm-5', title: 'Solving Equations (Multiplication/Division)', description: 'Isolating the variable using inverse operations.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
              { id: 't-jm-6', title: 'Angles and Lines', description: 'Types of angles and relationships between lines.', contentType: 'video', duration: 20, difficulty: 'beginner', completed: false },
              { id: 't-jm-7', title: 'Triangles and Quadrilaterals', description: 'Properties and classification of these basic shapes.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-jm-8', title: 'Perimeter and Area of Shapes', description: 'Calculating the boundary and surface of squares, rectangles, and triangles.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-test1', title: 'End of Unit Test', description: 'Comprehensive test on Basic Algebra.', contentType: 'test', duration: 45, difficulty: 'advanced', completed: false, assessmentId: "math-jss-algebra-test" },
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
        id: 'jss-math-u3',
        title: 'JSS 2: Algebraic Processes and Geometry',
        description: 'Factorization, linear inequalities, and properties of polygons.',
        modules: [
            {
                id: 'jss-math-u3-m1',
                title: 'Algebraic Factorization',
                description: 'Finding common factors and simplifying expressions.',
                topics: [
                    { id: 't-jm-9', title: 'Factorization of Simple Expressions', description: 'Finding the HCF of terms.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-10', title: 'Linear Inequalities', description: 'Solving and representing inequalities on a number line.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-math-u3-m2',
                title: 'Geometry of Polygons',
                description: 'Angles, constructions, and properties.',
                topics: [
                    { id: 't-jm-11', title: 'Angles of Polygons', description: 'Calculating the sum of interior and exterior angles.', contentType: 'video', duration: 22, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-12', title: 'Construction of Triangles and Quadrilaterals', description: 'Using a ruler and compass for geometric constructions.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-math-u4',
        title: 'JSS 2: Statistics and Mensuration',
        description: 'Data representation and calculating area and volume of 3D shapes.',
        modules: [
            {
                id: 'jss-math-u4-m1',
                title: 'Data Handling',
                description: 'Collecting, presenting, and interpreting data.',
                topics: [
                    { id: 't-jm-13', title: 'Data Collection and Presentation', description: 'Using frequency tables to organize data.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
                    { id: 't-jm-14', title: 'Pie Charts and Bar Charts', description: 'Visual representation of statistical data.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-15', title: 'Mean, Median, and Mode', description: 'Calculating measures of central tendency for ungrouped data.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-math-u4-m2',
                title: 'Mensuration',
                description: 'Area of circles and volume of simple solids.',
                topics: [
                    { id: 't-jm-16', title: 'Circumference and Area of a Circle', description: 'Using the formula πr² and 2πr.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-17', title: 'Volume of Cubes and Cuboids', description: 'Calculating space occupied by 3D shapes.', contentType: 'reading', duration: 15, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-math-u5',
        title: 'JSS 3: Advanced Algebra and Geometry',
        description: 'Simultaneous equations, quadratic expressions, and Pythagoras\' theorem.',
        modules: [
            {
                id: 'jss-math-u5-m1',
                title: 'Simultaneous and Quadratic Equations',
                description: 'Solving more complex equations.',
                topics: [
                    { id: 't-jm-18', title: 'Solving Simultaneous Linear Equations', description: 'Using substitution and elimination methods.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
                    { id: 't-jm-19', title: 'Factorization of Quadratic Expressions', description: 'Factoring expressions in the form ax² + bx + c.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-math-u5-m2',
                title: 'Trigonometry and Pythagoras',
                description: 'Right-angled triangles and their properties.',
                topics: [
                    { id: 't-jm-20', title: 'Pythagoras\' Theorem', description: 'Understanding and applying a² + b² = c².', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-21', title: 'Introduction to Trigonometric Ratios', description: 'Sine, Cosine, and Tangent (SOH CAH TOA).', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-math-u6',
        title: 'JSS 3: Number Systems and Mensuration',
        description: 'Binary numbers and calculating volume of cylinders and cones.',
        modules: [
            {
                id: 'jss-math-u6-m1',
                title: 'Number Systems',
                description: 'Working with binary numbers and standard form.',
                topics: [
                    { id: 't-jm-22', title: 'Binary Numbers', description: 'Conversion between base 10 and base 2.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-23', title: 'Standard Form (Scientific Notation)', description: 'Expressing very large or small numbers.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-math-u6-m2',
                title: 'Advanced Mensuration',
                description: 'Volume of curved solids.',
                topics: [
                    { id: 't-jm-24', title: 'Volume of a Cylinder', description: 'Calculating the volume using V = πr²h.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-jm-25', title: 'Volume of a Cone and Sphere', description: 'Applying formulas for cones and spheres.', contentType: 'video', duration: 25, difficulty: 'advanced', completed: false },
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
        title: 'JSS 1: Grammar and Composition',
        description: 'Mastering parts of speech, sentence construction, and basic writing.',
        modules: [
          {
            id: 'jss-english-u1-m1',
            title: 'Parts of Speech & Tenses',
            description: 'Identifying word classes and understanding time in language.',
            topics: [
              { id: 't9', title: 'Nouns and Pronouns', description: 'People, places, things, and ideas.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: true, score: 95 },
              { id: 't10', title: 'Verbs: Action and Linking', description: 'The engine of the sentence.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-je-1', title: 'Adjectives and Adverbs', description: 'Describing words and modifying words.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
              { id: 't-je-2', title: 'Prepositions and Conjunctions', description: 'Showing relationships and connecting ideas.', contentType: 'reading', duration: 15, difficulty: 'intermediate', completed: false },
              { id: 't-je-3', title: 'Simple Present, Past, and Future Tenses', description: 'Expressing actions at different times.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-je-4', title: 'Subject-Verb Agreement (Concord)', description: 'Making subjects and verbs agree in number.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
           {
            id: 'jss-english-u1-m2',
            title: 'Writing Skills',
            description: 'Learn to write different types of essays and letters.',
            topics: [
                { id: 't-eng1', title: 'Elements of a Story', description: 'Learn about plot, characters, setting, and theme.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                { id: 't-eng2', title: 'Writing a Narrative Essay', description: 'Put your story ideas on paper and structure your narrative.', contentType: 'assignment', duration: 60, difficulty: 'intermediate', completed: false },
                { id: 't-je-5', title: 'Formal and Informal Letter Writing', description: 'Learn the formats for different types of letters.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                { id: 't-je-6', title: 'Descriptive Essay Writing', description: 'How to paint a picture with words.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
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
        title: 'JSS 2: Advanced Grammar and Comprehension',
        description: 'Exploring phrases, clauses, and developing deeper reading skills.',
        modules: [
            {
                id: 'jss-english-u2-m1',
                title: 'Sentence Structure',
                description: 'Understanding the building blocks of sentences.',
                topics: [
                    { id: 't-je-9', title: 'Phrases and Clauses', description: 'Identifying different types of phrases and clauses.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-je-10', title: 'Types of Sentences', description: 'Simple, compound, and complex sentences.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-english-u2-m2',
                title: 'Comprehension and Summary',
                description: 'Reading for meaning and extracting key information.',
                topics: [
                    { id: 't-je-11', title: 'Reading for Main Idea and Details', description: 'Techniques for effective comprehension.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-je-12', title: 'Introduction to Summary Writing', description: 'How to shorten a passage without losing meaning.', contentType: 'assignment', duration: 45, difficulty: 'advanced', completed: false },
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
        id: 'jss-english-u3',
        title: 'JSS 3: Literature and Formal Writing',
        description: 'Introduction to literary genres and preparing for certificate examinations.',
        modules: [
            {
                id: 'jss-english-u3-m1',
                title: 'Introduction to Literature',
                description: 'Exploring drama, prose, and poetry.',
                topics: [
                    { id: 't-je-13', title: 'Elements of Drama', description: 'Character, plot, setting, and theme in plays.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-je-14', title: 'Literary Devices', description: 'Identifying figures of speech like metaphor, simile, and personification.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-english-u3-m2',
                title: 'Advanced Composition',
                description: 'Writing for specific purposes.',
                topics: [
                    { id: 't-je-15', title: 'Argumentative and Expository Essays', description: 'Developing and defending a point of view.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
                    { id: 't-je-16', title: 'Article and Report Writing', description: 'Structuring formal articles for newspapers and reports.', contentType: 'assignment', duration: 60, difficulty: 'advanced', completed: false },
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
        title: 'JSS 1: Living Things and Our Environment',
        description: 'Understanding the characteristics of life, cells, matter, energy, and safety.',
        modules: [
          {
            id: 'jss-bsc-u1-m1',
            title: 'The Cell and Classification',
            description: 'The basic unit of life and classifying organisms.',
            topics: [
              { id: 't-bs1', title: 'Characteristics of Life (MR. NIGER D)', description: 'Explore the seven life processes.', contentType: 'video', duration: 12, difficulty: 'beginner', completed: true, score: 88 },
              { id: 't-jbs-3', title: 'Introduction to the Cell', description: 'Discovering the building blocks of life.', contentType: 'animation', duration: 18, difficulty: 'intermediate', completed: false },
              { id: 't-jbs-4', title: 'Plant vs. Animal Cells', description: 'Comparing the structures of plant and animal cells.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-bsc-u1-m2',
            title: 'Matter, Energy, and Safety',
            description: 'Exploring the physical world and how to be safe in it.',
            topics: [
                { id: 't-jbs-5', title: 'States of Matter', description: 'Solids, Liquids, and Gases.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                { id: 't-jbs-7', title: 'Forms of Energy', description: 'Exploring heat, light, sound, and electrical energy.', contentType: 'reading', duration: 18, difficulty: 'intermediate', completed: false },
                { id: 't-jbs-10', title: 'Environmental Pollution', description: 'Causes and effects of air, water, and land pollution.', contentType: 'reading', duration: 22, difficulty: 'intermediate', completed: false },
                { id: 't-jbs-11', title: 'Safety and First Aid', description: 'Basic safety measures at home and school.', contentType: 'simulation', duration: 25, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-bsc-u2',
        title: 'JSS 2: Human Body Systems and Energy',
        description: 'Exploring the digestive, respiratory, circulatory systems, and simple machines.',
        modules: [
            {
                id: 'jss-bsc-u2-m1',
                title: 'Human Body Systems',
                description: 'Understanding how our major organ systems work.',
                topics: [
                    { id: 't-jbs-12', title: 'The Digestive System', description: 'The journey of food through the body.', contentType: 'animation', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-13', title: 'The Respiratory System', description: 'How we breathe and use oxygen.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-14', title: 'The Circulatory System', description: 'The heart, blood, and blood vessels.', contentType: 'video', duration: 22, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-bsc-u2-m2',
                title: 'Energy and Machines',
                description: 'Transformation of energy and the use of simple machines.',
                topics: [
                    { id: 't-jbs-15', title: 'Energy Transformation', description: 'Changing energy from one form to another.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-16', title: 'Simple Machines', description: 'Levers, pulleys, inclined planes, and their uses.', contentType: 'simulation', duration: 25, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'jss-bsc-u3',
        title: 'JSS 3: Introductory Chemistry, Physics and Health',
        description: 'Fundamentals of elements, compounds, light, sound, electricity, and human reproduction.',
        modules: [
            {
                id: 'jss-bsc-u3-m1',
                title: 'Basic Chemistry and Physics',
                description: 'Exploring the building blocks of matter and fundamental physical phenomena.',
                topics: [
                    { id: 't-jbs-17', title: 'Elements, Compounds, and Mixtures', description: 'The classification of substances.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-18', title: 'Light and Sound', description: 'Properties of light (reflection, refraction) and sound.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-19', title: 'Introduction to Electricity', description: 'Simple circuits and electrical safety.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-bsc-u3-m2',
                title: 'Health and Human Reproduction',
                description: 'Understanding puberty, reproduction, and sexually transmitted infections.',
                topics: [
                    { id: 't-jbs-20', title: 'Puberty and Adolescence', description: 'Physical and emotional changes during teenage years.', contentType: 'video', duration: 20, difficulty: 'beginner', completed: false },
                    { id: 't-jbs-21', title: 'The Human Reproductive System', description: 'Male and female reproductive organs and their functions.', contentType: 'animation', duration: 25, difficulty: 'advanced', completed: false },
                    { id: 't-jbs-22', title: 'Sexually Transmitted Infections (STIs)', description: 'Awareness and prevention of common STIs including HIV/AIDS.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
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
            title: 'JSS 1: Introduction to Technology and Drawing',
            description: 'Understanding safety, basic tools, and the language of technology.',
            modules: [
                {
                    id: 'jss-btech-u1-m1',
                    title: 'Safety and Workshop Practice',
                    description: 'Learn about workshop safety rules and tools.',
                    topics: [
                        { id: 't-bt1', title: 'Workshop Hazards', description: 'Identify common dangers in a technology workshop and how to avoid them.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-jbt-1', title: 'Identifying Workshop Hand Tools', description: 'Recognizing and naming common hand tools.', contentType: 'simulation', duration: 25, difficulty: 'beginner', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-btech-u1-m2',
                    title: 'Technical Drawing Instruments',
                    description: 'Learning to use the tools for technical drawing.',
                    topics: [
                        { id: 't-jbt-2', title: 'The Drawing Board and T-Square', description: 'Setting up your drawing paper.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-jbt-3', title: 'Using Set Squares and Protractors', description: 'Drawing lines, angles, and basic shapes.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-jbt-4', title: 'Types of Lines', description: 'Understanding object lines, construction lines, and hidden lines.', contentType: 'reading', duration: 15, difficulty: 'intermediate', completed: false },
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
            id: 'jss-btech-u2',
            title: 'JSS 2: Materials Processing and Drawing Techniques',
            description: 'Working with wood and metal, and learning advanced drawing methods.',
            modules: [
                {
                    id: 'jss-btech-u2-m1',
                    title: 'Woodwork and Metalwork',
                    description: 'Basic processes for shaping wood and metal.',
                    topics: [
                        { id: 't-jbt-6', title: 'Types of Wood', description: 'Differentiating between hardwood and softwood.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-jbt-7', title: 'Basic Woodworking Joints', description: 'An introduction to butt joints, lap joints, etc.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-jbt-8', title: 'Ferrous and Non-ferrous Metals', description: 'Identifying common metals and their properties.', contentType: 'reading', duration: 15, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                 {
                    id: 'jss-btech-u2-m2',
                    title: 'Pictorial and Orthographic Drawing',
                    description: 'Representing 3D objects on a 2D plane.',
                    topics: [
                        { id: 't-jbt-10', title: 'Isometric Drawing', description: 'Drawing 3D objects on isometric axes.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
                        { id: 't-jbt-11', title: 'Orthographic Projection', description: 'First and third angle projections.', contentType: 'video', duration: 25, difficulty: 'advanced', completed: false },
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
            id: 'jss-btech-u3',
            title: 'JSS 3: Applied Technology',
            description: 'Introduction to building, electrical systems, and auto mechanics.',
            modules: [
                {
                    id: 'jss-btech-u3-m1',
                    title: 'Building and Electrical Technology',
                    description: 'Basics of construction and simple electrical circuits.',
                    topics: [
                        { id: 't-jbt-12', title: 'Simple Building Plans', description: 'Reading and interpreting basic floor plans.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-jbt-13', title: 'Electrical Symbols and Simple Circuits', description: 'Understanding components and drawing circuit diagrams.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-btech-u3-m2',
                    title: 'Introduction to Auto Mechanics',
                    description: 'Understanding the basic principles of a car engine.',
                    topics: [
                        { id: 't-jbt-14', title: 'The Internal Combustion Engine', description: 'The four-stroke engine cycle.', contentType: 'animation', duration: 30, difficulty: 'advanced', completed: false },
                        { id: 't-jbt-15', title: 'Basic Car Maintenance', description: 'Checking oil, water, and tire pressure.', contentType: 'video', duration: 20, difficulty: 'beginner', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                }
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
            title: 'JSS 1: Family and Environment',
            description: 'Understanding the family, culture, and our physical surroundings.',
            modules: [
                {
                    id: 'jss-ss-u1-m1',
                    title: 'The Family and Culture',
                    description: 'The basic unit of society and cultural diversity.',
                    topics: [
                        { id: 't-jss-1', title: 'Roles and Responsibilities in the Family', description: 'Understanding the duties of parents and children.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-jss-4', title: 'Meaning of Culture', description: 'What makes up a people\'s way of life?', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-jss-5', title: 'Major Ethnic Groups in Nigeria', description: 'An overview of the Hausa, Igbo, and Yoruba cultures.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-ss-u1-m2',
                    title: 'Our Physical Environment & Social Issues',
                    description: 'Learning about the natural world and societal problems.',
                    topics: [
                        { id: 't-jss-2', title: 'Landforms and Water Bodies', description: 'Identifying mountains, rivers, lakes in Nigeria.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
                        { id: 't-jss-7', title: 'Drug Abuse', description: 'The dangers of substance abuse.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-jss-8', title: 'Cultism', description: 'Understanding the risks and consequences of joining cults.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
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
            id: 'jss-ss-u2',
            title: 'JSS 2: Governance and National Economy',
            description: 'Exploring government structures, social issues, and economic resources.',
            modules: [
                {
                    id: 'jss-ss-u2-m1',
                    title: 'Government and Social Order',
                    description: 'Understanding the arms of government and addressing social problems.',
                    topics: [
                        { id: 't-jss-10', title: 'The Arms of Government', description: 'Legislature, Executive, and Judiciary.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-jss-11', title: 'Human Trafficking', description: 'Causes, consequences, and prevention.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-jss-12', title: 'Corruption', description: 'Understanding the impact of corruption on national development.', contentType: 'video', duration: 22, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-ss-u2-m2',
                    title: 'Nigeria\'s Economy',
                    description: 'Learning about our national resources and industries.',
                    topics: [
                        { id: 't-jss-13', title: 'Natural Resources in Nigeria', description: 'Crude oil, coal, tin, and agricultural resources.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-jss-14', title: 'Major Industries in Nigeria', description: 'The role of manufacturing and service industries.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                }
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        },
        {
            id: 'jss-ss-u3',
            title: 'JSS 3: Citizenship and International Relations',
            description: 'Understanding the Nigerian constitution and our place in the world.',
            modules: [
                {
                    id: 'jss-ss-u3-m1',
                    title: 'The Nigerian Citizen',
                    description: 'Rights, duties, and the constitution.',
                    topics: [
                        { id: 't-jss-15', title: 'The Nigerian Constitution', description: 'The supreme law of the land.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                        { id: 't-jss-16', title: 'Fundamental Human Rights', description: 'Know your rights as a citizen.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-ss-u3-m2',
                    title: 'Nigeria and the World',
                    description: 'Nigeria\'s relationship with other countries and organizations.',
                    topics: [
                        { id: 't-jss-17', title: 'ECOWAS, AU, and the UN', description: 'Nigeria\'s role in international organizations.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
                        { id: 't-jss-18', title: 'Science, Technology, and Society', description: 'The impact of technology on our lives.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
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
            title: 'JSS 1: Citizenship and National Values',
            description: 'Learning about citizenship, rights, duties, and core national values.',
            modules: [
                {
                    id: 'jss-ce-u1-m1',
                    title: 'Citizenship and Values',
                    description: 'Understanding what it means to be a citizen and the values we share.',
                    topics: [
                        { id: 't-jce-1', title: 'Who is a Citizen?', description: 'Defining citizenship and ways of becoming a citizen.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-ce1', title: 'Your Rights as a Citizen', description: 'Learn about fundamental human rights.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
                        { id: 't-ce2', title: 'Your Duties as a Citizen', description: 'Explore responsibilities like paying taxes and obeying laws.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                        { id: 't-jce-3', title: 'Patriotism and Nationalism', description: 'Loving and serving your country.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                        { id: 't-jce-4', title: 'National Symbols', description: 'Understanding the Nigerian flag, coat of arms, and anthem.', contentType: 'animation', duration: 20, difficulty: 'beginner', completed: false },
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
            id: 'jss-ce-u2',
            title: 'JSS 2: Governance and Democracy',
            description: 'Understanding the constitution, rule of law, and democratic principles.',
            modules: [
                {
                    id: 'jss-ce-u2-m1',
                    title: 'The Constitution and Rule of Law',
                    description: 'The supreme law and the principle of equality before the law.',
                    topics: [
                        { id: 't-jce-5', title: 'What is a Constitution?', description: 'The importance and functions of a constitution.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-jce-6', title: 'The Rule of Law', description: 'The principle that everyone is equal before the law.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-ce-u2-m2',
                    title: 'Democracy and Elections',
                    description: 'Government of the people, by the people, for the people.',
                    topics: [
                        { id: 't-jce-7', title: 'Pillars of Democracy', description: 'Free press, independent judiciary, and the role of citizens.', contentType: 'reading', duration: 22, difficulty: 'advanced', completed: false },
                        { id: 't-jce-8', title: 'The Importance of Voting', description: 'Understanding the electoral process.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                }
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        },
        {
            id: 'jss-ce-u3',
            title: 'JSS 3: Public Service and Corruption',
            description: 'Understanding the civil service and the fight against corruption.',
            modules: [
                {
                    id: 'jss-ce-u3-m1',
                    title: 'The Public Service',
                    description: 'The machinery of government.',
                    topics: [
                        { id: 't-jce-9', title: 'The Civil Service', description: 'Structure and functions of the civil service.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-jce-10', title: 'Accountability and Transparency', description: 'Holding public officials responsible.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'jss-ce-u3-m2',
                    title: 'Fighting Corruption',
                    description: 'The roles of individuals and agencies.',
                    topics: [
                        { id: 't-jce-11', title: 'Causes and Effects of Corruption', description: 'Understanding the roots and impact of corruption.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-jce-12', title: 'Agencies Fighting Corruption', description: 'The role of EFCC and ICPC.', contentType: 'video', duration: 22, difficulty: 'advanced', completed: false },
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
        title: 'JSS 1: Introduction to Agriculture',
        description: 'Understanding the meaning, importance, branches, and basics of crop and animal production.',
        modules: [
          {
            id: 'jss-ag-u1-m1',
            title: 'Foundations of Agriculture',
            description: 'Explore the scope of agricultural science and soil properties.',
            topics: [
                { id: 't-ag1', title: 'What is Agriculture?', description: 'A video explaining the importance of agriculture to Nigeria.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                { id: 't-ag2', title: 'Branches of Agriculture', description: 'Learn about agronomy, horticulture, animal husbandry, and more.', contentType: 'reading', duration: 18, difficulty: 'beginner', completed: false },
                { id: 't-jag-2', title: 'What is Soil?', description: 'Composition and types of soil.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-ag-u1-m2',
            title: 'Introduction to Crop and Animal Rearing',
            description: 'The very basics of planting and raising animals.',
            topics: [
              { id: 't-jag-4', title: 'Classification of Crops', description: 'Cereal, legume, root, and tuber crops.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-jag-6', title: 'Classification of Farm Animals', description: 'Poultry, cattle, goats, pigs, etc.', contentType: 'reading', duration: 18, difficulty: 'beginner', completed: false },
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
      id: 'jss-ag-u2',
      title: 'JSS 2: Crop and Animal Production Practices',
      description: 'Learning about planting methods, livestock management, and soil science.',
      modules: [
        {
          id: 'jss-ag-u2-m1',
          title: 'Crop Production Techniques',
          description: 'From planting to harvesting and storage.',
          topics: [
            { id: 't-jag-10', title: 'Planting Methods', description: 'Broadcasting, drilling, and transplanting.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
            { id: 't-jag-11', title: 'Harvesting and Storage of Crops', description: 'Proper techniques to reduce post-harvest losses.', contentType: 'reading', duration: 22, difficulty: 'intermediate', completed: false },
          ],
          get completedTopics() { return this.topics.filter(t => t.completed).length; },
          get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        },
        {
          id: 'jss-ag-u2-m2',
          title: 'Livestock Management',
          description: 'Feeding, housing, and health of farm animals.',
          topics: [
            { id: 't-jag-7', title: 'Animal Feeds and Feeding', description: 'What farm animals eat.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
            { id: 't-jag-8', title: 'Basic Animal Health', description: 'Common diseases and parasites.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
            { id: 't-jag-12', title: 'Soil Conservation and Irrigation', description: 'Protecting soil from erosion and supplying water to crops.', contentType: 'video', duration: 25, difficulty: 'advanced', completed: false },
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
      id: 'jss-ag-u3',
      title: 'JSS 3: Farm Mechanization and Agribusiness',
      description: 'Using simple farm tools and understanding the business of agriculture.',
      modules: [
        {
          id: 'jss-ag-u3-m1',
          title: 'Farm Tools and Mechanization',
          description: 'Tools and implements used in farming.',
          topics: [
            { id: 't-jag-13', title: 'Simple Farm Tools', description: 'Cutlass, hoe, rake, and their uses.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
            { id: 't-jag-14', title: 'Farm Implements', description: 'Ploughs, harrows, and planters.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
          ],
          get completedTopics() { return this.topics.filter(t => t.completed).length; },
          get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        },
        {
          id: 'jss-ag-u3-m2',
          title: 'Agricultural Economics',
          description: 'The business side of farming.',
          topics: [
            { id: 't-jag-15', title: 'Introduction to Agribusiness', description: 'Viewing farming as a business.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
            { id: 't-jag-16', title: 'Marketing of Agricultural Produce', description: 'From farm to consumer.', contentType: 'video', duration: 22, difficulty: 'advanced', completed: false },
            { id: 't-jag-9', title: 'Introduction to Fishery and Forestry', description: 'The basics of fish farming and forest management.', contentType: 'video', duration: 15, difficulty: 'intermediate', completed: false },
          ],
          get completedTopics() { return this.topics.filter(t => t.completed).length; },
          get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
        }
      ],
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
        title: 'JSS 1: Introduction to Business',
        description: 'Learning the basics of the office environment, commerce, and bookkeeping.',
        modules: [
          {
            id: 'jss-bs-u1-m1',
            title: 'Office Practice and Commerce',
            description: 'Understanding the office and the exchange of goods.',
            topics: [
                { id: 't-bsn1', title: 'The Office and its Functions', description: 'Learn what an office is and its importance.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
                { id: 't-jbs-1', title: 'Office Documents', description: 'Introduction to memos, letters, and reports.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                { id: 't-jbs-3', title: 'Trade', description: 'The exchange of goods and services.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-bs-u1-m2',
            title: 'Introduction to Bookkeeping',
            description: 'The starting point of accounting.',
            topics: [
              { id: 't-jbs-5', title: 'Source Documents', description: 'Invoices, receipts, and debit/credit notes.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-jbs-6', title: 'The Cash Book', description: 'Recording cash and bank transactions.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }, {
        id: 'jss-bs-u2',
        title: 'JSS 2: Aids to Trade and Office Procedures',
        description: 'Exploring distribution, insurance, and the role of office equipment.',
        modules: [
            {
                id: 'jss-bs-u2-m1',
                title: 'Commerce: Aids to Trade',
                description: 'The services that facilitate trade.',
                topics: [
                    { id: 't-jbs-8', title: 'Channels of Distribution', description: 'From producer to consumer.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-9', title: 'Insurance', description: 'The principle of pooling risks.', contentType: 'reading', duration: 22, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-bs-u2-m2',
                title: 'Office Practice and Bookkeeping',
                description: 'Office machines and the trial balance.',
                topics: [
                    { id: 't-jbs-10', title: 'Office Equipment', description: 'Computers, printers, and photocopiers.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
                    { id: 't-jbs-11', title: 'The Trial Balance', description: 'Checking the arithmetic accuracy of the ledger.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }, {
        id: 'jss-bs-u3',
        title: 'JSS 3: Finance and Business Environment',
        description: 'Understanding banking, business organizations, and keyboarding skills.',
        modules: [
            {
                id: 'jss-bs-u3-m1',
                title: 'Introduction to Finance',
                description: 'The role of banks and the capital market.',
                topics: [
                    { id: 't-jbs-12', title: 'Banking Services', description: 'Savings accounts, current accounts, and loans.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-13', title: 'The Capital Market', description: 'Introduction to stocks and shares.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'jss-bs-u3-m2',
                title: 'Business Organizations and Keyboarding',
                description: 'Types of businesses and developing typing skills.',
                topics: [
                    { id: 't-jbs-14', title: 'Types of Business Organizations', description: 'Sole proprietorship, partnership, and limited companies.', contentType: 'reading', duration: 30, difficulty: 'intermediate', completed: false },
                    { id: 't-jbs-15', title: 'Keyboarding: Speed and Accuracy', description: 'Practice drills for improving typing speed.', contentType: 'simulation', duration: 30, difficulty: 'beginner', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
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
        title: 'JSS 1: Foundations of Home Economics',
        description: 'Understanding home management, food groups, and basic sewing.',
        modules: [
          {
            id: 'jss-he-u1-m1',
            title: 'The Home and Food',
            description: 'Managing a healthy home and understanding nutrition.',
            topics: [
                { id: 't-he1', title: 'The Healthy Home Environment', description: 'Cleanliness and safety in the home.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
                { id: 't-he2', title: 'Food and its Classes', description: 'Introduction to the basic classes of food.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
                { id: 't-jhe-3', title: 'Functions of Food', description: 'Why our bodies need different types of food.', contentType: 'reading', duration: 15, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-he-u1-m2',
            title: 'Basic Clothing and Textiles',
            description: 'Introduction to sewing tools and stitches.',
            topics: [
              { id: 't-jhe-5', title: 'Basic Sewing Tools', description: 'Needles, thread, scissors, and measuring tape.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-jhe-6', title: 'Simple Stitches', description: 'Learning how to do running stitch and back stitch.', contentType: 'simulation', duration: 25, difficulty: 'beginner', completed: false },
              { id: 't-jhe-7', 'title': 'Care of Clothes', description: 'Washing, ironing, and storing clothes properly.', 'contentType': 'reading', duration: 18, difficulty: 'beginner', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }, {
        id: 'jss-he-u2',
        title: 'JSS 2: Food Preparation and Resource Management',
        description: 'Learning about meal planning, food preservation, and managing family resources.',
        modules: [{
            id: 'jss-he-u2-m1',
            title: 'Food and Nutrition',
            description: 'Planning healthy meals and preserving food.',
            topics: [
                { id: 't-jhe-2', title: 'A Balanced Diet', description: 'Learn how to plan a balanced meal.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
                { id: 't-jhe-9', title: 'Food Preservation', description: 'Methods like drying, smoking, and refrigeration.', contentType: 'video', duration: 22, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-he-u2-m2',
            title: 'Home and Resource Management',
            description: 'Making wise decisions for the family.',
            topics: [
              { id: 't-jhe-1', title: 'Family Resources', description: 'Managing time, energy, and money.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-jhe-10', title: 'Decision Making', description: 'Steps in making good family decisions.', contentType: 'reading', duration: 18, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
    }, {
        id: 'jss-he-u3',
        title: 'JSS 3: Family Living and Entrepreneurship',
        description: 'Understanding child development, consumer education, and entrepreneurial skills.',
        modules: [{
            id: 'jss-he-u3-m1',
            title: 'Family Living and Child Development',
            description: 'Marriage and the stages of child development.',
            topics: [
                { id: 't-jhe-11', title: 'Marriage and Family', description: 'Types of marriage and roles in the family.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                { id: 't-jhe-12', title: 'Child Development', description: 'From infancy to adolescence.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'jss-he-u3-m2',
            title: 'Consumer Education and Entrepreneurship',
            description: 'Becoming a smart shopper and exploring business opportunities.',
            topics: [
              { id: 't-jhe-13', title: 'Consumer Education', description: 'Budgeting and making wise shopping choices.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-jhe-14', title: 'Entrepreneurship in Home Economics', description: 'Opportunities in catering, event planning, and fashion.', contentType: 'video', duration: 22, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
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
            title: 'SSS 1: Algebra and Trigonometry',
            description: 'Quadratic equations, sequences, series, and trigonometric ratios.',
            modules: [
                {
                    id: 'sss-math-u1-m1',
                    title: 'Quadratic Equations',
                    description: 'Solving equations of the second degree.',
                    topics: [
                        { id: 't-ssm1', title: 'Factorization Method', description: 'Learn how to solve quadratic equations by finding factors.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm2', title: 'Completing the Square', description: 'A powerful technique for solving any quadratic equation.', contentType: 'simulation', duration: 25, difficulty: 'advanced', completed: false },
                        { id: 't-ssm3', title: 'The Quadratic Formula', description: 'Applying the "almighty" formula.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'sss-math-u1-m2',
                    title: 'Sequences, Series and Trigonometry',
                    description: 'Understanding arithmetic/geometric progressions and trigonometric rules.',
                    topics: [
                        { id: 't-ssm4', title: 'Arithmetic Progressions (AP)', description: 'Finding the nth term and sum of an AP.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm5', title: 'Geometric Progressions (GP)', description: 'Finding the nth term and sum of a GP.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                        { id: 't-ssm6', title: 'Sine, Cosine, and Tangent Ratios', description: 'Defining the basic trig ratios in right-angled triangles.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm7', title: 'The Sine and Cosine Rules', description: 'Solving non-right-angled triangles.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
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
            id: 'sss-math-u2',
            title: 'SSS 1: Statistics and Probability',
            description: 'Collecting, analyzing, interpreting, and presenting data.',
            modules: [
                {
                    id: 'sss-math-u2-m1',
                    title: 'Data Representation and Analysis',
                    description: 'Making sense of data sets.',
                    topics: [
                        { id: 't-ssm9', title: 'Measures of Central Tendency', description: 'Calculating mean, median, and mode for grouped data.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm10', title: 'Measures of Dispersion', description: 'Understanding range, variance, and standard deviation.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
                        { id: 't-ssm11', title: 'Histograms and Frequency Polygons', description: 'Visual representation of data.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm12', title: 'Introduction to Probability', description: 'Calculating the likelihood of events.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                }
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        },
        {
            id: 'sss-math-u3',
            title: 'SSS 2: Geometry and Mensuration',
            description: 'Properties of circles, chords, and surface area of 3D shapes.',
            modules: [
                {
                    id: 'sss-math-u3-m1',
                    title: 'Circle Geometry',
                    description: 'Theorems related to angles and chords in a circle.',
                    topics: [
                        { id: 't-ssm13', title: 'Angles at the Center and Circumference', description: 'The angle at the center is twice the angle at the circumference.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm14', title: 'Angles in the Same Segment', description: 'Understanding that angles subtended by the same arc are equal.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm15', title: 'Tangents and Circles', description: 'Properties of tangents from an external point.', contentType: 'reading', duration: 22, difficulty: 'advanced', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'sss-math-u3-m2',
                    title: 'Advanced Mensuration',
                    description: 'Calculating surface area and volume of complex shapes.',
                    topics: [
                        { id: 't-ssm16', title: 'Surface Area of Cone and Pyramid', description: 'Formulas and applications.', contentType: 'video', duration: 28, difficulty: 'advanced', completed: false },
                        { id: 't-ssm17', title: 'Surface Area and Volume of Sphere', description: 'Calculations for spheres and hemispheres.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                }
            ],
            get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
            get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
            get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
        },
        {
            id: 'sss-math-u4',
            title: 'SSS 3: Calculus and Advanced Probability',
            description: 'Introduction to differentiation, integration, and complex probability.',
            modules: [
                {
                    id: 'sss-math-u4-m1',
                    title: 'Introduction to Calculus',
                    description: 'The mathematics of change.',
                    topics: [
                        { id: 't-ssm18', title: 'Differentiation of Polynomials', description: 'Finding the gradient function from first principles.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
                        { id: 't-ssm19', title: 'Applications of Differentiation', description: 'Finding maxima, minima, and rates of change.', contentType: 'simulation', duration: 35, difficulty: 'advanced', completed: false },
                        { id: 't-ssm20', title: 'Integration of Polynomials', description: 'The reverse of differentiation and finding area under a curve.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
                    ],
                    get completedTopics() { return this.topics.filter(t => t.completed).length; },
                    get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
                },
                {
                    id: 'sss-math-u4-m2',
                    title: 'Probability',
                    description: 'Mutually exclusive and independent events.',
                    topics: [
                        { id: 't-ssm21', title: 'Permutations and Combinations', description: 'Arrangements and selections of objects.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                        { id: 't-ssm22', title: 'Mutually Exclusive Events', description: 'Applying the addition law of probability.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                        { id: 't-ssm23', title: 'Independent Events', description: 'Applying the multiplication law of probability.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
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
        title: 'SSS 1: Lexis, Structure and Oral English',
        description: 'Mastering advanced grammar, vocabulary, and the sounds of English.',
        modules: [
          {
            id: 'sss-eng-u1-m1',
            title: 'Concord and Sentence Patterns',
            description: 'Ensuring subject-verb agreement and constructing complex sentences.',
            topics: [
              { id: 't-sse1', title: 'Rules of Concord', description: 'Explore the 16 rules of subject-verb agreement.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sse2', title: 'Complex Sentences', description: 'Learn to use clauses to build sophisticated sentences.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-sse3', title: 'Question Tags', description: 'Forming and answering question tags correctly.', contentType: 'simulation', duration: 15, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-eng-u1-m2',
            title: 'Vowels and Consonants',
            description: 'The building blocks of spoken English.',
            topics: [
              { id: 't-sse4', title: 'Pure Vowels (Monophthongs)', description: 'Identifying and producing the 12 pure vowel sounds.', contentType: 'audio', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-sse5', title: 'Diphthongs', description: 'Understanding vowel glides.', contentType: 'audio', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-sse6', title: 'Consonant Sounds', description: 'Voiced and voiceless consonants.', contentType: 'audio', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-eng-u2',
        title: 'SSS 2: Comprehension, Summary & Literature',
        description: 'Developing critical reading, summary skills and appreciating literature.',
        modules: [
          {
            id: 'sss-eng-u2-m1',
            title: 'Advanced Comprehension and Summary',
            description: 'Reading for meaning and concise writing.',
            topics: [
              { id: 't-sse13', title: 'Reading for In-depth Understanding', description: 'Figurative language, mood, and tone.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sse14', title: 'Mastering Summary Writing', description: 'Techniques for writing concise and accurate summaries.', contentType: 'assignment', duration: 45, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-eng-u2-m2',
            title: 'Introduction to Literary Appreciation',
            description: 'Analyzing prose, poetry, and drama.',
            topics: [
              { id: 't-sse15', title: 'Character and Thematic Analysis in Prose', description: 'Analyzing characters and themes in recommended texts.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sse16', title: 'Poetic Devices', description: 'Identifying and explaining figures of speech in poetry.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-eng-u3',
        title: 'SSS 3: Examination Focus and Formal Writing',
        description: 'Preparing for WAEC/NECO and mastering formal communication.',
        modules: [
          {
            id: 'sss-eng-u3-m1',
            title: 'Writing for Examinations',
            description: 'Mastering different forms of composition.',
            topics: [
              { id: 't-sse9', title: 'Argumentative and Persuasive Essays', description: 'Techniques for building a strong argument.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sse10', title: 'Expository Essays', description: 'How to explain a topic clearly and logically.', contentType: 'reading', duration: 30, difficulty: 'intermediate', completed: false },
              { id: 't-sse11', title: 'Report Writing', description: 'Structure and language of formal reports.', contentType: 'classwork', duration: 45, difficulty: 'advanced', completed: false },
              { id: 't-sse12', title: 'Creative Writing', description: 'Techniques for writing compelling short stories.', contentType: 'assignment', duration: 60, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-eng-u3-m2',
            title: 'Advanced Oral English and Formal Writing',
            description: 'The music of English and professional writing.',
            topics: [
              { id: 't-sse7', title: 'Word Stress and Intonation', description: 'Identifying stress patterns and intonation.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-sse17', title: 'Formal Letter Writing', description: 'Applications, complaints, and official correspondence.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sse18', title: 'Public Speaking', description: 'Techniques for preparing and delivering a speech.', contentType: 'video', duration: 20, difficulty: 'advanced', completed: false },
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
        title: 'SSS 1: Mechanics, Waves, and Optics',
        description: 'The study of motion, forces, energy, light, and sound.',
        modules: [
          {
            id: 'sss-physics-u1-m1',
            title: 'Kinematics and Dynamics',
            description: 'Describing motion and its causes.',
            topics: [
              { id: 't11', title: 'Vectors and Scalars', description: 'Understanding distance, displacement, speed, and velocity.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't12', title: 'Newton\'s Laws of Motion', description: 'Inertia, F=ma, and action-reaction.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sphy2', title: 'Work, Energy, and Power', description: 'Understanding the relationship between these concepts.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-physics-u1-m2',
            title: 'Waves, Sound and Light',
            description: 'Properties of waves and optics.',
            topics: [
                { id: 't-phy1', title: 'Reflection of Light', description: 'Laws of reflection and image formation in plane mirrors.', contentType: 'video', duration: 18, difficulty: 'intermediate', completed: false },
                { id: 't-sphy3', title: 'Refraction of Light', description: 'Snell\'s law and the bending of light.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                { id: 't-sphy5', title: 'Sound Waves', description: 'Production and propagation of sound, echoes.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-physics-u2',
        title: 'SSS 2: Heat, Electricity and Magnetism',
        description: 'Study of thermal energy, electric circuits, and magnetic effects.',
        modules: [
            {
                id: 'sss-physics-u2-m1',
                title: 'Thermal Physics',
                description: 'Temperature, heat, and gas laws.',
                topics: [
                    { id: 't-sphy10', title: 'Temperature and Thermometers', description: 'Understanding temperature scales.', contentType: 'reading', duration: 20, difficulty: 'beginner', completed: false },
                    { id: 't-sphy11', title: 'Heat Transfer', description: 'Conduction, convection, and radiation.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-sphy12', title: 'Gas Laws', description: 'Boyle\'s Law, Charles\' Law, and the Pressure Law.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
             {
                id: 'sss-physics-u2-m2',
                title: 'Electric Circuits',
                description: 'Understanding current, voltage, and resistance.',
                topics: [
                    { id: 't-sphy6', title: 'Ohm\'s Law', description: 'The relationship V=IR.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-sphy7', title: 'Resistors in Series and Parallel', description: 'Calculating equivalent resistance.', contentType: 'video', duration: 22, difficulty: 'intermediate', completed: false },
                    { id: 't-sphy8', title: 'Electric Power and Energy', description: 'Calculating energy consumption.', contentType: 'reading', duration: 20, difficulty: 'advanced', completed: false },
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
        id: 'sss-physics-u3',
        title: 'SSS 3: Fields and Modern Physics',
        description: 'Exploring electric, magnetic, gravitational fields and atomic physics.',
        modules: [
            {
                id: 'sss-physics-u3-m1',
                title: 'Fields and Electromagnetism',
                description: 'Gravitational, electric, and magnetic fields.',
                topics: [
                    { id: 't-sphy13', title: 'Gravitational Fields', description: 'Newton\'s law of universal gravitation.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                    { id: 't-sphy9', title: 'Electromagnetism', description: 'The relationship between electricity and magnetism.', contentType: 'animation', duration: 25, difficulty: 'advanced', completed: false },
                    { id: 't-sphy14', title: 'Electric Fields', description: 'Coulomb\'s Law and electric field intensity.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'sss-physics-u3-m2',
                title: 'Atomic and Nuclear Physics',
                description: 'The structure of the atom and radioactivity.',
                topics: [
                    { id: 't-sphy15', title: 'Models of the Atom', description: 'From Thomson to Bohr.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-sphy16', title: 'Radioactivity', description: 'Alpha, beta, and gamma radiation.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                    { id: 't-sphy17', title: 'Half-Life and Nuclear Energy', description: 'Radioactive decay, fission, and fusion.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
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
        title: 'SSS 1: Fundamentals of Chemistry',
        description: 'Understanding atomic structure, bonding, and stoichiometry.',
        modules: [
          {
            id: 'sss-chem-u1-m1',
            title: 'Atoms, Molecules and Bonding',
            description: 'Learn about the fundamental particles and forces of matter.',
            topics: [
              { id: 't-chem1', title: 'Introduction to Atomic Theory', description: 'From Dalton to the modern model of the atom.', contentType: 'video', duration: 20, difficulty: 'beginner', completed: false },
              { id: 't-schem1', title: 'The Periodic Table', description: 'Arrangement of elements and periodic trends.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-schem2', title: 'Chemical Bonding', description: 'Ionic, covalent, and metallic bonds.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-chem-u1-m2',
            title: 'Stoichiometry and Gas Laws',
            description: 'The quantitative aspect of chemistry.',
            topics: [
              { id: 't-schem3', title: 'The Mole Concept', description: 'Understanding Avogadro\'s number and molar mass.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-schem4', title: 'Balancing Chemical Equations', description: 'The law of conservation of mass.', contentType: 'simulation', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-schem5', title: 'Gas Laws', description: 'Boyle\'s Law, Charles\' Law, and the Ideal Gas Equation.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-chem-u2',
        title: 'SSS 2: Physical and Inorganic Chemistry',
        description: 'Exploring reaction rates, equilibrium, acids/bases, and properties of elements.',
        modules: [
            {
                id: 'sss-chem-u2-m1',
                title: 'Physical Chemistry',
                description: 'Kinetics, equilibrium, and electrochemistry.',
                topics: [
                    { id: 't-schem10', title: 'Rates of Reaction', description: 'Factors affecting the speed of a reaction.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-schem11', title: 'Chemical Equilibrium', description: 'Le Chatelier\'s principle.', contentType: 'video', duration: 28, difficulty: 'advanced', completed: false },
                    { id: 't-schem12', title: 'Acids, Bases, and Salts', description: 'pH, indicators, and titration.', contentType: 'reading', duration: 30, difficulty: 'intermediate', completed: false },
                    { id: 't-schem13', title: 'Electrochemistry', description: 'Electrolysis and electrochemical cells.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'sss-chem-u2-m2',
                title: 'Inorganic Chemistry',
                description: 'Properties of non-metals and metals.',
                topics: [
                    { id: 't-schem14', title: 'Hydrogen and Oxygen', description: 'Properties and preparation.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-schem15', title: 'Halogens', description: 'Properties and reactivity of Group 17 elements.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-chem-u3',
        title: 'SSS 3: Organic and Applied Chemistry',
        description: 'The chemistry of carbon compounds and its industrial applications.',
        modules: [
          {
            id: 'sss-chem-u3-m1',
            title: 'Organic Chemistry',
            description: 'Hydrocarbons and their derivatives.',
            topics: [
              { id: 't-schem6', title: 'Introduction to Organic Chemistry', description: 'What makes carbon so special?', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-schem7', title: 'Alkanes and IUPAC Nomenclature', description: 'Naming simple organic compounds.', contentType: 'reading', duration: 30, difficulty: 'intermediate', completed: false },
              { id: 't-schem8', title: 'Alkenes and Alkynes', description: 'Unsaturated hydrocarbons and their reactions.', contentType: 'video', duration: 25, difficulty: 'advanced', completed: false },
              { id: 't-schem16', title: 'Alkanols and Alkanoic Acids', description: 'Functional groups, properties, and reactions.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-schem9', title: 'Macromolecules', description: 'Introduction to polymers like nylon and rubber.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-chem-u3-m2',
            title: 'Applied Chemistry',
            description: 'Chemistry in industry and the environment.',
            topics: [
                { id: 't-schem17', title: 'Metals and their Extraction', description: 'Metallurgy of iron and aluminum.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                { id: 't-schem18', title: 'Soaps and Detergents', description: 'The chemistry of cleaning agents.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
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
        title: 'SSS 1: Concepts of Life and Ecology',
        description: 'Understanding cells, tissues, and the interaction of organisms.',
        modules: [
          {
            id: 'sss-bio-u1-m1',
            title: 'Cells and Tissues',
            description: 'Exploring the structure and function of plant and animal cells.',
            topics: [
              { id: 't-bio1', title: 'The Animal Cell', description: 'An interactive diagram of an animal cell.', contentType: 'simulation', duration: 20, difficulty: 'beginner', completed: false },
              { id: 't-bio2', title: 'The Plant Cell', description: 'Learn the unique structures of a plant cell.', contentType: 'video', duration: 18, difficulty: 'beginner', completed: false },
              { id: 't-sbio1', title: 'Cell Division: Mitosis and Meiosis', description: 'How cells multiply and create gametes.', contentType: 'animation', duration: 25, difficulty: 'advanced', completed: false },
              { id: 't-sbio2', title: 'Levels of Organization', description: 'From cells to tissues, organs, and systems.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-bio-u1-m2',
            title: 'Ecology',
            description: 'The study of organisms and their environment.',
            topics: [
              { id: 't-sbio3', title: 'Food Chains and Food Webs', description: 'The flow of energy in an ecosystem.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-sbio4', title: 'Population Studies', description: 'Factors affecting population size.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sbio5', title: 'Carbon and Water Cycles', description: 'How essential elements are recycled in nature.', contentType: 'animation', duration: 22, difficulty: 'advanced', completed: false },
              { id: 't-sbio6', title: 'Pollution and Conservation', description: 'Human impact on the environment.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
       {
        id: 'sss-bio-u2',
        title: 'SSS 2: Physiology of Plants and Animals',
        description: 'Exploring nutrition, transport, respiration, and excretion.',
        modules: [
            {
                id: 'sss-bio-u2-m1',
                title: 'Nutrition and Digestion',
                description: 'How organisms obtain and process food.',
                topics: [
                    { id: 't-sbio10', title: 'Modes of Nutrition', description: 'Autotrophic and heterotrophic nutrition.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-sbio11', title: 'The Mammalian Digestive System', description: 'The journey of food from ingestion to egestion.', contentType: 'animation', duration: 25, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'sss-bio-u2-m2',
                title: 'Transport and Respiration',
                description: 'Circulation of materials and energy release.',
                topics: [
                    { id: 't-sbio12', title: 'The Circulatory System in Mammals', description: 'The heart, blood vessels, and blood.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
                    { id: 't-sbio13', title: 'Transport in Plants', description: 'Xylem and phloem.', contentType: 'reading', duration: 20, difficulty: 'advanced', completed: false },
                    { id: 't-sbio14', title: 'The Respiratory System', description: 'Gaseous exchange in humans.', contentType: 'animation', duration: 22, difficulty: 'intermediate', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-bio-u3',
        title: 'SSS 3: Coordination, Reproduction, and Genetics',
        description: 'Nervous system, hormones, heredity, and evolution.',
        modules: [
          {
            id: 'sss-bio-u3-m1',
            title: 'Genetics and Evolution',
            description: 'Heredity and the mechanisms of evolutionary change.',
            topics: [
              { id: 't-sbio7', title: 'Mendel\'s Laws of Inheritance', description: 'Dominance, segregation, and independent assortment.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sbio8', title: 'DNA, RNA, and Protein Synthesis', description: 'The central dogma of molecular biology.', contentType: 'animation', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sbio9', title: 'Theories of Evolution', description: 'Lamarck, Darwin, and modern evolutionary synthesis.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-bio-u3-m2',
            title: 'Coordination and Reproduction',
            description: 'Control systems and propagation of life.',
            topics: [
                { id: 't-sbio15', title: 'The Nervous System', description: 'The brain, spinal cord, and neurons.', contentType: 'video', duration: 25, difficulty: 'advanced', completed: false },
                { id: 't-sbio16', title: 'The Endocrine System', description: 'Hormones and their functions.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
                { id: 't-sbio17', title: 'Reproduction in Mammals and Plants', description: 'Sexual reproduction processes.', contentType: 'animation', duration: 30, difficulty: 'advanced', completed: false },
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
    id: 'sss-economics',
    title: 'SSS Economics',
    description: 'Principles of production, distribution, and consumption of goods and services.',
    level: 'SSS',
    icon: LineChart,
    units: [
      {
        id: 'sss-econ-u1',
        title: 'SSS 1: Fundamental Concepts and Demand & Supply',
        description: 'Learning the core ideas of economics and market forces.',
        modules: [
          {
            id: 'sss-econ-u1-m1',
            title: 'The Economic Problem',
            description: 'Understanding scarcity, choice and opportunity cost.',
            topics: [
              { id: 't-econ1', title: 'Wants vs. Needs', description: 'Differentiating between human wants and basic needs.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-econ2', title: 'Opportunity Cost', description: 'Learn about the true cost of a decision.', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-secon1', title: 'Production Possibility Curve (PPC)', description: 'Visualizing scarcity and opportunity cost.', contentType: 'simulation', duration: 25, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-econ-u1-m2',
            title: 'Theory of Demand and Supply',
            description: 'Understanding consumer and producer behavior.',
            topics: [
              { id: 't-secon2', title: 'The Law of Demand', description: 'How price affects the quantity demanded.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-secon3', title: 'The Law of Supply', description: 'How price affects the quantity supplied.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-secon4', title: 'Market Equilibrium', description: 'Where demand and supply meet.', contentType: 'simulation', duration: 25, difficulty: 'advanced', completed: false },
              { id: 't-secon5', title: 'Elasticity of Demand and Supply', description: 'Measuring responsiveness to price changes.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-econ-u2',
        title: 'SSS 2: Production, Costs, and Market Structures',
        description: 'Understanding how firms operate and the markets they exist in.',
        modules: [
            {
                id: 'sss-econ-u2-m1',
                title: 'Theory of Production and Costs',
                description: 'Factors of production and business costs.',
                topics: [
                    { id: 't-secon10', title: 'Factors of Production', description: 'Land, Labour, Capital, and Entrepreneurship.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
                    { id: 't-secon11', title: 'Division of Labour and Specialization', description: 'Benefits and drawbacks.', contentType: 'reading', duration: 18, difficulty: 'intermediate', completed: false },
                    { id: 't-secon12', title: 'Concepts of Cost and Revenue', description: 'Total cost, average cost, marginal revenue, etc.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            },
            {
                id: 'sss-econ-u2-m2',
                title: 'Market Structures',
                description: 'Different types of market competition.',
                topics: [
                    { id: 't-secon13', title: 'Perfect Competition', description: 'Characteristics and price determination.', contentType: 'video', duration: 22, difficulty: 'advanced', completed: false },
                    { id: 't-secon14', title: 'Monopoly', description: 'Characteristics and control of monopolies.', contentType: 'video', duration: 22, difficulty: 'advanced', completed: false },
                ],
                get completedTopics() { return this.topics.filter(t => t.completed).length; },
                get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
            }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-econ-u3',
        title: 'SSS 3: Macroeconomics and the Nigerian Economy',
        description: 'The role of money, government, and international trade in the economy.',
        modules: [
          {
            id: 'sss-econ-u3-m1',
            title: 'Money, Banking, and Public Finance',
            description: 'Understanding the broader economy.',
            topics: [
              { id: 't-secon6', title: 'Money and its Functions', description: 'What is money and what does it do?', contentType: 'reading', duration: 20, difficulty: 'intermediate', completed: false },
              { id: 't-secon7', title: 'Inflation', description: 'Causes, effects, and control of rising prices.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-secon8', title: 'Taxation', description: 'The role of taxes in public finance.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
              { id: 't-secon9', title: 'International Trade', description: 'Why countries trade with each other.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-econ-u3-m2',
            title: 'National Income and Economic Development',
            description: 'Measuring a country\'s economic performance.',
            topics: [
                { id: 't-secon15', title: 'National Income Accounting', description: 'GDP, GNP, and NNP.', contentType: 'reading', duration: 30, difficulty: 'advanced', completed: false },
                { id: 't-secon16', title: 'Economic Development and Growth', description: 'Differences and indicators.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
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
        title: 'SSS 1: Basic Concepts and Forms of Government',
        description: 'Understanding foundational ideas and different political systems.',
        modules: [
          {
            id: 'sss-gov-u1-m1',
            title: 'State, Nation, and Government',
            description: 'Differentiating between key political concepts.',
            topics: [
              { id: 't-gov1', title: 'What is Government?', description: 'Defining government as an institution of the state.', contentType: 'video', duration: 15, difficulty: 'beginner', completed: false },
              { id: 't-sgov1', title: 'The Constitution', description: 'Types and functions of a constitution.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sgov4', title: 'The Arms of Government', description: 'The Legislature, Executive, and Judiciary.', contentType: 'video', duration: 20, difficulty: 'intermediate', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-gov-u1-m2',
            title: 'Political Systems',
            description: 'Unitary, Federal, and Confederal systems.',
            topics: [
              { id: 't-sgov2', title: 'Federalism in Nigeria', description: 'The structure of the Nigerian federal system.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sgov3', title: 'Presidential vs. Parliamentary Systems', description: 'Comparing the two major forms of democratic government.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-gov-u2',
        title: 'SSS 2: Nigerian Politics and Public Administration',
        description: 'The political history, governance structure, and civil service of Nigeria.',
        modules: [
          {
            id: 'sss-gov-u2-m1',
            title: 'Nigerian Political History',
            description: 'From pre-colonial times to modern day.',
            topics: [
              { id: 't-sgov5', title: 'Pre-Colonial Administration', description: 'Systems of government in Hausa, Igbo, and Yoruba lands.', contentType: 'reading', duration: 30, difficulty: 'intermediate', completed: false },
              { id: 't-sgov6', title: 'Colonial Rule and Nationalism', description: 'The struggle for independence.', contentType: 'video', duration: 28, difficulty: 'intermediate', completed: false },
              { id: 't-sgov7', title: 'Military Rule in Nigeria', description: 'An overview of military coups and governance.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-gov-u2-m2',
            title: 'Public Administration',
            description: 'The machinery of government.',
            topics: [
                { id: 't-sgov10', title: 'The Civil Service', description: 'Structure, functions, and reforms.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
                { id: 't-sgov11', title: 'Public Corporations and Privatization', description: 'The role of state-owned enterprises.', contentType: 'video', duration: 20, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-gov-u3',
        title: 'SSS 3: Electoral Process and International Relations',
        description: 'Understanding elections and Nigeria\'s place in the world.',
        modules: [
          {
            id: 'sss-gov-u3-m1',
            title: 'Elections and Political Parties',
            description: 'The democratic process.',
            topics: [
              { id: 't-sgov8', title: 'The Electoral Process in Nigeria', description: 'The role of INEC.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sgov12', title: 'Political Parties in Nigeria', description: 'History and functions of political parties.', contentType: 'reading', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sgov13', title: 'Pressure Groups and Public Opinion', description: 'Influencing government policy.', contentType: 'video', duration: 20, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-gov-u3-m2',
            title: 'International Relations',
            description: 'Nigeria\'s foreign policy and global organizations.',
            topics: [
                { id: 't-sgov14', title: 'Nigerian Foreign Policy', description: 'Determinants and key principles.', contentType: 'reading', duration: 28, difficulty: 'advanced', completed: false },
                { id: 't-sgov15', title: 'Nigeria in International Organizations', description: 'ECOWAS, AU, The Commonwealth, and UN.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
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
    id: 'sss-further-maths',
    title: 'SSS Further Mathematics',
    description: 'Advanced topics for students with a strong aptitude for mathematics.',
    level: 'SSS',
    icon: Sigma,
    units: [
      {
        id: 'sss-fm-u1',
        title: 'SSS 1: Pure Mathematics',
        description: 'Core advanced mathematical concepts in sets, vectors, and matrices.',
        modules: [
          {
            id: 'sss-fm-u1-m1',
            title: 'Set Theory and Binary Operations',
            description: 'The mathematical study of sets and operations.',
            topics: [
              { id: 't-fm1', title: 'Set Notation and Operations', description: 'Union, intersection, complement, and Venn diagrams.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-fm2', title: 'Binary Operations', description: 'Properties like closure, associativity, and commutativity.', contentType: 'reading', duration: 20, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-fm-u1-m2',
            title: 'Vectors and Matrices',
            description: 'Working with quantities that have magnitude and direction.',
            topics: [
              { id: 't-sfm1', title: 'Introduction to Vectors', description: 'Vector addition, subtraction, and scalar multiplication.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sfm2', title: 'Matrix Algebra', description: 'Addition, subtraction, and multiplication of matrices.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sfm3', title: 'Determinants and Inverses', description: 'Finding the determinant and inverse of a 2x2 matrix.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
      {
        id: 'sss-fm-u2',
        title: 'SSS 2: Calculus and Coordinate Geometry',
        description: 'The mathematics of change and the geometric properties of functions.',
        modules: [
          {
            id: 'sss-fm-u2-m1',
            title: 'Differentiation and Integration',
            description: 'Finding rates of change and area under curves.',
            topics: [
              { id: 't-sfm4', title: 'Limits and First Principles', description: 'The foundation of differentiation.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sfm5', title: 'Differentiation Techniques', description: 'Product rule, quotient rule, and chain rule.', contentType: 'reading', duration: 35, difficulty: 'advanced', completed: false },
              { id: 't-sfm6', title: 'Indefinite Integrals', description: 'The reverse of differentiation.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sfm7', title: 'Definite Integrals', description: 'Calculating the area between two points.', contentType: 'reading', duration: 35, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
           {
            id: 'sss-fm-u2-m2',
            title: 'Coordinate Geometry',
            description: 'Equations of lines, circles, and conic sections.',
            topics: [
              { id: 't-sfm10', title: 'The Straight Line', description: 'Equation of a line, parallel and perpendicular lines.', contentType: 'video', duration: 25, difficulty: 'intermediate', completed: false },
              { id: 't-sfm11', title: 'The Circle', description: 'Equation of a circle and properties of tangents.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          }
        ],
        get totalTopics() { return this.modules.reduce((sum, mod) => sum + mod.topics.length, 0); },
        get completedTopics() { return this.modules.reduce((sum, mod) => sum + mod.completedTopics, 0); },
        get progress() { return this.totalTopics > 0 ? Math.round((this.completedTopics / this.totalTopics) * 100) : 0; }
      },
       {
        id: 'sss-fm-u3',
        title: 'SSS 3: Mechanics and Statistics',
        description: 'The study of forces, motion, and advanced data analysis.',
        modules: [
          {
            id: 'sss-fm-u3-m1',
            title: 'Mechanics',
            description: 'Analyzing motion and forces.',
            topics: [
              { id: 't-sfm8', title: 'Motion under Gravity', description: 'Equations of motion for objects in free fall.', contentType: 'simulation', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sfm9', title: 'Forces and Equilibrium', description: 'Resolving forces and Lami\'s theorem.', contentType: 'video', duration: 35, difficulty: 'advanced', completed: false },
              { id: 't-sfm12', title: 'Momentum and Impulse', description: 'Conservation of linear momentum.', contentType: 'reading', duration: 25, difficulty: 'advanced', completed: false },
            ],
            get completedTopics() { return this.topics.filter(t => t.completed).length; },
            get totalDuration() { return this.topics.reduce((sum, topic) => sum + topic.duration, 0); }
          },
          {
            id: 'sss-fm-u3-m2',
            title: 'Statistics and Probability',
            description: 'Distributions and data relationships.',
            topics: [
              { id: 't-sfm13', title: 'Probability Distributions', description: 'Binomial and Poisson distributions.', contentType: 'video', duration: 30, difficulty: 'advanced', completed: false },
              { id: 't-sfm14', title: 'Correlation and Regression', description: 'Measuring the relationship between variables.', contentType: 'simulation', duration: 35, difficulty: 'advanced', completed: false },
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
