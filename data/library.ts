import type { Textbook, Ebook, Journal } from '../types';

export const libraryTextbooks: Textbook[] = [
  // JSS
  { id: 'tb1', title: 'New General Mathematics for JSS', author: 'M.F. Macrae et al.', coverUrl: 'https://picsum.photos/seed/ngm1/300/400', downloadUrl: '#' },
  { id: 'tb2', title: 'MAN Mathematics for JSS (3rd Edition)', author: 'Mathematical Association of Nigeria', coverUrl: 'https://picsum.photos/seed/man1/300/400', downloadUrl: '#' },
  { id: 'tb3', title: 'New Oxford Secondary English Course for JSS', author: 'Ayo Banjo et al.', coverUrl: 'https://picsum.photos/seed/nosec1/300/400', downloadUrl: '#' },
  { id: 'tb-bs1', title: 'STAN Basic Science for JSS', author: 'Science Teachers Association of Nigeria', coverUrl: 'https://picsum.photos/seed/stanbs1/300/400', downloadUrl: '#' },
  { id: 'tb-bt1', title: 'Basic Technology for JSS', author: 'NERDC', coverUrl: 'https://picsum.photos/seed/nerdcbt1/300/400', downloadUrl: '#' },

  // SSS
  { id: 'tb4', title: 'Senior Secondary Physics by Nelkon & Parker', author: 'P.N. Okeke', coverUrl: 'https://picsum.photos/seed/ssp1/300/400', downloadUrl: '#' },
  { id: 'tb-chem1', title: 'New School Chemistry for SSS', author: 'Osei Yaw Ababio', coverUrl: 'https://picsum.photos/seed/chem-sss1/300/400', downloadUrl: '#' },
  { id: 'tb-bio1', title: 'Modern Biology for SSS', author: 'Ramalingam', coverUrl: 'https://picsum.photos/seed/bio-sss1/300/400', downloadUrl: '#' },
  { id: 'tb-econ1', title: 'Comprehensive Economics for SSS', author: 'J.U. Anyaele', coverUrl: 'https://picsum.photos/seed/econ-sss1/300/400', downloadUrl: '#' },
  { id: 'tb-gov1', title: 'Essential Government for SSS', author: 'C.C. Dibie', coverUrl: 'https://picsum.photos/seed/gov-sss1/300/400', downloadUrl: '#' },
  { id: 'tb-fm1', title: 'Further Mathematics Project 1-3', author: 'L. Harwood Clarke', coverUrl: 'https://picsum.photos/seed/fmp-all/300/400', downloadUrl: '#' },
  
  // Tertiary/Advanced
  { id: 'tb-adv-calc', title: 'Advanced Calculus', author: 'David V. Widder', coverUrl: 'https://picsum.photos/seed/advcalc/300/400', downloadUrl: '#' },
  { id: 'tb-org-chem', title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', coverUrl: 'https://picsum.photos/seed/orgchem/300/400', downloadUrl: '#' },
];

export const libraryEbooks: Ebook[] = [
  // Subject-specific
  { id: 'eb1', title: 'Understanding Fractions: A Visual Guide', author: 'Jane Doe', description: 'A deep dive into fractions, decimals, and percentages with helpful illustrations.', coverUrl: 'https://picsum.photos/seed/ef1/300/400', downloadUrl: '#' },
  { id: 'eb-ssm1', title: 'Calculus Made Easy', author: 'Silvanus P. Thompson', description: 'A classic, intuitive guide to the fundamentals of calculus.', coverUrl: 'https://picsum.photos/seed/eb-ssm1/300/400', downloadUrl: '#' },
  
  // Nigerian Literature
  { id: 'ebook-achebe', title: 'Things Fall Apart', author: 'Chinua Achebe', description: 'A classic novel depicting pre-colonial life in Nigeria and the arrival of Europeans.', coverUrl: 'https://picsum.photos/seed/tfa/300/400', downloadUrl: '#' },
  { id: 'ebook-soyinka', title: 'The Lion and the Jewel', author: 'Wole Soyinka', description: 'A play exploring the conflict between tradition and modernity in a Yoruba village.', coverUrl: 'https://picsum.photos/seed/lionjewel/300/400', downloadUrl: '#' },
  { id: 'ebook-adichie', title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', description: 'A novel that follows several characters during the Nigerian Civil War.', coverUrl: 'https://picsum.photos/seed/halfyellow/300/400', downloadUrl: '#' },
  
  // Open Source / Classics
  { id: 'ebook-gutenberg-pride', title: 'Pride and Prejudice', author: 'Jane Austen', description: 'A classic romance novel from Project Gutenberg.', coverUrl: 'https://picsum.photos/seed/prideprejudice/300/400', downloadUrl: '#' },
  { id: 'ebook-gutenberg-frankenstein', title: 'Frankenstein', author: 'Mary Shelley', description: 'A gothic novel that explores themes of creation and responsibility.', coverUrl: 'https://picsum.photos/seed/frankenstein/300/400', downloadUrl: '#' },
  
  // General Knowledge
  { id: 'gk-eb1', title: 'The Digital Citizen\'s Handbook', author: 'Dr. Ayo Adekunle', description: 'A guide to navigating the modern digital landscape safely and effectively.', coverUrl: 'https://picsum.photos/seed/gk-eb1/300/400', downloadUrl: '#' },
];

export const libraryJournals: Journal[] = [
    { id: 'j1', title: 'Nigerian Journal of Mathematical Education', publisher: 'NJME', issue: 'Vol. 15, No. 2', link: '#' },
    { id: 'j2', title: 'Journal of English Language Teachers Association of Nigeria', publisher: 'JELTAN', issue: '2023 Edition', link: '#' },
    { id: 'j3', title: 'Nigerian Journal of Physics', publisher: 'NIP', issue: 'Volume 30', link: '#' },
    { id: 'j-econ1', title: 'Nigerian Journal of Economic and Social Studies', publisher: 'Nigerian Economic Society', issue: 'Vol. 65, No. 1', link: '#' },
    
    // Global Journals
    { id: 'journal-nature', title: 'Nature - International Journal of Science', publisher: 'Springer Nature', issue: 'Latest Issue', link: '#' },
    { id: 'journal-lancet', title: 'The Lancet - Medical Journal', publisher: 'Elsevier', issue: 'Latest Issue', link: '#' },
    { id: 'journal-jstor', title: 'JSTOR - Arts & Sciences Collection', publisher: 'JSTOR', issue: 'Ongoing', link: '#' },
];
