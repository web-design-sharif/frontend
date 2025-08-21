import { useEffect, useState } from 'react';
import { Form } from '../types';
import { getPendingForms } from '../api/forms';
import { useAuth } from './useAuth';
import { getItem } from '../utils/storage';

export const useUserAnsweredForms = () => {
  const [allForms, setForms] = useState<Form[]>([]);
  const [loadingAll, setLoading] = useState(true);
  const [errorAll, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchForms = async () => {
      if (!getItem('jwt')) return;

      try {
        const allForms = await getPendingForms();
        // allForms.forEach(form => {form.updatedAt = form.updatedAt + 'Z'});
        setForms(allForms);
      } catch (err) {
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [getItem('jwt')]);

  return { allForms, loadingAll, errorAll };
};
