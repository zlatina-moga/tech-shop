//const baseUrl = "http://localhost:5500";
const baseUrl = "https://pc-bun-api.onrender.com";
import * as request from "./requester";

export const create = async (orderData) => {
  let res = await fetch(`${baseUrl}/order`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  let jsonResult = await res.json();

  if (res.ok) {
    return jsonResult;
  } else {
    throw jsonResult.message;
  }
};

export const checkOrderStatus = async () => {
  let res = await fetch(`${baseUrl}/order/success`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  return res;
};

export const verify = () => request.get(`${baseUrl}/order/success`)
