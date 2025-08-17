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
  }
];

export const getTeacherResourcesBySubject = (subjectId: string) => {
    const relevantSchemes = schemesOfWork.filter(s => s.subjectId === subjectId);
    const relevantPlans = lessonPlans.filter(p => relevantSchemes.some(s => s.weeks.some(w => `sow-${s.subjectId}-t${s.term}-w${w.week}`.includes(p.schemeWeekId)))); // Simplified matching
    const relevantNotes = lessonNotes.filter(n => relevantPlans.some(p => p.id === n.lessonPlanId));

    return {
        schemes: relevantSchemes,
        plans: relevantPlans,
        notes: relevantNotes
    };
};