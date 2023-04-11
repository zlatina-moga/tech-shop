const baseUrl = "http://localhost:5500";
//const baseUrl = 'https://pc-bun.herokuapp.com/';

export const create = async (orderData) => {
  let res = await fetch(`${baseUrl}/order`, {
    method: "POST",
    headers: {
      //"X-Authorization": token,
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
