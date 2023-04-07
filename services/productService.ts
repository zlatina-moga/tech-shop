import * as request from "./requester";
const baseUrl = "http://localhost:5500";

export const getAllProdictsCount = () => request.get(`${baseUrl}`);

export const getAllLaptops = (page) =>
  request.get(`${baseUrl}/laptop?page=${page}`);

export const getSortedLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop?sort=${sort}&page=${page}`);

export const getAllSecondHandLaptops = (page) =>
  request.get(`${baseUrl}/laptop/second-hand-1?page=${page}`);

export const getSortedSecondHandLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop/second-hand-1?sort=${sort}&page=${page}`);

export const getAllRefurbishedLaptops = (page) =>
  request.get(`${baseUrl}/laptop/refurbished-1?page=${page}`);

export const getSortedRefurbishedLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop/refurbished-1?sort=${sort}&page=${page}`);

export const getAllNewLaptops = (page) =>
  request.get(`${baseUrl}/laptop/noi-1?page=${page}`);

export const getSortedNewLaptops = (page, sort) =>
  request.get(`${baseUrl}/laptop/noi-1?sort=${sort}&page=${page}`);

export const getAllLaptopsByBrand = (page, slug) =>
  request.get(`${baseUrl}/laptop/brand?brand=${slug}&page=${page}`);

export const getSortedLaptopsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllLaptopsByProcessor = (page, slug) =>
  request.get(`${baseUrl}/laptop/procesor?procesor=${slug}&page=${page}`);

export const getSortedLaptopsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/laptop/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllComputers = (page) =>
  request.get(`${baseUrl}/calculatoare?page=${page}`);

export const getSortedComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare?sort=${sort}&page=${page}`);

export const getAllComputersByBrand = (page, slug) =>
  request.get(`${baseUrl}/calculatoare/brand?brand=${slug}&page=${page}`);

export const getSortedComputersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllComputersByProcessor = (page, slug) =>
  request.get(`${baseUrl}/calculatoare/procesor?procesor=${slug}&page=${page}`);

export const getSortedComputersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/calculatoare/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandComputers = (page) =>
  request.get(`${baseUrl}/calculatoare/second-hand?page=${page}`);

export const getSortedSecondHandComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare/second-hand?sort=${sort}&page=${page}`);

export const getAllNewComputers = (page) =>
  request.get(`${baseUrl}/calculatoare/noi?page=${page}`);

export const getSortedNewComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare/noi?sort=${sort}&page=${page}`);

export const getAllRefurbishedComputers = (page) =>
  request.get(`${baseUrl}/calculatoare/refurbished?page=${page}`);

export const getSortedRefurbishedComputers = (page, sort) =>
  request.get(`${baseUrl}/calculatoare/refurbished?sort=${sort}&page=${page}`);

export const getAllServers = (page) =>
  request.get(`${baseUrl}/servere?page=${page}`);

export const getSortedServers = (page, sort) =>
  request.get(`${baseUrl}/servere?sort=${sort}&page=${page}`);

export const getAllServersByBrand = (page, slug) =>
  request.get(`${baseUrl}/servere/brand?brand=${slug}&page=${page}`);

export const getSortedServersByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllServersByProcessor = (page, slug) =>
  request.get(`${baseUrl}/servere/procesor?procesor=${slug}&page=${page}`);

export const getSortedServersByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/servere/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllSecondHandServers = (page) =>
  request.get(`${baseUrl}/servere/second-hand-2?page=${page}`);

export const getSortedSecondHandServers = (page, sort) =>
  request.get(`${baseUrl}/servere/second-hand-2?sort=${sort}&page=${page}`);

export const getAllRefurbishedServers = (page) =>
  request.get(`${baseUrl}/servere/refurbished-2?page=${page}`);

export const getSortedRefurbishedServers = (page, sort) =>
  request.get(`${baseUrl}/servere/refurbished-2?sort=${sort}&page=${page}`);

export const getAllNewServers = (page) =>
  request.get(`${baseUrl}/servere/noi-6?page=${page}`);

export const getSortedNewServers = (page, sort) =>
  request.get(`${baseUrl}/servere/noi-6?sort=${sort}&page=${page}`);

export const getAllRackServers = (page) =>
  request.get(`${baseUrl}/servere/cabinet-rack-refurbished?page=${page}`);

