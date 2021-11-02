interface calculateBmiValues {
  value1: number;
  value2: number;
}

const parseBmiArgs = (args: Array<string>): calculateBmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const idx = weight / ( (height / 100) ** 2);
  if (idx <= 18.4) {
    return 'Underweight';
  } else if (idx <= 24.9) {
    return 'Normal range';
  } else if (idx <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { value1, value2 } = parseBmiArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
