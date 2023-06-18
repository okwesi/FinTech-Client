export default interface RapidStocks {
	symbol: string;
	identifier: string;
	open: number;
	dayHigh: number;
	dayLow: number;
	lastPrice: number;
	previousClose: number;
	change: number;
	pChange: number;
	yearHigh: number;
	yearLow: number;
	totalTradedVolume: number;
	totalTradedValue: number;
	lastUpdateTime: string;
	perChange365d: number;
	perChange30d: number;
}
