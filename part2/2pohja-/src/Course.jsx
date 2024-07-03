//2.5 tehty!
const Total = ({exercises}) => {
  return(
    <div>
      <p>
        <b>
        total of exercises {exercises} 
        </b>
      </p>
    </div>
  )
}
const Part = ({part}) => {
    console.log("partti",part)
    
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    );
  };
  
  const Header = ({course}) => {
  return(
    <div>
    <h2>{course.name}</h2>
    </div>
    )
  }
  
const Course = ({course}) => {
    console.log(course)
   return( <div>
    <h1>Web development curriculum</h1>
   <Header course = {course} />
    <Content  parts = {course.parts} />  
    <Total exercises ={course.parts.reduce((sum,part) => sum + part.exercises,0)} />
    </div>  
)
    }

  const Content = ({parts}) => {
    console.log("contentti")
    console.log(parts)
    return(
  <div>
  {parts.map(note => <Part key = {note.id} part={note}/>)}
  </div>
  )
  }


export default Course 