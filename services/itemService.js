import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getRefurnishedLaptop = (id) => request.get(`${baseUrl}/laptop/refurbished-1/${id}`)

export const getSecondHandLaptop = (id) => request.get(`${baseUrl}/laptop/second-hand-1/${id}`)

export const getNewLaptop = (id) => request.get(`${baseUrl}/laptop/noi-1/${id}`)

export const getRefurnishedComp = (id) => request.get(`${baseUrl}/calculatoare/refurbished/${id}`)