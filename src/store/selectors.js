import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts;

export const getFilterValue = state => state.filter;

export const getFilteredContacts = createSelector(
  [getContacts, getFilterValue],
  ({ items }, { filter }) => {
    return items?.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
