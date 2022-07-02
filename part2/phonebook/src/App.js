import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      Search : <input onChange={onChange} />
      <br /> <br />
      <button type='submit'>Search</button>
    </form>
  )
}

const PersonForm = ({
  onSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newPhone,
}) => {
  return (
    <form onSubmit={onSubmit}>
      name : <input onChange={handleNameChange} value={newName} />
      <br /> <br />
      phone : <input onChange={handleNumberChange} value={newPhone} />
      <br /> <br />
      <button type='submit'>Add</button>
    </form>
  )
}

const DisplayContact = ({ name, phone }) => (
  <p>
    {name} {phone}
  </p>
)

const App = () => {
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
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])
  console.log('rendered', persons.length, 'persons')

  const searchContacts = (event) => {
    event.preventDefault()
    console.log(newSearch)
    const term = newSearch.toLocaleLowerCase()
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

    const obj = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(obj))
    setNewName('')
    setNewNumber('')
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
