import { useEffect, useState } from 'react';
import { Form } from '../types';
import { getForms } from '../api/forms';
import { useAuth } from './useAuth';

export const useUserAnsweredForms = () => {
  const [allForms, setForms] = useState<Form[]>([]);
  const [loadingAll, setLoading] = useState(true);
  const [errorAll, setError] = useState<null | string>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchForms = async () => {
      if (!user) return;

      try {
        const allForms = await getForms();
        const myForms = allForms;
        setForms(myForms);
      } catch (err) {
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [user]);

  return { allForms, loadingAll, errorAll };
};
