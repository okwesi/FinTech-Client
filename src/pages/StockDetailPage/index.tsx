import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthenticationState, useRapidStocksState, useRequestState, useStockState } from '../../store/selector';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import stockAsyncActions from '../../store/stock/stock.thunk';
import RequestManager from '../../store/request/manager';
import { message } from 'antd';

const StockDetailPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const [isLoading, setIsLoading] = React.useState(false);
	const request = useRequestState();
	const stocksState = useStockState();
	const authenticationState = useAuthenticationState();

	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

	const stateStock = React.useMemo(() => {
		if (!location.state?.stock) {
			return;
		}
		return location.state?.stock;
	}, [location.state?.stock]);

	const stock = React.useMemo(() => {
		if (!stocksState.detail) {
			return;
		}
		return stocksState.detail;
	}, [stocksState.detail]);
	

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(stockAsyncActions.show.typePrefix)) {
			RM.consume(stockAsyncActions.show.typePrefix);
			// message.success('Stock deleted successfully');
			setIsLoading(false);
			return;
		}

		if (RM.isRejected(stockAsyncActions.show.typePrefix)) {
			RM.consume(stockAsyncActions.show.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch]);

	React.useEffect(() => {
		if (!id) {
			return;
		}
		if(stateStock) {
			return;
		}
		if(!authenticationState.isAuthenticated) {
			message.error('You are not authenticated');
			navigate('/');
			return;
		}

		setIsLoading(true);
		dispatch(stockAsyncActions.show({stockId: id}));
	}, [id, dispatch, stateStock, authenticationState.isAuthenticated]);


	return (
		<>
			{stateStock && (
				<div>
					<h1>{stateStock.stockName}</h1>
					<h1>{stateStock.quantity}</h1>
					<h1>{stateStock.price}</h1>
				</div>
			)}
			{stock && (
				<div>
					<h1>{stock.stockName}</h1>
					<h1>{stock.quantity}</h1>
					<h1>{stock.price}</h1>
				</div>
			)}
		</>
	);

};

export default StockDetailPage;
