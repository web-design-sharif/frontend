import { useState } from 'react';
import { createUser } from '../api/users';

interface ApiError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export const useSignUp = () => {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isStrongPassword = (pwd: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pwd);
  };
  
  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    let valid = true;
    const newErrors = { email: '', password: '', confirm: '' };
    
    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format.';
      valid = false;
    }
    
    if (!isStrongPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long and include both letters and numbers.';
      valid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match.';
      valid = false;
    }
    
    if (!valid) {
      setErrors(newErrors);
      return false;
    }
    
    try {
      await createUser({ email, password });
      return true;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      if (apiError.response?.status === 409) {
        setErrors({ ...newErrors, email: 'Email already registered.' });
      } else {
        setErrors({ 
          ...newErrors, 
          email: apiError.response?.data?.message || 'Registration failed. Please try again.' 
        });
      }
      return false;
    }
  };
  
  return { signUp, errors };
};
