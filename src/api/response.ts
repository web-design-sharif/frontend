import { CreateFormResponse, FormResponse } from '../types';
import axios from 'axios';

const API_URL = 'http://localhost:8080/response';

export const submit = async (createFormResponse: CreateFormResponse) => {
  const response = await axios.post(`${API_URL}/submit`, createFormResponse);
  return response.data;
};

export const getAllResponses = async (owner_id: number, form_id: number) => {
  const response = await axios.get<FormResponse[]>(`${API_URL}/all-responses`, { params: {userId: owner_id, formId: form_id} });
  return response.data;
};
