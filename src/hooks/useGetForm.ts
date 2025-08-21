import { useState } from 'react';
import { getFormById } from '../api/forms';
import { useAuth } from './useAuth';
import { Form } from '../types';
import { getItem } from '../utils/storage';

interface ApiError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export const useGetForm = () => {
  const [error, setError] = useState<null | string>(null);
  const [form, setForm] = useState<Form>();

  const getForm = async (form_id: number) => {
    if (!getItem('jwt')) return;

    try {
      const responseForm = await getFormById(form_id);
      setForm(responseForm);
      
      return responseForm;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 403) {
        setError('You are not authorized to answer this form');
        return false;
      } else {
        setError('Form not found');
        return false;
      }
    }
  };

  return {error, getForm};
};