export const getSortedRackServers = (page, sort) =>
  request.get(
    `${baseUrl}/servere/cabinet-rack-refurbished?sort=${sort}&page=${page}`
  );

export const getAllWorkstations = (page) =>
  request.get(`${baseUrl}/workstation?page=${page}`);

export const getSortedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/workstation?sort=${sort}&page=${page}`);

export const getAllWorkstationsByBrand = (page, slug) =>
  request.get(`${baseUrl}/workstation/brand?brand=${slug}&page=${page}`);

export const getSortedWorkstationsByBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllWorkstationsByProcessor = (page, slug) =>
  request.get(`${baseUrl}/workstation/procesor?procesor=${slug}&page=${page}`);

export const getSortedWorkstationsByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/workstation/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getRefurbishedWorkstations = (page) =>
  request.get(`${baseUrl}/workstation/refurbished-3?page=${page}`);

export const getSortedRefurbishedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/workstation/refurbished-3?sort=${sort}&page=${page}`);

export const getSecondHandWorkstations = (page) =>
  request.get(`${baseUrl}/workstation/second-hand-3?page=${page}`);

export const getSortedSecondHandWorkstations = (page, sort) =>
  request.get(`${baseUrl}/workstation/second-hand-3?sort=${sort}&page=${page}`);

export const geAllMonitors = (page) =>
  request.get(`${baseUrl}/monitoare?page=${page}`);

export const geSortedMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare?sort=${sort}&page=${page}`);

export const geAllBrandMonitors = (page, slug) =>
  request.get(`${baseUrl}/monitoare/brand?brand=${slug}&page=${page}`);

export const getSortedBrandMonitors = (page, slug, sort) =>
  request.get(
    `${baseUrl}/monitoare/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const geAllNewMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/noi-4?page=${page}`);

export const geSortedNewMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare/noi-4?sort=${sort}&page=${page}`);

export const geAllRefurbishedMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/refurbished-4?page=${page}`);

export const geSortedRefurbishedMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare/refurbished-4?sort=${sort}&page=${page}`);

export const geAllSecondHandMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/second-hand-4?page=${page}`);

export const geSortedSecondHandMonitors = (page, sort) =>
  request.get(`${baseUrl}/monitoare/second-hand-4?sort=${sort}&page=${page}`);

export const getAllTSRefMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/touchscreen-refurbished?page=${page}`);

export const geSortedTSRefMonitors = (page, sort) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-refurbished?sort=${sort}&page=${page}`
  );

export const getAllSecHandTSMonitors = (page) =>
  request.get(`${baseUrl}/monitoare/touchscreen-second?page=${page}`);

export const getSortedSecHandTSMonitors = (page, sort) =>
  request.get(
    `${baseUrl}/monitoare/touchscreen-second?sort=${sort}&page=${page}`
  );

export const geAllComponents = (page) =>
  request.get(`${baseUrl}/componente?page=${page}`);

export const getSortedComponents = (page, sort) =>
  request.get(`${baseUrl}/componente?sort=${sort}&page=${page}`);

export const geAllBrandComponents = (page, slug) =>
  request.get(`${baseUrl}/componente/brand?brand=${slug}&page=${page}`);

export const getSortedBrandComponents = (page, slug, sort) =>
  request.get(
    `${baseUrl}/componente/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllHardDisks = (page) =>
  request.get(`${baseUrl}/componente/hard-disk?page=${page}`);

export const getSortedHardDisks = (page, sort) =>
  request.get(`${baseUrl}/componente/hard-disk?sort=${sort}&page=${page}`);

export const getAllRAM = (page) =>
  request.get(`${baseUrl}/componente/memorie-ram?page=${page}`);

export const getSortedRAM = (page, sort) =>
  request.get(`${baseUrl}/componente/memorie-ram?sort=${sort}&page=${page}`);

export const getAllVideoCards = (page) =>
  request.get(`${baseUrl}/componente/placa-video?page=${page}`);

export const getSortedVideoCards = (page, sort) =>
  request.get(`${baseUrl}/componente/placa-video?sort=${sort}&page=${page}`);

export const getAllProcesors = (page) =>
  request.get(`${baseUrl}/componente/procesor?page=${page}`);

export const getSortedProcesors = (page, sort) =>
  request.get(`${baseUrl}/componente/procesor?sort=${sort}&page=${page}`);

export const getAllLaptopKeyboards = (page) =>
  request.get(`${baseUrl}/componente/tastatura-laptop?page=${page}`);

