interface exerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyHours: Array<number>, target: number): exerciseSummary => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce( (a, b) => b > 0 ? a + 1 : a, 0);
  const total = dailyHours.reduce( (a, b) => a + b, 0);
  const success = total >= target ? true : false;
  const rating = success ? 3 : 1;
  const ratingDescription = success ? 'nice one buddy' : 'not too bad but could be better';
  const average = total / periodLength;
    
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseArgs = (args: Array<string>): Array<number> => {
  if (args.length <= 2) throw new Error('Not enough arguments');
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Arguments must be numbers');
    }
  }
  return args.slice(2).map(a => Number(a));
};

try {
  const target = 2;
  const v = parseExerciseArgs(process.argv);
  console.log(calculateExercises(v, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
 export default calculateExercises;
