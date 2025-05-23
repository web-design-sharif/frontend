import { useEffect, useState } from 'react';
import { Form } from '../types';
import { getForms } from '../api/forms';
import { useAuth } from './useAuth';

export const useUserForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchForms = async () => {
      if (!user) return;

      try {
        const allForms = await getForms();
        const myForms = allForms.filter(form => form.owner_id === user.id.toString());
        setForms(myForms);
      } catch (err) {
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [user]);

  return { forms, loading, error };
};
