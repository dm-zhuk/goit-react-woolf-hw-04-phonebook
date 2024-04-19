import React, { useState } from 'react';
import { Form, Label, Input, SubmitButton } from './index';

const ContactForm = ({ onAddContact }) => {
  const [contact, setContact] = useState({ name: '', number: '' });

  //  ⨐ uses the contact state to pass the name and number values to the onAddContact ⨐
  const handleSubmit = evt => {
    evt.preventDefault();
    onAddContact(contact.name, contact.number);
    setContact({ name: '', number: '' });
  };

  //  to update the respective property when the input values change
  const handleChange = evt => {
    const { name, value } = evt.target;
    setContact(prevContact => ({ ...prevContact, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Name:</Label>
      <Input
        type="text"
        name="name"
        pattern="^[a-zєіїA-Zа-яА-ЯІ]+(([' \-][a-zA-Zа-яєіїА-ЯІ ])?[a-zA-Zа-яєіїА-ЯІ]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={contact.name}
        onChange={handleChange} //  now consolidating the state into a single object and using the same `handleChange`⨐ for both inputs
        required
      />
      <Label>Number:</Label>
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
        value={contact.number}
        onChange={handleChange}
        required
      />
      <SubmitButton type="submit">Add Contact</SubmitButton>
    </Form>
  );
};

export default ContactForm;
