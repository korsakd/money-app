import { regexpEmail } from './regExp';

export const validation = (
  email: string,
  password: string,
  setError: (value: string) => void,
  repPassword?: string,
): boolean => {
  if (email === '') {
    setError('empty-email');
    return false;
  } else if (!regexpEmail.test(email)) {
    setError('incorrectly-email');
    return false;
  } else if (password === '') {
    setError('empty-password');
    return false;
  } else if (password.length < 6) {
    setError('short-password');
    return false;
  } else if (repPassword && repPassword !== password) {
    setError('password_mismatch');
    return false;
  }
  return true;
};
