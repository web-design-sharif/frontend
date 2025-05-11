import { useState } from 'react';
import { getUserByEmail, createUser } from '../api/users';

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
      newErrors.password =
      'Password must be at least 8 characters long and include both letters and numbers.';
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
    
    const existing = await getUserByEmail(email);
    if (existing.length > 0) {
      setErrors({ ...newErrors, email: 'Email already registered.' });
      return false;
    }
    
    await createUser({ email, password });
    return true;
  };
  
  return { signUp, errors };
};
