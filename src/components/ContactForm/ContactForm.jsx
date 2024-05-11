import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'store/contacts/slice';

const defaultState = { name: '', number: '' };

const ContactForm = () => {
  const [state, setState] = useState(defaultState);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = state;
    const contact = {
      name: name.trim(),
      phone: number,
    };
    dispatch(addContact(contact));
    setState(defaultState);
  };

  const handleChange = e => {
    const { name } = e.target;
    setState({ ...state, [name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Name</label>
      <input
        type="tel"
        name="number"
        value={state.number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
