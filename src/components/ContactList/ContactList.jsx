import Loader from 'components/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'store/contacts/slice';
import { getContacts, getFilteredContacts } from 'store/selectors';

export const ContactList = () => {
  const { items, isLoading, error } = useSelector(getContacts);
  const contacts = useSelector(getFilteredContacts);
  // console.log(items, isLoading, error);
  console.log(contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContactById = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {`${contact.name}: ${contact.phone}`}

          <button onClick={() => deleteContactById(contact.id)}>Delete</button>
        </li>
      ))}
      {isLoading && <Loader />}
    </ul>
  );
};
