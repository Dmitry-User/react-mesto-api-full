import { request } from './Request';

export const register = (password, email) => {
  return request({
    url: '/signup',
    method: 'POST',
    data: { password, email },
  });
};

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    method: 'POST',
    data: { password, email },
  });
};

export const getToken = () => {
  return request({
    url: '/users/me',
    method: 'GET',
  });
};

export const logout = () => {
  return request({
    url: '/signout',
    method: 'GET',
  });
};
