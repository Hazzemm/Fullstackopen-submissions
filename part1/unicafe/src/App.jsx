import { use, useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text}: {value}</p>
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
      {good !=0 ? <StatisticLine text="Good" value={good} />: null}
      {neutral !=0 ? <StatisticLine text="Neutral" value={neutral} />: null}
      {bad !=0 ? <StatisticLine text="Bad" value={bad} />:null}
      {all > 0 ? <StatisticLine text="All" value={all} />: null}
      {all > 0 ? <StatisticLine text="Average" value={avg} />: null}
      {all > 0 ? <StatisticLine text="Positive" value={`${positive} %`} />: null}
      {all === 0 ? <p>No feedback given</p> : null}
    </div>
  )
}

export default App