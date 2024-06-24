const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};
const Header = (props) => {
return(
  <div>
  <h1>{props.Course.name}</h1>
  </div>
  )
}

const Content = (props) => {
  return(
<div>
  <Part part = {props.Part1} exercises = {props.Exercises1}/>
  <Part part = {props.Part2} exercises = {props.Exercises2}/>
  <Part part = {props.Part3} exercises = {props.Exercises3}/>
</div>
)
}

const  Total = (props) => {
  return(
  <>
  <p>Number of exercises {props.Exercises1 + props.Exercises2 + props.Exercises3}</p>
  </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const exercises1 = course.parts[0].exercises
  const exercises2 = course.parts[1].exercises
  const exercises3 = course.parts[2].exercises
  const part1 = course.parts[0].name
  const part2 = course.parts[1].name
  const part3 = course.parts[2].name
  return (
    <div>
      <Header Course={course} />
      <Content Part1 = {part1} 
      Exercises1 = {exercises3} 
      Part2 = {part2} 
      Exercises2= {exercises2}  
      Part3 = {part3} 
      Exercises3 = {exercises3} />
      <Total Exercises1 =  {exercises1}
      Exercises2 =  {exercises2}
      Exercises3 =  {exercises3}
        />
    </div>
  )
}
export default App;