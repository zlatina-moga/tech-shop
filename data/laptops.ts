export interface ILaptop {
    image: any;
    title: string;
    price: number;
    details: string;
    batteryType: string;
    producerDetails: {
        model: string;
        warranty: string;
        layout: string;
    }
    processorDetails: {
        processorModel: string;
        nuclearNumber: number;
        processorNumber: number;
        processorType: string;
        cpuCache: number;
        frequencycPU: number;
        frequencyTurbo: number;
        graphicProcessor: string;
        socket: string;
    }
    memoryCapacity: number;
    memoryType: string;
    hardDiskDetails: {
        capacity: string;
        format: string;
        interface: string;
        numberIncluded: number;
        type: string
    }
    motherBoard: {
        typeMemory: string;
        RAMcapacity: number;
        producer: string;
        memorySlots: number
    },
    operationSystem: string;
    secondHand: boolean;
    display: {
        diagonal: string;
        rezolution: string;
        technology: string
    },
    videoCard: {
        chip: string;
        memoryFrequency: number;
        tip: string
    },
    ports: {
        audio: number;
        usb_3: number;
        wi_fi: string;
        network: number
    }
}