export const getSortedLaptopKeyboards = (page, sort) =>
  request.get(
    `${baseUrl}/componente/tastatura-laptop?sort=${sort}&page=${page}`
  );

export const getAllLaptopBatteries = (page) =>
  request.get(`${baseUrl}/componente/baterie-laptop?page=${page}`);

export const getSortedLaptopBatteries = (page, sort) =>
  request.get(`${baseUrl}/componente/baterie-laptop?sort=${sort}&page=${page}`);

export const getAllLaptopChargers = (page) =>
  request.get(`${baseUrl}/componente/alimentator-laptop?page=${page}`);

export const getSortedLaptopChargers = (page, sort) =>
  request.get(
    `${baseUrl}/componente/alimentator-laptop?sort=${sort}&page=${page}`
  );

export const getAllPalmrests = (page) =>
  request.get(`${baseUrl}/componente/palmrest?page=${page}`);

export const getSortedPalmrests = (page, sort) =>
  request.get(`${baseUrl}/componente/palmrest?sort=${sort}&page=${page}`);

export const getAllCaddy = (page) =>
  request.get(`${baseUrl}/componente/caddy-server?page=${page}`);

export const getSortedCaddy = (page, sort) =>
  request.get(`${baseUrl}/componente/caddy-server?sort=${sort}&page=${page}`);

export const getAllRailkit = (page) =>
  request.get(`${baseUrl}/componente/railkit-server?page=${page}`);

export const getSortedRailkit = (page, sort) =>
  request.get(`${baseUrl}/componente/railkit-server?sort=${sort}&page=${page}`);

export const getAllMascaBay = (page) =>
  request.get(`${baseUrl}/componente/masca-bay-server?page=${page}`);

export const getSortedMascaBay = (page, sort) =>
  request.get(
    `${baseUrl}/componente/masca-bay-server?sort=${sort}&page=${page}`
  );

export const getAllControllers = (page) =>
  request.get(`${baseUrl}/componente/controller-raid?page=${page}`);

export const getSortedControllers = (page, sort) =>
  request.get(
    `${baseUrl}/componente/controller-raid?sort=${sort}&page=${page}`
  );

export const getAllNetworks = (page) =>
  request.get(`${baseUrl}/componente/placa-de-retea?page=${page}`);

export const getSortedNetworks = (page, sort) =>
  request.get(`${baseUrl}/componente/placa-de-retea?sort=${sort}&page=${page}`);

export const getAllCases = (page) =>
  request.get(`${baseUrl}/componente/carcasa-si-surse?page=${page}`);

export const getSortedCases = (page, sort) =>
  request.get(
    `${baseUrl}/componente/carcasa-si-surse?sort=${sort}&page=${page}`
  );

export const getAllBarebone = (page) =>
  request.get(`${baseUrl}/componente/barebone-calculator?page=${page}`);

export const getSortedBarebone = (page, sort) =>
  request.get(
    `${baseUrl}/componente/barebone-calculator?sort=${sort}&page=${page}`
  );

export const getAllCoolers = (page) =>
  request.get(`${baseUrl}/componente/coolere-si-radiatoare?page=${page}`);

export const getSortedCoolers = (page, sort) =>
  request.get(
    `${baseUrl}/componente/coolere-si-radiatoare?sort=${sort}&page=${page}`
  );

export const getAllMotherBoards = (page) =>
  request.get(`${baseUrl}/componente/placa-de-baza-calculator?page=${page}`);

export const getSortedMotherBoards = (page, sort) =>
  request.get(
    `${baseUrl}/componente/placa-de-baza-calculator?sort=${sort}&page=${page}`
  );

export const geAllSoftware = (page) =>
  request.get(`${baseUrl}/licenta-software?page=${page}`);

export const geAllPrinters = (page) =>
  request.get(`${baseUrl}/imprimante?page=${page}`);

export const getSortedPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante?sort=${sort}&page=${page}`);

export const geAllBrandPrinters = (page, slug) =>
  request.get(`${baseUrl}/imprimante/brand?brand=${slug}&page=${page}`);

export const getSortedBrandPrinters = (page, slug, sort) =>
  request.get(
    `${baseUrl}/imprimante/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const geAllPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos?page=${page}`);

export const getSortedPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos?sort=${sort}&page=${page}`);

export const geAllPOSBrands = (page, slug) =>
  request.get(`${baseUrl}/sisteme-pos/brand?brand=${slug}&page=${page}`);

