import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getAverage(good, neutral, bad) {
  return (good + (-1) * bad) / (good + neutral + bad)
}

function getPositive(good, total) {
  return (good * 100) / total + " %"
}

const Section = (props) => (
  <h2>{props.text}</h2>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
  <tr> <td>{props.text}</td> <td>{props.value}</td> </tr>
)

const Statistics = (props) => {
  if (props.good == 0 & props.neutral == 0 & props.bad == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <Statistic text="good"     value={props.good} />
          <Statistic text="neutral"  value={props.neutral} />
          <Statistic text="bad"      value={props.bad} />
          <Statistic text="all"      value={props.good + props.neutral + props.bad} />
          <Statistic text="average"  value={getAverage(props.good, props.neutral, props.bad)} />
          <Statistic text="positive" value={getPositive(props.good, props.good + props.neutral + props.bad)} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Section text="give feedback"/>
      <div>
        <Button handleClick={() => setGood(good + 1)}       text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)}         text="bad" />
      </div>
      <Section text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
