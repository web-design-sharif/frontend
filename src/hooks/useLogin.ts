import { useState } from 'react';
import { loginUser } from '../api/users';
import { useAuth } from './useAuth';

interface ApiError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export const useLogin = () => {
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login: setAuthUser } = useAuth();
  
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    const newErrors = { email: '', password: '' };
    let valid = true;
    
    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password cannot be empty';
      valid = false;
    }
    
    if (!valid) {
      setErrors(newErrors);
      return false;
    }
    
    try {
      const user = await loginUser({ email, password });
      setAuthUser({ id: user.id, email: user.email });
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 401) {
        setErrors({ ...newErrors, password: 'Wrong Password' });
      } else {
        setErrors({ 
          ...newErrors, 
          password: apiError.response?.data?.message || 'Login failed. Please try again.' 
        });
      }
      return false;
    }
    
    
  };
  
  return { login, errors };
};
