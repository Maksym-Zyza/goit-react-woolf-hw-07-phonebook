import testData from '../Data/testData.json';

export const getDataFromLs = () => {
  const localData = localStorage.getItem('contacts');
  return localData ? JSON.parse(localData) : testData;
};
