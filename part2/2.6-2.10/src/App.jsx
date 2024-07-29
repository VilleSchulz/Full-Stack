import { useState } from 'react'
import Person from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'


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
      <div>
        <Filter filterData = {filterData} handleNewFilter = {handleNewFilter}/>
      </div>
      <h2>add a new</h2>
      
      <PersonForm newName = {newName} 
      handleNewName = {handleNewName} 
      newNumber = {newNumber} 
      handleNewNumber ={handleNewNumber} 
      addName = {addName} />
    
      <h2>Numbers</h2>
    
     <div>
      {persons.
      filter(person => person.name.toLowerCase().startsWith(filterData.toLowerCase())).map((person) => (
       <Persons key= {person.id} person = {person.name} number ={person.number}/>
      ))}
    </div> 
  
  </div>
  )

}
export default App
