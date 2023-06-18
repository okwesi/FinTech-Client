import Stock from '../../models/Stock';

export interface Pagination {
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

type StocksResponse = {
	pagination: Pagination;
	stocks: Array<Stock>;
};

export default StocksResponse;
