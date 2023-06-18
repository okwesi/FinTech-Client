import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthenticationState, useBondState, useRapidStocksState, useRequestState } from '../../store/selector';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import RequestManager from '../../store/request/manager';
import { Button, message } from 'antd';
import bondAsyncActions from '../../store/bond/bond.thunk';
import Bond from '../../models/Bond';
import EditBondModal from '../../lib/components/Modals/EditBondModal';

const BondDetailPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const [isLoading, setIsLoading] = React.useState(false);
	const request = useRequestState();
	const bondState = useBondState();
	const authenticationState = useAuthenticationState();

	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const bond: Bond | undefined = React.useMemo(() => {
		if (!bondState.detail) {
			return;
		}
		return bondState.detail;
	}, [bondState.detail]);

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(bondAsyncActions.show.typePrefix)) {
			RM.consume(bondAsyncActions.show.typePrefix);
			// message.success('Stock deleted successfully');
			setIsLoading(false);
			return;
		}

		if (RM.isRejected(bondAsyncActions.show.typePrefix)) {
			RM.consume(bondAsyncActions.show.typePrefix);
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
		dispatch(bondAsyncActions.show({ bondId: id }));
	}, [id, dispatch, authenticationState.isAuthenticated]);

	return (
		<>
			
			{bond && (
				<div>
					<h1>{bond.bondName}</h1>
					{/* <h1>{bond.quantity}</h1>
						<h1>{bond.price}</h1> */}
				</div>
			)}
			<Button type="primary" onClick={handleOpen}>
				Edit Bond
			</Button>


			<EditBondModal open={open} handleClose={handleClose} id={id} data={bond} />
		</>
	);
};

export default BondDetailPage;
