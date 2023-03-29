import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const register = async (name, email, password) => {
  let res = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let jsonResult = await res.json();

  if (res.ok) {
    return jsonResult;
  } else {
    throw jsonResult.message;
  }
};

export const login = async (email, password) => {
  let res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let jsonResult = await res.json();

  if (res.ok) {
    return jsonResult;
  } else {
    throw jsonResult.message;
  }
};

export const logout = (token) => {
  return fetch(`${baseUrl}/auth/logout`, {
    headers: {
      "X-Authorization": token,
    },
  });
};
