import { useEffect, useState } from 'react';
import { Form } from '../types';
import { getMyForms } from '../api/forms';
import { useAuth } from './useAuth';
import { getItem } from '../utils/storage';

export const useUserForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchForms = async () => {
      if (!getItem('jwt')) return;

      try {
        const myForms = await getMyForms();
        // myForms.forEach(form => {form.updatedAt = form.updatedAt + 'Z'});
        setForms(myForms);
      } catch (err) {
        setError('Failed to load forms');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [getItem('jwt')]);

  return { forms, loading, error };
};
