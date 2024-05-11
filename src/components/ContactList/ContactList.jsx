import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'store/contacts/slice';
import { getContacts, getFilterValue } from 'store/selectors';

export const ContactList = () => {
  const { contacts } = useSelector(getContacts);
  const { filter } = useSelector(getFilterValue);

  const dispatch = useDispatch();

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContactById = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filteredContacts().map(contact => (
        <li key={contact.id}>
          {`${contact.name}: ${contact.number}`}

          <button onClick={() => deleteContactById(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
