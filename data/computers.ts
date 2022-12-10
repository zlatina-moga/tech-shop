export interface IComputer {
    id: string;
    images: any[];
    title: string;
    price: number;
    currency: string;
    details: string;
    internalCode: string;
    model: string;
    producerDetails: {
        model: string;
        warranty: string;
      };
}