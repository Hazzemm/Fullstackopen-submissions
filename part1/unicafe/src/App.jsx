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
    </div>
  )
}

export default App