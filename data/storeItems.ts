import type { StoreItem } from '../types';

export const storeItems: StoreItem[] = [
  // Themes
  {
    id: 'theme-default',
    name: 'Synapse Classic',
    description: 'The standard, clean look for focused learning.',
    type: 'theme',
    price: 0,
    asset: '', // Represents the default theme
    preview: 'bg-slate-50 border',
  },
  {
    id: 'theme-galaxy',
    name: 'Galaxy Explorer',
    description: 'Explore the cosmos with this deep space theme.',
    type: 'theme',
    price: 1500,
    asset: 'theme-galaxy-bg',
    preview: 'bg-gradient-to-br from-gray-700 via-gray-900 to-black',
  },
  {
    id: 'theme-sunset',
    name: 'Sunset Scholar',
    description: 'A warm and inspiring theme for late-night study sessions.',
    type: 'theme',
    price: 1200,
    asset: 'theme-sunset-bg',
    preview: 'bg-gradient-to-br from-red-500 to-orange-500',
  },
  {
    id: 'theme-jungle',
    name: 'Jungle Learner',
    description: 'Embrace growth with this vibrant, natural theme.',
    type: 'theme',
    price: 1800,
    asset: 'theme-jungle-bg',
    preview: 'bg-gradient-to-br from-emerald-500 to-lime-600',
  },
];

export const getItemById = (id: string): StoreItem | undefined => storeItems.find(item => item.id === id);