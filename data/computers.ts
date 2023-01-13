import computerLenovoThinkCentreImg1 from "../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1_2.webp";
import computerLenovoThinkCentreImg2 from "../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1.webp";
import computerLenovoThinkCentreImg3 from "../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1(1).webp";
import computerLenovoThinkCentreImg4 from "../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1_1.webp";
import computerFujitsiImg2 from "../public/products/computers/Calculator-Fujitsu-Esprimo-Q920-Mini--Intel-Core-i3-4130-3-40-GHz--4GB-DDR3--120-SSD-Refurbished.jpg";
import computerFujitsiImg1 from "../public/products/computers/Calculator-Fujitsu-Esprimo-Q920-Mini--Intel-Core-i3-4130-3-40-GHz--4GB-DDR3--120-SSD-Refurbished.png";
import HPProdeskImg1 from "../public/products/computers/HP-Prodesk-600-G4-Tower-Intel-Core-i7-8700T-2-40-GHz--16GB-DDR4--256GB-SSD--Intel-UHD-Graphics-630---Windows-10-Pro-Mar-preinstalat.jpg";
import HPProdeskImg2 from "../public/products/computers/HP-Prodesk-600-G4-Tower-Intel-Core-i7-8700T-2-40-GHz--16GB-DDR4--256GB-SSD--Intel-UHD-Graphics-630---Windows-10-Pro-Mar-preinstalat.png";
import HPProdeskImg3 from "../public/products/computers/HP-Prodesk-600-G4-Tower-Intel-Core-i7-8700T-2-40-GHz--16GB-DDR4--256GB-SSD--Intel-UHD-Graphics-630---Windows-10-Pro-Mar-preinstalat_838x-n4.png";
import HPProdeskImg4 from "../public/products/computers/HP-Prodesk-600-G4-Tower-Intel-Core-i7-8700T-2-40-GHz--16GB-DDR4--256GB-SSD--Intel-UHD-Graphics-630---Windows-10-Pro-Mar-preinstalat_97r0-gn.png";
import HPProdeskImg5 from "../public/products/computers/HP-Prodesk-600-G4-Tower-Intel-Core-i7-8700T-2-40-GHz--16GB-DDR4--256GB-SSD--Intel-UHD-Graphics-630---Windows-10-Pro-Mar-preinstalat_bwy5-h2.png";

export interface IComputer {
  category?: string;
  id: string;
  images: any[];
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  inStock?: boolean;
  currency: string;
  details: string;
  internalCode: string;
  model: string;
  producerDetails: {
    name: string;
    model: string;
    warranty: string;
  };
  processorDetails: {
    processorModel?: string;
    nuclearNumber: number;
    processorNumber?: number;
    processorType: string;
    cpuCache: string;
    frequencyCPU: string;
    frequencyTurbo?: string;
    graphicProcessor: string;
    socket: string;
    producer?: string;
  };
  memoryCapacity: number;
  memoryType: string;
  hardDiskDetails: {
    capacity: string;
    format?: string;
    interface?: string;
    numberIncluded?: number;
    type: string;
    rotation?: number;
  };
  motherBoard: {
    typeMemory?: string;
    RAMcapacity?: number;
    producer?: string;
    memorySlots?: number;
    cpuSocket?: string;
    chipset?: string;
    psi_e_x1?: number;
    psi_e_x8?: number;
    psi_e_x16?: number;
    psiSlots?: number;
  };
  layout?: {
    color: string;
    dimensions: string;
    shape: string;
    weight: string;
  };
  others?: string;
  operationSystem?: string;
  secondHand?: boolean;
  refurbished?: boolean;
  videoCard?: {
    chip: string;
    memoryFrequency: number;
    tip: string;
    busMemory?: number;
    capacity?: string;
    supportDirectX?: number;
    supportOpenGL?: number;
    slotType?: string;
  };
  powerSupply?: number;
  ports?: {
    audio: any;
    usb_2?: number;
    usb_3?: number;
    wi_fi?: string;
    network?: number;
    firewire?: number;
    docking?: number;
    hdmi?: number;
    serialPort?: number;
  };
  hasNoOS?: boolean;
  summary?: {
    model: string;
    processor: string;
    memory: string;
    storage: string;
    videoCard: string;
    opticalUnit?: string;
    productState: string;
    warranty: string;
    operationalsystem: string;
  };
}

