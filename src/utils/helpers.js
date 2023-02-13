import { isEmpty } from 'lodash';

export const validateEmail = (email) => {
  if (isEmpty(email)) return 'Email Field is required.';
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !emailRegex.test(email) ? 'Invalid email' : '';
};

export const validatePassword = (password) => {
  if (isEmpty(password)) return 'Password Field is required.';
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return !passwordRegex.test(password) ? 'Password not strong.' : '';
};
