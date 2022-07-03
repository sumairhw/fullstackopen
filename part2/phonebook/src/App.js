import { useState, useEffect } from 'react';
import axios from 'axios';

import PersonForm from './components/form';
import DisplayContact from './components/contact';
import FilterForm from './components/filter';
import contactUtils from './services/contactUtils';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setSearch] = useState('');
  const [showFiltered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  useEffect(() => {
    console.log('effect');
    contactUtils.getAll().then((initialContacts) => setPersons(initialContacts));
  }, []);
  console.log('rendered', persons.length, 'persons');

  const searchContacts = (event) => {
    event.preventDefault();
    console.log(newSearch);
    const term = newSearch.toLowerCase();
    const filteredList = persons.filter((p) => p.name.toLowerCase().indexOf(term) !== -1);

    setFiltered(true);
    setFilteredList(filteredList);
    setSearch('');
  };

  const deleteContact = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      contactUtils.remove(person.id).then((response) => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const updateContact = (contact) => {
    if (
      window.confirm(
        `${contact.name} is already added to the phonebook, replace the old number with the new one?`
      )
    ) {
      const changedContact = { ...contact, number: newNumber };
      contactUtils.update(contact.id, changedContact).then((changedContact) => {
        setPersons(persons.map((p) => (changedContact.id !== p.id ? p : changedContact)));
      });
    }
    console.log(contact);
    setNewName('');
  };

  const addNewContact = (event) => {
    event.preventDefault();
    const contacts = persons.filter((p) => p.name === newName);

    if (contacts.length === 1) {
      updateContact(contacts[0]);
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    };

    contactUtils.addContact(newContact).then((returnedContact) => {
      setPersons(persons.concat(returnedContact));
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <FilterForm onSubmit={searchContacts} onChange={handleSearchChange} />
      {showFiltered && filteredList.length
        ? filteredList.map((person) => (
            <DisplayContact name={person.name} phone={person.number} key={person.number} />
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
          key={person.id}
          onClick={() => deleteContact(person)}
        />
      ))}
    </div>
  );
};

export default App;
