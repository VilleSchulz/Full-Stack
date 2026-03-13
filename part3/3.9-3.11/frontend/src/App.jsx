import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'

import phoneService from './services/numbers'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterData, setFilterData] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')


  useEffect(() => {
    phoneService.getAll().then(initPersons => { setPersons(initPersons) }
    ).catch(error => {
      setNotificationStyle("error")
      setNotification("Cannot get phonebooks " + error)

      setTimeout(() => {
        setNotification(null)

      }, 3000)
    })
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
        console.log("existing id" + existingPerson.id)
        phoneService.update(existingPerson.id, noteObject).then(updatedPerson => { setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson)) })
        setNotificationStyle("success")
        setNotification(`Updated ${existingPerson.name}`)
        
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }

    }
    else if (numberExists) {
      setNotificationStyle("error")
      setNotification(`Number ${newNumber} already in phonebook`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      return
    }

    else {
      phoneService.create(noteObject).then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNotificationStyle("success")
        setNotification(`Added ${createdPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
    phoneService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))

      setNotificationStyle("success")
      setNotification(`Removed ${person.name}`)

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }).catch(error => {

      setNotificationStyle("error")
      setNotification(`${person.name} has already been removed from server`)
      setPersons(persons.filter(p => p.id !== id))
      setTimeout(() => {
        setNotification(null)
      }, 3000)


    })



  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filterData={filterData} handleNewFilter={handleNewFilter} />
      </div>
      <h2>add a new</h2>
      <Notification message={notification} styleClass={notificationStyle} />

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
