
import type { Assessment } from '../types';

export const assessments: Assessment[] = [
  {
    id: "math-jss-numbers-quiz",
    title: "Numbers and Numeration Quiz",
    description: "Test your understanding of whole numbers, fractions, and basic operations.",
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is the place value of 7 in the number 47,923?",
        type: "multiple-choice",
        options: ["Units", "Tens", "Hundreds", "Thousands"],
        correctAnswer: 3,
        explanation: "The digit 7 is in the thousands place, so its place value is thousands.",
        points: 10
      },
      {
        id: "q2",
        question: "Calculate: 456 + 287 = ?",
        type: "multiple-choice",
        options: ["733", "743", "753", "763"],
        correctAnswer: 1,
        explanation: "456 + 287 = 743. Add the ones (6+7=13, carry 1), tens (5+8+1=14, carry 1), hundreds (4+2+1=7).",
        points: 15
      },
      {
        id: "q3",
        question: "Which fraction is equivalent to 3/4?",
        type: "multiple-choice",
        options: ["6/8", "9/16", "12/15", "15/18"],
        correctAnswer: 0,
        explanation: "6/8 = 3/4 because both numerator and denominator are multiplied by 2.",
        points: 10
      }
    ]
  },
  {
    id: "math-jss-algebra-test",
    title: "End of Unit Test: Basic Algebra",
    description: "A comprehensive test covering variables, expressions, and simple equations.",
    timeLimit: 45,
    passingScore: 65,
    questions: [
        {
        id: "at-q1",
        question: "If x = 5, what is the value of 3x + 4?",
        type: "multiple-choice",
        options: ["19", "15", "22", "12"],
        correctAnswer: 0,
        explanation: "Substitute x with 5: 3(5) + 4 = 15 + 4 = 19.",
        points: 10
      },
      {
        id: "at-q2",
        question: "Simplify the expression: 5a + 2b - 3a + b",
        type: "multiple-choice",
        options: ["2a + 3b", "8a + 3b", "2a + b", "5ab"],
        correctAnswer: 0,
        explanation: "Combine like terms: (5a - 3a) + (2b + b) = 2a + 3b.",
        points: 15
      },
      {
        id: "at-q3",
        question: "True or False: The variable in the expression 7y - 2 is 'y'.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "A variable is a symbol (usually a letter) that represents a number. In this case, it's 'y'.",
        points: 10
      },
      {
        id: "at-q4",
        question: "Solve for n: n - 10 = 25",
        type: "multiple-choice",
        options: ["15", "2.5", "35", "-15"],
        correctAnswer: 2,
        explanation: "To solve for n, add 10 to both sides of the equation: n = 25 + 10, so n = 35.",
        points: 15
      },
       {
        id: "at-q5",
        question: "Write an algebraic expression for 'five less than a number t'.",
        type: "essay",
        correctAnswer: "t - 5",
        explanation: "'Less than' suggests subtraction, and the number being subtracted from is 't'.",
        points: 20
      }
    ]
  }
];

export const getAssessmentById = (id: string) => assessments.find(a => a.id === id);