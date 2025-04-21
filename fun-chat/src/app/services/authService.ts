import { authenticateUserApi, logoutUserApi } from '../API/authAPI'
import router from '../utils/router';
import AuthError from '../views/authenticationView/authError';

export async function loginUser(usernameInput: string, passwordInput: string): Promise<void> {
  try {
    await authenticateUserApi(usernameInput, passwordInput);
    router.navigate('chat');
  } catch (error) {
    const message = typeof error === 'string' ? error : 'Unknown error';
    const errorView = new AuthError(message).getView();
    document.body.append(errorView);
  }
}

export function checkLoginValid(login: string): string | 'ok' {
  if (login.length < 4 ) {
    return 'enter at least 4 characters';
  }
  if ( login.length > 14) {
    return 'enter no more than 14 characters';
  }
  return 'ok';
}

export function checkPasswordValid(password: string): string | 'ok' {
  if (password === password.toLowerCase()) {
    return 'enter at least 4 characters with one capital letter';
  } if (password.length < 4) {
    return 'enter at least 4 characters';
  }
  return 'ok';
}

export async function logoutUser(username: string, password: string): Promise<void> {
  try {
    await logoutUserApi(username, password);
    router.navigate('login');
  } catch (error) {
    const message = typeof error === 'string' ? error : 'Unknown error';
    const errorView = new AuthError(message).getView();
    document.body.append(errorView);
  }
}