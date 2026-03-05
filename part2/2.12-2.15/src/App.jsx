import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'

import phoneService from './services/numbers'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterData, setFilterData] = useState('')


  useEffect(() => {
    phoneService.getAll().then(initPersons => { setPersons(initPersons) }
    )
  }, [])

  console.log('render', persons.length, 'persons')

  //handling new names and numbers
  const handleNewName = (event) => {
    console.log('added new name, ', event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log('added new number, ', event.target.value)
    setNewNumber(event.target.value)
  }



  //adding new person info
  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber

    }

    const existingPerson = persons.find(p => p.name === newName)
    const numberExists = persons.some(person => person.number === newNumber)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phoneService.update(existingPerson.id, noteObject).then(updatedPerson => { setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson)) })
      }

    }
    else if (numberExists) {
      alert(`${newNumber} is allready in a phonebook!`)
    }

    else {
      phoneService.create(noteObject).then(createdPerson => {
        setPersons(persons.concat(createdPerson))
      })

    }

    setNewName('')
    setNewNumber('')

  };
  const handleNewFilter = (event) => {
    console.log('filter', event.target.value)
    setFilterData(event.target.value)
  }



  const removeNumberOf = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm("Delete " + person.name + "?")) {
      return
    }
    phoneService.remove(id).then(() => setPersons(persons.filter(p => p.id !== id)))


  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filterData={filterData} handleNewFilter={handleNewFilter} />
      </div>
      <h2>add a new</h2>

      <PersonForm newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addName={addName} />

      <h2>Numbers</h2>

      <div>
        {persons.
          filter(person => person.name.toLowerCase().startsWith(filterData.toLowerCase())).map((person) => (
            <Persons key={person.id} person={person.name} number={person.number} removeNumber={() => { removeNumberOf(person.id) }} />
          ))}
      </div>

    </div>
  )

}
export default App
