import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [filterData, setFilterData] = useState('')
  
  //get phonebook info from database
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  console.log('render',persons.length, 'persons')

//handling new names and numbers
  const handleNewName = (event) => {
    console.log('added new name, ', event.target.value)
  setNewName(event.target.value)
}
const handleNewNumber = (event) =>{
  console.log('added new number, ', event.target.value)
  setNewNumber(event.target.value)
}

//adding new person info
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
