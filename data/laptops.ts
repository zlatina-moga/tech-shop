import lenovoLaptopB50_50_15iImg1 from "../public/products/Laptop-Lenovo-B50-50--15-6--HD--Procesor-Intel-Core-i3-5005U-2-00-GHz--8GB-DDR3--128-GB-SSD--DVD.png";
import lenovoLaptopB50_50_15iImg2 from "../public/products/Laptop-Lenovo-B50-50--15-6--HD--Procesor-Intel-Core-i3-5005U-2-00-GHz--8GB-DDR3--128-GB-SSD--DVD_zknx-9x(1).png";
import lenovoLaptopB50_50_15iImg3 from "../public/products/Laptop-Lenovo-B50-50--15-6--HD--Procesor-Intel-Core-i3-5005U-2-00-GHz--8GB-DDR3--128-GB-SSD--DVD_8o3o-g8(2).png";

export interface ILaptop {
  images: any[];
  title: string;
  price: number;
  currency: string;
  details: string;
  model: string;
  internalCode: string;
  batteryType: string;
  producerDetails: {
    model: string;
    warranty: string;
    layout: string;
  };
  processorType: string;
  processorDetails: {
    processorModel: string;
    nuclearNumber: number;
    processorNumber?: number;
    processorType: string;
    cpuCache: number;
    frequencyCPU: number;
    frequencyTurbo?: number;
    graphicProcessor: string;
    socket: string;
  };
  memoryCapacity: number;
  memoryType: string;
  hardDiskDetails: {
    capacity: string;
    format: string;
    interface: string;
    numberIncluded: number;
    type: string;
  };
  motherBoard: {
    typeMemory: string;
    RAMcapacity: number;
    producer: string;
    memorySlots: number;
    cpuSocket: string;
  };
  operationSystem: string;
  secondHand: boolean;
  others?: string;
  display: {
    diagonal: number;
    rezolution: string;
    technology: string;
  };
  videoCard: {
    chip: string;
    memoryFrequency: number;
    tip: string;
  };
  ports: {
    audio: number;
    usb_2: number;
    usb_3: number;
    wi_fi: string;
    network: number;
  },
  summary?: {
    model: string;
    display: string;
    processor: string;
    memory: string;
    storage: string;
    videoCard: string;
    opticalUnit: string;
    characteristics: string;
    productState: string;
    warranty: string;
    operationalsystem: string;
  }
}

export const laptopsData: ILaptop[] = [
  {
    title:
      'Laptop Lenovo B50-50, 15.6" HD, Procesor Intel Core i3-5005U 2.00 GHz, 8GB DDR3, 128 GB SSD, DVD',
    images: [
      lenovoLaptopB50_50_15iImg1,
      lenovoLaptopB50_50_15iImg2,
      lenovoLaptopB50_50_15iImg3,
    ],
    price: 802.62,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    batteryType: "",
    internalCode: "LVOB5050SH10",
    model: "B50-50",
    producerDetails: {
      model: "Lenovo",
      warranty: "12 Luni / 30 zile baterie",
      layout: "",
    },
    processorType: "i3",
    processorDetails: {
      processorModel: "i3-5005U",
      nuclearNumber: 2,
      processorType: "Intel Core i3",
      cpuCache: 3,
      frequencyCPU: 2.0,
      graphicProcessor: "Intel® HD Graphics 5500",
      socket: "BGA 1168",
    },
    memoryCapacity: 8,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "128 GB",
      format: "2.5 inch",
      interface: "SATA-III",
      numberIncluded: 1,
      type: "SSD",
    },
    motherBoard: {
        typeMemory: 'DDR3',
        RAMcapacity: 8,
        producer: 'LENOVO',
        memorySlots: 2,
        cpuSocket: 'BGA 1170'
    },
    operationSystem: 'Fara sistem de operare preinstalat',
    secondHand: true,
    others: 'Second Hand',
    display: {
        diagonal: 15.6,
        rezolution: '1366 x 768',
        technology: 'LED Backlight'
    },
    videoCard: {
        chip: 'Intel',
        memoryFrequency: 1333,
        tip: 'HD Graphics 5500'
    },
    ports: {
        audio: 1,
        network: 1,
        usb_2: 1,
        usb_3: 1,
        wi_fi: '802.11 b/g/n'
    },
    summary: {
        model: 'B50-50',
        display: '5.6" HD 1366x768 LED',
        processor: 'Intel Core i3-5005U 2.00 GHz (3MB Cache, 2 Nuclee)',
        memory: '8 GB DDR3 1333 MHz',
        storage: '128 GB SSD SATA III',
        videoCard: 'Intel® HD Graphics 5500',
        opticalUnit: 'DVD',
        characteristics: 'QWERTY/QWERTZ/AZERTY BLUETOOTH 1x USB 2.0 1x USB 3.0 1x HDMI',
        productState: 'Second Hand',
        warranty: '12 Luni/ 30 de zile bateria',
        operationalsystem: 'Fara sistem de operare preinstalat'
    }
    
  },
];
