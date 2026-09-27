import { AlgebraTopic, QuizQuestion } from '../types/math';

export interface TopicInfo {
  id: AlgebraTopic;
  title: string;
  grade: '6th - 7th' | '7th - 8th' | '8th - 9th' | '8th';
  icon: string;
  description: string;
  keyRule: string;
  color: string;
}

export const ALGEBRA_TOPICS: TopicInfo[] = [
  {
    id: 'one_step_equations',
    title: 'One-Step Equations',
    grade: '6th - 7th',
    icon: 'Calculator',
    description: 'Master inverse operations: addition/subtraction and multiplication/division to isolate x.',
    keyRule: 'Always perform the exact inverse operation to both sides of the equation.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'two_step_equations',
    title: 'Two-Step Equations',
    grade: '7th - 8th',
    icon: 'Layers',
    description: 'Solve equations of the form ax + b = c by undoing addition/subtraction then multiplication/division.',
    keyRule: 'Undo addition/subtraction first, then isolate the variable with division or multiplication.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'variables_both_sides',
    title: 'Variables on Both Sides',
    grade: '7th - 8th',
    icon: 'Scale',
    description: 'Collect variable terms on one side and constants on the other (e.g., 4x + 7 = 2x + 19).',
    keyRule: 'Add or subtract the variable term with the smaller coefficient to keep positives.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'distributive_combining',
    title: 'Distributive Property & Like Terms',
    grade: '7th - 8th',
    icon: 'PackagePlus',
    description: 'Expand parentheses like a(b + c) = ab + ac and combine matching variable powers.',
    keyRule: 'Multiply the outer term by every single term inside, watching negative signs carefully.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'linear_inequalities',
    title: 'Linear Inequalities',
    grade: '7th - 8th',
    icon: 'SlidersHorizontal',
    description: 'Solve and graph inequalities with <, >, ≤, ≥. Remember the negative flip rule!',
    keyRule: 'CRITICAL: Whenever you multiply or divide both sides by a negative number, FLIP the inequality sign!',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'slope_and_graphing',
    title: 'Slope & Linear Equations (y = mx + b)',
    grade: '8th - 9th',
    icon: 'TrendingUp',
    description: 'Calculate rate of change (m = rise/run) and graph linear relationships on the coordinate plane.',
    keyRule: 'Slope m = (y₂ - y₁) / (x₂ - x₁). The y-intercept b is where the line crosses x = 0.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'systems_equations',
    title: 'Systems of Linear Equations',
    grade: '8th - 9th',
    icon: 'GitFork',
    description: 'Find where two lines meet using substitution, elimination, and graphing.',
    keyRule: 'The solution (x, y) must make BOTH equations true at the same time.',
    color: 'from-sky-500 to-indigo-600',
  },
  {
    id: 'word_problems_algebra',
    title: 'Algebra Word Problems',
    grade: '7th - 8th',
    icon: 'FileQuestion',
    description: 'Translate real-world scenarios into equations (age problems, money, perimeter, distance).',
    keyRule: 'Define what x stands for clearly, translate keywords into operations, and check units.',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'quadratic_foundations',
    title: 'Quadratic Foundations & Factoring',
    grade: '8th - 9th',
    icon: 'Activity',
    description: 'Introduction to x² equations, standard form ax² + bx + c = 0, and factoring binomials.',
    keyRule: 'Zero Product Property: If (x - p)(x - q) = 0, then x = p or x = q.',
    color: 'from-fuchsia-500 to-rose-600',
  },
  {
    id: 'exponents_scientific',
    title: 'Exponent Rules & Scientific Notation',
    grade: '8th',
    icon: 'Zap',
    description: 'Product rule (xᵃ · xᵇ = xᵃ⁺ᵇ), quotient rule, negative exponents (x⁻ⁿ = 1/xⁿ), and powers of 10.',
    keyRule: 'When multiplying powers with the same base, ADD the exponents. Never multiply the bases!',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'proportions_ratios',
    title: 'Proportions & Percent Equations',
    grade: '6th - 7th',
    icon: 'Percent',
    description: 'Cross-multiplication to solve proportions and algebraic percent calculations.',
    keyRule: 'In a proportion a/b = c/d, the cross products are equal: a · d = b · c.',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'polynomial_basics',
    title: 'Polynomial Basics',
    grade: '8th - 9th',
    icon: 'Box',
    description: 'Adding, subtracting, and multiplying binomials using the FOIL method.',
    keyRule: 'FOIL = First, Outside, Inside, Last. Combine like middle terms afterwards.',
    color: 'from-indigo-500 to-purple-600',
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // One-Step Equations
  {
    id: 'q_one_1',
    topic: 'one_step_equations',
    topicLabel: 'One-Step Equations',
    difficulty: 'easy',
    gradeLevel: '7th',
    questionText: 'Solve for x: x + 15 = 42',
    latex: 'x + 15 = 42',
    options: [
      { id: 'opt_1', text: 'x = 27', isCorrect: true },
      { id: 'opt_2', text: 'x = 57', isCorrect: false },
      { id: 'opt_3', text: 'x = 28', isCorrect: false },
      { id: 'opt_4', text: 'x = -27', isCorrect: false },
    ],
    correctAnswer: 'x = 27',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Identify the operation on the variable',
        description: '15 is added to x. To isolate x, undo addition by subtracting 15.',
        mathExpression: 'x + 15 - 15 = 42 - 15',
      },
      {
        stepNumber: 2,
        title: 'Subtract from both sides',
        description: '42 minus 15 gives 27.',
        mathExpression: 'x = 27',
      },
    ],
    explanation: 'To isolate x when 15 is added to it, subtract 15 from both sides of the equation: 42 - 15 = 27.',
    commonMisconception: {
      description: 'Adding 15 to 42 instead of subtracting (getting 57).',
      howToAvoid: 'Remember that an equation is like a balanced scale. To undo +15, you must do the opposite: -15.',
    },
    verification: 'Check: 27 + 15 = 42. True!',
    hint: 'What is the opposite operation of adding 15? Do that to 42.',
  },
  {
    id: 'q_one_2',
    topic: 'one_step_equations',
    topicLabel: 'One-Step Equations',
    difficulty: 'easy',
    gradeLevel: '7th',
    questionText: 'Solve for x: -4x = 36',
    latex: '-4x = 36',
    options: [
      { id: 'opt_1', text: 'x = -9', isCorrect: true },
      { id: 'opt_2', text: 'x = 9', isCorrect: false },
      { id: 'opt_3', text: 'x = 32', isCorrect: false },
      { id: 'opt_4', text: 'x = -144', isCorrect: false },
    ],
    correctAnswer: 'x = -9',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Identify the operation on x',
        description: 'x is multiplied by -4. The inverse operation is division by -4.',
        mathExpression: '\\frac{-4x}{-4} = \\frac{36}{-4}',
      },
      {
        stepNumber: 2,
        title: 'Divide both sides by -4',
        description: 'Positive 36 divided by negative 4 results in -9.',
        mathExpression: 'x = -9',
      },
    ],
    explanation: 'Divide both sides by the coefficient -4. A positive number divided by a negative number is negative, so 36 / (-4) = -9.',
    commonMisconception: {
      description: 'Dropping the negative sign and giving +9, or adding 4 instead of dividing.',
      howToAvoid: 'When dividing a positive by a negative, the quotient is ALWAYS negative. The -4 is multiplying x, so divide by -4.',
    },
    verification: 'Check: -4 * (-9) = +36. Matches the original equation.',
    hint: 'Divide 36 by -4. What sign does a positive divided by a negative have?',
  },

  // Two-Step Equations
  {
    id: 'q_two_1',
    topic: 'two_step_equations',
    topicLabel: 'Two-Step Equations',
    difficulty: 'medium',
    gradeLevel: '7th',
    questionText: 'Solve for x: 3x - 7 = 14',
    latex: '3x - 7 = 14',
    options: [
      { id: 'opt_1', text: 'x = 7', isCorrect: true },
      { id: 'opt_2', text: 'x = 21/3 = 7', isCorrect: false },
      { id: 'opt_3', text: 'x = 2.33', isCorrect: false },
      { id: 'opt_4', text: 'x = -7', isCorrect: false },
    ],
    correctAnswer: 'x = 7',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Undo the subtraction first',
        description: 'Add 7 to both sides of the equation.',
        mathExpression: '3x - 7 + 7 = 14 + 7 \\implies 3x = 21',
      },
      {
        stepNumber: 2,
        title: 'Undo multiplication',
        description: 'Divide both sides by 3 to isolate x.',
        mathExpression: '\\frac{3x}{3} = \\frac{21}{3} \\implies x = 7',
      },
    ],
    explanation: 'First add 7 to both sides to get 3x = 21. Then divide both sides by 3 to get x = 7.',
    commonMisconception: {
      description: 'Subtracting 7 from 14 instead of adding 7, giving 3x = 7 and x = 7/3.',
      howToAvoid: 'Always use the opposite sign: because the equation has - 7, you must ADD 7 to both sides.',
    },
    verification: 'Check: 3(7) - 7 = 21 - 7 = 14. Perfect!',
    hint: 'First add 7 to 14, then divide the result by 3.',
  },
  {
    id: 'q_two_2',
    topic: 'two_step_equations',
    topicLabel: 'Two-Step Equations',
    difficulty: 'medium',
    gradeLevel: '8th',
    questionText: 'Solve for x: x / 4 + 9 = 3',
    latex: '\\frac{x}{4} + 9 = 3',
    options: [
      { id: 'opt_1', text: 'x = -24', isCorrect: true },
      { id: 'opt_2', text: 'x = 48', isCorrect: false },
      { id: 'opt_3', text: 'x = -6', isCorrect: false },
      { id: 'opt_4', text: 'x = -1.5', isCorrect: false },
    ],
    correctAnswer: 'x = -24',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Isolate the fraction term',
        description: 'Subtract 9 from both sides.',
        mathExpression: '\\frac{x}{4} = 3 - 9 \\implies \\frac{x}{4} = -6',
      },
      {
        stepNumber: 2,
        title: 'Clear the denominator',
        description: 'Multiply both sides by 4.',
        mathExpression: 'x = -6 \\times 4 = -24',
      },
    ],
    explanation: 'Subtract 9 from both sides: 3 - 9 = -6. Then multiply both sides by 4: (-6) * 4 = -24.',
    commonMisconception: {
      description: 'Thinking 3 - 9 = 6 (forgetting negative) or dividing -6 by 4 instead of multiplying.',
      howToAvoid: '3 - 9 is negative 6. Since x is divided by 4, multiplying by 4 cancels the denominator.',
    },
    verification: 'Check: (-24)/4 + 9 = -6 + 9 = 3.',
    hint: 'Subtract 9 from 3 to find x/4, then multiply by 4.',
  },

  // Variables on Both Sides
  {
    id: 'q_both_1',
    topic: 'variables_both_sides',
    topicLabel: 'Variables on Both Sides',
    difficulty: 'medium',
    gradeLevel: '8th',
    questionText: 'Solve for x: 5x + 8 = 2x + 29',
    latex: '5x + 8 = 2x + 29',
    options: [
      { id: 'opt_1', text: 'x = 7', isCorrect: true },
      { id: 'opt_2', text: 'x = 5.2', isCorrect: false },
      { id: 'opt_3', text: 'x = 12', isCorrect: false },
      { id: 'opt_4', text: 'x = -7', isCorrect: false },
    ],
    correctAnswer: 'x = 7',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Subtract 2x from both sides',
        description: 'Collect all x terms on the left side: 5x - 2x = 3x.',
        mathExpression: '3x + 8 = 29',
      },
      {
        stepNumber: 2,
        title: 'Subtract 8 from both sides',
        description: 'Move constants to the right side: 29 - 8 = 21.',
        mathExpression: '3x = 21',
      },
      {
        stepNumber: 3,
        title: 'Divide by 3',
        description: 'Divide both sides by 3 to isolate x.',
        mathExpression: 'x = 7',
      },
    ],
    explanation: 'Subtract 2x from both sides to get 3x + 8 = 29. Subtract 8 to get 3x = 21. Divide by 3 to get x = 7.',
    commonMisconception: {
      description: 'Adding 2x instead of subtracting, getting 7x = 21.',
      howToAvoid: 'Since 2x is positive on the right, you must subtract 2x from both sides to remove it.',
    },
    verification: 'Left side: 5(7) + 8 = 35 + 8 = 43. Right side: 2(7) + 29 = 14 + 29 = 43. Both sides equal 43!',
    hint: 'Subtract 2x from both sides first, then subtract 8.',
  },

  // Distributive Property
  {
    id: 'q_dist_1',
    topic: 'distributive_combining',
    topicLabel: 'Distributive Property',
    difficulty: 'medium',
    gradeLevel: '8th',
    questionText: 'Solve for x: 3(2x - 4) + 5 = 23',
    latex: '3(2x - 4) + 5 = 23',
    options: [
      { id: 'opt_1', text: 'x = 5', isCorrect: true },
      { id: 'opt_2', text: 'x = 4', isCorrect: false },
      { id: 'opt_3', text: 'x = 6', isCorrect: false },
      { id: 'opt_4', text: 'x = 3.5', isCorrect: false },
    ],
    correctAnswer: 'x = 5',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Distribute the 3',
        description: 'Multiply 3 by each term in the parenthesis: 3 * 2x = 6x, and 3 * (-4) = -12.',
        mathExpression: '6x - 12 + 5 = 23',
      },
      {
        stepNumber: 2,
        title: 'Combine constant terms',
        description: '-12 + 5 = -7.',
        mathExpression: '6x - 7 = 23',
      },
      {
        stepNumber: 3,
        title: 'Add 7 to both sides',
        description: '23 + 7 = 30.',
        mathExpression: '6x = 30',
      },
      {
        stepNumber: 4,
        title: 'Divide by 6',
        description: '30 / 6 = 5.',
        mathExpression: 'x = 5',
      },
    ],
    explanation: 'Distribute 3 to get 6x - 12 + 5 = 23. Combine like terms to get 6x - 7 = 23. Add 7: 6x = 30. Divide by 6: x = 5.',
    commonMisconception: {
      description: 'Only multiplying 3 by 2x and forgetting to multiply 3 by -4, writing 6x - 4.',
      howToAvoid: 'Draw arrows from the 3 to BOTH terms inside the parentheses to guarantee full distribution.',
    },
    verification: 'Check: 3(2(5) - 4) + 5 = 3(10 - 4) + 5 = 3(6) + 5 = 18 + 5 = 23.',
    hint: 'Multiply the outer 3 by both 2x and -4, then combine like terms on the left.',
  },

  // Linear Inequalities
  {
    id: 'q_ineq_1',
    topic: 'linear_inequalities',
    topicLabel: 'Linear Inequalities',
    difficulty: 'hard',
    gradeLevel: '8th',
    questionText: 'Solve for x: -2x + 7 < 19',
    latex: '-2x + 7 < 19',
    options: [
      { id: 'opt_1', text: 'x > -6', isCorrect: true },
      { id: 'opt_2', text: 'x < -6', isCorrect: false },
      { id: 'opt_3', text: 'x > 6', isCorrect: false },
      { id: 'opt_4', text: 'x < 13', isCorrect: false },
    ],
    correctAnswer: 'x > -6',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Subtract 7 from both sides',
        description: '19 minus 7 gives 12.',
        mathExpression: '-2x < 12',
      },
      {
        stepNumber: 2,
        title: 'Divide by -2 and FLIP the inequality sign',
        description: 'Dividing both sides by -2 changes < to >.',
        mathExpression: 'x > \\frac{12}{-2} \\implies x > -6',
      },
    ],
    explanation: 'Subtract 7 from both sides to get -2x < 12. When dividing by negative 2, reverse the inequality sign from < to >, yielding x > -6.',
    commonMisconception: {
      description: 'Forgetting to reverse the inequality symbol when dividing by a negative number (getting x < -6).',
      howToAvoid: 'Golden Rule of Inequalities: Whenever you multiply or divide across the inequality by a negative number, the sign MUST flip!',
    },
    verification: 'Test x = 0 (which is > -6): -2(0) + 7 = 7 < 19. True! Test x = -10 (which is not): -2(-10) + 7 = 27 < 19 is False.',
    hint: 'Subtract 7 first, then divide by -2. Don\'t forget what happens to the inequality symbol when dividing by a negative!',
  },

  // Slope & Graphing
  {
    id: 'q_slope_1',
    topic: 'slope_and_graphing',
    topicLabel: 'Slope & Linear Equations',
    difficulty: 'medium',
    gradeLevel: '8th',
    questionText: 'What is the slope of the line passing through (2, 5) and (6, 17)?',
    latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
    options: [
      { id: 'opt_1', text: 'm = 3', isCorrect: true },
      { id: 'opt_2', text: 'm = 1/3', isCorrect: false },
      { id: 'opt_3', text: 'm = 4', isCorrect: false },
      { id: 'opt_4', text: 'm = -3', isCorrect: false },
    ],
    correctAnswer: 'm = 3',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Identify coordinates',
        description: '(x₁, y₁) = (2, 5) and (x₂, y₂) = (6, 17).',
        mathExpression: 'x_1 = 2, y_1 = 5; x_2 = 6, y_2 = 17',
      },
      {
        stepNumber: 2,
        title: 'Apply slope formula',
        description: 'Slope m is rise over run: (y₂ - y₁) / (x₂ - x₁).',
        mathExpression: 'm = \\frac{17 - 5}{6 - 2} = \\frac{12}{4} = 3',
      },
    ],
    explanation: 'Slope formula is (y₂ - y₁) / (x₂ - x₁). (17 - 5) / (6 - 2) = 12 / 4 = 3.',
    commonMisconception: {
      description: 'Computing run over rise (x₂ - x₁) / (y₂ - y₁) which gives 4/12 = 1/3.',
      howToAvoid: 'Remember: "Rise" (y) is on top, "Run" (x) is on the bottom. You rise out of bed before you run!',
    },
    verification: 'Check: Moving from x=2 to x=6 is +4 units. With slope 3, y increases by 4 * 3 = 12. 5 + 12 = 17. Matches!',
    hint: 'Subtract the y-values (17 - 5) and divide by the difference in x-values (6 - 2).',
  },

  // Systems of Equations
  {
    id: 'q_sys_1',
    topic: 'systems_equations',
    topicLabel: 'Systems of Equations',
    difficulty: 'hard',
    gradeLevel: '8th',
    questionText: 'Solve the system of equations: y = 2x + 1 and x + y = 10',
    latex: '\\begin{cases} y = 2x + 1 \\\\ x + y = 10 \\end{cases}',
    options: [
      { id: 'opt_1', text: '(x, y) = (3, 7)', isCorrect: true },
      { id: 'opt_2', text: '(x, y) = (4, 6)', isCorrect: false },
      { id: 'opt_3', text: '(x, y) = (2, 5)', isCorrect: false },
      { id: 'opt_4', text: '(x, y) = (7, 3)', isCorrect: false },
    ],
    correctAnswer: '(x, y) = (3, 7)',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Substitute y into the second equation',
        description: 'Since y = 2x + 1, replace y in x + y = 10.',
        mathExpression: 'x + (2x + 1) = 10',
      },
      {
        stepNumber: 2,
        title: 'Combine like terms',
        description: 'x + 2x = 3x.',
        mathExpression: '3x + 1 = 10 \\implies 3x = 9 \\implies x = 3',
      },
      {
        stepNumber: 3,
        title: 'Find y',
        description: 'Plug x = 3 back into y = 2x + 1.',
        mathExpression: 'y = 2(3) + 1 = 6 + 1 = 7',
      },
    ],
    explanation: 'Substitute 2x + 1 for y in x + y = 10 to get 3x + 1 = 10, so 3x = 9 and x = 3. Then y = 2(3) + 1 = 7. The intersection point is (3, 7).',
    commonMisconception: {
      description: 'Finding x = 3 but forgetting to substitute back to find y, or reversing the coordinates as (7, 3).',
      howToAvoid: 'A system solution is an ordered pair (x, y). Always complete both steps and write x first.',
    },
    verification: 'Check in both: 7 = 2(3) + 1 (7 = 7 True!) and 3 + 7 = 10 (10 = 10 True!).',
    hint: 'Replace y in the second equation with (2x + 1) to get an equation with only x.',
  },

  // Word Problems
  {
    id: 'q_word_1',
    topic: 'word_problems_algebra',
    topicLabel: 'Word Problems',
    difficulty: 'medium',
    gradeLevel: '8th',
    questionText: 'Maya rented a bicycle for an initial fee of $12 plus $4.50 per hour. If her total bill was $39, how many hours did she rent the bike?',
    latex: '4.50h + 12 = 39',
    options: [
      { id: 'opt_1', text: '6 hours', isCorrect: true },
      { id: 'opt_2', text: '5 hours', isCorrect: false },
      { id: 'opt_3', text: '8 hours', isCorrect: false },
      { id: 'opt_4', text: '4.5 hours', isCorrect: false },
    ],
    correctAnswer: '6 hours',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Set up the algebraic equation',
        description: 'Let h = number of hours rented. Total cost = 4.50h + 12 = 39.',
        mathExpression: '4.5h + 12 = 39',
      },
      {
        stepNumber: 2,
        title: 'Subtract the fixed fee ($12)',
        description: '39 - 12 = 27. The hourly fees total $27.',
        mathExpression: '4.5h = 27',
      },
      {
        stepNumber: 3,
        title: 'Divide by hourly rate ($4.50)',
        description: '27 / 4.5 = 6 hours.',
        mathExpression: 'h = 6',
      },
    ],
    explanation: 'Subtract the $12 flat fee from $39 to get $27 spent on hourly rental. Divide $27 by $4.50 per hour to get 6 hours.',
    commonMisconception: {
      description: 'Dividing 39 by 4.5 without subtracting the 12 base fee first.',
      howToAvoid: 'Separate fixed costs from variable costs. The $12 is paid only once, so subtract it before dividing by the hourly rate.',
    },
    verification: 'Check: 6 hours * $4.50/hr = $27 + $12 fee = $39. Matches bill.',
    hint: 'Subtract the flat fee ($12) from the total $39 first, then divide by the hourly rate.',
  },

  // Exponents & Scientific Notation
  {
    id: 'q_exp_1',
    topic: 'exponents_scientific',
    topicLabel: 'Exponent Rules',
    difficulty: 'medium',
    gradeLevel: '8th',
    questionText: 'Simplify the expression: (2x³)(5x⁴)',
    latex: '(2x^3)(5x^4)',
    options: [
      { id: 'opt_1', text: '10x⁷', isCorrect: true },
      { id: 'opt_2', text: '10x¹²', isCorrect: false },
      { id: 'opt_3', text: '7x⁷', isCorrect: false },
      { id: 'opt_4', text: '10x', isCorrect: false },
    ],
    correctAnswer: '10x⁷',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Multiply the coefficients (numbers)',
        description: '2 multiplied by 5 gives 10.',
        mathExpression: '2 \\times 5 = 10',
      },
      {
        stepNumber: 2,
        title: 'Apply the product rule for exponents',
        description: 'When multiplying powers of the same base, ADD the exponents: 3 + 4 = 7.',
        mathExpression: 'x^3 \\cdot x^4 = x^{3 + 4} = x^7',
      },
      {
        stepNumber: 3,
        title: 'Combine coefficients and variables',
        description: 'Final simplified term is 10x⁷.',
        mathExpression: '10x^7',
      },
    ],
    explanation: 'Multiply numbers: 2 * 5 = 10. Add exponents with the same base x: 3 + 4 = 7. Result: 10x⁷.',
    commonMisconception: {
      description: 'Multiplying the exponents together (3 * 4 = 12) to get 10x¹².',
      howToAvoid: 'Remember: x³ means (x·x·x) and x⁴ means (x·x·x·x). Together there are 3 + 4 = 7 factors of x multiplied.',
    },
    verification: 'Expand: 2 * x * x * x * 5 * x * x * x * x = (2 * 5) * x⁷ = 10x⁷.',
    hint: 'Multiply 2 by 5 for the number, and ADD the exponents (3 + 4) for the power of x.',
  },

  // Quadratic Foundations
  {
    id: 'q_quad_1',
    topic: 'quadratic_foundations',
    topicLabel: 'Quadratic Foundations',
    difficulty: 'hard',
    gradeLevel: '8th',
    questionText: 'Find the solutions to the factored quadratic equation: (x - 4)(x + 7) = 0',
    latex: '(x - 4)(x + 7) = 0',
    options: [
      { id: 'opt_1', text: 'x = 4 and x = -7', isCorrect: true },
      { id: 'opt_2', text: 'x = -4 and x = 7', isCorrect: false },
      { id: 'opt_3', text: 'x = 4 and x = 7', isCorrect: false },
      { id: 'opt_4', text: 'x = -28', isCorrect: false },
    ],
    correctAnswer: 'x = 4 and x = -7',
    solutionSteps: [
      {
        stepNumber: 1,
        title: 'Use the Zero Product Property',
        description: 'If two factors multiply to zero, at least one of them must be zero.',
        mathExpression: 'x - 4 = 0 \\quad \\text{or} \\quad x + 7 = 0',
      },
      {
        stepNumber: 2,
        title: 'Solve each mini-equation',
        description: 'From x - 4 = 0, add 4 to get x = 4. From x + 7 = 0, subtract 7 to get x = -7.',
        mathExpression: 'x = 4, \\quad x = -7',
      },
    ],
    explanation: 'Set each factor to zero: x - 4 = 0 gives x = 4; x + 7 = 0 gives x = -7. The signs flip when moving across the equals sign.',
    commonMisconception: {
      description: 'Keeping the signs inside the parenthesis: giving x = -4 and x = +7.',
      howToAvoid: 'The solution is the value of x that makes the factor ZERO. If factor is (x - 4), then 4 - 4 = 0, so x = +4.',
    },
    verification: 'Test x = 4: (4 - 4)(4 + 7) = 0 * 11 = 0. Test x = -7: (-7 - 4)(-7 + 7) = -11 * 0 = 0. Both work!',
    hint: 'Set each parenthesis equal to 0 and solve for x. Notice the signs invert!',
  },
];

