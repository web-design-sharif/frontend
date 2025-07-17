import { useState } from 'react';
import { deleteFormApi } from '../api/forms';
import { useAuth } from './useAuth';

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
  const { user } = useAuth();

  const deleteForm = async (form_id: number) => {
    if (!user) return;

    try {
      const response = await deleteFormApi(user.id, form_id);
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
