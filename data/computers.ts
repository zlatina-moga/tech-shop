import computerLenovoThinkCentreImg1 from '../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1_2.webp';
import computerLenovoThinkCentreImg2 from '../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1.webp';
import computerLenovoThinkCentreImg3 from '../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1(1).webp';
import computerLenovoThinkCentreImg4 from '../public/products/computers/Calculator-Lenovo-ThinkCentre-M82-Tower-Intel-Core-i3-2100-3-10-GHz-4GB-DDR3-250GB-HDD-DVD-Windows-1_1.webp';

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
    RAMcapacity: number;
    producer?: string;
    memorySlots: number;
    cpuSocket?: string;
    chipset?: string;
    psi_e_x1?: number;
    psi_e_x8?: number;
    psi_e_x16?: number;
    psiSlots?: number;
  };
  layout: {
    color: string;
    dimensions: string;
    shape: string;
    weight: string;
  };
  others?: string;
  operationSystem?: string;
  secondHand?: boolean;
  refurbished?: boolean;
  videoCard: {
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
  ports: {
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
    id: 'calculator-lenovo-thinkcentre-m82-tower-intel-core-i3-2100-3.10-ghz-4gb-ddr3-250gb-hdd-dvd-windows-10-pro-refurbished-preinstalat',
    images: [computerLenovoThinkCentreImg1, computerLenovoThinkCentreImg2, computerLenovoThinkCentreImg3, computerLenovoThinkCentreImg4],
    category: 'calculatoare-refurbished',
    title: 'Calculator Lenovo ThinkCentre M82 Tower, Intel Core i3-2100 3.10 GHz, 4GB DDR3, 250GB HDD, DVD, Windows 10 Pro Refurbished Preinstalat',
    price: 381.36,
    oldPrice: 476.70,
    discount: 95.34,
    inStock: true,
    currency: 'lei',
    details: 'Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului',
    internalCode: 'LNTCM82TWRRE01P',
    model: 'ThinkCentre M82',
    producerDetails: {
      name: 'Lenovo',
      model: 'ThinkCentre M82',
      warranty: '12 luni'
    },
    processorDetails: {
      processorModel: 'i3-2100',
      nuclearNumber: 2,
      processorType: 'Intel Core i3',
      cpuCache: '3',
      frequencyCPU: '3.10',
      graphicProcessor: 'Intel® HD Graphics 2000',
      socket: 'LGA 1155'
    },
    memoryCapacity: 4,
    memoryType: 'DDR3',
    hardDiskDetails: {
      capacity: '250 GB',
      format: '3.5 inch',
      interface: 'SATA-III',
      rotation: 7200,
      type: 'HDD'
    },
    motherBoard: {
      RAMcapacity: 32,
      psi_e_x8: 1,
      chipset: 'Intel Q75',
      cpuSocket: 'LGA 1155',
      psi_e_x1: 1,
      psi_e_x16: 1,
      memorySlots: 4,
      psiSlots: 1
    },
    layout: {
      color: 'Negru',
      dimensions: '175 x 417 x 360',
      shape: 'Tower',
      weight: '11'
    },
    operationSystem: 'Windows 10 Professional Mar',
    videoCard: {
      capacity: 'up to 2 GB',
      chip: 'Intel',
      memoryFrequency: 1333,
      tip: 'DDR3'
    },
    powerSupply: 280,
    ports: {
      audio: 1,
      serialPort: 1,
      usb_2: 8,
      usb_3: 6
    }
  }
]
