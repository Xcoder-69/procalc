import { differenceInYears, differenceInMonths, differenceInDays, sub } from 'date-fns';

type Inputs = Record<string, number | string>;

export const calculateBmi = (inputs: Inputs) => {
  const weight = Number(inputs.weight);
  const height = Number(inputs.height) / 100; // convert cm to m
  if (weight <= 0 || height <= 0) return {};

  const bmi = weight / (height * height);
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return { bmi, category };
};

export const calculateEmi = (inputs: Inputs) => {
  const principal = Number(inputs.principal);
  const rate = Number(inputs.rate) / 100 / 12; // monthly interest rate
  const tenure = Number(inputs.tenure) * 12; // tenure in months
  if (principal <= 0 || rate <= 0 || tenure <= 0) return {};

  const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - principal;

  return { emi, totalInterest, totalPayment };
};

export const calculatePercentage = (inputs: Inputs) => {
  const percentage = Number(inputs.percentage);
  const total = Number(inputs.total);
  if (isNaN(percentage) || isNaN(total)) return {};

  const result = (percentage / 100) * total;
  return { result };
};

export const calculateSip = (inputs: Inputs) => {
  const monthlyInvestment = Number(inputs.monthlyInvestment);
  const rate = Number(inputs.rate) / 100;
  const tenure = Number(inputs.tenure);
  if (monthlyInvestment <= 0 || rate <= 0 || tenure <= 0) return {};

  const i = rate / 12;
  const n = tenure * 12;

  const totalValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const investedAmount = monthlyInvestment * n;
  const estimatedReturns = totalValue - investedAmount;

  return { investedAmount, estimatedReturns, totalValue };
};

export const calculateAge = (inputs: Inputs) => {
  const dob = new Date(inputs.dob as string);
  if (isNaN(dob.getTime())) return {};
  const now = new Date();

  const years = differenceInYears(now, dob);
  const monthsDate = sub(now, { years });
  const months = differenceInMonths(monthsDate, dob);
  const daysDate = sub(monthsDate, { months });
  const days = differenceInDays(daysDate, dob);
  
  return { years, months, days };
};

export const convertUnits = (inputs: Inputs) => {
  const value = Number(inputs.value);
  const fromUnit = inputs.fromUnit as string;
  const toUnit = inputs.toUnit as string;
  if (isNaN(value)) return {};

  const conversionFactors: Record<string, number> = {
    meters: 1,
    feet: 0.3048,
    inches: 0.0254,
    kilometers: 1000,
    miles: 1609.34,
  };

  const valueInMeters = value * conversionFactors[fromUnit];
  const result = valueInMeters / conversionFactors[toUnit];

  return { result };
};

export const calculateBmr = (inputs: Inputs) => {
  const age = Number(inputs.age);
  const gender = inputs.gender as string;
  const height = Number(inputs.height);
  const weight = Number(inputs.weight);
  if (age <= 0 || height <= 0 || weight <= 0) return {};

  let bmr = 0;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  return { bmr };
};

export const calculateDiscount = (inputs: Inputs) => {
  const price = Number(inputs.price);
  const discount = Number(inputs.discount);
  if (price < 0 || discount < 0 || discount > 100) return {};

  const savedAmount = (price * discount) / 100;
  const finalPrice = price - savedAmount;
  
  return { finalPrice, savedAmount };
};

export const calculateSimpleInterest = (inputs: Inputs) => {
  const principal = Number(inputs.principal);
  const rate = Number(inputs.rate);
  const time = Number(inputs.time);
  if (principal <= 0 || rate < 0 || time <= 0) return {};

  const interest = (principal * rate * time) / 100;
  const totalAmount = principal + interest;

  return { interest, totalAmount };
};

export const calculateDateDifference = (inputs: Inputs) => {
  const startDate = new Date(inputs.startDate as string);
  const endDate = new Date(inputs.endDate as string);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return {};
  
  const days = differenceInDays(endDate, startDate);
  const weeks = days / 7;
  const months = differenceInMonths(endDate, startDate);
  const years = differenceInYears(endDate, startDate);
  
  return { years, months, weeks, days };
};

export const calculateBodyFat = (inputs: Inputs) => {
  const { gender, height, neck, waist, hip, weight } = inputs as { gender: string; height: number; neck: number; waist: number; hip?: number, weight?: number | string };
  if (!gender || !height || !neck || !waist || !weight) return {};
  
  let bodyFatPercentage = 0;
  
  if (gender === 'male') {
    bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    if (!hip) return {};
    bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }

  if (bodyFatPercentage < 0) bodyFatPercentage = 0;

  const bodyFatMass = (Number(weight) * bodyFatPercentage) / 100;
  const leanBodyMass = Number(weight) - bodyFatMass;

  return { bodyFatPercentage, bodyFatMass, leanBodyMass };
};
