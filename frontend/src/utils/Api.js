import { request } from './Request';

export const setUserInfo = (name, about) => {
  return request({
    url: '/users/me',
    method: 'PATCH',
    data: { name, about },
  });
};

export const getUserInfo = () => {
  return request({
    url: '/users/me',
    method: 'GET',
  });
};

export const setAvatar = (avatar) => {
  return request({
    url: '/users/me/avatar',
    method: 'PATCH',
    data: { avatar },
  });
};

export const getInitialCards = () => {
  return request({
    url: '/cards',
    method: 'GET',
  });
};

export const addCard = (name, link) => {
  return request({
    url: '/cards',
    method: 'POST',
    data: { name, link },
  });
};

export const deleteCard = (cardId) => {
  return request({
    url: `/cards/${cardId}`,
    method: 'DELETE',
  });
};

export const changeLikeCardStatus = (cardId, isLiked) => {
  return request({
    url: `/cards/${cardId}/likes`,
    method: isLiked ? 'PUT' : 'DELETE',
  });
};
