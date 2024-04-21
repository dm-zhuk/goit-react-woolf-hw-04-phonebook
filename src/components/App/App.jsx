import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Title, SubTitle } from './index';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    return JSON.parse(localStorageContacts) || [];
  }); // by passing ⨐ to `useState` we can lazily initialize the state with the parsed data from localStorage. This eliminates the need for the `useEffect` with the empty dependencies array
  /* useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    const parsedContacts = localStorageContacts
      ? JSON.parse(localStorageContacts)
      : [];
    setContacts(parsedContacts);
  }, []); */

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const handleAddContact = (name, number) => {
    const isExist = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isExist) {
      toast.warning(`${name} or tel. ${number} is already in contacts list!`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Container>
      <ToastContainer />
      <Title>✆ Phonebook ✆</Title>
      <ContactForm onAddContact={handleAddContact} />
      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
