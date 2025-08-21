import { useEffect, useState } from 'react';
import { FormResponse } from '../types';
import { useAuth } from './useAuth';
import { getAllResponses } from '../api/response';
import { useForm } from './useForm';
import { getItem } from '../utils/storage';

export const useGetResponses = () => {
  const [allResponses, setAllResponses] = useState<FormResponse[]>([]);
  const [loadingAll, setLoading] = useState(true);
  const [errorAll, setError] = useState<null | string>(null);
  const { form } = useForm();

  useEffect(() => {
    const fetchResponses = async () => {
      if (!getItem('jwt') || !form) return;

      try {
        const allAnswers = await getAllResponses(form.id);
        setAllResponses(allAnswers);
      } catch (err) {
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [getItem('jwt'), form]);

  return { allResponses, loadingAll, errorAll };
};
