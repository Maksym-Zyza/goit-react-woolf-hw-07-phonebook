import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'store/contacts/slice';
import { getContacts, getFilteredContacts } from 'store/selectors';
import Error from 'components/Error/Error';
import Loader from 'components/Loader/Loader';

export const ContactList = () => {
  const { isLoading, error } = useSelector(getContacts);
  const contacts = useSelector(getFilteredContacts);

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
      {error && <Error error={error} />}
    </ul>
  );
};