export const getSortedPOSBrands = (page, slug, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllPOSByProcessor = (page, slug) =>
  request.get(`${baseUrl}/sisteme-pos/procesor?procesor=${slug}&page=${page}`);

export const getSortedPOSByProcessor = (page, slug, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/procesor?procesor=${slug}&sort=${sort}&page=${page}`
  );

export const getAllRefurbishedPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/refurbished-6?page=${page}`);

export const getSortedRefurbishedPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/refurbished-6?sort=${sort}&page=${page}`);

export const getAllSecondHandPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/second-hand-6?page=${page}`);

export const getSortedSecondHandPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/second-hand-6?sort=${sort}&page=${page}`);

export const getAllNewPOS = (page) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?page=${page}`);

export const getSortedNewPOS = (page, sort) =>
  request.get(`${baseUrl}/sisteme-pos/noi-8?sort=${sort}&page=${page}`);

export const getAllPOSReaders = (page) =>
  request.get(`${baseUrl}/sisteme-pos/cititor-cod-bare?page=${page}`);

export const getSortedPOSReaders = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/cititor-cod-bare?sort=${sort}&page=${page}`
  );

export const getAllPOSPrinters = (page) =>
  request.get(`${baseUrl}/sisteme-pos/imprimante-termice-noi?page=${page}`);

export const getSortedPOSPrinters = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-pos/imprimante-termice-noi?sort=${sort}&page=${page}`
  );

export const getAllUPS = (page) => request.get(`${baseUrl}/ups?page=${page}`);

export const getSortedUPS = (page, sort) =>
  request.get(`${baseUrl}/ups?sort=${sort}&page=${page}`);

export const getAllUPSBrands = (page, slug) =>
  request.get(`${baseUrl}/ups/brand?brand=${slug}&page=${page}`);

export const getSortedUPSBrands = (page, slug, sort) =>
  request.get(`${baseUrl}/ups/brand?brand=${slug}&sort=${sort}&page=${page}`);

export const getAllRefurbishedUPS = (page) =>
  request.get(`${baseUrl}/ups/refurbished-7?page=${page}`);

export const getSortedRefurbishedUPS = (page, sort) =>
  request.get(`${baseUrl}/ups/refurbished-7?sort=${sort}&page=${page}`);

export const getAlllNewUPS = (page) =>
  request.get(`${baseUrl}/ups/noi-7?page=${page}`);

export const getSortedlNewUPS = (page, sort) =>
  request.get(`${baseUrl}/ups/noi-7?sort=${sort}&page=${page}`);

export const getAllSecondHandUPS = (page) =>
  request.get(`${baseUrl}/ups/second-hand-7?page=${page}`);

export const getSortedSecondHandUPS = (page, sort) =>
  request.get(`${baseUrl}/ups/second-hand-7?sort=${sort}&page=${page}`);

export const geAllAccessories = (page) =>
  request.get(`${baseUrl}/accesorii?page=${page}`);

export const getSortedAccessories = (page, sort) =>
  request.get(`${baseUrl}/accesorii?sort=${sort}&page=${page}`);

export const getAllBrandAccessories = (page, slug) =>
  request.get(`${baseUrl}/accesorii/brand?brand=${slug}&page=${page}`);

export const getSortedBrandAccessories = (page, slug, sort) =>
  request.get(
    `${baseUrl}/accesorii/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const geAllRetails = (page) =>
  request.get(`${baseUrl}/retelistica?page=${page}`);

export const getSortedRetails = (page, sort) =>
  request.get(`${baseUrl}/retelistica?sort=${sort}&page=${page}`);

export const geAllRetailsBrand = (page, slug) =>
  request.get(`${baseUrl}/retelistica/brand?brand=${slug}&page=${page}`);

export const getSortedRetailsBrand = (page, slug, sort) =>
  request.get(
    `${baseUrl}/retelistica/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const geAllSolarPanels = (page) =>
  request.get(`${baseUrl}/sisteme-solare-fotovoltaice?page=${page}`);

export const getSortedSolarPanels = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice?sort=${sort}&page=${page}`
  );

export const geAllSolarPanelsBrands = (page, slug) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&page=${page}`
  );

