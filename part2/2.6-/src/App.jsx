import { useState } from 'react'
import Person from './components/Persons'
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number :'040123345', id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [filterData, setFilterData] = useState('')

  const handleNewName = (event) => {
    console.log('added new name, ', event.target.value)
  setNewName(event.target.value)
}
const handleNewNumber = (event) =>{
  console.log('added new number, ', event.target.value)
  setNewNumber(event.target.value)
}
const addName = (event) => {
  event.preventDefault()
  const noteObject = {
    name: newName,
    number: newNumber,
    id:persons.length + 1,
  }
  const nameExists = persons.some(person => person.name === newName)
  const numberExists = persons.some(person => person.number === newNumber)
  
    if(nameExists){
      alert(`${newName} is allready in a phonebook!`)
      }
      else if(numberExists){
        alert(`${newNumber} is allready in a phonebook!`)
        }
    
    else{
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
    
  };
const handleNewFilter = (event) => {
    console.log('filter', event.target.value)
    setFilterData(event.target.value)}

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input value ={filterData} onChange ={handleNewFilter}/>
        </div>
      </form>
      <h2>add a new</h2>
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
      {persons.
      filter(person => person.name.toLowerCase().startsWith(filterData.toLowerCase())).map((person) => (
       <Person key= {person.id} person = {person.name} number ={person.number}/>
      ))}
    </div> 
    </div>
  )

}
export default App
