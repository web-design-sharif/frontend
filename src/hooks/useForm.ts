import { useFormContext } from '../context/FormContext';

export const useForm = () => {
  const { form, select, unselect, isLoading } = useFormContext();
  return { form, select, unselect, isSelected: !!form, isLoading };
};
