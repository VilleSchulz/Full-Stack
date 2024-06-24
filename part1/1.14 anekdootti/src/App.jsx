
import { useState } from 'react'
const Button =({handleClick, text}) =>{
  return(
    <div>
    <button onClick= {handleClick}>
      {text}
    </button>
    </div>
  )
}
const MostVoted = ({anecdotes , votes}) =>{
  
  const mostVotes = Math.max(...Object.values(votes))
  const mostVotedAnecdote = anecdotes[Object.keys(votes).find(key => votes[key] === mostVotes)]

  if (mostVotes === 0)
    {
    return(
      <div>no votes yet</div>
    )
  }

  return(
    <div>
      {mostVotedAnecdote} <br /> has {mostVotes} votes
    </div>
  )

}
const Content = ({anecdotes, selected, votes}) =>{
  return(
    <div>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes
    </div>
  )

}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const handleclick = () =>{
    console.log('clicked')
    const newIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newIndex)
  }
  const handleVote = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
    console.log('voted')
    
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Content anecdotes ={anecdotes} selected={selected} votes={votes}/>

      <Button handleClick={handleclick} text={"next anecdote"}/>
      <Button handleClick ={handleVote} text={"vote"}/>
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes = {anecdotes} votes={votes}/>
    </div>
  )
}

export default App