import lenovoLaptopB50_50_15iImg1 from "../public/products/Laptop-Lenovo-B50-50--15-6--HD--Procesor-Intel-Core-i3-5005U-2-00-GHz--8GB-DDR3--128-GB-SSD--DVD.png";
import lenovoLaptopB50_50_15iImg2 from "../public/products/Laptop-Lenovo-B50-50--15-6--HD--Procesor-Intel-Core-i3-5005U-2-00-GHz--8GB-DDR3--128-GB-SSD--DVD_zknx-9x(1).png";
import lenovoLaptopB50_50_15iImg3 from "../public/products/Laptop-Lenovo-B50-50--15-6--HD--Procesor-Intel-Core-i3-5005U-2-00-GHz--8GB-DDR3--128-GB-SSD--DVD_8o3o-g8(2).png";
import lenovoThinkPadX250Img1 from "../public/products/LENOVO-ThinkPad-X250-12-5-HD-Intel-Core-i5-5300U-2-90GHz-8GB-DDR3-500GB-HDD-WEBCAM-BLUETOOTH.webp";
import lenovoThinkPadX250Img2 from "../public/products/LENOVO-ThinkPad-X250-12-5-HD-Intel-Core-i5-5300U-2-90GHz-8GB-DDR3-500GB-HDD-WEBCAM-BLUETOOTH_zrth-v1.webp";
import lenovoThinkPadX250Img3 from "../public/products/LENOVO-ThinkPad-X250-12-5-HD-Intel-Core-i5-5300U-2-90GHz-8GB-DDR3-500GB-HDD-WEBCAM-BLUETOOTH_053d-u1.webp";
import lenovoThinkPadL540Img1 from "../public/products/Laptop-Lenovo-Thinkpad-L540-15-6-HD-Procesor-Intel-Core-i5-4200M-3-30-GHz-8GB-DDR3-500GB-HDD-DVD.webp";
import lenovoThinkPadL540Img2 from "../public/products/Laptop-Lenovo-Thinkpad-L540-15-6-HD-Procesor-Intel-Core-i5-4200M-3-30-GHz-8GB-DDR3-500GB-HDD-DVD_7yq.webp";
import lenovoThinkPadL540Img3 from "../public/products/Laptop-Lenovo-Thinkpad-L540-15-6-HD-Procesor-Intel-Core-i5-4200M-3-30-GHz-8GB-DDR3-500GB-HDD-DVD_k3t(1).webp";
import dellLatitudeE6410IMG1 from "../public/products/Laptop-REFURBISHED-Dell-Latitude-E6410--Intel-Core-i5-560-2660-mhz--4-GB-DDR3--160-GB-HDD--DVDRW--Display-14-1-.webp";
import dellLatitudeE6410IMG2 from "../public/products/Laptop-REFURBISHED-Dell-Latitude-E6410--Intel-Core-i5-560-2660-mhz--4-GB-DDR3--160-GB-HDD--DVDRW--Display-14-1-_dq8o-qf.webp";
import dellLatitudeE6410IMG3 from "../public/products/Laptop-REFURBISHED-Dell-Latitude-E6410--Intel-Core-i5-560-2660-mhz--4-GB-DDR3--160-GB-HDD--DVDRW--Display-14-1-_kipl-s4.webp";
import dellLatitudeE6410IMG4 from "../public/products/Laptop-REFURBISHED-Dell-Latitude-E6410--Intel-Core-i5-560-2660-mhz--4-GB-DDR3--160-GB-HDD--DVDRW--Display-14-1-_soqs-7y.webp";
import dellLatitudeE6410IMG5 from "../public/products/Laptop-REFURBISHED-Dell-Latitude-E6410--Intel-Core-i5-560-2660-mhz--4-GB-DDR3--160-GB-HDD--DVDRW--Display-14-1-_ed0u-m1.webp";
import laptopHPRevolve810G2Img1 from "../public/products/Laptop-HP-Revolve-810-G2-11-6-Inch--TouchScreen--i5-4210M-3-20-GHz--8GB-DDR3---120GB-SSD---Webcam_r196-54.webp";
import laptopHPRevolve810G2Img2 from "../public/products/Laptop-HP-Revolve-810-G2-11-6-Inch--TouchScreen--i5-4210M-3-20-GHz--8GB-DDR3---120GB-SSD---Webcam.webp";
import laptopHPRevolve810G2Img3 from "../public/products/Laptop-HP-Revolve-810-G2-11-6-Inch--TouchScreen--i5-4210M-3-20-GHz--8GB-DDR3---120GB-SSD---Webcam_ao4v-wn.webp";
import laptopHPRevolve810G2Img4 from "../public/products/Laptop-HP-Revolve-810-G2-11-6-Inch--TouchScreen--i5-4210M-3-20-GHz--8GB-DDR3---120GB-SSD---Webcam_v6fw-95.webp";
import laptopDELLLatitude5430Img1 from "../public/products/Laptop-DELL-Latitude-5430--14--HD---Intel-Core-i5-3320M-3-30GHz--8GB-DDR3--320GB-HDD--DVD-RW--WEB-CAM.webp";
import laptopDELLLatitude5430Img2 from "../public/products/Laptop-DELL-Latitude-5430--14--HD---Intel-Core-i5-3320M-3-30GHz--8GB-DDR3--320GB-HDD--DVD-RW--WEB-CAM_mp4s-yi.webp";
import laptopDELLLatitude5430Img3 from "../public/products/Laptop-DELL-Latitude-5430--14--HD---Intel-Core-i5-3320M-3-30GHz--8GB-DDR3--320GB-HDD--DVD-RW--WEB-CAM_kk2j-tg.webp";

