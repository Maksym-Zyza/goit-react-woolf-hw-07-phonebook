const BASE_URL =
  'https://663f5fa6e3a7c3218a4cec8c.mockapi.io/contacts/contacts';

export const fetchData = async (path, method, body) => {
  const headers = { 'Content-type': 'application/json' };
  const init = { headers, method, body };
  const resp = await fetch(path, init);
  if (!resp.ok) {
    throw new Error(`Error: status: ${resp.status}, ${resp.statusText}`);
  }
  return resp.json();
};

export const fetchApi = {
  async getContacts(contactsParams) {
    const params = new URLSearchParams(contactsParams);
    const url = `${BASE_URL}/?${params}`;
    return await fetchData(url);
  },
  async createContact(contactBody) {
    const method = 'POST';
    const url = `${BASE_URL}`;
    const body = JSON.stringify(contactBody);
    return await fetchData(url, method, body);
  },
  async updateContact(id, contactBody) {
    const method = 'PUT';
    const url = `${BASE_URL}/${id}`;
    const body = JSON.stringify(contactBody);
    return await fetchData(url, method, body);
  },
  async deleteContact(id) {
    const method = 'DELETE';
    const url = `${BASE_URL}/${id}`;
    return await fetchData(url, method);
  },
};
