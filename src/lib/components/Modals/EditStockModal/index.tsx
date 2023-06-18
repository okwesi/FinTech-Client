import { Col, DatePicker, Divider, Form, Input, Modal, Row, Typography, message } from 'antd';
import React from 'react';
import RequestManager from '../../../../store/request/manager';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRequestState } from '../../../../store/selector';
import stockAsyncActions from '../../../../store/stock/stock.thunk';

const EditStockModal = ({ handleClose, open, id, data }: any) => {
	const [stockName, setStockName] = React.useState<any>(data?.stockName || '');
	const [purchaseQuantity, setPurchaseQuantity] = React.useState<any>(data?.purchaseQuantity || '');
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const request = useRequestState();
	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(stockAsyncActions.update.typePrefix)) {
			RM.consume(stockAsyncActions.update.typePrefix);
			message.success('Stock updeee successfully');
			setIsLoading(false);
			handleClose();
			return;
		}

		if (RM.isRejected(stockAsyncActions.update.typePrefix)) {
			RM.consume(stockAsyncActions.update.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch, navigate]);

	const update = React.useCallback(() => {
		if (isLoading) {
			return;
		}
		if (!id) {
			return;
		}
		setIsLoading(true);
		dispatch(
			stockAsyncActions.update({
				id: id,
				stockName,
				purchaseQuantity
			})
		);
	}, [stockName, purchaseQuantity, dispatch, id, isLoading]);

	return (
		<>
			<Modal
				centered
				open={open}
				onOk={update}
				onCancel={handleClose}
				width={700}
				style={{ opacity: isLoading ? 0.5 : 1 }}
			>
				<Typography style={{ fontWeight: '600', fontSize: '20px' }}>Add Stock</Typography>
				<Divider />
				<Form>
					<Form.Item name="stockName" initialValue={stockName}>
						<Input placeholder="Stock Name" onChange={(e) => setStockName(e.target.value)} />
					</Form.Item>
					<Form.Item name="purchaseQuantity" initialValue={purchaseQuantity}>
						<Input
							placeholder="Purchase Quantity"
							type="number"
							onChange={(e) => setPurchaseQuantity(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default EditStockModal;
