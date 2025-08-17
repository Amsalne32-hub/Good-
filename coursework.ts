
import type { Coursework } from './types';

export const coursework: Coursework[] = [
    {
        id: 'cw-place-value',
        title: 'Place Value Practice',
        description: 'A short exercise to reinforce your understanding of number place values.',
        type: 'classwork',
        submissionType: 'text',
        instructions: 'For each of the following numbers, write down the place value of the digit in bold:\n1. 4,**7**23\n2. **9**81,054\n3. 12.5**3**\n\nEnter your answers in the text box below, one per line.',
        points: 25,
    },
    {
        id: 'as-real-world-algebra',
        title: 'Assignment: Real-World Algebra',
        description: 'Apply your knowledge of algebraic expressions to solve real-world problems.',
        type: 'assignment',
        submissionType: 'file-upload',
        instructions: 'Download the attached worksheet. It contains 5 word problems. For each problem, write an algebraic expression or equation that models the scenario, and then solve for the unknown variable. Show all your work. Upload your completed worksheet as a PDF file.',
        points: 100,
    },
];

export const getCourseworkById = (id: string) => coursework.find(c => c.id === id);