import { useEffect, useState } from 'react';
import { Form } from '../types';
import { getMyForms } from '../api/forms';
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
        const myForms = await getMyForms(user.id);
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
  }, [user]);

  return { forms, loading, error };
};
