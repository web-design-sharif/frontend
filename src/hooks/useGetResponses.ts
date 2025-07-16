import { useEffect, useState } from 'react';
import { FormResponse } from '../types';
import { useAuth } from './useAuth';
import { getAllResponses } from '../api/response';
import { useForm } from './useForm';

export const useGetResponses = () => {
  const [allResponses, setAllResponses] = useState<FormResponse[]>([]);
  const [loadingAll, setLoading] = useState(true);
  const [errorAll, setError] = useState<null | string>(null);
  const { user } = useAuth();
  const { form } = useForm();

  useEffect(() => {
    const fetchResponses = async () => {
      if (!user || !form) return;

      try {
        const allAnswers = await getAllResponses(user.id, form.id);
        setAllResponses(allAnswers);
      } catch (err) {
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [user, form]);

  return { allResponses, loadingAll, errorAll };
};
