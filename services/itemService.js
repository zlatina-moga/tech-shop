import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getSingleItem = (id) => request.get(`${baseUrl}/laptop/refurbished-1/${id}`)