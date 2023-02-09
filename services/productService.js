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

export const getAllSecondHandServers = (page) => request.get(`${baseUrl}/servere-second-hand?page=${page}`)

export const getAllRefurbishedServers = (page) => request.get(`${baseUrl}/servere-refurbished?page=${page}`)

export const getAllNewServers = (page) => request.get(`${baseUrl}/servere-new?page=${page}`)

export const getAllWorkstations = (page) => request.get(`${baseUrl}/workstations?page=${page}`)

export const getRefurbishedWorkstations = (page) => request.get(`${baseUrl}/workstations-refurbished?page=${page}`)

export const getSecondHandWorkstations = (page) => request.get(`${baseUrl}/workstations-second-hand?page=${page}`)

export const geAllMonitors = (page) => request.get(`${baseUrl}/monitoare?page=${page}`)

export const geAllNewMonitors = (page) => request.get(`${baseUrl}/monitoare-new?page=${page}`)

export const geAllRefurbishedMonitors = (page) => request.get(`${baseUrl}/monitoare-refurbished?page=${page}`)

export const geAllSecondHandMonitors = (page) => request.get(`${baseUrl}/monitoare-second-hand?page=${page}`)

export const geAllComponents = (page) => request.get(`${baseUrl}/componente?page=${page}`)

export const geAllSoftware = (page) => request.get(`${baseUrl}/licenta-software?page=${page}`)

export const geAllPrinters = (page) => request.get(`${baseUrl}/imprimante?page=${page}`)

export const geAllPOS = (page) => request.get(`${baseUrl}/sisteme-pos?page=${page}`)

export const geAllUPS = (page) => request.get(`${baseUrl}/ups?page=${page}`)

export const geAllAccessories = (page) => request.get(`${baseUrl}/accesorii?page=${page}`)

export const geAllRetails = (page) => request.get(`${baseUrl}/retelistica?page=${page}`)

export const geAllSolarPanels = (page) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice?page=${page}`)