import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthenticationState, useRapidStocksState, useRequestState, useStockState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import stockAsyncActions from '../../store/stock/stock.thunk';
import RequestManager from '../../store/request/manager';
import { message } from 'antd';
import EditBondModal from '../../lib/components/Modals/EditBondModal';
import EditStockModal from '../../lib/components/Modals/EditStockModal';

const StockDetailPage: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const [isLoading, setIsLoading] = React.useState(false);
	const request = useRequestState();
	const stocksState = useStockState();
	const authenticationState = useAuthenticationState();

	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

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
		if (!authenticationState.isAuthenticated) {
			message.error('You are not authenticated');
			navigate('/');
			return;
		}

		setIsLoading(true);
		dispatch(stockAsyncActions.show({ stockId: id }));
	}, [id, dispatch, authenticationState.isAuthenticated]);

	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>

			{stock && (
				<>
					<div>
						<h1>{stock.stockName}</h1>
					</div>
					<button onClick={handleOpen}>Edit</button>
				</>
			)}


			<EditStockModal open={open} handleClose={handleClose} id={id} data={stock} />
		</>
	);
};

export default StockDetailPage;
