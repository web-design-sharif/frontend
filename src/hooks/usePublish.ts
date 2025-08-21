import { useState } from 'react';
import { publish } from '../api/forms';
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

export const usePublish = () => {
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuth();

  const publishForm = async (form_id: number) => {
    if (!getItem('jwt')) return;

    try {
      const response = await publish(form_id);
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 403) {
        setError('You are not authorized to publish this form');
        return false;
      } else {
        setError('Form not found');
        return false;
      }
    }
  };

  return {error, publishForm};
};
