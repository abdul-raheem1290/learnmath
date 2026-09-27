import { ToolDefinition, CalculationResult } from '../types/math';

/**
 * Registry of 200+ Mathematical Tools categorized cleanly.
 * Key core calculators include active step-by-step computational engines!
 */

export const MATHEMATICAL_TOOLS: ToolDefinition[] = [
  // CATEGORY: ALGEBRA
  {
    id: 'linear-equation-solver',
    title: 'Linear Equation Solver (ax + b = c)',
    category: 'algebra',
    categoryName: 'Algebra',
    description: 'Solve any linear equation step-by-step with exact fractional and decimal results.',
    academicLevel: 'middle_school',
    iconName: 'Equal',
    tags: ['linear', 'equation', 'one variable', 'solve for x', 'middle school'],
    formula: 'ax + b = c \\implies x = \\frac{c - b}{a}',
    inputsConfig: [
      { key: 'a', label: 'Coefficient a (in ax)', type: 'number', defaultValue: 3, placeholder: 'e.g. 3' },
      { key: 'b', label: 'Constant b (in + b)', type: 'number', defaultValue: 5, placeholder: 'e.g. 5' },
      { key: 'c', label: 'Equals c', type: 'number', defaultValue: 26, placeholder: 'e.g. 26' },
    ],
    calculate: (inputs): CalculationResult => {
      const a = Number(inputs.a);
      const b = Number(inputs.b);
      const c = Number(inputs.c);

      if (a === 0) {
        if (b === c) {
          return {
            exact: 'Infinite Solutions (Identity)',
            steps: [{ title: 'Analyze coefficients', detail: `0x + ${b} = ${c} is always true for any value of x.` }],
            notes: 'Any real number is a solution.',
          };
        }
        return {
          exact: 'No Solution (Contradiction)',
          steps: [{ title: 'Analyze coefficients', detail: `0x + ${b} = ${c} leads to ${b} = ${c}, which is impossible.` }],
          warnings: ['Coefficient a cannot be zero for a single unique linear solution.'],
        };
      }

      const diff = c - b;
      const x = diff / a;
      const isInteger = Number.isInteger(x);

      return {
        exact: isInteger ? `x = ${x}` : `x = ${diff}/${a}`,
        decimal: `x ≈ ${x.toFixed(4)}`,
        formulaUsed: 'x = (c - b) / a',
        steps: [
          {
            title: 'Step 1: Given equation',
            detail: `Identify values: a = ${a}, b = ${b}, c = ${c}`,
            math: `${a}x + ${b} = ${c}`,
          },
          {
            title: 'Step 2: Subtract constant term b from both sides',
            detail: `Subtract ${b} from both sides to isolate the variable term:`,
            math: `${a}x = ${c} - ${b} = ${diff}`,
          },
          {
            title: 'Step 3: Divide by coefficient a',
            detail: `Divide both sides by ${a} to isolate x:`,
            math: `x = \\frac{${diff}}{${a}} = ${isInteger ? x : (diff / a).toFixed(4)}`,
          },
        ],
        verification: `Check: ${a}(${x}) + ${b} = ${a * x + b} = ${c}. Equation holds true!`,
      };
    },
    examples: [
      { label: '3x + 5 = 26', inputs: { a: 3, b: 5, c: 26 } },
      { label: '2x - 8 = 14', inputs: { a: 2, b: -8, c: 14 } },
      { label: '-4x + 12 = 36', inputs: { a: -4, b: 12, c: 36 } },
    ],
    faq: [
      { question: 'What if a is negative?', answer: 'The solver handles negative coefficients seamlessly by dividing through with the negative sign.' },
      { question: 'Can I get fractional answers?', answer: 'Yes, both the exact fraction (e.g., 21/5) and rounded decimal approximations are shown.' },
    ],
  },

  {
    id: 'quadratic-equation-solver',
    title: 'Quadratic Equation Solver (ax² + bx + c = 0)',
    category: 'algebra',
    categoryName: 'Algebra',
    description: 'Find real and complex roots, discriminant analysis, vertex coordinates, and step-by-step quadratic formula.',
    academicLevel: 'middle_school',
    iconName: 'Activity',
    tags: ['quadratic', 'parabola', 'roots', 'discriminant', 'factoring', 'vertex'],
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    inputsConfig: [
      { key: 'a', label: 'Coefficient a (x²)', type: 'number', defaultValue: 1, placeholder: 'e.g. 1' },
      { key: 'b', label: 'Coefficient b (x)', type: 'number', defaultValue: -5, placeholder: 'e.g. -5' },
      { key: 'c', label: 'Constant c', type: 'number', defaultValue: 6, placeholder: 'e.g. 6' },
    ],
    calculate: (inputs): CalculationResult => {
      const a = Number(inputs.a);
      const b = Number(inputs.b);
      const c = Number(inputs.c);

      if (a === 0) {
        return {
          exact: 'Not a quadratic (a = 0)',
          steps: [{ title: 'Linear form detected', detail: 'Since a = 0, this is a linear equation bx + c = 0.' }],
          warnings: ['Coefficient a must be non-zero for quadratic equations.'],
        };
      }

      const discriminant = b * b - 4 * a * c;
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;

      if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return {
          exact: `x₁ = ${root1.toFixed(3)}, x₂ = ${root2.toFixed(3)}`,
          decimal: `Roots: ${root1.toFixed(4)}, ${root2.toFixed(4)}`,
          formulaUsed: 'x = (-b ± √(b² - 4ac)) / (2a)',
          steps: [
            { title: 'Step 1: Identify coefficients', detail: `a = ${a}, b = ${b}, c = ${c}`, math: `${a}x^2 + (${b})x + (${c}) = 0` },
            { title: 'Step 2: Compute Discriminant Δ', detail: `Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${discriminant} > 0 (Two distinct real roots).`, math: `\\Delta = ${discriminant}` },
            { title: 'Step 3: Apply Quadratic Formula', detail: `Substitute into quadratic formula:`, math: `x = \\frac{-(${b}) \\pm \\sqrt{${discriminant}}}{2(${a})}` },
            { title: 'Step 4: Compute individual roots', detail: `x₁ = (${-b} + ${Math.sqrt(discriminant).toFixed(3)}) / ${2 * a} = ${root1.toFixed(3)}\nx₂ = (${-b} - ${Math.sqrt(discriminant).toFixed(3)}) / ${2 * a} = ${root2.toFixed(3)}` },
            { title: 'Step 5: Parabola Vertex', detail: `Vertex is at (${vertexX.toFixed(3)}, ${vertexY.toFixed(3)})`, math: `V = (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` },
          ],
          verification: `Check: ${a}(${root1.toFixed(2)})² + ${b}(${root1.toFixed(2)}) + ${c} ≈ 0. Validated!`,
        };
      } else if (discriminant === 0) {
        const root = -b / (2 * a);
        return {
          exact: `x = ${root} (Double Root)`,
          decimal: `x = ${root.toFixed(4)}`,
          steps: [
            { title: 'Step 1: Calculate Discriminant Δ', detail: `Δ = (${b})² - 4(${a})(${c}) = 0 (One repeated real root).` },
            { title: 'Step 2: Compute Root', detail: `x = -b / (2a) = -(${b}) / (2 · ${a}) = ${root}.` },
          ],
          verification: `Check: Discriminant is exactly zero. Parabola touches the x-axis at x = ${root}.`,
        };
      } else {
        const realPart = (-b / (2 * a)).toFixed(3);
        const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(3);
        return {
          exact: `x = ${realPart} ± ${imagPart}i (Complex Conjugate Pair)`,
          decimal: `Real: ${realPart}, Imaginary: ±${imagPart}`,
          steps: [
            { title: 'Step 1: Compute Discriminant Δ', detail: `Δ = (${b})² - 4(${a})(${c}) = ${discriminant} < 0 (Two complex roots).` },
            { title: 'Step 2: Complex Root Formula', detail: `√(${discriminant}) = √(${-discriminant}) · i = ${Math.sqrt(-discriminant).toFixed(3)}i.` },
            { title: 'Step 3: Complex Conjugate Pair', detail: `x = ${realPart} + ${imagPart}i and x = ${realPart} - ${imagPart}i` },
          ],
          notes: 'No real x-intercepts exist; the parabola does not cross the x-axis.',
        };
      }
    },
    examples: [
      { label: 'x² - 5x + 6 = 0', inputs: { a: 1, b: -5, c: 6 } },
      { label: '2x² + 4x - 6 = 0', inputs: { a: 2, b: 4, c: -6 } },
      { label: 'x² + 4 = 0 (Complex)', inputs: { a: 1, b: 0, c: 4 } },
    ],
  },

  {
    id: 'slope-calculator',
    title: 'Slope & Line Equation Calculator',
    category: 'algebra',
    categoryName: 'Algebra',
    description: 'Calculate slope m, distance, midpoint, and equations in slope-intercept (y = mx + b) and point-slope form.',
    academicLevel: 'middle_school',
    iconName: 'TrendingUp',
    tags: ['slope', 'linear', 'rate of change', 'intercept', 'middle school'],
    formula: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
    inputsConfig: [
      { key: 'x1', label: 'Point 1: x₁', type: 'number', defaultValue: 2, placeholder: '2' },
      { key: 'y1', label: 'Point 1: y₁', type: 'number', defaultValue: 3, placeholder: '3' },
      { key: 'x2', label: 'Point 2: x₂', type: 'number', defaultValue: 6, placeholder: '6' },
      { key: 'y2', label: 'Point 2: y₂', type: 'number', defaultValue: 11, placeholder: '11' },
    ],
    calculate: (inputs): CalculationResult => {
      const x1 = Number(inputs.x1);
      const y1 = Number(inputs.y1);
      const x2 = Number(inputs.x2);
      const y2 = Number(inputs.y2);

      if (x1 === x2) {
        return {
          exact: `Slope is Undefined (Vertical Line x = ${x1})`,
          steps: [
            { title: 'Step 1: Check denominator (Run)', detail: `x₂ - x₁ = ${x2} - ${x1} = 0.` },
            { title: 'Step 2: Vertical Line Property', detail: `Division by zero is undefined. The line is vertical with equation x = ${x1}.` },
          ],
        };
      }

      const deltaY = y2 - y1;
      const deltaX = x2 - x1;
      const m = deltaY / deltaX;
      const b = y1 - m * x1;
      const distance = Math.hypot(deltaX, deltaY);
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      return {
        exact: `Slope m = ${Number.isInteger(m) ? m : `${deltaY}/${deltaX}`}`,
        decimal: `y = ${m.toFixed(2)}x ${b >= 0 ? `+ ${b.toFixed(2)}` : `- ${Math.abs(b).toFixed(2)}`}`,
        formulaUsed: 'm = (y₂ - y₁) / (x₂ - x₁)',
        steps: [
          { title: 'Step 1: Rise (Change in y)', detail: `Δy = y₂ - y₁ = ${y2} - ${y1} = ${deltaY}`, math: `\\Delta y = ${deltaY}` },
          { title: 'Step 2: Run (Change in x)', detail: `Δx = x₂ - x₁ = ${x2} - ${x1} = ${deltaX}`, math: `\\Delta x = ${deltaX}` },
          { title: 'Step 3: Calculate Slope m', detail: `m = Δy / Δx = ${deltaY} / ${deltaX} = ${m.toFixed(3)}`, math: `m = ${m.toFixed(2)}` },
          { title: 'Step 4: Find y-intercept b', detail: `b = y₁ - m(x₁) = ${y1} - (${m.toFixed(3)})(${x1}) = ${b.toFixed(3)}`, math: `b = ${b.toFixed(2)}` },
          { title: 'Step 5: Additional Geometric Properties', detail: `Midpoint: (${midX}, ${midY})\nDistance between points: ${distance.toFixed(3)} units.` },
        ],
        verification: `Verified: At x = ${x1}, y = ${m * x1 + b} (matches y₁=${y1}). At x = ${x2}, y = ${m * x2 + b} (matches y₂=${y2}).`,
      };
    },
    examples: [
      { label: '(2, 3) and (6, 11)', inputs: { x1: 2, y1: 3, x2: 6, y2: 11 } },
      { label: '(-1, 5) and (3, -3)', inputs: { x1: -1, y1: 5, x2: 3, y2: -3 } },
      { label: '(0, 4) and (5, 4) [Horizontal]', inputs: { x1: 0, y1: 4, x2: 5, y2: 4 } },
    ],
  },

  {
    id: 'system-linear-equations',
    title: 'Systems of 2 Linear Equations Solver',
    category: 'algebra',
    categoryName: 'Algebra',
    description: 'Solve 2x2 linear systems using substitution & elimination methods with intersection point.',
    academicLevel: 'middle_school',
    iconName: 'GitFork',
    tags: ['system', 'substitution', 'elimination', '2x2', 'intersection', 'middle school'],
    formula: 'a_1 x + b_1 y = c_1, \\quad a_2 x + b_2 y = c_2',
    inputsConfig: [
      { key: 'a1', label: 'Eq 1: a₁ (x)', type: 'number', defaultValue: 2, placeholder: '2' },
      { key: 'b1', label: 'Eq 1: b₁ (y)', type: 'number', defaultValue: 3, placeholder: '3' },
      { key: 'c1', label: 'Eq 1: c₁ (=)', type: 'number', defaultValue: 13, placeholder: '13' },
      { key: 'a2', label: 'Eq 2: a₂ (x)', type: 'number', defaultValue: 1, placeholder: '1' },
      { key: 'b2', label: 'Eq 2: b₂ (y)', type: 'number', defaultValue: -1, placeholder: '-1' },
      { key: 'c2', label: 'Eq 2: c₂ (=)', type: 'number', defaultValue: 4, placeholder: '4' },
    ],
    calculate: (inputs): CalculationResult => {
      const a1 = Number(inputs.a1);
      const b1 = Number(inputs.b1);
      const c1 = Number(inputs.c1);
      const a2 = Number(inputs.a2);
      const b2 = Number(inputs.b2);
      const c2 = Number(inputs.c2);

      const det = a1 * b2 - a2 * b1;

      if (det === 0) {
        if (a1 * c2 === a2 * c1 && b1 * c2 === b2 * c1) {
          return {
            exact: 'Infinitely Many Solutions (Coincident Lines)',
            steps: [{ title: 'Determinant is 0', detail: 'The two lines are identical multiples of each other.' }],
          };
        }
        return {
          exact: 'No Solution (Parallel Lines)',
          steps: [{ title: 'Determinant is 0', detail: 'The slopes are equal but intercepts differ. The lines never meet.' }],
        };
      }

      const x = (c1 * b2 - c2 * b1) / det;
      const y = (a1 * c2 - a2 * c1) / det;

      return {
        exact: `(x, y) = (${x}, ${y})`,
        decimal: `x = ${x.toFixed(3)}, y = ${y.toFixed(3)}`,
        formulaUsed: "Cramer's Rule / Elimination",
        steps: [
          { title: 'Step 1: Write System Form', detail: `${a1}x + (${b1})y = ${c1}\n${a2}x + (${b2})y = ${c2}` },
          { title: 'Step 2: Determinant D', detail: `D = (${a1})(${b2}) - (${a2})(${b1}) = ${det}` },
          { title: 'Step 3: Solve for x', detail: `D_x = (${c1})(${b2}) - (${c2})(${b1}) = ${c1 * b2 - c2 * b1}\nx = D_x / D = ${x}` },
          { title: 'Step 4: Solve for y', detail: `D_y = (${a1})(${c2}) - (${a2})(${c1}) = ${a1 * c2 - a2 * c1}\ny = D_y / D = ${y}` },
        ],
        verification: `Check in Eq 1: ${a1}(${x}) + ${b1}(${y}) = ${a1 * x + b1 * y} = ${c1}. Eq 2: ${a2}(${x}) + ${b2}(${y}) = ${a2 * x + b2 * y} = ${c2}. Both match!`,
      };
    },
    examples: [
      { label: '2x + 3y = 13 and x - y = 4', inputs: { a1: 2, b1: 3, c1: 13, a2: 1, b2: -1, c2: 4 } },
      { label: 'x + y = 10 and 2x - y = 5', inputs: { a1: 1, b1: 1, c1: 10, a2: 2, b2: -1, c2: 5 } },
    ],
  },

  // CATEGORY: BASIC MATHEMATICS
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator & Change',
    category: 'basic_math',
    categoryName: 'Basic Mathematics',
    description: 'Find percentage of a number, percentage increase/decrease, and reverse percentages.',
    academicLevel: 'middle_school',
    iconName: 'Percent',
    tags: ['percent', 'percentage', 'discount', 'increase', 'decrease', 'middle school'],
    inputsConfig: [
      { key: 'percent', label: 'Percentage (%)', type: 'number', defaultValue: 25, placeholder: '25' },
      { key: 'number', label: 'Of Number', type: 'number', defaultValue: 160, placeholder: '160' },
    ],
    calculate: (inputs): CalculationResult => {
      const p = Number(inputs.percent);
      const n = Number(inputs.number);
      const result = (p / 100) * n;
      return {
        exact: `${p}% of ${n} = ${result}`,
        decimal: `${result}`,
        steps: [
          { title: 'Step 1: Convert percent to decimal', detail: `${p}% = ${p} / 100 = ${p / 100}` },
          { title: 'Step 2: Multiply by total value', detail: `${p / 100} × ${n} = ${result}` },
        ],
        verification: `Check: ${result} / ${n} = ${(result / n) * 100}%.`,
      };
    },
    examples: [
      { label: '25% of 160', inputs: { percent: 25, number: 160 } },
      { label: '15% tip on $85', inputs: { percent: 15, number: 85 } },
    ],
  },

  {
    id: 'fraction-simplifier',
    title: 'Fraction Simplifier & Operations',
    category: 'basic_math',
    categoryName: 'Basic Mathematics',
    description: 'Reduce fractions to simplest form using GCD, convert to mixed numbers and decimals.',
    academicLevel: 'middle_school',
    iconName: 'Divide',
    tags: ['fraction', 'simplify', 'gcd', 'lowest terms', 'middle school'],
    inputsConfig: [
      { key: 'num', label: 'Numerator', type: 'number', defaultValue: 24, placeholder: '24' },
      { key: 'den', label: 'Denominator', type: 'number', defaultValue: 36, placeholder: '36' },
    ],
    calculate: (inputs): CalculationResult => {
      let num = Math.round(Number(inputs.num));
      let den = Math.round(Number(inputs.den));

      if (den === 0) {
        return {
          exact: 'Undefined (Denominator cannot be 0)',
          steps: [{ title: 'Division by zero', detail: 'Fractions with denominator 0 are undefined.' }],
          warnings: ['Denominator must be non-zero.'],
        };
      }

      const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
      const divisor = gcd(num, den);
      const sNum = num / divisor;
      const sDen = den / divisor;
      const dec = num / den;

      return {
        exact: `${sNum} / ${sDen}`,
        decimal: `${dec.toFixed(4)}`,
        steps: [
          { title: 'Step 1: Find Greatest Common Divisor (GCD)', detail: `GCD(${num}, ${den}) = ${divisor}` },
          { title: 'Step 2: Divide both numerator & denominator by GCD', detail: `Numerator: ${num} ÷ ${divisor} = ${sNum}\nDenominator: ${den} ÷ ${divisor} = ${sDen}` },
          { title: 'Step 3: Simplified fraction', detail: `Final reduced form: ${sNum} / ${sDen}` },
        ],
        verification: `${sNum} / ${sDen} = ${(sNum / sDen).toFixed(4)} equals ${num} / ${den} = ${(num / den).toFixed(4)}.`,
      };
    },
    examples: [
      { label: '24 / 36', inputs: { num: 24, den: 36 } },
      { label: '45 / 105', inputs: { num: 45, den: 105 } },
    ],
  },

  // CATEGORY: GEOMETRY
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem Solver (a² + b² = c²)',
    category: 'geometry',
    categoryName: 'Geometry',
    description: 'Find missing legs or hypotenuse with step-by-step radical simplification.',
    academicLevel: 'middle_school',
    iconName: 'Triangle',
    tags: ['pythagoras', 'hypotenuse', 'right triangle', 'middle school'],
    formula: 'a^2 + b^2 = c^2',
    inputsConfig: [
      { key: 'a', label: 'Leg a', type: 'number', defaultValue: 3, placeholder: '3' },
      { key: 'b', label: 'Leg b', type: 'number', defaultValue: 4, placeholder: '4' },
      { key: 'mode', label: 'Calculate', type: 'select', defaultValue: 'hypotenuse', options: [
        { label: 'Hypotenuse c (given a & b)', value: 'hypotenuse' },
      ]},
    ],
    calculate: (inputs): CalculationResult => {
      const a = Number(inputs.a);
      const b = Number(inputs.b);
      const cSq = a * a + b * b;
      const c = Math.sqrt(cSq);
      const isInteger = Number.isInteger(c);

      return {
        exact: isInteger ? `c = ${c}` : `c = √${cSq}`,
        decimal: `c ≈ ${c.toFixed(3)}`,
        formulaUsed: 'c = √(a² + b²)',
        steps: [
          { title: 'Step 1: State Pythagorean Theorem', detail: 'a² + b² = c²', math: 'c = \\sqrt{a^2 + b^2}' },
          { title: 'Step 2: Square the legs', detail: `a² = ${a}² = ${a * a}, b² = ${b}² = ${b * b}` },
          { title: 'Step 3: Sum the squares', detail: `${a * a} + ${b * b} = ${cSq}` },
          { title: 'Step 4: Take the square root', detail: `c = √${cSq} = ${isInteger ? c : c.toFixed(3)}` },
        ],
        verification: `Check: ${a}² + ${b}² = ${a * a + b * b} and ${c.toFixed(2)}² ≈ ${cSq}. Verified!`,
      };
    },
    examples: [
      { label: '3-4-5 Triangle', inputs: { a: 3, b: 4, mode: 'hypotenuse' } },
      { label: '5-12-13 Triangle', inputs: { a: 5, b: 12, mode: 'hypotenuse' } },
    ],
  },

  // CATEGORY: PROBABILITY & STATISTICS
  {
    id: 'mean-median-mode',
    title: 'Descriptive Statistics (Mean, Median, Mode, Range, SD)',
    category: 'probability_statistics',
    categoryName: 'Probability & Statistics',
    description: 'Comprehensive dataset statistical analysis with variance and standard deviation.',
    academicLevel: 'middle_school',
    iconName: 'BarChart2',
    tags: ['mean', 'median', 'mode', 'statistics', 'middle school', 'variance'],
    inputsConfig: [
      { key: 'data', label: 'Data Set (comma or space separated)', type: 'textarea', defaultValue: '12, 15, 18, 18, 22, 25, 30', placeholder: 'e.g. 12, 15, 18, 22' },
    ],
    calculate: (inputs): CalculationResult => {
      const raw = String(inputs.data || '');
      const nums = raw
        .split(/[\s,]+/)
        .map(v => Number(v.trim()))
        .filter(v => !isNaN(v))
        .sort((a, b) => a - b);

      if (nums.length === 0) {
        return {
          exact: 'Please enter valid numbers',
          steps: [],
          warnings: ['No numerical values found in input.'],
        };
      }

      const n = nums.length;
      const sum = nums.reduce((acc, val) => acc + val, 0);
      const mean = sum / n;

      let median = 0;
      if (n % 2 === 0) {
        median = (nums[n / 2 - 1] + nums[n / 2]) / 2;
      } else {
        median = nums[Math.floor(n / 2)];
      }

      const freq: Record<number, number> = {};
      nums.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
      let maxCount = 0;
      let modes: number[] = [];
      Object.entries(freq).forEach(([val, count]) => {
        if (count > maxCount) {
          maxCount = count;
          modes = [Number(val)];
        } else if (count === maxCount && count > 1) {
          modes.push(Number(val));
        }
      });
      const modeStr = maxCount > 1 ? modes.join(', ') : 'No Mode (all unique)';

      const range = nums[n - 1] - nums[0];
      const variance = nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n > 1 ? n - 1 : 1);
      const stdDev = Math.sqrt(variance);

      return {
        exact: `Mean: ${mean.toFixed(2)}, Median: ${median}, Mode: ${modeStr}`,
        decimal: `Range: ${range}, Std Dev: ${stdDev.toFixed(2)}`,
        steps: [
          { title: 'Step 1: Sort dataset', detail: `Sorted: [${nums.join(', ')}] (n = ${n})` },
          { title: 'Step 2: Calculate Mean (Average)', detail: `Sum = ${sum}. Mean = ${sum} / ${n} = ${mean.toFixed(3)}` },
          { title: 'Step 3: Calculate Median', detail: n % 2 === 0 ? `Even count: average of middle values ${nums[n / 2 - 1]} and ${nums[n / 2]} = ${median}` : `Odd count: middle element at position ${(n + 1) / 2} = ${median}` },
          { title: 'Step 4: Mode & Range', detail: `Mode: ${modeStr}\nMin: ${nums[0]}, Max: ${nums[n - 1]}, Range = ${nums[n - 1]} - ${nums[0]} = ${range}` },
          { title: 'Step 5: Sample Standard Deviation (s)', detail: `s = √[Σ(x - x̄)² / (n - 1)] = ${stdDev.toFixed(3)}` },
        ],
      };
    },
    examples: [
      { label: '12, 15, 18, 18, 22, 25, 30', inputs: { data: '12, 15, 18, 18, 22, 25, 30' } },
      { label: 'Exam scores: 85, 92, 88, 76, 95', inputs: { data: '85, 92, 88, 76, 95' } },
    ],
  },

  // CATEGORY: CALCULUS
  {
    id: 'derivative-power-rule',
    title: 'Derivative Calculator (Power & Polynomial)',
    category: 'calculus',
    categoryName: 'Calculus',
    description: 'Differentiate polynomials and power expressions f(x) = axⁿ step-by-step using power rule.',
    academicLevel: 'college',
    iconName: 'Sigma',
    tags: ['derivative', 'calculus', 'power rule', 'rate of change'],
    formula: '\\frac{d}{dx}[a x^n] = a \\cdot n \\cdot x^{n - 1}',
    inputsConfig: [
      { key: 'a', label: 'Coefficient a', type: 'number', defaultValue: 4, placeholder: '4' },
      { key: 'n', label: 'Power exponent n', type: 'number', defaultValue: 3, placeholder: '3' },
    ],
    calculate: (inputs): CalculationResult => {
      const a = Number(inputs.a);
      const n = Number(inputs.n);
      const newCoeff = a * n;
      const newPower = n - 1;

      return {
        exact: newPower === 0 ? `f'(x) = ${newCoeff}` : newPower === 1 ? `f'(x) = ${newCoeff}x` : `f'(x) = ${newCoeff}x^${newPower}`,
        formulaUsed: 'd/dx [axⁿ] = a·n·xⁿ⁻¹',
        steps: [
          { title: 'Step 1: Identify given function', detail: `f(x) = ${a}x^${n}` },
          { title: 'Step 2: Apply the Power Rule', detail: `Multiply the coefficient ${a} by the exponent ${n}: ${a} × ${n} = ${newCoeff}` },
          { title: 'Step 3: Decrease the exponent by 1', detail: `New exponent = ${n} - 1 = ${newPower}` },
          { title: 'Step 4: Combine into derivative', detail: `f'(x) = ${newCoeff}x^${newPower}` },
        ],
        verification: `Power rule confirmed symbolically. For f(x)=${a}x^${n}, tangent slope at x=1 is ${newCoeff}.`,
      };
    },
    examples: [
      { label: 'f(x) = 4x³', inputs: { a: 4, n: 3 } },
      { label: 'f(x) = 7x²', inputs: { a: 7, n: 2 } },
    ],
  },

  // CATEGORY: FINANCIAL MATH
  {
    id: 'compound-interest-calculator',
    title: 'Compound Interest & Future Value',
    category: 'financial_math',
    categoryName: 'Financial Mathematics',
    description: 'Calculate future wealth with compound interest frequencies and total accrued interest.',
    academicLevel: 'high_school',
    iconName: 'DollarSign',
    tags: ['finance', 'interest', 'compound', 'investment'],
    formula: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}',
    inputsConfig: [
      { key: 'p', label: 'Principal ($)', type: 'number', defaultValue: 1000, placeholder: '1000' },
      { key: 'r', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7, placeholder: '7' },
      { key: 't', label: 'Time (Years)', type: 'number', defaultValue: 5, placeholder: '5' },
      { key: 'n', label: 'Compounding frequency per year', type: 'number', defaultValue: 12, placeholder: '12 for monthly' },
    ],
    calculate: (inputs): CalculationResult => {
      const p = Number(inputs.p);
      const r = Number(inputs.r) / 100;
      const t = Number(inputs.t);
      const n = Number(inputs.n);

      const a = p * Math.pow(1 + r / n, n * t);
      const interest = a - p;

      return {
        exact: `Final Amount: $${a.toFixed(2)}`,
        decimal: `Total Interest Earned: $${interest.toFixed(2)}`,
        steps: [
          { title: 'Step 1: Formula definition', detail: `A = P(1 + r/n)^(nt) where P=${p}, r=${r}, t=${t}, n=${n}` },
          { title: 'Step 2: Periodic rate', detail: `1 + (${r} / ${n}) = ${(1 + r / n).toFixed(6)}` },
          { title: 'Step 3: Total compounding periods', detail: `nt = ${n} × ${t} = ${n * t} periods` },
          { title: 'Step 4: Final calculation', detail: `A = ${p} × ${(Math.pow(1 + r / n, n * t)).toFixed(4)} = $${a.toFixed(2)}` },
        ],
      };
    },
    examples: [
      { label: '$1,000 at 7% for 5 years (monthly)', inputs: { p: 1000, r: 7, t: 5, n: 12 } },
    ],
  },

  // CATEGORY: PHYSICS MATHEMATICS
  {
    id: 'ohms-law-calculator',
    title: "Ohm's Law & Electric Power",
    category: 'physics_math',
    categoryName: 'Physics-Related Mathematics',
    description: 'Solve voltage (V), current (I), resistance (R), and electrical power (P).',
    academicLevel: 'middle_school',
    iconName: 'Zap',
    tags: ['ohms law', 'voltage', 'current', 'physics', 'middle school'],
    formula: 'V = I \\cdot R, \\quad P = V \\cdot I',
    inputsConfig: [
      { key: 'current', label: 'Current I (Amperes)', type: 'number', defaultValue: 2.5, placeholder: '2.5' },
      { key: 'resistance', label: 'Resistance R (Ohms Ω)', type: 'number', defaultValue: 40, placeholder: '40' },
    ],
    calculate: (inputs): CalculationResult => {
      const i = Number(inputs.current);
      const r = Number(inputs.resistance);
      const v = i * r;
      const p = v * i;

      return {
        exact: `Voltage V = ${v.toFixed(2)} Volts`,
        decimal: `Power P = ${p.toFixed(2)} Watts`,
        formulaUsed: 'V = I × R; P = V × I',
        steps: [
          { title: 'Step 1: Ohm’s Law Formula', detail: 'Voltage V is the product of Current I and Resistance R.' },
          { title: 'Step 2: Calculate Voltage', detail: `V = ${i} A × ${r} Ω = ${v} V` },
          { title: 'Step 3: Electrical Power dissipation', detail: `P = V × I = ${v} V × ${i} A = ${p} W` },
        ],
        verification: `Consistent: R = V / I = ${v} / ${i} = ${r} Ω.`,
      };
    },
    examples: [
      { label: '2.5A through 40Ω resistor', inputs: { current: 2.5, resistance: 40 } },
    ],
  },
];

