const Persons = ({ person, number, removeNumber }) => {
  console.log("Person", person)
  const personInfo = `${person}: ${number}`
  return (
    <div>{personInfo}<button onClick={removeNumber}>delete</button></div>
  )
}

export default Persons