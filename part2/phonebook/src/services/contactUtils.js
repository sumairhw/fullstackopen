import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addContact = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact);
  return request.then((response) => response.data).catch((error) => console.log(error));
};

export default { getAll, addContact, remove, update };
