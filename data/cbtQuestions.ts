
import type { CBT_Question } from '../types';

export const cbtQuestionBank: CBT_Question[] = [
    // ===================================
    // JUNIOR SCHOOL (NECO BECE)
    // ===================================

    // JSS Mathematics (23 questions)
    {
        id: 'jss-math-q1',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: "What is the place value of 2 in the number 5,284?",
        options: ["Units", "Tens", "Hundreds", "Thousands"],
        correctAnswer: 2,
        explanation: "The digit 2 is in the hundreds place."
    },
    {
        id: 'jss-math-q2',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: "If a box contains 12 pencils, how many pencils are in 5 boxes?",
        options: ["48", "60", "72", "50"],
        correctAnswer: 1,
        explanation: "12 pencils/box * 5 boxes = 60 pencils."
    },
    {
        id: 'jss-math-q3',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: "Simplify the fraction 10/15 to its lowest term.",
        options: ["1/2", "2/3", "3/4", "5/6"],
        correctAnswer: 1,
        explanation: "Both 10 and 15 are divisible by 5. 10 ÷ 5 = 2 and 15 ÷ 5 = 3, so the fraction is 2/3."
    },
    {
        id: 'jss-math-q4',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: "Calculate the perimeter of a rectangle with length 10cm and width 5cm.",
        options: ["15cm", "25cm", "30cm", "50cm"],
        correctAnswer: 2,
        explanation: "Perimeter of a rectangle = 2 * (length + width) = 2 * (10 + 5) = 2 * 15 = 30cm."
    },
    {
        id: 'jss-math-q5',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: "If x - 7 = 15, what is the value of x?",
        options: ["8", "12", "22", "-8"],
        correctAnswer: 2,
        explanation: "To find x, add 7 to both sides of the equation: x = 15 + 7 = 22."
    },
    {
        id: 'jss-math-q6',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: "What is 25% of 200?",
        options: ["25", "50", "75", "100"],
        correctAnswer: 1,
        explanation: "25% is equivalent to 1/4. 1/4 of 200 is 200 / 4 = 50."
    },
    {
        id: 'jss-math-q7',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'A boy buys a pen for ₦50 and sells it for ₦70. What is his profit?',
        options: ['₦120', '₦30', '₦20', '₦25'],
        correctAnswer: 2,
        explanation: 'Profit = Selling Price - Cost Price = ₦70 - ₦50 = ₦20.'
    },
     {
        id: 'jss-math-q8',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Express 0.5 as a fraction in its simplest form.',
        options: ['1/2', '1/5', '5/10', '2/5'],
        correctAnswer: 0,
        explanation: '0.5 is 5/10, which simplifies to 1/2 by dividing the numerator and denominator by 5.'
    },
    {
        id: 'jss-math-q9',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'What is the next number in the sequence: 2, 4, 6, 8, ...?',
        options: ['9', '10', '11', '12'],
        correctAnswer: 1,
        explanation: 'The sequence is a list of even numbers, increasing by 2 each time. The next number is 10.'
    },
    {
        id: 'jss-math-q10',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'How many sides does a triangle have?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 0,
        explanation: 'A triangle is a polygon with three sides and three angles.'
    },
    {
        id: 'jss-math-q11',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Calculate the area of a square with a side length of 6cm.',
        options: ['12 cm²', '24 cm²', '30 cm²', '36 cm²'],
        correctAnswer: 3,
        explanation: 'The area of a square is side * side. So, 6cm * 6cm = 36 cm².'
    },
    {
        id: 'jss-math-q12',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'If you have ₦500 and you spend ₦150, how much do you have left?',
        options: ['₦250', '₦350', '₦450', '₦650'],
        correctAnswer: 1,
        explanation: 'Amount left = Total amount - Amount spent = ₦500 - ₦150 = ₦350.'
    },
    {
        id: 'jss-math-q13',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'What is the sum of angles in a triangle?',
        options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
        correctAnswer: 1,
        explanation: 'The sum of the interior angles of any triangle is always 180 degrees.'
    },
    {
        id: 'jss-math-q14',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Find the average of these numbers: 10, 20, 30.',
        options: ['15', '20', '25', '60'],
        correctAnswer: 1,
        explanation: 'Average = (Sum of numbers) / (Count of numbers) = (10+20+30) / 3 = 60 / 3 = 20.'
    },
    {
        id: 'jss-math-q15',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Which of these is a prime number?',
        options: ['4', '6', '9', '11'],
        correctAnswer: 3,
        explanation: 'A prime number is a number greater than 1 that has only two factors: 1 and itself. 11 is only divisible by 1 and 11.'
    },
    {
        id: 'jss-math-q16',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Write the number 3,456 in words.',
        options: ['Three thousand, five hundred and forty-six', 'Three hundred and forty-five', 'Three thousand, four hundred and fifty-six', 'Thirty-four thousand and fifty-six'],
        correctAnswer: 2,
        explanation: 'The number 3,456 is read as "Three thousand, four hundred and fifty-six".'
    },
    {
        id: 'jss-math-q17',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Solve for y: 2y = 18',
        options: ['7', '8', '9', '10'],
        correctAnswer: 2,
        explanation: 'To solve for y, divide both sides by 2: y = 18 / 2 = 9.'
    },
    {
        id: 'jss-math-q18',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'What is the Roman numeral for 10?',
        options: ['V', 'X', 'L', 'C'],
        correctAnswer: 1,
        explanation: 'In Roman numerals, X represents 10.'
    },
    {
        id: 'jss-math-q19',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'A car travels at 60 km/h. How far will it travel in 2 hours?',
        options: ['30 km', '60 km', '120 km', '240 km'],
        correctAnswer: 2,
        explanation: 'Distance = Speed × Time = 60 km/h × 2 h = 120 km.'
    },
    {
        id: 'jss-math-q20',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'What is the value of 5²?',
        options: ['10', '15', '20', '25'],
        correctAnswer: 3,
        explanation: '5² means 5 multiplied by itself (5 × 5), which equals 25.'
    },
    {
        id: 'jss-math-q21',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Convert 2.5 kilometers to meters.',
        options: ['25 meters', '250 meters', '2500 meters', '25000 meters'],
        correctAnswer: 2,
        explanation: 'There are 1000 meters in 1 kilometer. So, 2.5 km * 1000 = 2500 meters.'
    },
    {
        id: 'jss-math-q22',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Find the Lowest Common Multiple (LCM) of 4 and 6.',
        options: ['2', '4', '12', '24'],
        correctAnswer: 2,
        explanation: 'Multiples of 4 are 4, 8, 12, 16... Multiples of 6 are 6, 12, 18... The lowest common multiple is 12.'
    },
    {
        id: 'jss-math-q23',
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: 'Simplify: 5a + 3b - 2a + 4b',
        options: ['3a + 7b', '7a + 7b', '3a - b', '7ab'],
        correctAnswer: 0,
        explanation: 'Combine like terms: (5a - 2a) + (3b + 4b) = 3a + 7b.'
    },

    // JSS English (25 questions)
    {
        id: 'jss-eng-q1',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: "Which of the following is a command?",
        options: ["Can you please open the door?", "Open the door.", "The door is open.", "I will open the door."],
        correctAnswer: 1,
        explanation: "A command or imperative sentence gives a direct order. 'Open the door.' is a command."
    },
    {
        id: 'jss-eng-q2',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: "Choose the word that is opposite in meaning to 'ancient'.",
        options: ["Old", "Modern", "Historic", "Past"],
        correctAnswer: 1,
        explanation: "'Ancient' means very old, so its opposite is 'modern'."
    },
    {
        id: 'jss-eng-q3',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: "The boy, _______ father is a doctor, is my best friend.",
        options: ["who", "which", "whose", "whom"],
        correctAnswer: 2,
        explanation: "'Whose' is a possessive pronoun used to show ownership. The father belongs to the boy."
    },
    {
        id: 'jss-eng-q4',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: "I have _______ my homework.",
        options: ["do", "did", "done", "does"],
        correctAnswer: 2,
        explanation: "The verb 'have' requires the past participle form of the main verb, which is 'done'."
    },
    {
        id: 'jss-eng-q5',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Which of these is a noun?',
        options: ['Run', 'Happy', 'Quickly', 'House'],
        correctAnswer: 3,
        explanation: 'A noun is a word that names a person, place, or thing. "House" is a thing.'
    },
    {
        id: 'jss-eng-q6',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Choose the correct spelling.',
        options: ['Embarass', 'Embarrass', 'Embarasss', 'Embbarrass'],
        correctAnswer: 1,
        explanation: 'The correct spelling is "Embarrass", with two "r"s and two "s"s.'
    },
    {
        id: 'jss-eng-q7',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'The plural of "child" is...',
        options: ['Childs', 'Childes', 'Children', 'Childer'],
        correctAnswer: 2,
        explanation: '"Children" is the irregular plural form of "child".'
    },
    {
        id: 'jss-eng-q8',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'A person who writes books is called an...',
        options: ['Actor', 'Author', 'Artist', 'Architect'],
        correctAnswer: 1,
        explanation: 'An author is a writer of a book, article, or report.'
    },
    {
        id: 'jss-eng-q9',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'She is _______ beautiful girl.',
        options: ['a', 'an', 'the', 'some'],
        correctAnswer: 0,
        explanation: 'The article "a" is used before a word that starts with a consonant sound, like "beautiful".'
    },
    {
        id: 'jss-eng-q10',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'The dog wagged _______ tail happily.',
        options: ["it's", 'its', 'its\'', 'it'],
        correctAnswer: 1,
        explanation: '"Its" is the possessive form of "it". "It\'s" is a contraction of "it is".'
    },
    {
        id: 'jss-eng-q11',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Which word is a verb in the sentence: "The birds fly high in the sky"?',
        options: ['birds', 'fly', 'high', 'sky'],
        correctAnswer: 1,
        explanation: 'A verb is an action word. "fly" is the action the birds are performing.'
    },
    {
        id: 'jss-eng-q12',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Choose the word that means "very big".',
        options: ['Tiny', 'Small', 'Enormous', 'Little'],
        correctAnswer: 2,
        explanation: '"Enormous" is a synonym for very big or huge.'
    },
    {
        id: 'jss-eng-q13',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'We go to school _______ learn.',
        options: ['to', 'for', 'at', 'with'],
        correctAnswer: 0,
        explanation: 'The infinitive of purpose "to" is used to explain why we do something.'
    },
    {
        id: 'jss-eng-q14',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'He is not only a good student _______ a talented artist.',
        options: ['and', 'but also', 'or', 'so'],
        correctAnswer: 1,
        explanation: 'The correlative conjunction "not only... but also" is used to connect two related pieces of information.'
    },
    {
        id: 'jss-eng-q15',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'The opposite of "brave" is...',
        options: ['strong', 'bold', 'cowardly', 'happy'],
        correctAnswer: 2,
        explanation: 'Brave means ready to face danger; the opposite is cowardly.'
    },
    {
        id: 'jss-eng-q16',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Which of these is a punctuation mark?',
        options: ['And', 'But', 'Comma', 'The'],
        correctAnswer: 2,
        explanation: 'A comma (,) is a punctuation mark used to separate items in a list or clauses in a sentence.'
    },
    {
        id: 'jss-eng-q17',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'A group of lions is called a...',
        options: ['pack', 'herd', 'pride', 'flock'],
        correctAnswer: 2,
        explanation: 'The collective noun for a group of lions is a pride.'
    },
    {
        id: 'jss-eng-q18',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'The past tense of "go" is...',
        options: ['gone', 'went', 'goed', 'going'],
        correctAnswer: 1,
        explanation: 'The verb "go" has an irregular past tense, which is "went".'
    },
    {
        id: 'jss-eng-q19',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'The book is _______ the table.',
        options: ['at', 'in', 'on', 'with'],
        correctAnswer: 2,
        explanation: 'The preposition "on" is used to indicate position on a surface.'
    },
    {
        id: 'jss-eng-q20',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Choose the correct sentence.',
        options: ['She sing very well.', 'She sings very well.', 'She singing very well.', 'She sangs very well.'],
        correctAnswer: 1,
        explanation: 'For a third-person singular subject ("She"), the present tense verb needs an "-s" at the end.'
    },
    {
        id: 'jss-eng-q21',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'An _______ is a fruit.',
        options: ['apple', 'book', 'car', 'dog'],
        correctAnswer: 0,
        explanation: 'An apple is a type of fruit.'
    },
    {
        id: 'jss-eng-q22',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'What is the comparative form of "good"?',
        options: ['Gooder', 'Best', 'Better', 'Goodest'],
        correctAnswer: 2,
        explanation: 'The comparative form of the irregular adjective "good" is "better".'
    },
    {
        id: 'jss-eng-q23',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'My brother and I _______ going to the market.',
        options: ['is', 'are', 'am', 'was'],
        correctAnswer: 1,
        explanation: 'A compound subject ("My brother and I") takes a plural verb, which is "are".'
    },
    {
        id: 'jss-eng-q24',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'A story from ancient times, especially one that was told to explain natural events or to describe the early history of a people is called a...',
        options: ['novel', 'poem', 'myth', 'play'],
        correctAnswer: 2,
        explanation: 'A myth is a traditional story concerning the early history of a people or explaining some natural or social phenomenon.'
    },
    {
        id: 'jss-eng-q25',
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: 'Which word is an adjective in the sentence: "The big dog barked loudly"?',
        options: ['dog', 'barked', 'loudly', 'big'],
        correctAnswer: 3,
        explanation: 'An adjective describes a noun. "Big" describes the "dog".'
    },


    // JSS Basic Science & Technology (BST) (25 questions)
    {
        id: 'jss-bst-q1',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: "Which of these is NOT a characteristic of living things?",
        options: ["Movement", "Respiration", "Hardness", "Growth"],
        correctAnswer: 2,
        explanation: "Hardness is a property of materials, not a fundamental characteristic of all living organisms. The seven characteristics are Movement, Respiration, Nutrition, Irritability, Growth, Excretion, and Reproduction."
    },
    {
        id: 'jss-bst-q2',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: "A lever is an example of a...",
        options: ["Complex machine", "Simple machine", "Living thing", "Chemical compound"],
        correctAnswer: 1,
        explanation: "A lever is a simple machine consisting of a beam or rigid rod pivoted at a fixed hinge, or fulcrum."
    },
    {
        id: 'jss-bst-q3',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: "Which of these tools is used for measuring angles?",
        options: ["Ruler", "Compass", "Protractor", "T-square"],
        correctAnswer: 2,
        explanation: "A protractor is a measuring instrument, typically made of transparent plastic or glass, for measuring angles."
    },
     {
        id: 'jss-bst-q4',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: "The central processing unit (CPU) is often referred to as the _______ of the computer.",
        options: ["Heart", "Brain", "Memory", "Eye"],
        correctAnswer: 1,
        explanation: "The CPU performs most of the processing inside a computer, similar to how a brain functions."
    },
    {
        id: 'jss-bst-q5',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'What are the three states of matter?',
        options: ['Solid, Liquid, Gas', 'Hard, Soft, Wet', 'Hot, Cold, Warm', 'Rock, Water, Air'],
        correctAnswer: 0,
        explanation: 'The three fundamental states of matter are solid, liquid, and gas.'
    },
    {
        id: 'jss-bst-q6',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'The process by which green plants make their food is called...',
        options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Pollination'],
        correctAnswer: 2,
        explanation: 'Photosynthesis is the process used by plants to convert light energy into chemical energy to fuel their activities.'
    },
    {
        id: 'jss-bst-q7',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of these is a source of electrical energy?',
        options: ['Wood', 'Battery', 'Stone', 'Glass'],
        correctAnswer: 1,
        explanation: 'A battery stores chemical energy and converts it into electrical energy.'
    },
    {
        id: 'jss-bst-q8',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'First aid is...',
        options: ['The last help given to an injured person', 'The first help given to an injured person', 'The only help given to an injured person', 'The money paid for treatment'],
        correctAnswer: 1,
        explanation: 'First aid is the immediate assistance given to any person suffering a sudden illness or injury, before full medical treatment is available.'
    },
    {
        id: 'jss-bst-q9',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of these materials will be attracted by a magnet?',
        options: ['Plastic spoon', 'Iron nail', 'Glass cup', 'Wooden ruler'],
        correctAnswer: 1,
        explanation: 'Magnets attract ferromagnetic materials like iron, cobalt, and nickel. An iron nail is made of iron.'
    },
    {
        id: 'jss-bst-q10',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'A group of similar cells performing the same function is called a...',
        options: ['Organ', 'Tissue', 'System', 'Molecule'],
        correctAnswer: 1,
        explanation: 'In biology, a tissue is a collection of interconnected cells that perform a similar function within an organism.'
    },
    {
        id: 'jss-bst-q11',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'The change from liquid to gas is called...',
        options: ['Melting', 'Freezing', 'Condensation', 'Evaporation'],
        correctAnswer: 3,
        explanation: 'Evaporation is the process of a substance in a liquid state changing to a gaseous state due to an increase in temperature or pressure.'
    },
    {
        id: 'jss-bst-q12',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which part of a computer is used for typing?',
        options: ['Monitor', 'Mouse', 'Keyboard', 'CPU'],
        correctAnswer: 2,
        explanation: 'The keyboard is the primary input device used to type text and commands into a computer.'
    },
    {
        id: 'jss-bst-q13',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Safety rule in a workshop requires that you wear...',
        options: ['Slippers', 'Loose clothing', 'Protective gear', 'Jewelry'],
        correctAnswer: 2,
        explanation: 'Protective gear like safety goggles, overalls, and boots are essential for safety in a workshop.'
    },
    {
        id: 'jss-bst-q14',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'A disease that can be transmitted from one person to another is said to be...',
        options: ['chronic', 'hereditary', 'communicable', 'non-communicable'],
        correctAnswer: 2,
        explanation: 'A communicable disease is one that is spread from one person to another through a variety of ways that include: contact with blood and bodily fluids; breathing in an airborne virus; or by being bitten by an insect.'
    },
    {
        id: 'jss-bst-q15',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of these is a renewable source of energy?',
        options: ['Coal', 'Petroleum', 'Sunlight', 'Natural Gas'],
        correctAnswer: 2,
        explanation: 'Sunlight is a renewable resource because it will not run out. Fossil fuels like coal and petroleum are non-renewable.'
    },
    {
        id: 'jss-bst-q16',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'The force that pulls objects towards the center of the Earth is called...',
        options: ['Friction', 'Magnetism', 'Gravity', 'Tension'],
        correctAnswer: 2,
        explanation: 'Gravity is the force by which a planet or other body draws objects toward its center.'
    },
    {
        id: 'jss-bst-q17',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of the following is a component of a simple circuit?',
        options: ['Switch', 'Bulb', 'Battery', 'All of the above'],
        correctAnswer: 3,
        explanation: 'A simple electrical circuit is composed of a power source (battery), a load (bulb), and a conductor (wire), often with a switch to control it.'
    },
    {
        id: 'jss-bst-q18',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'The process of removing waste products from the body is called...',
        options: ['Digestion', 'Respiration', 'Circulation', 'Excretion'],
        correctAnswer: 3,
        explanation: 'Excretion is the process of eliminating or expelling waste matter from the body.'
    },
    {
        id: 'jss-bst-q19',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of these is used for drawing straight lines in technical drawing?',
        options: ['Protractor', 'French curve', 'T-square', 'Compass'],
        correctAnswer: 2,
        explanation: 'A T-square is a technical drawing instrument used for drawing horizontal lines on a drawing board.'
    },
    {
        id: 'jss-bst-q20',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of these is an example of a chemical change?',
        options: ['Melting ice', 'Boiling water', 'Burning wood', 'Dissolving sugar'],
        correctAnswer: 2,
        explanation: 'Burning wood is a chemical change because it results in new substances (ash, smoke, carbon dioxide) and cannot be easily reversed.'
    },
    {
        id: 'jss-bst-q21',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which part of a plant absorbs water and nutrients from the soil?',
        options: ['Leaf', 'Stem', 'Flower', 'Root'],
        correctAnswer: 3,
        explanation: 'The roots anchor the plant and absorb water and mineral nutrients from the soil.'
    },
    {
        id: 'jss-bst-q22',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'What does the acronym ICT stand for?',
        options: ['Information and Communication Technology', 'Internet and Computer Technology', 'Information and Computer Transfer', 'Internal Communication Tool'],
        correctAnswer: 0,
        explanation: 'ICT stands for Information and Communication Technology.'
    },
    {
        id: 'jss-bst-q23',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'The organ responsible for pumping blood around the body is the...',
        options: ['Lungs', 'Brain', 'Heart', 'Stomach'],
        correctAnswer: 2,
        explanation: 'The heart is a muscular organ that pumps blood through the blood vessels of the circulatory system.'
    },
    {
        id: 'jss-bst-q24',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'Which of these is NOT a sense organ?',
        options: ['Eye', 'Nose', 'Skin', 'Bone'],
        correctAnswer: 3,
        explanation: 'The five sense organs are the eyes, ears, nose, tongue, and skin. Bones are part of the skeletal system.'
    },
    {
        id: 'jss-bst-q25',
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: 'To prevent rusting, an iron gate can be coated with...',
        options: ['Sand', 'Water', 'Paint', 'Salt'],
        correctAnswer: 2,
        explanation: 'Painting creates a barrier between the iron and the oxygen/moisture in the air, thereby preventing rust.'
    },

    // JSS National Values Education (NVE) (15 questions)
    {
        id: 'jss-nve-q1',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: "Which of the following is a responsibility of a citizen?",
        options: ["Expecting rewards for every good deed", "Disobeying traffic laws", "Paying taxes", "Destroying public property"],
        correctAnswer: 2,
        explanation: "Paying taxes is a civic responsibility that helps the government provide social amenities and services for all citizens."
    },
    {
        id: 'jss-nve-q2',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: "The Nigerian Coat of Arms has an eagle on top which represents...",
        options: ["Peace", "Fertile land", "Strength", "Rivers"],
        correctAnswer: 2,
        explanation: "The eagle on the Nigerian Coat of Arms represents the strength of the nation."
    },
    {
        id: 'jss-nve-q3',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: "Honesty, tolerance, and hard work are examples of...",
        options: ["National problems", "National values", "National symbols", "National currencies"],
        correctAnswer: 1,
        explanation: "Values are principles or standards of behavior. Honesty, tolerance, and hard work are positive values that build a strong nation."
    },
    {
        id: 'jss-nve-q4',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'Which arm of government is responsible for making laws?',
        options: ['Executive', 'Legislature', 'Judiciary', 'Civil Service'],
        correctAnswer: 1,
        explanation: 'The Legislature (e.g., the National Assembly in Nigeria) is the body with the authority to make laws for a country.'
    },
    {
        id: 'jss-nve-q5',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'The green colour on the Nigerian flag represents...',
        options: ['Peace', 'Strength', 'Agriculture', 'Sunshine'],
        correctAnswer: 2,
        explanation: 'The green bands on the Nigerian flag represent the nation\'s natural wealth and agriculture.'
    },
    {
        id: 'jss-nve-q6',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'What is the full meaning of SARS in the context of Nigerian security?',
        options: ['Special Anti-Robbery Squad', 'Special Armed Robbery Syndicate', 'Safe and Reliable Squad', 'Society Against Robbery Squad'],
        correctAnswer: 0,
        explanation: 'SARS was the acronym for the Special Anti-Robbery Squad, a former unit of the Nigerian Police Force.'
    },
    {
        id: 'jss-nve-q7',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'The right to vote in an election is a...',
        options: ['social right', 'economic right', 'political right', 'cultural right'],
        correctAnswer: 2,
        explanation: 'The right to vote, also known as suffrage, is a fundamental political right of a citizen.'
    },
    {
        id: 'jss-nve-q8',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'Which of the following is NOT a type of marriage?',
        options: ['Monogamy', 'Polygamy', 'Celibacy', 'Customary'],
        correctAnswer: 2,
        explanation: 'Celibacy is the state of abstaining from marriage and sexual relations, not a type of marriage.'
    },
    {
        id: 'jss-nve-q9',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'The head of the local government council is called...',
        options: ['Governor', 'President', 'Chairman', 'Senator'],
        correctAnswer: 2,
        explanation: 'The elected head of a Local Government Area (LGA) in Nigeria is the Chairman.'
    },
    {
        id: 'jss-nve-q10',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'Which of these is a social problem caused by drug abuse?',
        options: ['Increase in school dropouts', 'Good academic performance', 'National development', 'Respect for elders'],
        correctAnswer: 0,
        explanation: 'Drug abuse can lead to poor academic performance, health problems, and an increase in crime and school dropout rates.'
    },
    {
        id: 'jss-nve-q11',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'The system of government practiced in Nigeria today is...',
        options: ['Monarchy', 'Military Rule', 'Democracy', 'Aristocracy'],
        correctAnswer: 2,
        explanation: 'Nigeria currently practices a democratic system of government with a presidential system.'
    },
    {
        id: 'jss-nve-q12',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'The currency used in Nigeria is called...',
        options: ['Dollar', 'Cedi', 'Pound', 'Naira'],
        correctAnswer: 3,
        explanation: 'The official currency of the Federal Republic of Nigeria is the Naira (₦).'
    },
    {
        id: 'jss-nve-q13',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'Patriotism means...',
        options: ['Disliking other countries', 'Love and devotion to one\'s country', 'Traveling to many countries', 'Knowing all the national leaders'],
        correctAnswer: 1,
        explanation: 'Patriotism is the feeling of love, devotion, and sense of attachment to one\'s country.'
    },
    {
        id: 'jss-nve-q14',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'Which of these agencies is responsible for fighting corruption in Nigeria?',
        options: ['NEMA', 'FRSC', 'EFCC', 'NAFDAC'],
        correctAnswer: 2,
        explanation: 'The Economic and Financial Crimes Commission (EFCC) is a Nigerian law enforcement agency that investigates financial crimes such as advance fee fraud and money laundering.'
    },
    {
        id: 'jss-nve-q15',
        subjectId: 'jss-nve',
        standard: 'NECO_BECE',
        question: 'The National Anthem and the Pledge are symbols of national...',
        options: ['identity', 'problem', 'resource', 'holiday'],
        correctAnswer: 0,
        explanation: 'The National Anthem and Pledge are patriotic symbols that represent the identity and unity of the nation.'
    },

    // JSS Pre-Vocational Studies (PVS) (10 questions)
    {
        id: 'jss-pvs-q1',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'Which of the following is a cereal crop?',
        options: ['Yam', 'Cassava', 'Maize', 'Beans'],
        correctAnswer: 2,
        explanation: 'Maize (corn) is a cereal crop, which is a type of grass cultivated for the edible components of its grain.'
    },
    {
        id: 'jss-pvs-q2',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'A place where young plants are raised before transplanting is called a...',
        options: ['farm', 'garden', 'nursery', 'field'],
        correctAnswer: 2,
        explanation: 'A nursery is a place where plants are propagated and grown to a desired age before being transplanted.'
    },
    {
        id: 'jss-pvs-q3',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'Which of these farm animals is a poultry bird?',
        options: ['Goat', 'Sheep', 'Chicken', 'Pig'],
        correctAnswer: 2,
        explanation: 'Poultry refers to domesticated birds kept by humans for their eggs, their meat or their feathers. Chickens are a common type of poultry.'
    },
    {
        id: 'jss-pvs-q4',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'The art of preparing food for eating by heating it is called...',
        options: ['baking', 'cooking', 'frying', 'boiling'],
        correctAnswer: 1,
        explanation: 'Cooking is the general term for preparing food using heat.'
    },
    {
        id: 'jss-pvs-q5',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'Which of the following tools is used for basic sewing?',
        options: ['Hammer', 'Spanner', 'Needle and thread', 'Screwdriver'],
        correctAnswer: 2,
        explanation: 'A needle and thread are the most fundamental tools used for sewing.'
    },
    {
        id: 'jss-pvs-q6',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'The application of scientific knowledge for practical purposes, especially in industry, is called...',
        options: ['science', 'art', 'technology', 'agriculture'],
        correctAnswer: 2,
        explanation: 'Technology is the sum of techniques, skills, methods, and processes used in the production of goods or services or in the accomplishment of objectives, such as scientific investigation.'
    },
    {
        id: 'jss-pvs-q7',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'A balanced diet should contain...',
        options: ['only carbohydrates', 'only proteins', 'all classes of food in the right proportion', 'only fats and oil'],
        correctAnswer: 2,
        explanation: 'A balanced diet provides the body with all the essential nutrients from different food groups in the correct proportions.'
    },
    {
        id: 'jss-pvs-q8',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'Which of these is a simple farm tool?',
        options: ['Tractor', 'Combine harvester', 'Cutlass', 'Planter'],
        correctAnswer: 2,
        explanation: 'A cutlass is a simple, non-mechanized hand tool used for clearing bush and light farming tasks.'
    },
    {
        id: 'jss-pvs-q9',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'The process of keeping the home clean and orderly is known as...',
        options: ['home decoration', 'home management', 'home economics', 'home science'],
        correctAnswer: 1,
        explanation: 'Home management involves the efficient use of resources to achieve family goals, which includes maintaining a clean and orderly environment.'
    },
    {
        id: 'jss-pvs-q10',
        subjectId: 'jss-pvs',
        standard: 'NECO_BECE',
        question: 'Which of the following is NOT a method of food preservation?',
        options: ['Drying', 'Refrigeration', 'Washing', 'Canning'],
        correctAnswer: 2,
        explanation: 'Washing is a method of cleaning food, but it does not preserve it. Drying, refrigeration, and canning are all methods used to prolong the shelf life of food.'
    },
    
    // ===================================
    // SENIOR SCHOOL (WAEC / NECO)
    // ===================================

    // SSS Physics (15 questions)
    {
        id: 'sss-phy-q1',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "Which of the following is a vector quantity?",
        options: ["Mass", "Temperature", "Displacement", "Speed"],
        correctAnswer: 2,
        explanation: "Displacement has both magnitude and direction, making it a vector quantity. Mass, temperature, and speed only have magnitude."
    },
    {
        id: 'sss-phy-q2',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "A car accelerates from rest to 20 m/s in 5 seconds. What is its acceleration?",
        options: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
        correctAnswer: 1,
        explanation: "Acceleration (a) = (Final velocity (v) - Initial velocity (u)) / time (t). a = (20 - 0) / 5 = 4 m/s²."
    },
    {
        id: 'sss-phy-q3',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "The tendency of a body to remain at rest or in uniform motion in a straight line is known as...",
        options: ["Momentum", "Inertia", "Friction", "Energy"],
        correctAnswer: 1,
        explanation: "Inertia is the resistance of any physical object to any change in its state of motion; this includes changes to its speed, direction, or state of rest."
    },
    {
        id: 'sss-phy-q4',
        subjectId: 'sss-physics',
        standard: 'NECO_SSCE',
        question: "Which of these instruments is used to measure atmospheric pressure?",
        options: ["Hydrometer", "Manometer", "Barometer", "Thermometer"],
        correctAnswer: 2,
        explanation: "A barometer is a scientific instrument used to measure atmospheric pressure, also called barometric pressure."
    },
    {
        id: 'sss-phy-q5',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "The transfer of heat through a vacuum is primarily by...",
        options: ["Conduction", "Convection", "Radiation", "Absorption"],
        correctAnswer: 2,
        explanation: "Radiation is the only mode of heat transfer that does not require a medium and can occur through a vacuum, like the heat from the sun reaching Earth."
    },
    {
        id: 'sss-phy-q6',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "Ohm's law states that...",
        options: ["V = IR", "P = IV", "F = ma", "E = mc²"],
        correctAnswer: 0,
        explanation: "Ohm's law states that the voltage (V) across a conductor is directly proportional to the current (I) flowing through it, provided all physical conditions and temperatures remain constant. V = IR, where R is the resistance."
    },
    {
        id: 'sss-phy-q7',
        subjectId: 'sss-physics',
        standard: 'NECO_SSCE',
        question: "The primary colours of light are...",
        options: ["Red, Yellow, Blue", "Red, Green, Blue", "Red, Green, Yellow", "Cyan, Magenta, Yellow"],
        correctAnswer: 1,
        explanation: "The primary colours of light (additive primaries) are Red, Green, and Blue (RGB)."
    },
    {
        id: 'sss-phy-q8',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "A radioactive element has a half-life of 10 days. What fraction of the original sample will remain after 30 days?",
        options: ["1/2", "1/4", "1/8", "1/16"],
        correctAnswer: 2,
        explanation: "30 days is equal to 3 half-lives (30/10 = 3). After 1 half-life, 1/2 remains. After 2 half-lives, 1/4 remains. After 3 half-lives, 1/8 remains."
    },
    {
        id: 'sss-phy-q9',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "Sound waves in air are...",
        options: ["Transverse waves", "Longitudinal waves", "Electromagnetic waves", "Stationary waves"],
        correctAnswer: 1,
        explanation: "Sound waves are longitudinal waves because the particles of the medium through which the sound is transported vibrate parallel to the direction that the sound wave moves."
    },
    {
        id: 'sss-phy-q10',
        subjectId: 'sss-physics',
        standard: 'NECO_SSCE',
        question: "The S.I. unit of power is...",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 2,
        explanation: "The watt (W) is the S.I. unit of power, equivalent to one joule per second."
    },
    {
        id: 'sss-phy-q11',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "A concave mirror can be used as a...",
        options: ["Driving mirror", "Shaving mirror", "Security mirror in shops", "Magnifying glass"],
        correctAnswer: 1,
        explanation: "A concave mirror is used as a shaving mirror because it produces a magnified, erect, and virtual image of the face when held close."
    },
    {
        id: 'sss-phy-q12',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "Which of the following phenomena is a result of the total internal reflection of light?",
        options: ["Formation of a rainbow", "Mirage", "Blue colour of the sky", "Dispersion of light"],
        correctAnswer: 1,
        explanation: "A mirage is a naturally occurring optical phenomenon in which light rays bend via refraction to produce a displaced image of distant objects or the sky. It is caused by total internal reflection."
    },
    {
        id: 'sss-phy-q13',
        subjectId: 'sss-physics',
        standard: 'NECO_SSCE',
        question: "A transformer is a device used to...",
        options: ["Store electrical energy", "Convert AC to DC", "Step up or step down AC voltage", "Generate electricity"],
        correctAnswer: 2,
        explanation: "A transformer is a passive electrical device that transfers electrical energy from one electrical circuit to another, or multiple circuits, by stepping up (increasing) or stepping down (decreasing) the voltage."
    },
    {
        id: 'sss-phy-q14',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "The principle of moments states that for a body in equilibrium...",
        options: ["The total upward force equals the total downward force", "The sum of clockwise moments about a pivot equals the sum of anticlockwise moments", "Action and reaction are equal and opposite", "Force is the product of mass and acceleration"],
        correctAnswer: 1,
        explanation: "The principle of moments is a fundamental concept in mechanics stating that if an object is balanced (in equilibrium), the sum of the clockwise moments about a pivot is equal to the sum of the anticlockwise moments about the same pivot."
    },
    {
        id: 'sss-phy-q15',
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: "Which of the following is NOT an electromagnetic wave?",
        options: ["X-rays", "Gamma rays", "Sound waves", "Radio waves"],
        correctAnswer: 2,
        explanation: "Sound waves are mechanical waves that require a medium to travel, while all the others are electromagnetic waves that can travel through a vacuum."
    },

    // SSS Chemistry (15 questions)
    {
        id: 'sss-chem-q1',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "The process by which a solid changes directly to a gas without passing through the liquid state is called?",
        options: ["Evaporation", "Condensation", "Sublimation", "Melting"],
        correctAnswer: 2,
        explanation: "Sublimation is the direct transition of a substance from the solid to the gas state."
    },
    {
        id: 'sss-chem-q2',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "Which of the following is an example of an alkane?",
        options: ["Ethene", "Ethyne", "Methane", "Ethanol"],
        correctAnswer: 2,
        explanation: "Methane (CH₄) is the simplest alkane, a saturated hydrocarbon with the general formula CnH2n+2."
    },
    {
        id: 'sss-chem-q3',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "An atom that has lost or gained an electron is called...",
        options: ["A molecule", "An isotope", "An ion", "A compound"],
        correctAnswer: 2,
        explanation: "An ion is an atom or molecule with a net electrical charge due to the loss (cation) or gain (anion) of one or more electrons."
    },
    {
        id: 'sss-chem-q4',
        subjectId: 'sss-chemistry',
        standard: 'NECO_SSCE',
        question: "The pH of a neutral solution is...",
        options: ["Less than 7", "Equal to 7", "Greater than 7", "Equal to 0"],
        correctAnswer: 1,
        explanation: "On the pH scale, 7 is neutral. A pH less than 7 is acidic, and a pH greater than 7 is basic or alkaline."
    },
    {
        id: 'sss-chem-q5',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "What is the chemical formula for sodium chloride?",
        options: ["SoCl", "SCl", "NaCl", "Na₂Cl"],
        correctAnswer: 2,
        explanation: "Sodium chloride, commonly known as table salt, is an ionic compound with the chemical formula NaCl."
    },
    {
        id: 'sss-chem-q6',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "Which gas is produced when an acid reacts with a metal?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correctAnswer: 3,
        explanation: "Active metals react with acids to produce a salt and hydrogen gas. For example, Zn + 2HCl → ZnCl₂ + H₂."
    },
    {
        id: 'sss-chem-q7',
        subjectId: 'sss-chemistry',
        standard: 'NECO_SSCE',
        question: "The process of separating crude oil into its various components is called...",
        options: ["Fractional distillation", "Cracking", "Polymerization", "Esterification"],
        correctAnswer: 0,
        explanation: "Fractional distillation is used in oil refineries to separate crude oil into useful substances (or fractions) with different boiling points."
    },
    {
        id: 'sss-chem-q8',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "Which of the following is a noble gas?",
        options: ["Oxygen", "Chlorine", "Nitrogen", "Argon"],
        correctAnswer: 3,
        explanation: "Argon (Ar) is in Group 18 of the periodic table, making it a noble gas, characterized by its chemical inertness due to a full valence shell."
    },
    {
        id: 'sss-chem-q9',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "A substance that speeds up a chemical reaction without being consumed is called a...",
        options: ["Reactant", "Product", "Catalyst", "Inhibitor"],
        correctAnswer: 2,
        explanation: "A catalyst increases the rate of a chemical reaction by lowering the activation energy, but it is not used up in the reaction itself."
    },
    {
        id: 'sss-chem-q10',
        subjectId: 'sss-chemistry',
        standard: 'NECO_SSCE',
        question: "Water can be described as a universal solvent because...",
        options: ["it is found everywhere", "it dissolves many substances", "it is a liquid", "it is tasteless"],
        correctAnswer: 1,
        explanation: "Water's polar nature allows it to dissolve a wide variety of ionic and polar molecular substances, earning it the name 'universal solvent'."
    },
    {
        id: 'sss-chem-q11',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "What type of bond is formed when electrons are transferred from one atom to another?",
        options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"],
        correctAnswer: 1,
        explanation: "An ionic bond is formed through the electrostatic attraction between oppositely charged ions, which are formed by the complete transfer of electrons from a metal to a non-metal."
    },
    {
        id: 'sss-chem-q12',
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: "The most abundant element in the Earth's crust is...",
        options: ["Silicon", "Oxygen", "Aluminum", "Iron"],
        correctAnswer: 1,
        explanation: "Oxygen is the most abundant element in the Earth's crust by mass (about 46.6%), followed by silicon. Aluminum is the most abundant metal."
    },
];
