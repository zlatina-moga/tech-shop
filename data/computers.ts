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
    typeMemory: string;
    RAMcapacity: number;
    producer?: string;
    memorySlots: number;
    cpuSocket?: string;
    chipset?: string;
    psi_e_x1?: number;
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
