//const baseUrl = "http://localhost:5500";
//const baseUrl = 'https://pc-bun-api.herokuapp.com';
const baseUrl = "https://pc-bun-api.onrender.com";

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

export const getOne = async (id) => {
  let result = await fetch(`${baseUrl}/auth/profile/${id}`);
  return result.json();
};

export const update = (id, userData, token) => {
  return fetch(`${baseUrl}/auth/profile/${id}`, {
    method: "PUT",
    headers: {
      "X-Authorization": token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userData),
  });
};

export const del = (userId, token) => {
  return fetch(`${baseUrl}/auth/profile/${userId}`, {
    method: "DELETE",
    headers: {
      "X-Authorization": token,
    },
  });
};

export const passwordReset = async (email) => {
  let res = await fetch(`${baseUrl}/auth/reset`, {
    method: "POST",
    body: JSON.stringify({ email }),
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
}

export const passwordUpdate = async (userId, token, password) => {
  let res = await fetch(`${baseUrl}/auth/new-password`, {
    method: "POST",
    body: JSON.stringify({ userId, token, password }),
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
}