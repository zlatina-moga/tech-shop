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

export const getRefurbishedMonitor = (id) => request.get(`${baseUrl}/monitoare/refurbished-4/${id}`)

export const getNewMonitor = (id) => request.get(`${baseUrl}/monitoare/noi-4/${id}`)

export const getSecondHandMonitor = (id) => request.get(`${baseUrl}/monitoare/second-hand-4/${id}`)

export const getHardDisk = (id) => request.get(`${baseUrl}/componente/hard-disk/${id}`)

export const getRAM = (id) => request.get(`${baseUrl}/componente/memorie-ram/${id}`)

export const getVideoCard = (id) => request.get(`${baseUrl}/componente/placa-video/${id}`)

export const getProcesor = (id) => request.get(`${baseUrl}/componente/procesor/${id}`)

export const getKeyboard = (id) => request.get(`${baseUrl}/componente/tastatura-laptop/${id}`)

export const getBattery = (id) => request.get(`${baseUrl}/componente/baterie-laptop/${id}`)

export const getCharger = (id) => request.get(`${baseUrl}/componente/alimentator-laptop/${id}`)

export const getPalmrest = (id) => request.get(`${baseUrl}/componente/palmrest/${id}`)

export const getCaddy = (id) => request.get(`${baseUrl}/componente/caddy-server/${id}`)

export const getRailKit = (id) => request.get(`${baseUrl}/componente/railkit-server/${id}`)

export const getMascaBay = (id) => request.get(`${baseUrl}/componente/masca-bay-server/${id}`)

export const getController = (id) => request.get(`${baseUrl}/componente/controller-raid/${id}`)

export const getPlaca = (id) => request.get(`${baseUrl}/componente/placa-de-retea/${id}`)

export const getCarcasa = (id) => request.get(`${baseUrl}/componente/carcasa-si-surse/${id}`)

export const getBarebone = (id) => request.get(`${baseUrl}/componente/barebone-calculator/${id}`)

export const getCooler = (id) => request.get(`${baseUrl}/componente/coolere-si-radiatoare/${id}`)

export const getMB = (id) => request.get(`${baseUrl}/componente/placa-de-baza-calculator/${id}`)