export interface ILaptop {
      id: string;
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
          format?: string;
          interface?: string;
          numberIncluded?: number;
          type: string;
        };
        motherBoard: {
          typeMemory: string;
          RAMcapacity: number;
          producer: string;
          memorySlots: number;
          cpuSocket?: string;
          chipset?: string;
        };
        operationSystem?: string;
        secondHand: boolean;
        others?: string;
        display: {
          diagonal: number;
          rezolution: string;
          technology: string;
          aspectRatio?: string;
        };
        videoCard: {
          chip: string;
          memoryFrequency: number;
          tip: string;
        };
        ports: {
          audio: any;
          usb_2?: number;
          usb_3?: number;
          wi_fi?: string;
          network?: number;
        };
        summary?: {
          model: string;
          display: string;
          processor: string;
          memory: string;
          storage: string;
          videoCard: string;
          opticalUnit?: string;
          characteristics: string;
          productState: string;
          warranty: string;
          operationalsystem: string;
        };
}

export const laptopsData: ILaptop[] = [
  {
    id: 'laptop-lenovo-b50-50-15.6-hd-procesor-intel-core-i3-5005u-2.00-ghz-8gb-ddr3-128-gb-ssd-dvd-ro',
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
      typeMemory: "DDR3",
      RAMcapacity: 8,
      producer: "LENOVO",
      memorySlots: 2,
      cpuSocket: "BGA 1170",
    },
    operationSystem: "Fara sistem de operare preinstalat",
    secondHand: true,
    others: "Second Hand",
    display: {
      diagonal: 15.6,
      rezolution: "1366 x 768",
      technology: "LED Backlight",
    },
    videoCard: {
      chip: "Intel",
      memoryFrequency: 1333,
      tip: "HD Graphics 5500",
    },
    ports: {
      audio: 1,
      network: 1,
      usb_2: 1,
      usb_3: 1,
      wi_fi: "802.11 b/g/n",
    },
    summary: {
      model: "B50-50",
      display: '5.6" HD 1366x768 LED',
      processor: "Intel Core i3-5005U 2.00 GHz (3MB Cache, 2 Nuclee)",
      memory: "8 GB DDR3 1333 MHz",
      storage: "128 GB SSD SATA III",
      videoCard: "Intel® HD Graphics 5500",
      opticalUnit: "DVD",
      characteristics:
        "QWERTY/QWERTZ/AZERTY BLUETOOTH 1x USB 2.0 1x USB 3.0 1x HDMI",
      productState: "Second Hand",
      warranty: "12 Luni/ 30 de zile bateria",
      operationalsystem: "Fara sistem de operare preinstalat",
    },
  },
  {
    id: 'lenovo-thinkpad-x250-12.5-hd-intel-core-i5-5300u-2.90ghz-8gb-ddr3-500gb-hdd-webcam-bluetooth',
    title:
      'LENOVO ThinkPad X250 12.5" HD, Intel Core i5-5300U 2.90GHz, 8GB DDR3, 500GB HDD, WEBCAM, BLUETOOTH',
    images: [
      lenovoThinkPadX250Img1,
      lenovoThinkPadX250Img2,
      lenovoThinkPadX250Img3,
    ],
    price: 769.18,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    batteryType: "48",
    internalCode: "LNX250SH01",
    model: "ThinkPad X250",
    producerDetails: {
      model: "Lenovo",
      warranty: "12 Luni / 30 zile baterie",
      layout: "",
    },
    processorType: "i5",
    processorDetails: {
      processorModel: "i5-5300u",
      nuclearNumber: 2,
      processorType: "Intel Core i5",
      processorNumber: 1,
      cpuCache: 3,
      frequencyCPU: 2.3,
      frequencyTurbo: 2.9,
      graphicProcessor: "Intel® HD Graphics 5500",
      socket: "BGA 1168",
    },
    memoryCapacity: 8,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "500 GB",
      format: "2.5 inch",
      interface: "SATA-III",
      numberIncluded: 1,
      type: "SSD",
    },
    motherBoard: {
      typeMemory: "DDR3",
      RAMcapacity: 16,
      producer: "LENOVO",
      memorySlots: 1,
    },
    operationSystem: "Fara sistem de operare preinstalat",
    secondHand: true,
    others: "Second Hand",
    display: {
      diagonal: 12.0,
      rezolution: "1366 x 768",
      technology: "Anti-Glare, Led Backlit",
    },
    videoCard: {
      chip: "Intel",
      memoryFrequency: 1600,
      tip: "HD Graphics 5500",
    },
    ports: {
      audio: 1,
      network: 1,
      usb_3: 1,
      wi_fi: "802.11 b/g/n",
    },
    summary: {
      model: "Lenovo ThinkPad X250",
      display: '12.5" HD 1366*768 LED-Backlit Anti Glare',
      processor:
        "Intel Core i5-5300U Dual Core 2.30 GHz (2.90 GHz Turbo, 3MB Cache, 2 Nuclee) Generatia a 5-a",
      memory: "8 GB DDR3 1600 MHz",
      storage: "500 GB SSD SATA III",
      videoCard: "Intel® HD Graphics 5500",
      opticalUnit: "Fara unitate optica",
      characteristics:
        "WEBCAM BLUETOOTH TASTATURA ILUMINATA 2x USB 3.0 1x VGA 1x Mini Display Port",
      productState: "Second Hand",
      warranty: "12 Luni/ 30 de zile bateria",
      operationalsystem: "Fara sistem de operare preinstalat",
    },
  },
  {
    id: 'laptop-lenovo-thinkpad-l540-15.6-hd-procesor-intel-core-i5-4200m-3.30-ghz-8gb-ddr3-500gb-hdd-dvd',
    title:
      'Laptop Lenovo Thinkpad L540, 15.6" HD, Procesor Intel Core i5-4200M 3.30 GHz, 8GB DDR3, 500GB HDD, DVD',
    images: [
        lenovoThinkPadL540Img1,
        lenovoThinkPadL540Img2,
        lenovoThinkPadL540Img3,
    ],
    price: 1103.61,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    batteryType: "56",
    internalCode: "LVOL540SH01",
    model: "ThinkPad L540",
    producerDetails: {
      model: "Lenovo",
      warranty: "12 Luni / 30 zile baterie",
      layout: "",
    },
    processorType: "i5",
    processorDetails: {
      processorModel: "i5-4200M",
      nuclearNumber: 2,
      processorType: "Intel Core i5",
      processorNumber: 1,
      cpuCache: 3,
      frequencyCPU: 2.50,
      frequencyTurbo: 3.10,
      graphicProcessor: "Intel® HD Graphics 4600",
      socket: "BGA 1168",
    },
    memoryCapacity: 8,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "500 GB",
      format: "2.5 inch",
      interface: "SATA-III",
      numberIncluded: 1,
      type: "SSD",
    },
    motherBoard: {
      typeMemory: "DDR3",
      RAMcapacity: 16,
      producer: "LENOVO",
      memorySlots: 2,
      cpuSocket: 'BAG1168',
      chipset: 'Intel® QM87'

    },
    operationSystem: "Fara sistem de operare preinstalat",
    secondHand: true,
    others: "Second Hand",
    display: {
      diagonal: 15.6,
      rezolution: "1366 x 768",
      technology: "LED Backlight",
    },
    videoCard: {
      chip: "Intel",
      memoryFrequency: 1600,
      tip: "HD Graphics 4600",
    },
    ports: {
      audio: 1,
      usb_2: 3,
      usb_3: 1,
      wi_fi: "802.11 b/g/n",
    },
    summary: {
      model: "ThinkPad L540",
      display: '15.6" HD 1366x768 Led-Backlit',
      processor:
        "Intel Core i5-4200M Dual Core 2.60 GHz ( 3.30 GHz Turbo, 3MB Cache, 2 Nuclee)",
      memory: "8 GB DDR3 1600 MHz",
      storage: "500 GB SSD SATA III",
      videoCard: "Intel® HD Graphics 4600",
      opticalUnit: "DVD-RW",
      characteristics:
        "QWERTY/QWERTZ/AZERTY BLUETOOTH 3x USB 2.0 1x USB 3.0 1x VGA 1x Mini Display Port",
      productState: "Second Hand",
      warranty: "12 Luni/ 30 de zile bateria",
      operationalsystem: "Fara sistem de operare preinstalat",
    },
  },
  {
    id: 'laptop-refurbished-dell-latitude-e6410-intel-core-i5560-2660-mhz-4-gb-ddr3-160-gb-hdd-dvdrw-display-141-1839',
    title:
      'Laptop Second Hand Dell Latitude E6410, Intel Core i5-560 2660 mhz, 4 GB DDR3, 160 GB HDD, DVDRW, Display 14.1',
    images: [
        dellLatitudeE6410IMG1,
        dellLatitudeE6410IMG2,
        dellLatitudeE6410IMG3,
        dellLatitudeE6410IMG4,
        dellLatitudeE6410IMG5
    ],
    price: 802.62,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    batteryType: "37",
    internalCode: "DL1659",
    model: "E6410",
    producerDetails: {
      model: "Dell",
      warranty: "12 Luni",
      layout: "QWERTY/QWERTZ/AZERTY",
    },
    processorType: "i5",
    processorDetails: {
      processorModel: "i5-560M",
      nuclearNumber: 2,
      processorType: "Intel Core i5",
      cpuCache: 3,
      frequencyCPU: 2.66,
      frequencyTurbo: 3.20,
      graphicProcessor: "Intel® HD Graphics for 2nd Generation Intel® Processors",
      socket: "PGA 988",
    },
    memoryCapacity: 4,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "160 GB",
      interface: "SATA",
      type: "HDD",
    },
    motherBoard: {
      typeMemory: "DDR3 - 1066 / 1333 MHz",
      RAMcapacity: 8,
      producer: "DELL",
      memorySlots: 2,
      cpuSocket: 'PGA 988',
      chipset: 'Intel Mobile QM57 Express'

    },
    operationSystem: "Fara sistem de operare preinstalat",
    secondHand: true,
    others: "Second Hand",
    display: {
      diagonal: 14.1,
      rezolution: "1280 x 800",
      technology: "LED",
    },
    videoCard: {
      chip: "Intel",
      memoryFrequency: 1333,
      tip: "DDR3",
    },
    ports: {
      audio: '2x Jack',
      usb_2: 4,
      network: 1
    },
    summary: {
      model: "Dell Latitude E6410",
      display: '14.0" WXGA 1280*800 LED-Backlit Anti-Glare',
      processor:
        "Intel Core i5-560M Dual Core 2.66 GHz ( 3.20 GHz Turbo, 3MB Cache, 2 Nuclee)",
      memory: "4 GB DDR3 1333 MHz",
      storage: "160 HDD SATA",
      videoCard: "Intel HD Graphics",
      opticalUnit: "DVD",
      characteristics:
        "QWERTY/QWERTZ/AZERTY BLUETOOTH 4x USB 2.0 1x USB eSATA WEBCAM VGA Display Port",
      productState: "Second Hand",
      warranty: "12 Luni",
      operationalsystem: "Fara sistem de operare preinstalat",
    },
  },
  {
    id: 'laptop-hp-revolve-810-g2-11.6-inch-touchscreen-i5-4210m-3.20-ghz-8gb-ddr3-120gb-ssd-webcam',
    title:
      'Laptop HP Revolve 810 G2 11.6 Inch, TouchScreen, i5-4210M 3.20 GHz, 8GB DDR3, 120GB SSD, Webcam',
    images: [
        laptopHPRevolve810G2Img1,
        laptopHPRevolve810G2Img2,
        laptopHPRevolve810G2Img3,
        laptopHPRevolve810G2Img4,
    ],
    price: 902.95,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    batteryType: "44",
    internalCode: "HP810G2SH15",
    model: "Elitebook Revolve 810 g2",
    producerDetails: {
      model: "HP",
      warranty: "12 Luni",
      layout: "",
    },
    processorType: "i5",
    processorDetails: {
      processorModel: "i5-4210M",
      nuclearNumber: 2,
      processorType: "Intel Core i5",
      cpuCache: 3,
      frequencyCPU: 2.60,
      frequencyTurbo: 3.20,
      graphicProcessor: "Intel® HD Graphics 4600",
      socket: "PGA 946",
    },
    memoryCapacity: 8,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "120 GB",
      format: '2.5 inch',
      type: "SSD",
    },
    motherBoard: {
      typeMemory: "DDR3",
      RAMcapacity: 12,
      producer: "HP",
      memorySlots: 1,
      cpuSocket: 'PGA 946',

    },
    secondHand: true,
    others: "Second Hand",
    display: {
      diagonal: 11.6,
      rezolution: "1366 x 768",
      technology: "Touchscreen",
    },
    videoCard: {
      chip: "Intel",
      memoryFrequency: 1600,
      tip: "DDR3",
    },
    ports: {
      audio: 1,
      usb_3: 2,
      wi_fi: '802.11 b/g/n'
    },
    summary: {
      model: "EliteBook Revolve 810 G2",
      display: '11.6" HD 1366x768 Anti-Glare Touch Screen',
      processor:
        "Intel Core i5-4210U Dual Core 1.70 GHz (2.70 GHz Turbo, 3MB Cache, 2 Nuclee) Generatia a 4-a Haswell",
      memory: "8 GB DDR3",
      storage: "120 HDD SATA",
      videoCard: "Intel HD Graphics 4400",
      characteristics:
        "QWERTY/QWERTZ/AZERTY BLUETOOTH 2x USB 3.0 1x Display Port",
      productState: "Second Hand",
      warranty: "12 Luni 30 zile bateria",
      operationalsystem: "Fara sistem de operare preinstalat",
    },
  },
  {
    id: 'laptop-dell-latitude-5430-14-hd-intel-core-i5-3320m-3.30ghz-8gb-ddr3-320gb-hdd-dvd-rw-web-cam',
    title:
      'Laptop DELL Latitude 5430, 14" HD+, Intel Core i5-3320M 3.30GHz, 8GB DDR3, 320GB HDD, DVD-RW, WEB CAM',
    images: [
        laptopDELLLatitude5430Img1,
        laptopDELLLatitude5430Img2,
        laptopDELLLatitude5430Img3,
    ],
    price: 601.97,
    currency: "lei",
    details:
      "Toate fotografiile produselor prezentate au caracter informativ, pot diferi fata de produsul vandut si pot arata accesorii ce nu sunt incluse in pachetul standard al produsului",
    batteryType: "65",
    internalCode: "DELLE5430SH04",
    model: "Latitude E5430",
    producerDetails: {
      model: "Dell",
      warranty: "12 Luni / 30 zile baterie",
      layout: "QWERTY",
    },
    processorType: "i5",
    processorDetails: {
      processorModel: "i5-3320M",
      nuclearNumber: 2,
      processorType: "Intel Core i5",
      cpuCache: 3,
      frequencyCPU: 2.60,
      frequencyTurbo: 3.30,
      graphicProcessor: "Intel® HD Graphics 4000",
      socket: "PGA 988",
    },
    memoryCapacity: 8,
    memoryType: "DDR3",
    hardDiskDetails: {
      capacity: "320 GB",
      format: '2.5 inch',
      interface: 'SATA-III',
      type: "HDD",
    },
    motherBoard: {
      typeMemory: "DDR3",
      RAMcapacity: 8,
      producer: "DELL",
      memorySlots: 2,
      cpuSocket: 'BGA 1023',
      chipset: 'Intel QM77 Express'
    },
    secondHand: true,
    others: "Second Hand",
    operationSystem: 'Fara sistem de operare preinstalat',
    display: {
      diagonal: 14.1,
      rezolution: "1600 x 900",
      technology: "LCD LED",
      aspectRatio: '16:9'
    },
    videoCard: {
      chip: "nVidia",
      memoryFrequency: 1600,
      tip: "HD Graphics 4000",
    },
    ports: {
      audio: 1,
      network: 1,
      usb_2: 2,
      usb_3: 1,
      wi_fi: '802.11 b/g/n'
    },
    summary: {
      model: "DELL Latitude 5430",
      display: '14" HD+ 1600x900 ANTI GLARE LED',
      processor:
        "Intel Core i5-3320M Dual Core 2.60 GHz (3.30 GHz Turbo, 3MB Cache, 2 Nuclee)",
      memory: " 8 GB DDR3 1600 MHz",
      storage: "320 GB HDD",
      videoCard: "Intel HD Graphics 4000",
      opticalUnit: 'DVD-RW',
      characteristics:
        "QWERTY/QWERTZ/AZERTY WEBCAM FINGERPRINT 1x USB 2.0 2x USB 3.0",
      productState: "Second Hand",
      warranty: "12 Luni 30 zile bateria",
      operationalsystem: "Fara sistem de operare preinstalat",
    },
  },
];
