import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(`${API_URL}`, {
    params: { email },
  });
  return response.data;
};

export const createUser = async (user: { email: string; password: string }) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
