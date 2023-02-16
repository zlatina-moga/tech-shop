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

export const getNewPrinter = (id) => request.get(`${baseUrl}/imprimante/noi-3/${id}`)

export const getSHPrinter = (id) => request.get(`${baseUrl}/imprimante/second-hand-5/${id}`)

export const getPrinterCollateral = (id) => request.get(`${baseUrl}/imprimante/consumabile/${id}`)

export const getRefurbishedPOS = (id) => request.get(`${baseUrl}/sisteme-pos/refurbished-6/${id}`)

export const getSecondHandPOS = (id) => request.get(`${baseUrl}/sisteme-pos/second-hand-6/${id}`)

export const getNewPOS = (id) => request.get(`${baseUrl}/sisteme-pos/noi-8/${id}`)

export const getPOSReader = (id) => request.get(`${baseUrl}/sisteme-pos/cititor-cod-bare/${id}`)

export const getRefurbishedUPS = (id) => request.get(`${baseUrl}/ups/refurbished-7/${id}`)

export const getSecondHandUPS = (id) => request.get(`${baseUrl}/ups/second-hand-7/${id}`)

export const getNewUPS = (id) => request.get(`${baseUrl}/ups/noi-7/${id}`)

export const getCable = (id) => request.get(`${baseUrl}/accesorii/cabluri-si-adaptoare/${id}`)

export const getMouse = (id) => request.get(`${baseUrl}/accesorii/mouse/${id}`)

export const getKeyboardDetails = (id) => request.get(`${baseUrl}/accesorii/tastaturi/${id}`)

export const getOtherAccessoryDetails = (id) => request.get(`${baseUrl}/accesorii/periferice-diverse/${id}`)

export const getDockingStation = (id) => request.get(`${baseUrl}/accesorii/docking-station/${id}`)

export const getBag = (id) => request.get(`${baseUrl}/accesorii/genti/${id}`)

export const getCamera = (id) => request.get(`${baseUrl}/accesorii/camere-web/${id}`)

export const getHeadPhones = (id) => request.get(`${baseUrl}/accesorii/casti/${id}`)

export const getGaming = (id) => request.get(`${baseUrl}/accesorii/gaming-console/${id}`)

export const getVideo = (id) => request.get(`${baseUrl}/accesorii/videoproiectoare/${id}`)

export const getNetwork = (id) => request.get(`${baseUrl}/retelistica/placi-de-retea/${id}`)

export const getAdaptor = (id) => request.get(`${baseUrl}/retelistica/adaptoare-wireless/${id}`)

export const getRouter = (id) => request.get(`${baseUrl}/retelistica/routere/${id}`)

export const getSwitch = (id) => request.get(`${baseUrl}/retelistica/switch-uri/${id}`)

export const getAccessPoint = (id) => request.get(`${baseUrl}/retelistica/access-point-uri/${id}`)

export const getSolarPanel = (id) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice/${id}`)

export const getInvertor = (id) => request.get(`${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice/${id}`)