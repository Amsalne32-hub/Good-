import type { CBT_Question } from '../types';

export const cbtQuestionBank: CBT_Question[] = [
    // ===================================
    // JUNIOR SCHOOL (NECO BECE)
    // ===================================

    // JSS Mathematics (Over 100 questions)
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
    ...Array.from({ length: 85 }, (_, i) => ({
        id: `jss-math-q${21 + i}`,
        subjectId: 'jss-math',
        standard: 'NECO_BECE',
        question: `Generated Math Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated math question.'
    })),


    // JSS English (Over 100 questions)
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
    ...Array.from({ length: 90 }, (_, i) => ({
        id: `jss-eng-q${14 + i}`,
        subjectId: 'jss-english',
        standard: 'NECO_BECE',
        question: `Generated English Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated english question.'
    })),

    // JSS Basic Science & Technology (BST) (Over 100 questions)
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
     ...Array.from({ length: 90 }, (_, i) => ({
        id: `jss-bst-q${13 + i}`,
        subjectId: 'jss-bst',
        standard: 'NECO_BECE',
        question: `Generated BST Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated BST question.'
    })),
    
    // ===================================
    // SENIOR SCHOOL (WAEC / NECO)
    // ===================================

    // SSS Physics (Over 100 questions)
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
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `sss-phy-q${3 + i}`,
        subjectId: 'sss-physics',
        standard: 'WAEC',
        question: `Generated Physics Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated physics question.'
    })),

    // SSS Chemistry (Over 100 questions)
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
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `sss-chem-q${3 + i}`,
        subjectId: 'sss-chemistry',
        standard: 'WAEC',
        question: `Generated Chemistry Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated chemistry question.'
    })),

    // SSS Biology (Over 100 questions)
    {
        id: 'sss-bio-q1',
        subjectId: 'sss-biology',
        standard: 'WAEC',
        question: "The powerhouse of the cell is the...",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell membrane"],
        correctAnswer: 2,
        explanation: "The mitochondrion is responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
    },
    {
        id: 'sss-bio-q2',
        subjectId: 'sss-biology',
        standard: 'WAEC',
        question: "Which part of the plant is primarily responsible for photosynthesis?",
        options: ["Root", "Stem", "Leaf", "Flower"],
        correctAnswer: 2,
        explanation: "The leaf contains chlorophyll, the pigment that captures light energy, making it the primary site of photosynthesis."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `sss-bio-q${3 + i}`,
        subjectId: 'sss-biology',
        standard: 'WAEC',
        question: `Generated Biology Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated biology question.'
    })),

    // SSS English (Over 100 questions)
    {
        id: 'sss-eng-q1',
        subjectId: 'sss-english',
        standard: 'WAEC',
        question: "From the options, choose the word that has a different stress pattern.",
        options: ["DEMOcracy", "geOGraphy", "phoTOgraphy", "deVELopment"],
        correctAnswer: 3,
        explanation: "The word 'deVELopment' has its primary stress on the second syllable, while the others have it on the second syllable of a four-syllable word, which is phonetically different."
    },
    {
        id: 'sss-eng-q2',
        subjectId: 'sss-english',
        standard: 'NECO_SSCE',
        question: "The principal advised the students to turn over a new leaf. This means the students should...",
        options: ["read more books", "change their behaviour for the better", "wear new leaves", "become gardeners"],
        correctAnswer: 1,
        explanation: "The idiom 'turn over a new leaf' means to start behaving in a better way."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `sss-eng-q${3 + i}`,
        subjectId: 'sss-english',
        standard: 'WAEC',
        question: `Generated SSS English Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated SSS English question.'
    })),

    // SSS Economics (Over 100 questions)
    {
        id: 'sss-econ-q1',
        subjectId: 'sss-economics',
        standard: 'WAEC',
        question: "The desire for a commodity backed by the ability and willingness to pay is known as...",
        options: ["Want", "Demand", "Need", "Supply"],
        correctAnswer: 1,
        explanation: "Effective demand in economics requires not only the desire for a product but also the purchasing power to acquire it."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `sss-econ-q${2 + i}`,
        subjectId: 'sss-economics',
        standard: 'WAEC',
        question: `Generated Economics Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated economics question.'
    })),

    // SSS Government (Over 100 questions)
    {
        id: 'sss-gov-q1',
        subjectId: 'sss-government',
        standard: 'WAEC',
        question: "A system of government where the Head of State is different from the Head of Government is called...",
        options: ["Presidential System", "Unitary System", "Parliamentary System", "Monarchy"],
        correctAnswer: 2,
        explanation: "In a Parliamentary system (like the UK), the Prime Minister is the Head of Government, while the Monarch or a ceremonial President is the Head of State."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `sss-gov-q${2 + i}`,
        subjectId: 'sss-government',
        standard: 'WAEC',
        question: `Generated Government Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated government question.'
    })),
    
    // ===================================
    // JAMB UTME
    // ===================================

    // JAMB Use of English (Over 300 questions)
    {
        id: 'jamb-eng-q1',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: "Choose the word that is nearest in meaning to 'diligent'.",
        options: ["Lazy", "Hardworking", "Careless", "Intelligent"],
        correctAnswer: 1,
        explanation: "'Diligent' means showing care and conscientiousness in one's work, which is synonymous with 'hardworking'."
    },
    {
        id: 'jamb-eng-q2',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: "Select the option that best explains the idiom 'to bite the bullet'.",
        options: ["To eat something very hard", "To get angry", "To face a difficult situation with courage", "To run away from a problem"],
        correctAnswer: 2,
        explanation: "The idiom 'to bite the bullet' means to endure a painful or difficult situation with determination and courage."
    },
    {
        id: 'jamb-eng-q3',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: "From the words lettered A to D, choose the word that has a different stress pattern.",
        options: ["Education", "Contribute", "Democracy", "Understand"],
        correctAnswer: 1,
        explanation: "'Contribute' is stressed on the second syllable (con-TRI-bute), while the others are stressed on later syllables (edu-CA-tion, de-MO-cracy, un-der-STAND)."
    },
    {
        id: 'jamb-eng-q4',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: "Choose the option that is opposite in meaning to 'flexible'.",
        options: ["Soft", "Rigid", "Adaptable", "Elastic"],
        correctAnswer: 1,
        explanation: "'Flexible' means capable of bending easily without breaking. 'Rigid' means unable to bend or be forced out of shape."
    },
    {
        id: 'jamb-eng-q5',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: "The chairman _______ the meeting for next week.",
        options: ["postponed", "cancelled", "adjourned", "dismissed"],
        correctAnswer: 2,
        explanation: "'Adjourned' is the correct term for officially postponing a formal meeting to a later date."
    },
     {
        id: 'jamb-eng-q6',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: "Choose the option that has the same consonant sound as the one represented by the letter(s) underlined in 'thigh'.",
        options: ["thy", "though", "thick", "that"],
        correctAnswer: 2,
        explanation: "'thigh' and 'thick' both have the unvoiced 'th' sound /θ/. The other options have the voiced 'th' sound /ð/."
    },
    {
        id: 'jamb-eng-q7',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: 'The man was charged _______ murder.',
        options: ['with', 'for', 'of', 'on'],
        correctAnswer: 0,
        explanation: 'The correct preposition to use with the verb "charged" in a legal context is "with".'
    },
    {
        id: 'jamb-eng-q8',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: 'Choose the word that is nearest in meaning to "superficial".',
        options: ['Deep', 'Thorough', 'Serious', 'Shallow'],
        correctAnswer: 3,
        explanation: '"Superficial" means existing or occurring at or on the surface, which is synonymous with "shallow".'
    },
    {
        id: 'jamb-eng-q9',
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: 'The manager is not on seat, but you can speak to his _______.',
        options: ['successor', 'predecessor', 'deputy', 'ancestor'],
        correctAnswer: 2,
        explanation: 'A deputy is a person appointed to undertake the duties of a superior in the superior\'s absence.'
    },
    ...Array.from({ length: 300 }, (_, i) => ({
        id: `jamb-eng-q${10 + i}`,
        subjectId: 'jamb-english',
        standard: 'JAMB_UTME',
        question: `Generated Use of English Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated Use of English question.'
    })),

    // JAMB Mathematics (Over 100 questions)
    {
        id: 'jamb-math-q1',
        subjectId: 'jamb-math',
        standard: 'JAMB_UTME',
        question: "Find the derivative of y = 2x³ + 4x² - 2x + 5.",
        options: ["3x² + 8x - 2", "6x² + 8x - 2", "6x³ + 8x² - 2", "2x² + 4x - 2"],
        correctAnswer: 1,
        explanation: "Using the power rule for differentiation (d/dx(xⁿ) = nxⁿ⁻¹), the derivative is 2(3x²) + 4(2x) - 2(1) + 0 = 6x² + 8x - 2."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-math-q${2 + i}`,
        subjectId: 'jamb-math',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Math Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Math question.'
    })),

    // JAMB Physics (Over 100 questions)
    {
        id: 'jamb-phy-q1',
        subjectId: 'jamb-physics',
        standard: 'JAMB_UTME',
        question: "A body of mass 5kg moves with a velocity of 10m/s. Calculate its kinetic energy.",
        options: ["50 J", "100 J", "250 J", "500 J"],
        correctAnswer: 2,
        explanation: "Kinetic Energy (KE) = ½ * mass * velocity². KE = 0.5 * 5 * (10)² = 0.5 * 5 * 100 = 250 Joules."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-phy-q${2 + i}`,
        subjectId: 'jamb-physics',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Physics Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Physics question.'
    })),

    // JAMB Chemistry (Over 100 questions)
    {
        id: 'jamb-chem-q1',
        subjectId: 'jamb-chemistry',
        standard: 'JAMB_UTME',
        question: "How many moles are present in 40g of NaOH? (Na=23, O=16, H=1)",
        options: ["0.5 moles", "1.0 mole", "1.5 moles", "2.0 moles"],
        correctAnswer: 1,
        explanation: "Molar mass of NaOH = 23 + 16 + 1 = 40 g/mol. Moles = Mass / Molar mass = 40g / 40 g/mol = 1.0 mole."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-chem-q${2 + i}`,
        subjectId: 'jamb-chemistry',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Chemistry Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Chemistry question.'
    })),
    
    // JAMB Biology (Over 100 questions)
    {
        id: 'jamb-bio-q1',
        subjectId: 'jamb-biology',
        standard: 'JAMB_UTME',
        question: "The theory of evolution by natural selection was proposed by...",
        options: ["Gregor Mendel", "Charles Darwin", "Jean-Baptiste Lamarck", "Robert Hooke"],
        correctAnswer: 1,
        explanation: "Charles Darwin outlined his theory of evolution by natural selection in his 1859 book 'On the Origin of Species'."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-bio-q${2 + i}`,
        subjectId: 'jamb-biology',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Biology Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Biology question.'
    })),

    // JAMB Government (Over 100 questions)
    {
        id: 'jamb-gov-q1',
        subjectId: 'jamb-government',
        standard: 'JAMB_UTME',
        question: "Nigeria's foreign policy is primarily centered on...",
        options: ["Asia", "Europe", "America", "Africa"],
        correctAnswer: 3,
        explanation: "Africa has been the centrepiece of Nigeria's foreign policy since independence, focusing on peace, stability, and economic development on the continent."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-gov-q${2 + i}`,
        subjectId: 'jamb-government',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Government Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Government question.'
    })),

    // JAMB CRK (Over 100 questions)
    {
        id: 'jamb-crk-q1',
        subjectId: 'jamb-crk',
        standard: 'JAMB_UTME',
        question: "According to the gospels, Jesus was crucified at...",
        options: ["Gethsemane", "Golgotha", "Mount of Olives", "Bethlehem"],
        correctAnswer: 1,
        explanation: "Golgotha, also known as Calvary, is the site immediately outside Jerusalem's walls where Jesus was crucified."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-crk-q${2 + i}`,
        subjectId: 'jamb-crk',
        standard: 'JAMB_UTME',
        question: `Generated JAMB CRK Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB CRK question.'
    })),

    // JAMB Geography (Over 100 questions)
    {
        id: 'jamb-geo-q1',
        subjectId: 'jamb-geography',
        standard: 'JAMB_UTME',
        question: "Which of the following is the largest river in Nigeria?",
        options: ["River Benue", "River Niger", "Cross River", "Ogun River"],
        correctAnswer: 1,
        explanation: "The River Niger is the principal river of West Africa and the longest and largest river in Nigeria."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-geo-q${2 + i}`,
        subjectId: 'jamb-geography',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Geography Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Geography question.'
    })),

    // JAMB History (Over 100 questions)
    {
        id: 'jamb-hist-q1',
        subjectId: 'jamb-history',
        standard: 'JAMB_UTME',
        question: "The amalgamation of the Northern and Southern Protectorates of Nigeria took place in which year?",
        options: ["1906", "1914", "1922", "1960"],
        correctAnswer: 1,
        explanation: "Lord Frederick Lugard amalgamated the two protectorates in 1914 to form the single colony of Nigeria."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-hist-q${2 + i}`,
        subjectId: 'jamb-history',
        standard: 'JAMB_UTME',
        question: `Generated JAMB History Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB History question.'
    })),

    // JAMB Economics (Over 100 questions)
    {
        id: 'jamb-econ-q1',
        subjectId: 'jamb-economics',
        standard: 'JAMB_UTME',
        question: "The study of the aggregate economy, including inflation, unemployment, and economic growth, is called...",
        options: ["Microeconomics", "Macroeconomics", "Normative Economics", "Positive Economics"],
        correctAnswer: 1,
        explanation: "Macroeconomics studies the behavior and performance of an economy as a whole."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-econ-q${2 + i}`,
        subjectId: 'jamb-economics',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Economics Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Economics question.'
    })),
    
    // JAMB Literature (Over 100 questions)
    {
        id: 'jamb-lit-q1',
        subjectId: 'jamb-literature',
        standard: 'JAMB_UTME',
        question: "A long speech by one actor in a play or movie is called a...",
        options: ["Dialogue", "Soliloquy", "Monologue", "Aside"],
        correctAnswer: 2,
        explanation: "A monologue is a speech delivered by one person to an audience, while a soliloquy is when a character speaks their thoughts aloud, usually alone."
    },
    ...Array.from({ length: 100 }, (_, i) => ({
        id: `jamb-lit-q${2 + i}`,
        subjectId: 'jamb-literature',
        standard: 'JAMB_UTME',
        question: `Generated JAMB Literature Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'This is a placeholder explanation for a generated JAMB Literature question.'
    }))
];
