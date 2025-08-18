import type { SchemeOfWork, LessonPlan, LessonNote } from '../types';

export const schemesOfWork: SchemeOfWork[] = [
  {
    id: 'sow-jss-math-t1',
    subjectId: 'jss-math',
    term: 1,
    weeks: [
      { week: 1, topic: 'Whole Numbers', objectives: ['Identify place value', 'Read and write large numbers'], activities: 'Class discussion, place value chart activity.' },
      { week: 2, topic: 'Fractions', objectives: ['Define fractions', 'Identify types of fractions (proper, improper, mixed)'], activities: 'Fraction wall demonstration, group work on identifying fractions.' },
      { week: 3, topic: 'Decimals', objectives: ['Relate fractions to decimals', 'Perform addition/subtraction of decimals'], activities: 'Interactive simulation, practice worksheet.' },
      { week: 4, topic: 'Estimation and Approximation', objectives: ['Round numbers to nearest 10, 100, 1000', 'Use estimation in real-life problems'], activities: 'Market simulation game, problem-solving session.' },
      { week: 5, topic: 'Mid-Term Test', objectives: ['Assess understanding of weeks 1-4'], activities: 'Written test.' },
      { week: 6, topic: 'Introduction to Algebra', objectives: ['Define variables', 'Simplify simple algebraic expressions'], activities: 'Think-aloud demonstration, guided practice.' },
    ]
  },
  {
    id: 'sow-jss-english-t1',
    subjectId: 'jss-english',
    term: 1,
    weeks: [
        { week: 1, topic: 'Parts of Speech: Nouns & Pronouns', objectives: ['Define nouns and pronouns', 'Identify types of nouns (common, proper, collective)'], activities: 'Sentence building game, identifying nouns in a passage.' },
        { week: 2, topic: 'Parts of Speech: Verbs & Tenses', objectives: ['Identify action and linking verbs', 'Use simple present, past, and future tenses'], activities: 'Role-playing actions, verb tense worksheet.' },
        { week: 3, topic: 'Composition: Narrative Essay', objectives: ['Understand the elements of a story', 'Write a short narrative essay'], activities: 'Story brainstorming session, peer review of short paragraphs.' },
    ]
  }
];

export const lessonPlans: LessonPlan[] = [
  {
    id: 'lp-jss-math-w1',
    schemeWeekId: 'sow-jss-math-t1-w1',
    topic: 'Whole Numbers and Place Value',
    duration: '80 minutes (double period)',
    learningObjectives: [
      'By the end of the lesson, students should be able to identify the place value of any digit in a number up to one million.',
      'Students will be able to read and write large numbers correctly in words and figures.',
      'Students will be able to solve simple problems involving place value.'
    ],
    instructionalMaterials: ['Whiteboard, markers', 'Place value chart (large)', 'Number cards'],
    priorKnowledge: 'Students are familiar with numbers up to thousands and basic counting.',
    procedure: [
        { step: 'Introduction (5 mins)', teacherActivity: 'Greets students and reviews previous topic on numbers.', studentActivity: 'Respond to greetings and answer review questions.' },
        { step: 'Presentation (20 mins)', teacherActivity: 'Uses the place value chart to explain the value of digits from units to millions.', studentActivity: 'Observe, listen, and ask questions.' },
        { step: 'Group Activity (25 mins)', teacherActivity: 'Divides students into groups and gives them number cards to form large numbers and identify place values.', studentActivity: 'Work in groups to arrange numbers and state place values.' },
        { step: 'Individual Practice (20 mins)', teacherActivity: 'Gives students exercises from the textbook to solve individually.', studentActivity: 'Solve problems in their notebooks.' }
    ],
    evaluation: 'Teacher will ask students to write a given large number in words and identify the place value of specific digits.',
    summary: 'Teacher summarizes the key points of the lesson on the board.',
    assignment: 'Complete Exercise 2.1, questions 1-5, from the New General Mathematics textbook.'
  },
  {
    id: 'lp-jss-english-w1',
    schemeWeekId: 'sow-jss-english-t1-w1',
    topic: 'Parts of Speech: Nouns & Pronouns',
    duration: '40 minutes',
    learningObjectives: [
        'Define a noun and a pronoun.',
        'Identify common, proper, and collective nouns in sentences.',
        'Replace nouns with appropriate pronouns in a given passage.'
    ],
    instructionalMaterials: ['Whiteboard, markers', 'Chart showing types of nouns', 'Textbook'],
    priorKnowledge: 'Students can identify words in a sentence.',
    procedure: [
        { step: 'Introduction (5 mins)', teacherActivity: 'Writes a simple sentence on the board and asks students to name the person, place, and thing.', studentActivity: 'Identify the words as requested.' },
        { step: 'Presentation (15 mins)', teacherActivity: 'Explains the definition of nouns and pronouns using the chart and examples.', studentActivity: 'Listen, take notes, and provide their own examples.' },
        { step: 'Activity (15 mins)', teacherActivity: 'Provides a short passage and asks students to work in pairs to underline nouns and circle pronouns.', studentActivity: 'Work in pairs to complete the task.' },
    ],
    evaluation: 'Students are asked to write five sentences, each containing a proper noun and a pronoun.',
    summary: 'Teacher recaps the definitions and types of nouns and pronouns.',
    assignment: 'Read the first chapter of their literature book and list 20 nouns found.'
  }
];

