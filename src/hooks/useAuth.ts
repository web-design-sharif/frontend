import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, login, logout, isLoading } = useAuthContext();
  return { user, login, logout, isLoggedIn: !!user, isLoading };
};
