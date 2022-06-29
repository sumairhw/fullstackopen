import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ]

  const [selected, setSelected] = useState(0)
  const len = anecdotes.length
  const selectNext = () => setSelected(Math.floor(Math.random() * len))

  const [votes, setVotes] = useState(new Array(len).fill(0))
  const modifyVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    return setVotes(newVotes)
  }

  return (
    <>
      <div>
        <h1>Anecdote of the Day</h1>
        <p>{anecdotes[selected]}</p>
      </div>
      <DisplayVotes voteCount={votes[selected]} />
      <Button onClick={modifyVotes} text='vote' />
      <Button onClick={selectNext} text='next anecdote' />
      <DisplayMostVoted votes={votes} anecdotes={anecdotes} />
    </>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const DisplayVotes = ({ voteCount }) => <p>anecdote has {voteCount} votes</p>

const DisplayMostVoted = ({ votes, anecdotes }) => {
  const max = Math.max(...votes)
  if (max === 0) return null
  const maxIndex = votes.indexOf(max)
  return (
    <div>
      <h2>Most Voted Anecdote</h2>
      <p>{anecdotes[maxIndex]}</p>
    </div>
  )
}

export default App
