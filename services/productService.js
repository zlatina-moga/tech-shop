import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getAllLaptops = () => request.get(`${baseUrl}/laptopuri`)

export const getAllSecondHandLaptops = () => request.get(`${baseUrl}/laptopuri-second-hand`)

export const getAllRefurbishedLaptops = () => request.get(`${baseUrl}/laptopuri-refurbished`)

export const getAllNewLaptops = () => request.get(`${baseUrl}/laptopuri-new`)

export const getAllComputers = () => request.get(`${baseUrl}/calculatoare`)

export const getAllSecondHandComputers = () => request.get(`${baseUrl}/calculatoare-second-hand`)

export const getAllNewComputers = () => request.get(`${baseUrl}/calculatoare-new`)

export const getAllRefurbishedComputers = () => request.get(`${baseUrl}/calculatoare-refurbished`)