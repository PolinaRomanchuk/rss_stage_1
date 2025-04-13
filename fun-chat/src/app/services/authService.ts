import { authenticateUser } from '../API/authAPI'
import { setAuth } from '../states/authState';
import router from '../utils/router';
import AuthError from '../views/authenticationView/authError';

export async function authUser(usernameInput: string, passwordInput: string) {
  try {
    await authenticateUser(usernameInput, passwordInput);
    setAuth(true);
    router.navigate('chat');
  } catch (error) {
    const message = typeof error === 'string' ? error : 'Unknown error';
    const errorView = new AuthError(message).getView();
    document.body.append(errorView);
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


