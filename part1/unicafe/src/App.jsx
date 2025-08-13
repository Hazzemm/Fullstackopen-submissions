import { use, useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {

  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)
  const all = good + neutral + bad
  const avg = (good - bad) / all || 0
  const positive = (good / all) * 100 || 0

  const handleGoodClick = () => {
  console.log("Good clicked")
  setGood(good + 1)
  }
  const handleNeutralClick = () => {
    console.log("Neutral clicked")
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    console.log("Bad clicked")
    setBad(bad + 1)
  }

  return(
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={handleGoodClick} text={"Good"}/>
      <Button onClick={handleNeutralClick} text={"Neutral"}/>
      <Button onClick={handleBadClick} text={"Bad"}/>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <h3>All: {all}</h3>
      <h3>Average: {avg}</h3>
      <h3>Positive: {positive} %</h3>
    </div>
  )
}

export default App