import axios from 'axios';
import { Form } from '../types';

const API_URL = 'http://188.121.110.51:8080/form';

export const getMyForms = async (owner_id: number): Promise<Form[]> => {
  const response = await axios.get<Form[]>(`${API_URL}/my-forms`, { params: { userId: owner_id } });
  return response.data;
};

export const getPendingForms = async (owner_id: number): Promise<Form[]> => {
  const response = await axios.get<Form[]>(`${API_URL}/pending-forms`, { params: { userId: owner_id } });
  return response.data;
};

export const publish = async (owner_id: number, form_id: number) => {
  const response = await axios.post<Form[]>(`${API_URL}/publish`, { userId: owner_id, formId: form_id });
  return response.data;
};

export const deleteFormApi = async (owner_id: number, form_id: number) => {
  const response = await axios.delete<Form[]>(`${API_URL}/delete`, { params: {userId: owner_id, formId: form_id} });
  return response.data;
};

export const getFormById = async (owner_id: number, form_id: number): Promise<Form> => {
  const response = await axios.get<Form>(`${API_URL}/id`, { params: {userId: owner_id, formId: form_id} });
  return response.data;
};

export const create = async (owner_id: number, form: Form) => {
  const response = await axios.post<Form[]>(`${API_URL}/create`, { userId: owner_id, formDTO: form });
  return response.data;
};
