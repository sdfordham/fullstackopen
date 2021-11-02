import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if(!height || !weight) {
    res.status(400).send({
      message: 'Missing arguments'
    });
  }
  else {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const bmi = calculateBmi(Number(height), Number(weight));
      res.send({ height, weight, bmi });
    } else {
      res.status(400).send({
        message: 'Arguments should be numbers'
      });
    }
  }
});

app.post('/exercise', (req, res) => {
  const args: Array<string> = req.body.daily_exercises;
  const target  = req.body.target;
  if (!args || !target) {
    res.status(400).send({
      error: "Parameters missing"
    });
  }
  for (let i = 0; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      res.status(400).send({
        error: 'Arguments must be numbers'
      });
    }
  }
  if (isNaN(Number(target))) {
    res.status(400).send({
      error: 'Target must be a number'
    });
  }
  res.send(
    calculateExercises(
      args.map(a => Number(a)), Number(target)
    )
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
