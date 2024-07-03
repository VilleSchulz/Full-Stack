import { useState } from 'react'
import Person from './components/Persons'
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ]) 
  
 
  const [newName, setNewName] = useState('')
  const handleNewName = (event) => {
  setNewName(event.target.value)
}
const addName = (event) => {
  event.preventDefault()
  const noteObject = {
    name: newName,
    id:persons.length + 1,
  }
setPersons(persons.concat(noteObject))
setNewName('')
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value= {newName} onChange= {handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     <div>
      {persons.map((person) =>(
       <Person key= {person.id} person = {person.name}/>
      ))}
    </div> 
    </div>
  )

}
export default App
