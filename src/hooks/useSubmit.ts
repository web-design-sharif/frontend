import { useState } from 'react';
import { FormResponse } from '../types';
import { submit } from '../api/response';

interface ApiError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export const useSubmit = () => {
  const [error, setError] = useState<null | string>(null);

  const submitForm = async (formResponse: FormResponse) => {
    try {
      const response = await submit({userId: formResponse.responderId, formId: formResponse.formId, formResponse: formResponse});
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 404) {
        setError(apiError.message);
        return false;
      } else {
        setError('Unknown Error');
        return false;
      }
    }
  };

  return {error, submitForm};
};
