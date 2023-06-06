import { useState } from 'react'

const Button = ({handleClick, buttonText}) => {
  return (
    <button onClick={handleClick}>{buttonText}</button>
    )
}

const StatisticLine = ({label, value, unit}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}{unit}</td>
    </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine label="good" value={good}></StatisticLine>
            <StatisticLine label="neutral" value={neutral}></StatisticLine>
            <StatisticLine label="bad" value={bad}></StatisticLine>
            <StatisticLine label="all" value={good + neutral + bad}></StatisticLine>
            <StatisticLine label="average" value={((good*1) + (neutral*0) + (bad*-1)) / (good + neutral + bad)}></StatisticLine>
            <StatisticLine label="positive" value={(good/(good + neutral + bad))*100} unit="%"></StatisticLine>
          </tbody>
        </table> 
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} buttonText="good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} buttonText="neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} buttonText="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
