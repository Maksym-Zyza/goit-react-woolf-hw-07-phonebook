import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsAction, deleteAction } from 'store/contacts/slice';
import { getContacts, getFilterValue } from 'store/selectors';

export const ContactList = () => {
  const { items, isLoading, error } = useSelector(getContacts);
  const { filter } = useSelector(getFilterValue);
  console.log(items, isLoading, error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsAction());
  }, [dispatch]);

  const filteredContacts = () =>
    items.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()));

  const deleteContactById = id => {
    dispatch(deleteAction(id));
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
