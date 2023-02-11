import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getRefurbishedLaptop = (id) => request.get(`${baseUrl}/laptop/refurbished-1/${id}`)

export const getSecondHandLaptop = (id) => request.get(`${baseUrl}/laptop/second-hand-1/${id}`)

export const getNewLaptop = (id) => request.get(`${baseUrl}/laptop/noi-1/${id}`)

export const getRefurbishedComp = (id) => request.get(`${baseUrl}/calculatoare/refurbished/${id}`)

export const getSecondHandComp = (id) => request.get(`${baseUrl}/calculatoare/second-hand/${id}`)

export const getNewComp = (id) => request.get(`${baseUrl}/calculatoare/noi/${id}`)

export const getRefurbishedWorkstation = (id) => request.get(`${baseUrl}/workstation/refurbished-3/${id}`)

export const getSecondHandWorkstation = (id) => request.get(`${baseUrl}/workstation/second-hand-3/${id}`)

export const getRefurbishedServer = (id) => request.get(`${baseUrl}/servere/refurbished-2/${id}`)

export const getSecondHandServer = (id) => request.get(`${baseUrl}/servere/second-hand-2/${id}`)

export const getNewServer = (id) => request.get(`${baseUrl}/servere/noi-6/${id}`)