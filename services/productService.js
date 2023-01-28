import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getAllSecondHandLaptops = () => request.get(`${baseUrl}/laptopuri-second-hand`)