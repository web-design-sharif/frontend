import axios from 'axios';
import { Form } from '../types';

export const getForms = async (): Promise<Form[]> => {
  const response = await axios.get<Form[]>('http://localhost:3000/forms');
  return response.data;
};
