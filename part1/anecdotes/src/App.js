import { useState } from 'react'

const Anecdote = ({title, anecdoteText, anecdoteVotes}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdoteText}</p>
      <p>has {anecdoteVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const [maxVotes, setMaxVotes] = useState(0);
  const [maxVotesIndex, setMaxVotesIndex] = useState(0);

  const submitVote = () => {
    const newVotes = {...votes};
    newVotes[selected] += 1;
    setVotes(newVotes);

    // Check if new number of votes is greater than current max number of votes
    if (newVotes[selected] > maxVotes) {
      setMaxVotes(newVotes[selected])
      setMaxVotesIndex(selected);
    }
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdoteText={anecdotes[selected]} anecdoteVotes={votes[selected]}></Anecdote>
      <button onClick={() => submitVote()}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <Anecdote title="Anecdote with most votes" anecdoteText={anecdotes[maxVotesIndex]} anecdoteVotes={maxVotes}></Anecdote>
    </div>
  )
}

export default App