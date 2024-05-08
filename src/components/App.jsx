import css from './App.module.css';
import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import NoContactsMessage from './Message/Message';
import Filter from '../components/Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [
      {
        id: (Math.random() * 1000).toFixed(32),
        name,
        number,
      },
      ...prevContacts,
    ]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      <h1 className={css.headText}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.headText}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length === 0 ? (
        <p className={css.messageNotAdd}>
          Your phonebook is empty. Add new contact
        </p>
      ) : visibleContacts.length === 0 ? (
        <NoContactsMessage name={filter} />
      ) : (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </div>
  );
}

export default App;
