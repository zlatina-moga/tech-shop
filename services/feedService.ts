const baseUrl = "http://localhost:5500";
//const baseUrl = 'https://pc-bun-api.herokuapp.com';
//const baseUrl = "https://pc-bun-api.onrender.com";


//14400000
setInterval(() => {

}, 60000)

export const generate = async (data) => {
  let res = await fetch(`${baseUrl}/feed/servere`, {
    method: "POST",
    body: JSON.stringify(data),
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
