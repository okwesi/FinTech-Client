
export interface UserStockLogResource {
	action: string;
	price: number;
	quantity: number;
	actionDate: Date;
	dateCreated: Date;
	dateUpdated: Date;
}
export interface StockData {
	symbol: string;
	open: string;
	high: string;
	low: string;
	price: string;
	volume: string;
	latestTradingDay: string;
	previousClose: string;
	change: string;
	changePercent: string;
}

export default interface Stock {
	_id: string;
	stockName: string;
	dateCreated: Date;
	dateUpdated: Date;
	dateDeleted: Date;
	isDeleted: boolean;
	purchasePrice: number;
	purchaseQuantity: number;
	currentQuantity: number;
	stockSymbol: string;
	purchaseDate: Date;
	brokerage: string;
	stockLog: UserStockLogResource[];
	stockData: StockData | null;
}
