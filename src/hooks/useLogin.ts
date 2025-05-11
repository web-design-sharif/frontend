import { useState } from 'react';
import { getUserByEmail } from '../api/users';

export const useLogin = () => {
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
      const users = await getUserByEmail(email);
      const user = users[0];

      if (!user) {
        setErrors({ ...newErrors, email: 'User not found' });
        return false;
      }

      if (user.password !== password) {
        setErrors({ ...newErrors, password: 'Incorrect password' });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  return { login, errors };
};
