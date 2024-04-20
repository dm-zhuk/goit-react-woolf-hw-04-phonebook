import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Title, SubTitle } from './index';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleAddContact = (name, number) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      toast.warning(`🚫 ${name} is already in contacts!`);
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

  //  `useEffect` - instead od prev React components Lifecycle Methods -didMount,-didUpdate
  //  `useEffect` hook is used to load the contacts from local storage when the component mounts and save the contacts to local storage whenever the contacts state changes
  useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    const parsedContacts = localStorageContacts
      ? JSON.parse(localStorageContacts)
      : [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