export const getSortedSolarPanelsBrands = (page, slug, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/brand?brand=${slug}&sort=${sort}&page=${page}`
  );

export const getAllNewPrinters = (page) =>
  request.get(`${baseUrl}/imprimante/noi-3?page=${page}`);

export const getSortedNewPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante/noi-3?sort=${sort}&page=${page}`);

export const getAllSHPrinters = (page) =>
  request.get(`${baseUrl}/imprimante/second-hand-5?page=${page}`);

export const getSortedSHPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante/second-hand-5?sort=${sort}&page=${page}`);

export const getAllRefPrinters = (page) =>
  request.get(`${baseUrl}/imprimante/refurbished-5?page=${page}`);

export const getSortedRefPrinters = (page, sort) =>
  request.get(`${baseUrl}/imprimante/refurbished-5?sort=${sort}&page=${page}`);

export const getAllPrinterCollateral = (page) =>
  request.get(`${baseUrl}/imprimante/consumabile?page=${page}`);

export const getSortedPrinterCollateral = (page, sort) =>
  request.get(`${baseUrl}/imprimante/consumabile?sort=${sort}&page=${page}`);

export const getAllCables = (page) =>
  request.get(`${baseUrl}/accesorii/cabluri-si-adaptoare?page=${page}`);

export const getSortedCables = (page, sort) =>
  request.get(
    `${baseUrl}/accesorii/cabluri-si-adaptoare?sort=${sort}&page=${page}`
  );

export const getAllMice = (page) =>
  request.get(`${baseUrl}/accesorii/mouse?page=${page}`);

export const getSortedMice = (page, sort) =>
  request.get(`${baseUrl}/accesorii/mouse?sort=${sort}&page=${page}`);

export const getAllKeyboards = (page) =>
  request.get(`${baseUrl}/accesorii/tastaturi?page=${page}`);

export const getSortedKeyboards = (page, sort) =>
  request.get(`${baseUrl}/accesorii/tastaturi?sort=${sort}&page=${page}`);

export const getAllOtherAccessories = (page) =>
  request.get(`${baseUrl}/accesorii/periferice-diverse?page=${page}`);

export const getSortedOtherAccessories = (page, sort) =>
  request.get(
    `${baseUrl}/accesorii/periferice-diverse?sort=${sort}&page=${page}`
  );

export const getAllDockingStations = (page) =>
  request.get(`${baseUrl}/accesorii/docking-station?page=${page}`);

export const getSortedDockingStations = (page, sort) =>
  request.get(`${baseUrl}/accesorii/docking-station?sort=${sort}&page=${page}`);

export const getAllBags = (page) =>
  request.get(`${baseUrl}/accesorii/genti?page=${page}`);

export const getSortedBags = (page, sort) =>
  request.get(`${baseUrl}/accesorii/genti?sort=${sort}&page=${page}`);

export const getAllCameras = (page) =>
  request.get(`${baseUrl}/accesorii/camere-web?page=${page}`);

export const getSortedCameras = (page, sort) =>
  request.get(`${baseUrl}/accesorii/camere-web?sort=${sort}&page=${page}`);

export const getAllHeadPhones = (page) =>
  request.get(`${baseUrl}/accesorii/casti?page=${page}`);

export const getSortedHeadPhones = (page, sort) =>
  request.get(`${baseUrl}/accesorii/casti?sort=${sort}&page=${page}`);

export const getAllGaming = (page) =>
  request.get(`${baseUrl}/accesorii/gaming-console?page=${page}`);

export const getSortedGaming = (page, sort) =>
  request.get(`${baseUrl}/accesorii/gaming-console?sort=${sort}&page=${page}`);

export const getAllVideo = (page) =>
  request.get(`${baseUrl}/accesorii/videoproiectoare?page=${page}`);

export const getSortedVideo = (page, sort) =>
  request.get(
    `${baseUrl}/accesorii/videoproiectoare?sort=${sort}&page=${page}`
  );

export const getAllNetwork = (page) =>
  request.get(`${baseUrl}/retelistica/placi-de-retea?page=${page}`);

export const getSortedNetwork = (page, sort) =>
  request.get(
    `${baseUrl}/retelistica/placi-de-retea?sort=${sort}&page=${page}`
  );

export const getAllAdaptors = (page) =>
  request.get(`${baseUrl}/retelistica/adaptoare-wireless?page=${page}`);

export const getSortedAdaptors = (page, sort) =>
  request.get(
    `${baseUrl}/retelistica/adaptoare-wireless?sort=${sort}&page=${page}`
  );

export const getAllRouters = (page) =>
  request.get(`${baseUrl}/retelistica/routere?page=${page}`);

export const getSortedRouters = (page, sort) =>
  request.get(`${baseUrl}/retelistica/routere?sort=${sort}&page=${page}`);

export const getAllSwitch = (page) =>
  request.get(`${baseUrl}/retelistica/switch-uri?page=${page}`);

export const getSortedSwitch = (page, sort) =>
  request.get(`${baseUrl}/retelistica/switch-uri?sort=${sort}&page=${page}`);

export const getAllAccessPoints = (page) =>
  request.get(`${baseUrl}/retelistica/access-point-uri?page=${page}`);

export const getSortedAccessPoints = (page, sort) =>
  request.get(
    `${baseUrl}/retelistica/access-point-uri?sort=${sort}&page=${page}`
  );

export const getAllPanels = (page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?page=${page}`
  );

