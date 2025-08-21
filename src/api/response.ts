import { getItem } from '../utils/storage';
import { CreateFormResponse, FormResponse } from '../types';
import axios from 'axios';

const API_URL = 'http://185.226.119.237:8080/response';

export const submit = async (createFormResponse: CreateFormResponse) => {
  const token = getItem("jwt");
  const response = await axios.post(`${API_URL}/submit`, createFormResponse, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getAllResponses = async (form_id: number) => {
  const token = getItem("jwt");
  const response = await axios.get<FormResponse[]>(`${API_URL}/${form_id}/responses`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
