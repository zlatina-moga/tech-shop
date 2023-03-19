import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getAllProdictsCount = () => request.get(`${baseUrl}`)

export const getAllLaptops = (page) => request.get(`${baseUrl}/laptop?page=${page}`)

export const getAllSecondHandLaptops = (page) => request.get(`${baseUrl}/laptop/second-hand-1?page=${page}`)

export const getAllRefurbishedLaptops = (page) => request.get(`${baseUrl}/laptop/refurbished-1?page=${page}`)

export const getAllNewLaptops = (page) => request.get(`${baseUrl}/laptop/noi-1?page=${page}`)

export const getAllLaptopsByBrand = (page, slug) => request.get(`${baseUrl}/laptop/brand?brand=${slug}&page=${page}`)

export const getAllComputers = (page) => request.get(`${baseUrl}/calculatoare?page=${page}`)

export const getAllComputersByBrand = (page, slug) => request.get(`${baseUrl}/calculatoare/brand?brand=${slug}&page=${page}`)

export const getAllSecondHandComputers = (page) => request.get(`${baseUrl}/calculatoare/second-hand?page=${page}`)

export const getAllNewComputers = (page) => request.get(`${baseUrl}/calculatoare/noi?page=${page}`)

export const getAllRefurbishedComputers = (page) => request.get(`${baseUrl}/calculatoare/refurbished?page=${page}`)

export const getAllServers = (page) => request.get(`${baseUrl}/servere?page=${page}`)

export const getAllServersByBrand = (page, slug) => request.get(`${baseUrl}/servere/brand?brand=${slug}&page=${page}`)

export const getAllSecondHandServers = (page) => request.get(`${baseUrl}/servere/second-hand-2?page=${page}`)

export const getAllRefurbishedServers = (page) => request.get(`${baseUrl}/servere/refurbished-2?page=${page}`)

export const getAllNewServers = (page) => request.get(`${baseUrl}/servere/noi-6?page=${page}`)

export const getAllRackServers = (page) => request.get(`${baseUrl}/servere/cabinet-rack-refurbished?page=${page}`)

export const getAllWorkstations = (page) => request.get(`${baseUrl}/workstation?page=${page}`)

export const getAllWorkstationsByBrand = (page, slug) => request.get(`${baseUrl}/workstation/brand?brand=${slug}&page=${page}`)

export const getRefurbishedWorkstations = (page) => request.get(`${baseUrl}/workstation/refurbished-3?page=${page}`)

export const getSecondHandWorkstations = (page) => request.get(`${baseUrl}/workstation/second-hand-3?page=${page}`)

export const geAllMonitors = (page) => request.get(`${baseUrl}/monitoare?page=${page}`)

export const geAllBrandMonitors = (page, slug) => request.get(`${baseUrl}/monitoare/brand?brand=${slug}&page=${page}`)

export const geAllNewMonitors = (page) => request.get(`${baseUrl}/monitoare/noi-4?page=${page}`)

export const geAllRefurbishedMonitors = (page) => request.get(`${baseUrl}/monitoare/refurbished-4?page=${page}`)

export const geAllSecondHandMonitors = (page) => request.get(`${baseUrl}/monitoare/second-hand-4?page=${page}`)

export const getAllTSRefMonitors = (page) => request.get(`${baseUrl}/monitoare/touchscreen-refurbished?page=${page}`)

export const getAllSecHandTSMonitors = (page) => request.get(`${baseUrl}/monitoare/touchscreen-second?page=${page}`)

export const geAllComponents = (page) => request.get(`${baseUrl}/componente?page=${page}`)

export const geAllBrandComponents = (page, slug) => request.get(`${baseUrl}/componente/brand?brand=${slug}&page=${page}`)

export const getAllHardDisks = (page) => request.get(`${baseUrl}/componente/hard-disk?page=${page}`)

export const getAllRAM = (page) => request.get(`${baseUrl}/componente/memorie-ram?page=${page}`)

export const getAllVideoCards = (page) => request.get(`${baseUrl}/componente/placa-video?page=${page}`)

export const getAllProcesors = (page) => request.get(`${baseUrl}/componente/procesor?page=${page}`)

export const getAllLaptopKeyboards = (page) => request.get(`${baseUrl}/componente/tastatura-laptop?page=${page}`)

export const getAllLaptopBatteries = (page) => request.get(`${baseUrl}/componente/baterie-laptop?page=${page}`)

export const getAllLaptopChargers = (page) => request.get(`${baseUrl}/componente/alimentator-laptop?page=${page}`)

export const getAllPalmrests = (page) => request.get(`${baseUrl}/componente/palmrest?page=${page}`)

export const getAllCaddy = (page) => request.get(`${baseUrl}/componente/caddy-server?page=${page}`)

export const getAllRailkit = (page) => request.get(`${baseUrl}/componente/railkit-server?page=${page}`)

export const getAllMascaBay = (page) => request.get(`${baseUrl}/componente/masca-bay-server?page=${page}`)

export const getAllControllers = (page) => request.get(`${baseUrl}/componente/controller-raid?page=${page}`)

export const getAllNetworks = (page) => request.get(`${baseUrl}/componente/placa-de-retea?page=${page}`)

export const getAllCases = (page) => request.get(`${baseUrl}/componente/carcasa-si-surse?page=${page}`)

