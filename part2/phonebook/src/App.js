import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/filter'
import PersonForm from './components/form'
import DisplayContact from './components/contact'

const App = () => {
  const baseUrl = 'http://localhost:3001/persons'
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [showFiltered, setFiltered] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    console.log('effect')
    axios.get(baseUrl).then((response) => setPersons(response.data))
  }, [])
  console.log('rendered', persons.length, 'persons')

  const searchContacts = (event) => {
    event.preventDefault()
    console.log(newSearch)
    const term = newSearch.toLowerCase()
    const filteredList = persons.filter(
      (p) => p.name.toLowerCase().indexOf(term) !== -1
    )

    setFiltered(true)
    setFilteredList(filteredList)
    setSearch('')
  }

  const addNewContact = (event) => {
    event.preventDefault()
    const found = persons.some((el) => el.name === newName)
    if (found) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }

    const newContact = {
      name: newName,
      number: newNumber,
    }
    axios.post(baseUrl, newContact).then((response) => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter onSubmit={searchContacts} onChange={handleSearchChange} />
      {showFiltered && filteredList.length
        ? filteredList.map((person) => (
            <DisplayContact
              name={person.name}
              phone={person.number}
              key={person.number}
            />
          ))
        : null}
      {showFiltered && filteredList.length === 0 ? 'No records found' : null}
      <h2>Add a new Contact</h2>
      <PersonForm
        onSubmit={addNewContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newPhone={newNumber}
      />
      <h2>Contacts</h2>
      {persons.map((person) => (
        <DisplayContact
          name={person.name}
          phone={person.number}
          key={person.number}
        />
      ))}
    </div>
  )
}

export default App
