const BASE_URL = 'https://api.goodplaces.nomoredomains.icu';

export const request = ({ url, method, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...(!!data && { body: JSON.stringify(data) }),
  })
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
