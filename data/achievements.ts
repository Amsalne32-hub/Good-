import type { Achievement } from '../types';
import { Book, CheckCircle, GraduationCap, Medal, Star } from 'lucide-react';

export const achievementsData: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Completed your very first topic. The journey of a thousand miles begins with a single step!',
    icon: Star,
  },
  {
    id: 'jss1-math-initiate',
    name: 'JSS 1 Math Initiate',
    description: 'Mastered the fundamentals of JSS 1 Numbers and Numeration.',
    icon: Medal,
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 5 General Knowledge topics.',
    icon: Book,
  },
  {
    id: 'unit-conqueror',
    name: 'Unit Conqueror',
    description: 'Completed all topics in any subject unit.',
    icon: GraduationCap,
  },
  {
    id: 'master-jss-math-u1',
    name: 'JSS 1 Numeration Master',
    description: 'Completed all topics in JSS 1: Numbers and Numeration.',
    icon: CheckCircle,
  }
];

export const getAchievementById = (id: string) => achievementsData.find(a => a.id === id);
