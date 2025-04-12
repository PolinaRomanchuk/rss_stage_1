import { authenticateUser } from '../API/authAPI'
import router from '../utils/router';

export async function authUser(usernameInput: string, passwordInput: string) {
  try {
    await authenticateUser(usernameInput, passwordInput);
    router.navigate('chat');
  } catch (error) {
    console.error(error);
  }
}

export function isLoginValid(login: string): string | 'ok' {
  if (login.length < 4) {
    return 'enter at least 4 characters';
  }
  return 'ok';
}

export function isPasswordValid(password: string): string | 'ok' {
  if (password === password.toLowerCase()) {
    return 'enter at least 4 characters with one capital letter';
  } if (password.length < 4) {
    return 'enter at least 4 characters';
  }
  return 'ok';
}