/**
 * Procedurally generates an infinite supply of valid middle school algebra problems
 */
export function generateProceduralQuestion(topic: AlgebraTopic, difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion {
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const id = `dyn_${topic}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  if (topic === 'one_step_equations') {
    const isAdd = Math.random() > 0.5;
    const a = randInt(3, 25);
    const x = randInt(2, 20);
    if (isAdd) {
      const c = x + a;
      return {
        id,
        topic,
        topicLabel: 'One-Step Equations',
        difficulty,
        gradeLevel: '7th',
        questionText: `Solve for x: x + ${a} = ${c}`,
        latex: `x + ${a} = ${c}`,
        options: [
          { id: '1', text: `x = ${x}`, isCorrect: true },
          { id: '2', text: `x = ${c + a}`, isCorrect: false },
          { id: '3', text: `x = ${x + 2}`, isCorrect: false },
          { id: '4', text: `x = ${-x}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5),
        correctAnswer: `x = ${x}`,
        solutionSteps: [
          { stepNumber: 1, title: 'Subtract ' + a + ' from both sides', description: `Undo addition with subtraction.`, mathExpression: `x = ${c} - ${a}` },
          { stepNumber: 2, title: 'Calculate result', description: `${c} - ${a} = ${x}.`, mathExpression: `x = ${x}` }
        ],
        explanation: `Subtract ${a} from both sides: ${c} - ${a} = ${x}.`,
        commonMisconception: {
          description: `Adding ${a} to ${c} instead of subtracting.`,
          howToAvoid: `To undo +${a}, always do the opposite operation: -${a}.`
        },
        verification: `Check: ${x} + ${a} = ${c}. Correct!`,
        hint: `Subtract ${a} from ${c}.`
      };
    } else {
      const mult = randInt(2, 9);
      const c = x * mult;
      return {
        id,
        topic,
        topicLabel: 'One-Step Equations',
        difficulty,
        gradeLevel: '7th',
        questionText: `Solve for x: ${mult}x = ${c}`,
        latex: `${mult}x = ${c}`,
        options: [
          { id: '1', text: `x = ${x}`, isCorrect: true },
          { id: '2', text: `x = ${c - mult}`, isCorrect: false },
          { id: '3', text: `x = ${x + 1}`, isCorrect: false },
          { id: '4', text: `x = ${c * mult}`, isCorrect: false },
        ].sort(() => Math.random() - 0.5),
        correctAnswer: `x = ${x}`,
        solutionSteps: [
          { stepNumber: 1, title: 'Divide both sides by ' + mult, description: `Undo multiplication by dividing.`, mathExpression: `x = \\frac{${c}}{${mult}}` },
          { stepNumber: 2, title: 'Calculate quotient', description: `${c} divided by ${mult} is ${x}.`, mathExpression: `x = ${x}` }
        ],
        explanation: `Divide both sides by ${mult}: ${c} / ${mult} = ${x}.`,
        commonMisconception: {
          description: `Subtracting ${mult} from ${c} instead of dividing.`,
          howToAvoid: `${mult}x means multiplication, so the inverse operation is division.`
        },
        verification: `Check: ${mult} * ${x} = ${c}. Perfect!`,
        hint: `Divide ${c} by ${mult}.`
      };
    }
  }

  if (topic === 'two_step_equations') {
    const a = randInt(2, 6);
    const x = randInt(2, 12);
    const b = randInt(3, 15);
    const isAdd = Math.random() > 0.5;
    const c = isAdd ? (a * x + b) : (a * x - b);
    const signStr = isAdd ? `+ ${b}` : `- ${b}`;

    return {
      id,
      topic,
      topicLabel: 'Two-Step Equations',
      difficulty,
      gradeLevel: '7th',
      questionText: `Solve for x: ${a}x ${signStr} = ${c}`,
      latex: `${a}x ${signStr} = ${c}`,
      options: [
        { id: '1', text: `x = ${x}`, isCorrect: true },
        { id: '2', text: `x = ${x + 2}`, isCorrect: false },
        { id: '3', text: `x = ${Math.round((c / a))}`, isCorrect: false },
        { id: '4', text: `x = ${-x}`, isCorrect: false },
      ].sort(() => Math.random() - 0.5),
      correctAnswer: `x = ${x}`,
      solutionSteps: [
        {
          stepNumber: 1,
          title: isAdd ? `Subtract ${b} from both sides` : `Add ${b} to both sides`,
          description: `Isolate the variable term ${a}x.`,
          mathExpression: `${a}x = ${a * x}`
        },
        {
          stepNumber: 2,
          title: `Divide both sides by ${a}`,
          description: `Divide ${a * x} by ${a} to get x.`,
          mathExpression: `x = ${x}`
        }
      ],
      explanation: `${isAdd ? `Subtract ${b}` : `Add ${b}`} to get ${a}x = ${a * x}. Then divide by ${a} to get x = ${x}.`,
      commonMisconception: {
        description: `Dividing by ${a} before undoing the addition/subtraction.`,
        howToAvoid: `Follow reverse PEMDAS (SADMEP): undo addition and subtraction before multiplication and division.`
      },
      verification: `Check: ${a}(${x}) ${signStr} = ${c}. True!`,
      hint: `Undo ${signStr} first, then divide by ${a}.`
    };
  }

  if (topic === 'slope_and_graphing') {
    const m = randInt(1, 5) * (Math.random() > 0.3 ? 1 : -1);
    const x1 = randInt(1, 4);
    const y1 = randInt(1, 10);
    const deltaX = randInt(2, 4);
    const x2 = x1 + deltaX;
    const y2 = y1 + m * deltaX;

    return {
      id,
      topic,
      topicLabel: 'Slope & Linear Equations',
      difficulty,
      gradeLevel: '8th',
      questionText: `Find the slope (m) of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})`,
      latex: `m = \\frac{y_2 - y_1}{x_2 - x_1}`,
      options: [
        { id: '1', text: `m = ${m}`, isCorrect: true },
        { id: '2', text: `m = ${-m}`, isCorrect: false },
        { id: '3', text: `m = ${m !== 0 ? (1 / m).toFixed(2) : '0'}`, isCorrect: false },
        { id: '4', text: `m = ${m + 2}`, isCorrect: false },
      ].sort(() => Math.random() - 0.5),
      correctAnswer: `m = ${m}`,
      solutionSteps: [
        {
          stepNumber: 1,
          title: 'Calculate change in y (rise)',
          description: `${y2} - ${y1} = ${y2 - y1}`,
          mathExpression: `\\Delta y = ${y2 - y1}`
        },
        {
          stepNumber: 2,
          title: 'Calculate change in x (run)',
          description: `${x2} - ${x1} = ${deltaX}`,
          mathExpression: `\\Delta x = ${deltaX}`
        },
        {
          stepNumber: 3,
          title: 'Compute slope ratio',
          description: `Divide rise by run.`,
          mathExpression: `m = \\frac{${y2 - y1}}{${deltaX}} = ${m}`
        }
      ],
      explanation: `Slope m = (${y2} - ${y1}) / (${x2} - ${x1}) = ${y2 - y1} / ${deltaX} = ${m}.`,
      commonMisconception: {
        description: `Putting x in the numerator and y in the denominator.`,
        howToAvoid: `Always put the y-values (vertical change, rise) on TOP.`
      },
      verification: `Slope formula verified: ${y1} + ${m} * (${x2} - ${x1}) = ${y2}.`,
      hint: `Subtract y₂ - y₁ on top, and x₂ - x₁ on the bottom.`
    };
  }

  // Fallback to static selection
  const matching = INITIAL_QUIZ_QUESTIONS.filter(q => q.topic === topic);
  if (matching.length > 0) {
    return { ...matching[randInt(0, matching.length - 1)], id };
  }
  return { ...INITIAL_QUIZ_QUESTIONS[0], id };
}
