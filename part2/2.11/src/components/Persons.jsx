const Persons =({ person,number, }) => {
  console.log("Person",person)
  const personInfo= `${person}: ${number}`
  return(
 <div>{personInfo}</div> 
  )
}

export default Persons