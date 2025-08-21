import { useState } from 'react';
import { deleteFormApi } from '../api/forms';
import { useAuth } from './useAuth';
import { getItem } from '../utils/storage';

interface ApiError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export const useDelete = () => {
  const [error, setError] = useState<null | string>(null);

  const deleteForm = async (form_id: number) => {
    if (!getItem('jwt')) return;

    try {
      const response = await deleteFormApi(form_id);
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 403) {
        setError('You are not authorized to delete this form');
        return false;
      } else {
        setError('Form not found');
        return false;
      }
    }
  };

  return {error, deleteForm};
};
