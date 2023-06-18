export default interface CreateBondRequest {
	bondName: string;
	faceValue: number;
	couponRate: number;
	maturityDate: string;
	purchaseValue: number;
	paymentFrequency: string;
	purchaseDate: string;
	organization: string;
}
