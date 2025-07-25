import { useState } from 'react';
import { create } from '../api/forms';
import { useAuth } from './useAuth';
import { Form } from '../types';

interface ApiError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export const useCreate = () => {
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuth();

  const createForm = async (form: Form) => {
    if (!user) return;

    try {
      const response = await create(user.id, form);
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 404) {
        setError('Please Enter Valid User Emails.');
        return false;
      } else {
        setError('Unknown Error: ' + apiError);
        return false;
      }
    }
  };

  return {error, createForm};
};
