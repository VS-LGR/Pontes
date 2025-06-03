const USERS_KEY = 'pontes_users';
const CURRENT_USER_KEY = 'pontes_current_user';

export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  if (users.find(u => u.email === user.email)) {
    throw new Error('E-mail já cadastrado');
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('E-mail ou senha inválidos');
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateUser(updatedUser) {
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  users = users.map(u => u.email === updatedUser.email ? updatedUser : u);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
} 