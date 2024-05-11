import React from 'react';
import { Toaster } from 'react-hot-toast';

import './App.scss';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
};
