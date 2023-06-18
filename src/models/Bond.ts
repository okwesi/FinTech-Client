export default interface Bond  {
    _id: string;
    bondName: string;
    faceValue: number;
    couponRate: number;
    maturityDate: string;
    purchaseValue: number;
    paymentFrequency: string;
    purchaseDate: string;
    organization: string;
    dateCreated: string;
    dateUpdated: string;
    dateDeleted: string;
    isDeleted: boolean;
}