export const computersData: IComputer[] = [
  {
    id: "calculator-lenovo-thinkcentre-m82-tower-intel-core-i3-2100-3.10-ghz-4gb-ddr3-250gb-hdd-dvd",
    images: [
      computerLenovoThinkCentreImg1,
      computerLenovoThinkCentreImg2,
      computerLenovoThinkCentreImg3,
      computerLenovoThinkCentreImg4,
    ],
    category: "calculatoare-refurbished",
    title:
      "Calculator Lenovo ThinkCentre M82 Tower, Intel Core i3-2100 3.10 GHz, 4GB DDR3, 250GB HDD, DVD",
    price: 381.36,
    oldPrice: 476.7,
    discount: 95.34,
    inStock: true,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    internalCode: "LNTCM82TWRRE01P",
    model: "ThinkCentre M82",
    producerDetails: {
      name: "Lenovo",
      model: "ThinkCentre M82",
      warranty: "12 luni",
    },
    processorDetails: {
      processorModel: "i3-2100",
      nuclearNumber: 2,
      processorType: "Intel Core i3",
      cpuCache: "3",
      frequencyCPU: "3.10",
      graphicProcessor: "Intel® HD Graphics 2000",
      socket: "LGA 1155",
    },
    memoryCapacity: 4,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "250 GB",
      format: "3.5 inch",
      interface: "SATA-III",
      rotation: 7200,
      type: "HDD",
    },
    motherBoard: {
      RAMcapacity: 32,
      psi_e_x8: 1,
      chipset: "Intel Q75",
      cpuSocket: "LGA 1155",
      psi_e_x1: 1,
      psi_e_x16: 1,
      memorySlots: 4,
      psiSlots: 1,
    },
    layout: {
      color: "Negru",
      dimensions: "175 x 417 x 360",
      shape: "Tower",
      weight: "11",
    },
    hasNoOS: true,
    operationSystem: "Fara sistem de operare preinstalat",
    videoCard: {
      capacity: "up to 2 GB",
      chip: "Intel",
      memoryFrequency: 1333,
      tip: "DDR3",
    },
    powerSupply: 280,
    ports: {
      audio: 1,
      serialPort: 1,
      usb_2: 8,
      usb_3: 6,
    },
  },
  {
    id: "calculator-fujitsu-esprimo-q920-mini-intel-core-i3-4130-3.40-ghz-4gb-ddr3-120-ssd-refurbished",
    images: [computerFujitsiImg1, computerFujitsiImg2],
    category: "calculatoare-refurbished",
    title:
      "Calculator Fujitsu Esprimo Q920 Mini, Intel Core i3-4130T 2.90 GHz, 4GB DDR3, 120 SSD, Refurbished",
    price: 367.87,
    oldPrice: 459.84,
    discount: 91.97,
    inStock: true,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    internalCode: "CFQ920SFFREM01",
    model: "Q920",
    producerDetails: {
      name: "Fujitsu Siemens",
      model: "Q920",
      warranty: "12 luni",
    },
    processorDetails: {
      processorModel: "i3-4130t",
      nuclearNumber: 2,
      processorType: "Intel Core i3",
      cpuCache: "3",
      frequencyCPU: "2.90",
      graphicProcessor: "Intel® HD Graphics 4400",
      socket: "LGA 1150",
    },
    memoryCapacity: 4,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "120 GB",
      format: "2.5 inch",
      interface: "SATA-III",
      rotation: 7200,
      type: "SSD",
    },
    motherBoard: {
      RAMcapacity: 16,
      psi_e_x8: 1,
      chipset: "Intel Q87",
      cpuSocket: "LGA 1150",
      psi_e_x1: 2,
      psi_e_x16: 1,
      memorySlots: 2,
      psiSlots: 1,
      typeMemory: "DDR3",
      producer: "Fujitsu",
    },
    layout: {
      color: "Negru",
      dimensions: "185 x 188 x 54 mm",
      shape: "Mini PC",
      weight: "1.6",
    },
    refurbished: true,
    operationSystem: "Fara sistem de operare preinstalat",
    hasNoOS: true,
    videoCard: {
      chip: "Intel",
      memoryFrequency: 1333,
      tip: "HD Graphics",
      supportDirectX: 11.1,
    },
    powerSupply: 65,
    ports: {
      audio: 2,
      serialPort: 1,
      usb_2: 2,
      usb_3: 4,
      network: 1,
    },
  },
  {
    id: "hp-prodesk-600-g4-tower-intel-core-i7-8700t-2.40-ghz-16gb-ddr4-256gb-ssd-intel-uhd-graphics-630",
    images: [
      HPProdeskImg1,
      HPProdeskImg2,
      HPProdeskImg3,
      HPProdeskImg4,
      HPProdeskImg5,
    ],
    category: "calculatoare-refurbished",
    title:
      "HP Prodesk 600 G4 Tower Intel Core i7-8700T 2.40 GHz, 16GB DDR4, 256GB SSD, Intel UHD Graphics 630",
    price: 2106.89,
    oldPrice: 2633.61,
    discount: 526.72,
    inStock: true,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    internalCode: "HPPRO600G4RE02",
    model: "ProDesk 600 G4",
    producerDetails: {
      name: "HP",
      model: "ProDesk 600 G4",
      warranty: "12 luni",
    },
    hasNoOS: true,
    operationSystem: "Fara sistem de operare preinstalat",
    processorDetails: {
      processorModel: "i7-8700T",
      nuclearNumber: 6,
      processorNumber: 1,
      processorType: "Intel Core i7",
      producer: "Intel",
      cpuCache: "12",
      frequencyCPU: "2.40",
      frequencyTurbo: "4.00",
      graphicProcessor: "Intel UHD Graphics 630",
      socket: "FCLGA1151",
    },
    memoryCapacity: 16,
    memoryType: "DDR4",
    hardDiskDetails: {
      capacity: "256 GB",
      type: "SSD",
    },
    motherBoard: {
      cpuSocket: "FCLGA1151",
      typeMemory: "DDR4",
    },
    refurbished: true,
  },
];
