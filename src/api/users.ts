import axios from 'axios';

const API_URL = 'http://185.226.119.237/:8080';

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(`${API_URL}`, {
    params: { email },
  });
  return response.data;
};

export const createUser = async (user: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/sign-up`, user);
  return response.data;
};

export const loginUser = async (user: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/sign-in`, user);
  return response.data;
};
