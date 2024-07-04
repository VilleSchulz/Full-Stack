import { useState } from 'react'
import Person from './components/Persons'
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number :'040123345', id: 1}
  ]) 
  
 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber]= useState('')
  const handleNewName = (event) => {
    console.log('added, ', event.target.value)
  setNewName(event.target.value)
}
const handleNewNumber =(event)=>{
  console.log('added, ', event.target.value)
  setNewNumber(event.target.value)
}
const addName = (event) => {

  event.preventDefault()
  const noteObject = {
    name: newName,
    number: newNumber,
    id:persons.length + 1,
  }
  persons.forEach(element => {
    if(element.name===newName){
      alert(`${newName} is allready in phonebook!`)
    }
    else if(element.number===newNumber){
      alert(`${newNumber} is allready in phonebook!`)
    }
else{setPersons(persons.concat(noteObject))
  setNewName('')
  setNewNumber('')}
    
  });

}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value= {newName} onChange= {handleNewName}/>
        </div>
        <div>
           number: <input value = {newNumber} onChange = {handleNewNumber}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     <div>
      {persons.map((person) =>(
       <Person key= {person.id} person = {person.name} number ={person.number}/>
      ))}
    </div> 
    </div>
  )

}
export default App
