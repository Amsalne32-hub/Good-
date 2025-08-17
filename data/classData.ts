import type { ClassStudent } from '../types';

export const classData: ClassStudent[] = [
  {
    id: 'student-1',
    name: 'Adebayo Johnson',
    progress: {
      'jss-math': {
        completedTopics: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't-jm-3', 't-jm-4', 't-jm-5', 't-jm-6', 't-jm-7', 't-jm-8', 't-test1']
      }
    }
  },
  {
    id: 'student-2',
    name: 'Chiamaka Nwosu',
    progress: {
      'jss-math': {
        completedTopics: ['t1', 't2', 't4', 't7', 't8', 't-jm-3', 't-jm-4', 't-jm-5']
      }
    }
  },
  {
    id: 'student-3',
    name: 'Musa Bello',
    progress: {
      'jss-math': {
        completedTopics: ['t1', 't2', 't4', 't-jm-4', 't-jm-5', 't-jm-6', 't-jm-7', 't-jm-8', 't-test1']
      }
    }
  },
  {
    id: 'student-4',
    name: 'Fatima Aliyu',
    progress: {
      'jss-math': {
        completedTopics: ['t1', 't2', 't3', 't4', 't5', 't6']
      }
    }
  },
  {
    id: 'student-5',
    name: 'Emeka Okafor',
    progress: {
      'jss-math': {
        completedTopics: ['t1', 't2', 't4', 't7', 't8']
      }
    }
  }
];
