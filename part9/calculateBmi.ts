const calculateBmi = (height: number, weight: number): string => {
  const idx = weight / ( (height / 100) ** 2)
  if (idx <= 18.4) {
    return "Underweight"
  } else if (idx <= 24.9) {
    return "Normal range"
  } else if (idx <= 29.9) {
    return "Overweight"
  } else {
    return "Obese"
  }
}

console.log(calculateBmi(180, 74))
