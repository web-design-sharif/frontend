import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';
import { Form } from '../types';

type FormContextType = {
  form: Form | null;
  select: (form: Form) => void;
  unselect: () => void;
  isLoading: boolean;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedForm = getItem('form');
    if (storedForm) setForm(storedForm);
    setIsLoading(false);
  }, []);

  const select = (form: Form) => {
    setForm(form);
    setItem('form', form);
  };

  const unselect = () => {
    setForm(null);
    removeItem('form');
  };

  return (
    <FormContext.Provider value={{ form, select, unselect, isLoading }}>
      {children}
    </FormContext.Provider>
  );
};


export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within FormProvider');
  return context;
};
