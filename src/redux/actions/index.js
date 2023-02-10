export const ADD_DATA_USER = 'ADD_DATA_USER';

export const addNameEmail = (email, name) => ({
  type: ADD_DATA_USER,
  email,
  name,
});
