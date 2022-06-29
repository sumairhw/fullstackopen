import { useState } from 'react'

const App = () => {
  const [goodCount, setGood] = useState(0)
  const [badCount, setBad] = useState(0)
  const [neutralCount, setNeutral] = useState(0)

  const handleGood = () => setGood(goodCount + 1)
  const handleBad = () => setBad(badCount + 1)
  const handleNeutral = () => setNeutral(neutralCount + 1)

  return (
    <div className='App'>
      <h1>Give Feedback</h1>
      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad} />
      <h1>Statistics</h1>
      <Statistics
        goodCount={goodCount}
        badCount={badCount}
        neutralCount={neutralCount}
      />
    </div>
  )
}

const Statistics = ({ goodCount, badCount, neutralCount }) => {
  const total = goodCount + badCount + neutralCount
  const avg = (goodCount - badCount) / total
  const posPercentage = (100 * goodCount) / total

  if (total <= 0) return <p>No Feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticLine name='good' value={goodCount} />
        <StatisticLine name='neutral' value={neutralCount} />
        <StatisticLine name='bad' value={badCount} />
        <StatisticLine name='All' value={total} />
        <StatisticLine name='Average' value={avg} />
        <StatisticLine name='Positive' value={posPercentage + '%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ name, value }) => (
  <tr><td>{name}</td><td>{value}</td></tr>
)

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

export default App
