import { Col, DatePicker, Divider, Form, Input, Modal, Row, Spin, Typography, message } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRequestState } from '../../../../store/selector';
import stocksAsyncActions from '../../../../store/stocks/stocks.thunk';
import RequestManager from '../../../../store/request/manager';
import isAnyEmpty from '../../../utils/isEmpty';


const AddStockModal = ({ handleClose, open }: any) => {
	const [stockName, setStockName] = React.useState('');
	const [purchasePrice, setPurchasePrice] = React.useState('');
	const [purchaseQuantity, setPurchaseQuantity] = React.useState('');
	const [stockSymbol, setStockSymbol] = React.useState('');
	const [purchaseDate, setPurchaseDate] = React.useState<any>(null);
	const [brokerage, setBrokerage] = React.useState('');

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

		if (RM.isFulfilled(stocksAsyncActions.store.typePrefix)) {
			RM.consume(stocksAsyncActions.store.typePrefix);
			message.success('Stock added successfully');
			setIsLoading(false);
			handleClose();
			return;
		}

		if (RM.isRejected(stocksAsyncActions.store.typePrefix)) {
			RM.consume(stocksAsyncActions.store.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch, navigate]);

	const store = React.useCallback(() => {
		if (isLoading) {
			return;
		}

		if (
			isAnyEmpty([
				stockName,
				purchasePrice,
				purchaseQuantity,
				stockSymbol,
				purchaseDate,
				brokerage
			])
		) {
			message.error('Please fill all the fields');
			return;
		}

		setIsLoading(true);

		dispatch(
			stocksAsyncActions.store({
				stockName,
				purchasePrice,
				purchaseQuantity,
				stockSymbol,
				purchaseDate,
				brokerage
			})
		);

	}, [
		stockName,
		purchasePrice,
		purchaseQuantity,
		stockSymbol,
		purchaseDate,
		brokerage,
		dispatch,
		isLoading,
		handleClose
	]);

	return (
		<>
			<Modal centered open={open} onOk={store} onCancel={handleClose} width={700} style={{ opacity: isLoading ? 0.5 : 1 }}>

				<Typography style={{ fontWeight: '600', fontSize: '20px' }}>Add Stock</Typography>
				<Divider />

				<Form >
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item name="stockName">
								<Input
									placeholder="Stock Name"
									value={stockName}
									onChange={(e) => setStockName(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="purchasePrice">
								<Input
									placeholder="Purchase Price"
									type="number"
									value={purchasePrice}
									onChange={(e) => setPurchasePrice(e.target.value)}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item name="purchaseQuantity">
								<Input
									placeholder="Purchase Quantity"
									type="number"
									value={purchaseQuantity}
									onChange={(e) => setPurchaseQuantity(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="stockSymbol">
								<Input
									placeholder="Stock Symbol"
									value={stockSymbol}
									onChange={(e) => setStockSymbol(e.target.value)}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name="purchaseDate">
						<DatePicker
							style={{ width: '100%' }}
							value={purchaseDate ? moment(purchaseDate, 'YYYY-MM-DD') : null}
							onChange={(date, dateString) => setPurchaseDate(dateString)}
						/>

					</Form.Item>
					<Form.Item name="brokerage">
						<Input
							placeholder="Brokerage"
							value={brokerage}
							onChange={(e) => setBrokerage(e.target.value)}
						/>
					</Form.Item>
					{/* <Form.Item>
						<button type="submit">Submit</button>
					</Form.Item> */}
				</Form>

			</Modal>
		</>
	);
};

export default AddStockModal;