export const getAllBarebone = (page) => request.get(`${baseUrl}/componente/barebone-calculator?page=${page}`)

export const getAllCoolers = (page) => request.get(`${baseUrl}/componente/coolere-si-radiatoare?page=${page}`)

export const getAllMotherBoards = (page) => request.get(`${baseUrl}/componente/placa-de-baza-calculator?page=${page}`)

export const geAllSoftware = (page) => request.get(`${baseUrl}/licenta-software?page=${page}`)

export const geAllPrinters = (page) => request.get(`${baseUrl}/imprimante?page=${page}`)

export const geAllBrandPrinters = (page, slug) => request.get(`${baseUrl}/imprimante/brand?brand=${slug}&page=${page}`)

export const geAllPOS = (page) => request.get(`${baseUrl}/sisteme-pos?page=${page}`)

export const geAllPOSBrands = (page, slug) => request.get(`${baseUrl}/sisteme-pos/brand?brand=${slug}&page=${page}`)

export const getAllRefurbishedPOS = (page) => request.get(`${baseUrl}/sisteme-pos/refurbished-6?page=${page}`)

export const getAllSecondHandPOS = (page) => request.get(`${baseUrl}/sisteme-pos/second-hand-6?page=${page}`)

export const getAllNewPOS = (page) => request.get(`${baseUrl}/sisteme-pos/noi-8?page=${page}`)

export const getAllPOSReaders = (page) => request.get(`${baseUrl}/sisteme-pos/cititor-cod-bare?page=${page}`)

export const getAllPOSPrinters = (page) => request.get(`${baseUrl}/sisteme-pos/imprimante-termice-noi?page=${page}`)

export const getAllUPS = (page) => request.get(`${baseUrl}/ups?page=${page}`)

export const getAllUPSBrands = (page, slug) => request.get(`${baseUrl}/ups/brand?brand=${slug}&page=${page}`)

export const getAllRefurbishedUPS = (page) => request.get(`${baseUrl}/ups/refurbished-7?page=${page}`)

export const getAlllNewUPS = (page) => request.get(`${baseUrl}/ups/noi-7?page=${page}`)

export const getAllSecondHandUPS = (page) => request.get(`${baseUrl}/ups/second-hand-7?page=${page}`)

export const geAllAccessories = (page) => request.get(`${baseUrl}/accesorii?page=${page}`)

export const getAllBrandAccessories = (page, slug) => request.get(`${baseUrl}/accesorii/brand?brand=${slug}&page=${page}`)

export const geAllRetails = (page) => request.get(`${baseUrl}/retelistica?page=${page}`)

export const geAllRetailsBrand = (page, slug) => request.get(`${baseUrl}/retelistica/brand?brand=${slug}&page=${page}`)

export const geAllSolarPanels = (page) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice?page=${page}`)

export const geAllSolarPanelsBrands = (page, slug) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&page=${page}`)

export const getAllNewPrinters = (page) => request.get(`${baseUrl}/imprimante/noi-3?page=${page}`)

export const getAllSHPrinters = (page) => request.get(`${baseUrl}/imprimante/second-hand-5?page=${page}`)

export const getAllRefPrinters = (page) => request.get(`${baseUrl}/imprimante/refurbished-5?page=${page}`)

export const getAllPrinterCollateral = (page) => request.get(`${baseUrl}/imprimante/consumabile?page=${page}`)

export const getAllCables = (page) => request.get(`${baseUrl}/accesorii/cabluri-si-adaptoare?page=${page}`)

export const getAllMice = (page) => request.get(`${baseUrl}/accesorii/mouse?page=${page}`)

export const getAllKeyboards = (page) => request.get(`${baseUrl}/accesorii/tastaturi?page=${page}`)

export const getAllOtherAccessories = (page) => request.get(`${baseUrl}/accesorii/periferice-diverse?page=${page}`)

export const getAllDockingStations = (page) => request.get(`${baseUrl}/accesorii/docking-station?page=${page}`)

export const getAllBags = (page) => request.get(`${baseUrl}/accesorii/genti?page=${page}`)

export const getAllCameras = (page) => request.get(`${baseUrl}/accesorii/camere-web?page=${page}`)

export const getAllHeadPhones = (page) => request.get(`${baseUrl}/accesorii/casti?page=${page}`)

export const getAllGaming = (page) => request.get(`${baseUrl}/accesorii/gaming-console?page=${page}`)

export const getAllVideo = (page) => request.get(`${baseUrl}/accesorii/videoproiectoare?page=${page}`)

export const getAllNetwork = (page) => request.get(`${baseUrl}/retelistica/placi-de-retea?page=${page}`)

export const getAllAdaptors = (page) => request.get(`${baseUrl}/retelistica/adaptoare-wireless?page=${page}`)

export const getAllRouters = (page) => request.get(`${baseUrl}/retelistica/routere?page=${page}`)

export const getAllSwitch = (page) => request.get(`${baseUrl}/retelistica/switch-uri?page=${page}`)

export const getAllAccessPoints = (page) => request.get(`${baseUrl}/retelistica/access-point-uri?page=${page}`)

export const getAllPanels = (page) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?page=${page}`)

export const getAllInvertors = (page) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?page=${page}`)