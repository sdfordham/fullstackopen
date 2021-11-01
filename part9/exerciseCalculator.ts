const target = 2

interface exerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyHours: Array<number>): exerciseSummary => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.reduce( (a, b) => b > 0 ? a + 1 : a, 0);
    const total = dailyHours.reduce( (a, b) => a + b, 0);
    const success = total >= target ? true : false
    const rating = success ? 3 : 1
    const ratingDescription = success ? 'nice one buddy' : 'not too bad but could be better' 
    const average = total / periodLength;
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([1, 0, 0, 0.5, 0, 0, 0]))
