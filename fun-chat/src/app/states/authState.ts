const LOGIN_KEY = 'user-login';
const PASSWORD_KEY = 'user-password';


export function setAuthUser(login: string, password: string): void {
  sessionStorage.setItem(LOGIN_KEY, login);
  sessionStorage.setItem(PASSWORD_KEY, password);
}

export function getAuthUserLogin(): string | null {
  return sessionStorage.getItem(LOGIN_KEY);
}

export function getAuthUserPassword(): string | null {
  return sessionStorage.getItem(PASSWORD_KEY);
}

export function isAuthenticated(): boolean {
  return getAuthUserLogin() !== null;
}

export function clearAuth(): void {
  sessionStorage.removeItem(LOGIN_KEY);
  sessionStorage.removeItem(PASSWORD_KEY);
}