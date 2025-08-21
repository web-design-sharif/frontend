import axios from 'axios';
import { Form } from '../types';
import { getItem } from '../utils/storage';

const API_URL = 'http://185.226.119.237:8080/forms';

export const getMyForms = async (): Promise<Form[]> => {
  const token = getItem("jwt");
  const response = await axios.get<Form[]>(`${API_URL}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getPendingForms = async (): Promise<Form[]> => {
  const token = getItem("jwt");
  const response = await axios.get<Form[]>(`${API_URL}/pending`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const publish = async (form_id: number) => {
  const token = getItem("jwt");
  console.log("Token:", token);
  const response = await axios.post<Form[]>(`${API_URL}/${form_id}/publish`, {}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteFormApi = async (form_id: number) => {
  const token = getItem("jwt");
  const response = await axios.delete<Form[]>(`${API_URL}/${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getFormById = async (owner_id: number, form_id: number): Promise<Form> => {
  const token = getItem("jwt");
  const response = await axios.get<Form>(`${API_URL}/id`, { params: {userId: owner_id, formId: form_id}, headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const create = async (form: Form) => {
  const token = getItem("jwt");
  const response = await axios.post<Form[]>(`${API_URL}`, { formDTO: form }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
