const Course = ({course}) =>{
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>    
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map((part,index) => <Part key={index} part={part}/>)}
  </div>
)


const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((sum,part)=>{return sum + part.exercises},0)
  return(
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

export default Course