export const lessonNotes: LessonNote[] = [
  {
    id: 'ln-jss-math-w1',
    lessonPlanId: 'lp-jss-math-w1',
    topic: 'Detailed Note on Whole Numbers and Place Value',
    content: `
### Topic: Whole Numbers & Place Value

**1. What are Whole Numbers?**
Whole numbers are the set of positive integers including zero. They are numbers we use for counting and ordering.
Examples: 0, 1, 2, 3, 10, 45, 1,200.

**2. Understanding Place Value**
Place value is the value of a digit based on its position in a number. Our number system is a base-10 system, meaning each place value is 10 times greater than the place to its right.

**Example: 4,785,216**

- **6** is in the **Units** place (Value: 6)
- **1** is in the **Tens** place (Value: 10)
- **2** is in the **Hundreds** place (Value: 200)
- **5** is in the **Thousands** place (Value: 5,000)
- **8** is in the **Tens of Thousands** place (Value: 80,000)
- **7** is in the **Hundreds of Thousands** place (Value: 700,000)
- **4** is in the **Millions** place (Value: 4,000,000)

**3. Reading and Writing Large Numbers**
To read a large number, we group the digits in threes from the right, separated by commas. Each group is called a period (e.g., millions period, thousands period, units period).

**Example: 4,785,216**
Is read as: "Four million, seven hundred and eighty-five thousand, two hundred and sixteen."
    `
  },
  {
    id: 'ln-jss-english-w1',
    lessonPlanId: 'lp-jss-english-w1',
    topic: 'Detailed Note on Nouns & Pronouns',
    content: `
### Topic: Nouns and Pronouns

**1. What is a Noun?**
A noun is a word that names a person, an animal, a place, a thing, or an idea.

**Types of Nouns:**
*   **Proper Noun:** A name used for an individual person, place, or organization, spelled with an initial capital letter.
    *   *Examples:* **Bayo**, **Lagos**, **Nigeria**, **Synapse**
*   **Common Noun:** A name for something which is common for many things, persons, or places.
    *   *Examples:* **boy**, **city**, **country**, **school**
*   **Collective Noun:** A word used to represent a group of people, animals, or things.
    *   *Examples:* a **flock** of sheep, a **team** of players, a **library** of books.

**2. What is a Pronoun?**
A pronoun is a word that is used instead of a noun or noun phrase. Pronouns are used to avoid repeating the same nouns over and over again.

**Examples:**
*   **I**, **you**, **he**, **she**, **it**, **we**, **they**
*   *Sentence:* **Tunde** is a student. **He** is in JSS 1. (Here, "He" replaces "Tunde").
    `
  }
];

export const getTeacherResourcesBySubject = (subjectId: string) => {
    const relevantSchemes = schemesOfWork.filter(s => s.subjectId === subjectId);
    const relevantPlanIds = relevantSchemes.flatMap(s => s.weeks.map(w => `lp-${s.subjectId}-w${w.week}`));
    
    // A more robust way to link plans to schemes
    const relevantPlans = lessonPlans.filter(p => {
        const schemeIdPart = p.schemeWeekId.split('-w')[0]; // e.g., sow-jss-math-t1
        return relevantSchemes.some(s => `sow-${s.subjectId}-t${s.term}` === schemeIdPart);
    });

    const relevantNotes = lessonNotes.filter(n => relevantPlans.some(p => p.id === n.lessonPlanId));

    return {
        schemes: relevantSchemes,
        plans: relevantPlans,
        notes: relevantNotes
    };
};
