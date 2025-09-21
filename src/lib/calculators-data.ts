import { CalculatorDef, Category, CategorySlug } from './types';
import * as calculatorLogics from './calculator-helpers';

export const categories: Category[] = [
  { slug: 'health', name: 'Health', description: 'Calculators to monitor and improve your physical well-being.' },
  { slug: 'finance', name: 'Finance', description: 'Tools for managing your personal and business finances effectively.' },
  { slug: 'mathematics', name: 'Mathematics', description: 'Solve complex mathematical problems with ease.' },
  { slug: 'conversion-tools', name: 'Conversion & Tools', description: 'Handy converters and tools for everyday tasks.' },
];

export const calculators: CalculatorDef[] = [
  // Health
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    category: 'health',
    shortDescription: 'Calculate your Body Mass Index to assess your weight category.',
    isFeatured: true,
    image: { seed: 'health-monitor', width: 600, height: 400, hint: 'health scale' },
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70', min: 1, step: 0.1 },
      { name: 'height', label: 'Height (cm)', type: 'number', placeholder: '175', min: 1, step: 0.1 },
    ],
    resultLabels: {
      bmi: { label: 'Your BMI', precision: 2 },
      category: { label: 'Category' },
    },
    formulaDescription: 'BMI = weight (kg) / (height (m))^2',
    relatedCalculators: ['bmr-calculator', 'body-fat-calculator'],
    article: 'The Body Mass Index (BMI) is a measure that uses your height and weight to work out if your weight is healthy. The BMI calculation divides an adult\'s weight in kilograms by their height in metres squared. For most adults, an ideal BMI is in the 18.5 to 24.9 range.'
  },
  {
    slug: 'bmr-calculator',
    title: 'BMR Calculator',
    category: 'health',
    shortDescription: 'Estimate your Basal Metabolic Rate, the energy spent while at rest.',
    isFeatured: true,
    image: { seed: 'metabolism-rate', width: 600, height: 400, hint: 'healthy food' },
    inputs: [
      { name: 'age', label: 'Age (years)', type: 'number', placeholder: '30', min: 1 },
      { name: 'gender', label: 'Gender', type: 'select', options: [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}] },
      { name: 'height', label: 'Height (cm)', type: 'number', placeholder: '175', min: 1, step: 0.1 },
      { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70', min: 1, step: 0.1 },
    ],
    resultLabels: {
      bmr: { label: 'Basal Metabolic Rate', unit: 'calories/day', precision: 0 },
    },
    formulaDescription: 'Uses the Mifflin-St Jeor Equation: For men: BMR = 10W + 6.25H - 5A + 5. For women: BMR = 10W + 6.25H - 5A - 161. Where W is weight in kg, H is height in cm, and A is age in years.',
    relatedCalculators: ['bmi-calculator', 'body-fat-calculator', 'calories-burned-calculator'],
    article: 'Your Basal Metabolic Rate (BMR) is the number of calories you burn as your body performs basic (basal) life-sustaining function. Commonly also termed as Resting Metabolic Rate (RMR), which is the calories burned if you stayed in bed all day. Knowing your BMR can help you manage your weight.'
  },
    {
    slug: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    category: 'health',
    shortDescription: 'Estimate your body fat percentage using the U.S. Navy method.',
    image: { seed: 'body-fat- calipers', width: 600, height: 400, hint: 'fitness measure' },
    inputs: [
      { name: 'gender', label: 'Gender', type: 'select', options: [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}] },
      { name: 'height', label: 'Height (cm)', type: 'number', placeholder: '175', min: 1 },
      { name: 'neck', label: 'Neck (cm)', type: 'number', placeholder: '38', min: 1 },
      { name: 'waist', label: 'Waist (cm)', type: 'number', placeholder: '85', min: 1 },
      { name: 'hip', label: 'Hip (cm, women only)', type: 'number', placeholder: '95', min: 1 },
    ],
    resultLabels: {
      bodyFatPercentage: { label: 'Body Fat', unit: '%', precision: 2 },
      bodyFatMass: { label: 'Body Fat Mass', unit: 'kg', precision: 2 },
      leanBodyMass: { label: 'Lean Body Mass', unit: 'kg', precision: 2 },
    },
    formulaDescription: 'Uses the U.S. Navy method. For men: BFP = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76. For women: BFP = 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387.',
    relatedCalculators: ['bmi-calculator', 'bmr-calculator'],
    article: 'Body fat percentage is a key indicator of health. This calculator uses the U.S. Navy method, which only requires a few simple body measurements, to estimate your body fat. It\'s a convenient way to track your fitness progress.'
  },
  
  // Finance
  {
    slug: 'loan-emi-calculator',
    title: 'Loan EMI Calculator',
    category: 'finance',
    shortDescription: 'Calculate your Equated Monthly Installment for loans.',
    isFeatured: true,
    image: { seed: 'loan-payment', width: 600, height: 400, hint: 'loan document' },
    inputs: [
      { name: 'principal', label: 'Loan Amount ($)', type: 'number', placeholder: '100000', min: 1 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: '5', min: 0, step: 0.01 },
      { name: 'tenure', label: 'Loan Tenure (Years)', type: 'number', placeholder: '10', min: 1 },
    ],
    resultLabels: {
      emi: { label: 'Monthly EMI', unit: '$', precision: 2 },
      totalInterest: { label: 'Total Interest Payable', unit: '$', precision: 2 },
      totalPayment: { label: 'Total Payment', unit: '$', precision: 2 },
    },
    formulaDescription: 'EMI = P x R x (1+R)^N / [(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is number of months.',
    relatedCalculators: ['sip-calculator', 'simple-interest-calculator'],
    article: 'An EMI calculator is an essential financial tool that helps you understand the monthly cost of a loan. By inputting the loan amount, interest rate, and tenure, you can see your Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.'
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    category: 'finance',
    shortDescription: 'Project the future value of your Systematic Investment Plan.',
    isFeatured: true,
    image: { seed: 'sip-calculator-tablet', width: 600, height: 400, hint: 'investment calculator' },
    inputs: [
      { name: 'monthlyInvestment', label: 'Monthly Investment ($)', type: 'number', placeholder: '5000', min: 1 },
      { name: 'rate', label: 'Expected Annual Return (%)', type: 'number', placeholder: '12', min: 0, step: 0.1 },
      { name: 'tenure', label: 'Investment Period (Years)', type: 'number', placeholder: '15', min: 1 },
    ],
    resultLabels: {
      investedAmount: { label: 'Total Invested Amount', unit: '$', precision: 2 },
      estimatedReturns: { label: 'Estimated Returns', unit: '$', precision: 2 },
      totalValue: { label: 'Projected Total Value', unit: '$', precision: 2 },
    },
    formulaDescription: 'Future Value = P × ({[ (1 + i)^n ] – 1} / i) × (1 + i), where P is monthly investment, i is monthly rate of return, and n is number of months.',
    relatedCalculators: ['loan-emi-calculator', 'simple-interest-calculator'],
    article: 'A Systematic Investment Plan (SIP) calculator helps you estimate the returns on your mutual fund investments made through SIP. It is a useful tool to plan your financial goals, whether it\'s for retirement, a child\'s education, or wealth creation.'
  },
  {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    category: 'finance',
    shortDescription: 'Calculate simple interest on a principal amount.',
    image: { seed: 'money-growth', width: 600, height: 400, hint: 'coins stacking' },
    inputs: [
      { name: 'principal', label: 'Principal Amount ($)', type: 'number', placeholder: '10000', min: 1 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: '5', min: 0, step: 0.1 },
      { name: 'time', label: 'Time Period (Years)', type: 'number', placeholder: '5', min: 0.1, step: 0.1 },
    ],
    resultLabels: {
      interest: { label: 'Simple Interest', unit: '$', precision: 2 },
      totalAmount: { label: 'Total Amount', unit: '$', precision: 2 },
    },
    formulaDescription: 'Simple Interest (SI) = (P × R × T) / 100, where P is Principal, R is Rate of Interest, and T is Time period.',
    relatedCalculators: ['loan-emi-calculator', 'sip-calculator'],
    article: 'Simple interest is a quick and easy method of calculating the interest charge on a loan. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments.'
  },

  // Mathematics
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    category: 'mathematics',
    shortDescription: 'Calculate percentages for various scenarios.',
    isFeatured: true,
    image: { seed: 'math-symbols', width: 600, height: 400, hint: 'math equation' },
    inputs: [
      { name: 'percentage', label: 'What is', type: 'number', placeholder: '10', min: 0 },
      { name: 'total', label: '% of', type: 'number', placeholder: '500', min: 0 },
    ],
    resultLabels: {
      result: { label: 'Result', precision: 4 },
    },
    formulaDescription: 'Result = (Percentage / 100) * Total',
    relatedCalculators: ['discount-calculator', 'loan-emi-calculator'],
    article: 'Percentages are a fundamental part of mathematics and are used in many areas of life, from calculating discounts in stores to understanding financial reports. This calculator helps you quickly solve various percentage-related problems.'
  },
  {
    slug: 'scientific-calculator',
    title: 'Scientific Calculator',
    category: 'mathematics',
    shortDescription: 'Perform advanced mathematical calculations.',
    isFeatured: false,
    component: 'ScientificCalculator',
    image: { seed: 'scientific-math', width: 600, height: 400, hint: 'equations blackboard' },
    inputs: [],
    resultLabels: {},
    relatedCalculators: ['percentage-calculator'],
    article: 'A scientific calculator is a type of electronic calculator, usually but not always handheld, designed to calculate problems in science, engineering, and mathematics. They have completely replaced slide rules in traditional applications, and are widely used in both education and professional settings.'
  },

  // Conversion & Tools
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    category: 'conversion-tools',
    shortDescription: 'Find out your exact age in years, months, and days.',
    isFeatured: true,
    image: { seed: 'hourglass-time', width: 600, height: 400, hint: 'hourglass calendar' },
    inputs: [
      { name: 'dob', label: 'Your Date of Birth', type: 'date' },
    ],
    resultLabels: {
      years: { label: 'Years' },
      months: { label: 'Months' },
      days: { label: 'Days' },
    },
    relatedCalculators: ['date-difference-calculator'],
    article: 'Curious about your exact age? This age calculator will tell you how many years, months, and days you have lived. It can also be used to find the time duration between two dates.'
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    category: 'conversion-tools',
    shortDescription: 'A simple converter for common length units.',
    isFeatured: true,
    image: { seed: 'ruler-measure', width: 600, height: 400, hint: 'measuring tools' },
    inputs: [
        { name: 'value', label: 'Value', type: 'number', placeholder: '10', min: 0 },
        { name: 'fromUnit', label: 'From', type: 'select', defaultValue: 'meters', options: [{value: 'meters', label: 'Meters'}, {value: 'feet', label: 'Feet'}, {value: 'inches', label: 'Inches'}, {value: 'kilometers', label: 'Kilometers'}, {value: 'miles', label: 'Miles'}] },
        { name: 'toUnit', label: 'To', type: 'select', defaultValue: 'feet', options: [{value: 'meters', label: 'Meters'}, {value: 'feet', label: 'Feet'}, {value: 'inches', label: 'Inches'}, {value: 'kilometers', label: 'Kilometers'}, {value: 'miles', label: 'Miles'}] },
    ],
    resultLabels: {
      result: { label: 'Converted Value', precision: 4 },
    },
    relatedCalculators: ['age-calculator'],
    article: 'Unit conversion is the process of converting a quantity from one unit of measurement to another. This tool provides a simple way to convert between common units of length, such as meters, feet, and miles.'
  },
  {
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    category: 'conversion-tools',
    shortDescription: 'Calculate the final price after a discount.',
    isFeatured: true,
    image: { seed: 'shopping-sale', width: 600, height: 400, hint: 'shopping tag' },
    inputs: [
      { name: 'price', label: 'Original Price ($)', type: 'number', placeholder: '100', min: 0 },
      { name: 'discount', label: 'Discount (%)', type: 'number', placeholder: '20', min: 0, max: 100 },
    ],
    resultLabels: {
      finalPrice: { label: 'Final Price', unit: '$', precision: 2 },
      savedAmount: { label: 'You Save', unit: '$', precision: 2 },
    },
    formulaDescription: 'Final Price = Original Price - (Original Price * Discount / 100)',
    relatedCalculators: ['percentage-calculator', 'loan-emi-calculator'],
    article: 'Everyone loves a good sale. This discount calculator makes it easy to figure out how much you\'ll actually pay for an item and how much you\'re saving. Just enter the original price and the discount percentage.'
  },
  {
    slug: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    category: 'conversion-tools',
    shortDescription: 'Calculate the duration between two dates.',
    image: { seed: 'calendar-days', width: 600, height: 400, hint: 'calendar schedule' },
    inputs: [
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
    resultLabels: {
        years: { label: 'Years', precision: 0},
        months: { label: 'Total Months', precision: 0 },
        weeks: { label: 'Total Weeks', precision: 2 },
        days: { label: 'Total Days', precision: 0 },
    },
    relatedCalculators: ['age-calculator'],
    article: 'This tool helps you calculate the number of days, weeks, months, and years between two dates. It\'s useful for project planning, tracking milestones, or simply for curiosity.'
  }
];

export const getCalculatorBySlug = (slug: string) => calculators.find(c => c.slug === slug);
