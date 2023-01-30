import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getAllSecondHandLaptops = () => request.get(`${baseUrl}/laptopuri-second-hand`)

export const getAllRefurbishedLaptops = () => request.get(`${baseUrl}/laptopuri-refurbished`)

export const getAllNewLaptops = () => request.get(`${baseUrl}/laptopuri-new`)