export const getSortedPanels = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/panouri-solare-fotovoltaice?sort=${sort}&page=${page}`
  );

export const getAllInvertors = (page) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?page=${page}`
  );

export const getSortedInvertors = (page, sort) =>
  request.get(
    `${baseUrl}/sisteme-solare-fotovoltaice/invertoare-fotovoltaice?sort=${sort}&page=${page}`
  );

export const getSearchedItems = (search) =>
  request.get(`https://api.citgrup.ro/public/products/search?${search}`);

export const getDiscountedItems = (page) =>
  request.get(`${baseUrl}/promotii?page=${page}`);

export const getSortedDiscountedItems = (page, sort) =>
  request.get(`${baseUrl}/promotii?sort=${sort}&page=${page}`);

export const getDiscountedServers = (page) =>
  request.get(`${baseUrl}/promotii/servere?page=${page}`);

export const getSortedDiscountedServers = (page, sort) =>
  request.get(`${baseUrl}/promotii/servere?sort=${sort}&page=${page}`);

export const getDiscountedWorkstations = (page) =>
  request.get(`${baseUrl}/promotii/workstation?page=${page}`);

export const getSortedDiscountedWorkstations = (page, sort) =>
  request.get(`${baseUrl}/promotii/workstation?sort=${sort}&page=${page}`);

export const getDiscountedComputers = (page) =>
  request.get(`${baseUrl}/promotii/calculatoare?page=${page}`);

export const getSortedDiscountedComputers = (page, sort) =>
  request.get(`${baseUrl}/promotii/calculatoare?sort=${sort}&page=${page}`);

export const getDiscountedLaptops = (page) =>
  request.get(`${baseUrl}/promotii/laptop?page=${page}`);

export const getSortedDiscountedLaptops = (page, sort) =>
  request.get(`${baseUrl}/promotii/laptop?sort=${sort}&page=${page}`);

export const getDiscountedMonitors = (page) =>
  request.get(`${baseUrl}/promotii/monitoare?page=${page}`);

export const getSortedDiscountedMonitors = (page, sort) =>
  request.get(`${baseUrl}/promotii/monitoare?sort=${sort}&page=${page}`);

export const getDiscountedComponents = (page) =>
  request.get(`${baseUrl}/promotii/componente?page=${page}`);

export const getSortedDiscountedComponents = (page, sort) =>
  request.get(`${baseUrl}/promotii/componente?sort=${sort}&page=${page}`);

export const getDiscountedPrinters = (page) =>
  request.get(`${baseUrl}/promotii/imprimante?page=${page}`);

export const getSortedDiscountedPrinters = (page, sort) =>
  request.get(`${baseUrl}/promotii/imprimante?sort=${sort}&page=${page}`);

export const getDiscountedPOS = (page) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?page=${page}`);

export const getSortedDiscountedPOS = (page, sort) =>
  request.get(`${baseUrl}/promotii/sisteme-pos?sort=${sort}&page=${page}`);

export const getDiscountedUPS = (page) =>
  request.get(`${baseUrl}/promotii/ups?page=${page}`);

export const getSortedDiscountedUPS = (page, sort) =>
  request.get(`${baseUrl}/promotii/ups?sort=${sort}&page=${page}`);

export const getDiscountedAccessories = (page) =>
  request.get(`${baseUrl}/promotii/accesorii?page=${page}`);

export const getSortedDiscountedAccessories = (page, sort) =>
  request.get(`${baseUrl}/promotii/accesorii?sort=${sort}&page=${page}`);