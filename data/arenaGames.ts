import type { QuizGame } from '../types';

export const arenaGames: QuizGame[] = [
  {
    id: 'game-jss-math-algebra-1',
    title: 'JSS Algebra Sprint',
    subjectId: 'jss-math',
    topic: 'Basic Algebra',
    questionIds: ['at-q1', 'at-q2', 'at-q3', 'at-q4'],
    players: [
      { id: 'player1', name: 'Funke A.', score: 0 },
      { id: 'player2', name: 'David C.', score: 0 },
      { id: 'player3', name: 'Musa B.', score: 0 },
    ],
  },
  {
    id: 'game-jss-math-numbers-1',
    title: 'JSS Numbers Challenge',
    subjectId: 'jss-math',
    topic: 'Numbers and Numeration',
    questionIds: ['q1', 'q2', 'q3'],
    players: [
      { id: 'player1', name: 'Aisha U.', score: 0 },
    ],
  }
];
