import type { StudyGroup } from '../types';

export const studyGroups: StudyGroup[] = [
  {
    id: 'sg-jss-math',
    name: 'JSS Math Wizards',
    subject: 'JSS Mathematics',
    description: 'A friendly group for anyone studying JSS Math. Let\'s solve problems together!',
    members: ['Bayo Adekunle', 'Chiamaka Nwosu', 'Musa Bello', 'Fatima Aliyu'],
    messages: [
      { id: 'msg1', sender: 'Chiamaka Nwosu', text: 'Hi everyone! Who wants to review algebraic expressions tonight?', timestamp: '3:45 PM' },
      { id: 'msg2', sender: 'Bayo Adekunle', text: 'I\'m in! I need some help with collecting like terms.', timestamp: '3:46 PM' },
      { id: 'msg3', sender: 'Musa Bello', text: 'Me too. Let\'s start around 7 PM?', timestamp: '3:48 PM' },
    ],
  },
  {
    id: 'sg-sss-physics',
    name: 'SSS Physics Force',
    subject: 'SSS Physics',
    description: 'Tackling tough topics from Mechanics to Modern Physics. All SSS students welcome.',
    members: ['Bayo Adekunle', 'Aisha Ibrahim', 'David Okon', 'Ngozi Eze'],
    messages: [
       { id: 'msg4', sender: 'David Okon', text: 'The last lesson on Newton\'s Laws was tough. Can someone explain the third law again?', timestamp: '1:12 PM' },
       { id: 'msg5', sender: 'Ngozi Eze', text: 'Sure! It just means for every action, there is an equal and opposite reaction. Like a rocket pushing gas down to go up.', timestamp: '1:15 PM' },
    ],
  },
    {
    id: 'sg-gen-knowledge',
    name: 'Current Affairs Club',
    subject: 'General Knowledge',
    description: 'Discussing the latest news and trends in Nigeria and around the world.',
    members: ['Bayo Adekunle', 'Funke A.', 'David C.'],
    messages: [
       { id: 'msg6', sender: 'Funke A.', text: 'Did anyone see the AI News Briefing today? Interesting stuff.', timestamp: 'Yesterday' },
    ],
  },
];
