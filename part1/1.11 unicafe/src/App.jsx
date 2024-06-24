/*Step1 unicafe */
import { useState } from 'react'
const Statistics = (props) => {
  console.log(props)
  if (props.stats.all === 0) {
    return(
    <div>No feedback given</div>
  )}
  return (
  <table>
    <StatisticLine text = 'good' value = {props.stats.good} />
    <StatisticLine text = 'neutral' value = {props.stats.neutral} />
    <StatisticLine text = 'bad' value = {props.stats.bad} />
    <StatisticLine text = 'all' value = {props.stats.all} />
    <StatisticLine text = 'average' value = {props.stats.average} />
    <StatisticLine text = 'positive' value = {props.stats.positive +' %'}  />
</table>)
}
const StatisticLine =({text, value}) => {
  return(
    
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
  )
}
const Button = ({handleClick, text}) =>(
    <button
    onClick={handleClick}> 
      {text}
    </button>
    )
 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral]  = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [points, setPoints] = useState(0)
  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedPoints = points + 1
    console.log('Painettu Good')
    setGood(updatedGood)
    setAll(all + 1)
    setPoints(updatedPoints)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedPoints = points + 0
    console.log('Painettu Neutral')
    setNeutral(updatedNeutral)
    setAll(all + 1)
    setPoints(updatedPoints)
  }
  
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedPoints = points - 1
    console.log('Painettu Bad')
    setBad(updatedBad)
    setAll(all +1)
    setPoints(updatedPoints)
  }
  const average = all ? points / all : 0
  const positive = all ? (good/all) * 100 : 0
  const feedbackStats = {good, neutral, bad, all, average, positive};

  return (
      <div>
        <h1>give feedback</h1>
        <div>
         <Button handleClick={handleGoodClick} text='good' />
         <Button handleClick={handleNeutralClick} text='neutral' />
         <Button handleClick={handleBadClick} text='bad' />
        </div>
        <h1>statistics</h1>
        <div>
        <Statistics stats = {feedbackStats}/>
        </div>
      </div>
    
  )
}
export default App;



