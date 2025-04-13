let isAuthenticated = false;

export function setAuth(status: boolean) {
  isAuthenticated = status;
}

export function getAuth(): boolean {
  return isAuthenticated;
}