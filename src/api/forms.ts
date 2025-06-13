import axios from 'axios';
import { Form } from '../types';

const API_URL = 'http://localhost:3000/form';

export const getMyForms = async (owner_id: number): Promise<Form[]> => {
  const response = await axios.post<Form[]>(`${API_URL}/my-forms`, { ownerId: owner_id });
  return response.data;
};

export const getPendingForms = async (owner_id: number): Promise<Form[]> => {
  const response = await axios.post<Form[]>(`${API_URL}/pending-forms`, { ownerId: owner_id });
  return response.data;
};

export const publish = async (owner_id: number, form_id: number) => {
  const response = await axios.post<Form[]>(`${API_URL}/publish`, { ownerId: owner_id, formId: form_id });
  return response.data;
};

export const deleteForm = async (owner_id: number, form_id: number) => {
  const response = await axios.post<Form[]>(`${API_URL}/delete`, { ownerId: owner_id, formId: form_id });
  return response.data;
};

export const getFormById = async (owner_id: number, form_id: number) => {
  const response = await axios.post<Form[]>(`${API_URL}/id`, { ownerId: owner_id, formId: form_id });
  return response.data;
};
