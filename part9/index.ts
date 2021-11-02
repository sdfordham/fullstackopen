import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
