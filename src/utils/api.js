const api = "http://localhost:3001";

const headers = {
  Accept: "application/json",
  Authorization: "Auth"
};

export const get = id =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());

export const getAll = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const update = id =>
  fetch(`${api}/post/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(res => res.json());

export const search = query =>
  fetch(`${api}/post`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    

export default api;
