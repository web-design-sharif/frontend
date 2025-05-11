const API_URL = 'http://localhost:3001/users';

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`${API_URL}?email=${email}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export const createUser = async (user: { email: string; password: string }) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};
