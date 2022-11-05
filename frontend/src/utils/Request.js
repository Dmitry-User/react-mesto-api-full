const BASE_URL = "https://goodplaces.nomoredomains.icu";

export const request = ({ url, method, token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }), // опциональное добавление поля в бЪект
  })
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
