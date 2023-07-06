const baseUrl = "http://localhost:5500";
//const baseUrl = "https://pc-bun-api.onrender.com";

export const generate = async (data, products) => {
  try {
    await fetch(`${baseUrl}/feed/${products}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return;
  } catch (err) {
    console.log(err);
  }
};
