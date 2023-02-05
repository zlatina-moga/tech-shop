import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getAllLaptops = (page) => request.get(`${baseUrl}/laptopuri?page=${page}`)

export const getAllSecondHandLaptops = (page) => request.get(`${baseUrl}/laptopuri-second-hand?page=${page}`)

export const getAllRefurbishedLaptops = (page) => request.get(`${baseUrl}/laptopuri-refurbished?page=${page}`)

export const getAllNewLaptops = (page) => request.get(`${baseUrl}/laptopuri-new?page=${page}`)

export const getAllComputers = (page) => request.get(`${baseUrl}/calculatoare?page=${page}`)

export const getAllSecondHandComputers = (page) => request.get(`${baseUrl}/calculatoare-second-hand?page=${page}`)

export const getAllNewComputers = (page) => request.get(`${baseUrl}/calculatoare-new?page=${page}`)

export const getAllRefurbishedComputers = (page) => request.get(`${baseUrl}/calculatoare-refurbished?page=${page}`)

export const getAllServers = (page) => request.get(`${baseUrl}/servere?page=${page}`)