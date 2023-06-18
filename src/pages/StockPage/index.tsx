import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, Row, Col, Space, Card, Typography, Button, message, Popconfirm } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useRapidStocksState, useRequestState, useStocksState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import stocksAsyncActions from '../../store/stocks/stocks.thunk';
import Stock from '../../models/Stock';
import rapidStocksAsyncActions from '../../store/rapidAPIStocks/rapidStocks.thunk';
import RapidStocks from '../../models/RapidStock';
import { Link } from 'react-router-dom';
import RequestManager from '../../store/request/manager';

const StockPage = () => {
	const dispatch = useDispatch<any>();
	const request = useRequestState();
	const stocksState = useStocksState();
	const rapidStocksState = useRapidStocksState();
	const [isLoading, setIsLoading] = React.useState(false);

	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

	React.useEffect(() => {
		dispatch(stocksAsyncActions.index());
	}, []);

	React.useEffect(() => {
		dispatch(rapidStocksAsyncActions.index());
	}, []);


	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(stocksAsyncActions.destroy.typePrefix)) {
			RM.consume(stocksAsyncActions.destroy.typePrefix);
			message.success('Stock deleted successfully');
			setIsLoading(false);
			return;
		}

		if (RM.isRejected(stocksAsyncActions.store.typePrefix)) {
			RM.consume(stocksAsyncActions.store.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch]);

	const stocks = React.useMemo(() => {
		if (!stocksState.list) {
			return;
		}
		return stocksState.list;
	}, [stocksState.list]);

	const rapidStocks = React.useMemo(() => {
		if (!rapidStocksState.list) {
			return;
		}
		return rapidStocksState.list.slice(0, 5);
	}, [rapidStocksState.list]);


	const destroy = React.useCallback((stockId: string) => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);
		dispatch(stocksAsyncActions.destroy(stockId));
	}, [isLoading, dispatch]);




	return (
		<div>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" align="top">
				<Col className="gutter-row" span={6}>
					<div style={{ width: '100%', overflow: 'hidden' }}>
						<Typography style={{ fontWeight: 600, fontSize: '16px', margin: '3px 0' }}>
							Stock Markert
						</Typography>
						{rapidStocks?.map(({ symbol, lastPrice, change }: RapidStocks, index) => (
							<Card
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
								key={index}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Typography style={{ fontWeight: 500 }}>{symbol}</Typography>
									<Typography style={{ fontWeight: 400 }}>{`$${lastPrice}`}</Typography>
									{change > 0 ? (
										<CaretUpOutlined style={{ color: 'greenyellow' }} />
									) : (
										<CaretDownOutlined style={{ color: 'red' }} />
									)}
								</div>
							</Card>
						))}
						<Typography style={{ textAlign: 'center' }}>
							<Link
								to="/stocks"
								style={{
									color: 'blue',
									textAlign: 'center',
									textDecoration: 'underline',
									cursor: 'pointer',
								}}
							>
								More Stocks
							</Link>
						</Typography>
					</div>
				</Col>
				<Col className="gutter-row" id="middle" span={14}>
					<div
						style={{
							width: '100%',
							height: '100vh',
						}}
					>
						<Typography style={{ fontWeight: 600, fontSize: '16px', margin: '3px 0' }}>
							Your Stocks
						</Typography>

						{stocks?.map(({ _id, stockName, stockSymbol, purchasePrice }: Stock) => (
							<Card
								key={_id}
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',

								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Typography style={{ fontWeight: 700 }}>{stockName}</Typography>
									<Popconfirm
										title="Are you sure you want to delete this?"
										onConfirm={() => destroy(_id)}
										okText="Yes"
										cancelText="No"
									>
										<Button type="link" icon={<DeleteOutlined />} />
									</Popconfirm>
								</div>

								<Divider />
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Typography style={{ fontWeight: 500 }}>{stockSymbol}</Typography>
									<Typography style={{ fontWeight: 400 }}>${purchasePrice}</Typography>
									{true ? (
										<CaretUpOutlined style={{ color: 'greenyellow' }} />
									) : (
										<CaretDownOutlined style={{ color: 'red' }} />
									)}
								</div>
							</Card>
						))}

						{false ?? (
							<Space wrap>
								<Button type="primary">Prev</Button>
								<Button>Next</Button>
							</Space>
						)}
					</div>
				</Col>
				<Col className="gutter-row" span={2}>
					{/* <Card
                        style={{
                            width: '100%',
                            height: 500,
                            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                        }}
                    ></Card> */}
				</Col>
			</Row>
		</div>
	);
};

export default StockPage;