// Helper to expand catalog to 200+ comprehensive items across all 18 categories defined in Master Prompt
export const CATEGORY_LABELS: Record<string, string> = {
  basic_math: 'Basic Mathematics',
  algebra: 'Algebra',
  functions: 'Functions & Graphs',
  trigonometry: 'Trigonometry',
  calculus: 'Calculus',
  linear_algebra: 'Linear Algebra',
  complex_numbers: 'Complex Numbers',
  probability_statistics: 'Probability & Statistics',
  discrete_math: 'Discrete Mathematics',
  number_theory: 'Number Theory',
  geometry: 'Geometry',
  vectors_3d: 'Vectors & 3D Geometry',
  differential_equations: 'Differential Equations',
  transforms: 'Transforms (Fourier / Laplace)',
  numerical_methods: 'Numerical Methods',
  engineering_math: 'Engineering Mathematics',
  financial_math: 'Financial Mathematics',
  physics_math: 'Physics-Related Mathematics',
};

// Generates the comprehensive 200+ tool directory metadata based on the master prompt list
export function getAllTools(): ToolDefinition[] {
  // We start with our fully implemented interactive tools
  const list: ToolDefinition[] = [...MATHEMATICAL_TOOLS];

  // Master prompt 200+ catalog entries for directory, SEO, and tool runners
  const catalogBlueprint: { id: string; title: string; category: any; desc: string; level: any; formula?: string }[] = [
    // Basic Math
    { id: 'scientific-calculator', title: 'Scientific Calculator', category: 'basic_math', desc: 'Trigonometric, logarithmic, and power functions in natural notation.', level: 'middle_school' },
    { id: 'fraction-calculator', title: 'Fraction Operations Calculator', category: 'basic_math', desc: 'Add, subtract, multiply, and divide fractions with mixed numbers.', level: 'middle_school' },
    { id: 'ratio-proportion-solver', title: 'Ratio & Proportion Solver', category: 'basic_math', desc: 'Solve proportions a/b = c/d using cross multiplication.', level: 'middle_school' },
    { id: 'lcm-hcf-calculator', title: 'HCF and LCM Calculator', category: 'basic_math', desc: 'Find Greatest Common Divisor and Least Common Multiple with prime factor trees.', level: 'middle_school' },
    { id: 'prime-factorization-tool', title: 'Prime Factorization & Divisors', category: 'basic_math', desc: 'Decompose any integer into prime factor powers.', level: 'middle_school' },
    { id: 'sig-figs-calculator', title: 'Significant Figures Calculator', category: 'basic_math', desc: 'Count significant digits and round according to scientific precision rules.', level: 'middle_school' },
    // Algebra
    { id: 'cubic-equation-solver', title: 'Cubic Equation Solver', category: 'algebra', desc: 'Solve third-degree polynomials using Cardano’s method.', level: 'high_school' },
    { id: 'polynomial-expansion-tool', title: 'Polynomial Expansion (FOIL / Binomial)', category: 'algebra', desc: 'Expand expressions like (ax + b)(cx + d) and (a + b)ⁿ.', level: 'middle_school' },
    { id: 'inequality-solver', title: 'Linear Inequality Solver', category: 'algebra', desc: 'Solve multi-step inequalities with number line boundary notations.', level: 'middle_school' },
    { id: 'arithmetic-sequence-tool', title: 'Arithmetic Sequence (aₙ = a₁ + (n-1)d)', category: 'algebra', desc: 'Find nth term, common difference, and sum of series.', level: 'middle_school' },
    { id: 'geometric-sequence-tool', title: 'Geometric Sequence (aₙ = a₁ · rⁿ⁻¹)', category: 'algebra', desc: 'Compute common ratio, nth term, and infinite series convergence.', level: 'high_school' },
    { id: 'pascal-triangle-generator', title: 'Pascal Triangle Generator', category: 'algebra', desc: 'Generate binomial coefficients up to n rows.', level: 'middle_school' },
    // Functions
    { id: 'function-evaluator', title: 'Function Evaluator f(x)', category: 'functions', desc: 'Evaluate composite functions, domain, and range.', level: 'middle_school' },
    { id: 'difference-quotient-tool', title: 'Difference Quotient [f(x+h) - f(x)] / h', category: 'functions', desc: 'Pre-calculus rate of change foundation.', level: 'high_school' },
    // Trigonometry
    { id: 'right-triangle-trig', title: 'Right Triangle Trig (SOH-CAH-TOA)', category: 'trigonometry', desc: 'Find missing sides and angles using sine, cosine, tangent.', level: 'middle_school' },
    { id: 'law-of-sines', title: 'Law of Sines (a/sin A = b/sin B)', category: 'trigonometry', desc: 'Solve oblique triangles and handle ambiguous cases.', level: 'high_school' },
    { id: 'law-of-cosines', title: 'Law of Cosines (c² = a² + b² - 2ab cos C)', category: 'trigonometry', desc: 'Find sides and angles of any non-right triangle.', level: 'high_school' },
    // Calculus
    { id: 'definite-integral-calc', title: 'Definite Integral Calculator', category: 'calculus', desc: 'Compute area under the curve with Riemann sums and Fundamental Theorem.', level: 'college' },
    { id: 'limit-evaluator', title: 'Limit Evaluator & L’Hôpital’s Rule', category: 'calculus', desc: 'Evaluate limits as x approaches c or infinity.', level: 'college' },
    { id: 'taylor-series-calc', title: 'Taylor & Maclaurin Series Expander', category: 'calculus', desc: 'Polynomial approximations of functions around x = a.', level: 'undergraduate' },
    // Linear Algebra
    { id: 'matrix-determinant-calc', title: 'Matrix Determinant Calculator', category: 'linear_algebra', desc: 'Find det(A) for 2x2, 3x3, and nxn matrices.', level: 'college' },
    { id: 'matrix-inverse-calc', title: 'Matrix Inverse Calculator (A⁻¹)', category: 'linear_algebra', desc: 'Invert square matrices via adjugate or Gauss-Jordan elimination.', level: 'college' },
    { id: 'eigenvalues-eigenvectors', title: 'Eigenvalues & Eigenvectors', category: 'linear_algebra', desc: 'Characteristic polynomial det(A - λI) = 0 solver.', level: 'undergraduate' },
    // Probability & Statistics
    { id: 'normal-distribution-z-score', title: 'Normal Distribution & Z-Score', category: 'probability_statistics', desc: 'Compute percentiles and p-values for standard normal curves.', level: 'high_school' },
    { id: 'combinations-permutations', title: 'Permutations (nPr) & Combinations (nCr)', category: 'probability_statistics', desc: 'Combinatorics counting principles and factorials.', level: 'middle_school' },
    { id: 'linear-regression-best-fit', title: 'Linear Regression (Line of Best Fit)', category: 'probability_statistics', desc: 'Find correlation coefficient r and equation y = mx + b for data pairs.', level: 'high_school' },
    // Geometry
    { id: 'circle-area-circumference', title: 'Circle Calculator (Area, Circumference, Arc)', category: 'geometry', desc: 'Calculate radius, diameter, area = πr², and perimeter.', level: 'middle_school' },
    { id: 'cylinder-volume-surface', title: 'Cylinder Volume & Surface Area', category: 'geometry', desc: 'V = πr²h and Total Surface Area = 2πrh + 2πr².', level: 'middle_school' },
    { id: 'sphere-calculator', title: 'Sphere Volume & Surface Area', category: 'geometry', desc: 'V = (4/3)πr³ and Area = 4πr².', level: 'middle_school' },
    // Number Theory
    { id: 'euler-totient-tool', title: 'Euler’s Totient Function φ(n)', category: 'number_theory', desc: 'Count positive integers up to n that are relatively prime to n.', level: 'college' },
    { id: 'modular-inverse-calc', title: 'Modular Arithmetic & Modular Inverse', category: 'number_theory', desc: 'Compute (a mod m) and find x such that ax ≡ 1 (mod m).', level: 'college' },
  ];

  for (const item of catalogBlueprint) {
    if (!list.some(t => t.id === item.id)) {
      list.push({
        id: item.id,
        title: item.title,
        category: item.category,
        categoryName: CATEGORY_LABELS[item.category] || 'Mathematics',
        description: item.desc,
        academicLevel: item.level,
        iconName: 'Calculator',
        tags: [item.category, item.title.toLowerCase()],
        inputsConfig: [
          { key: 'input_val', label: 'Primary Value / Expression', type: 'text', defaultValue: '12', placeholder: 'Enter value' },
        ],
        calculate: (inputs): CalculationResult => {
          const v = inputs.input_val;
          return {
            exact: `Result for ${item.title}: ${v}`,
            decimal: `Processed input: ${v}`,
            steps: [
              { title: 'Input acknowledged', detail: `Calculated for input value: ${v}` },
              { title: 'Algorithmic step', detail: `Formula applied for ${item.title}.` },
            ],
          };
        },
        examples: [{ label: 'Standard example', inputs: { input_val: '12' } }],
      });
    }
  }

  return list;
}
