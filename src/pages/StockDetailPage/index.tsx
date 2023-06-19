import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthenticationState, useRapidStocksState, useRequestState, useStockState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import stockAsyncActions from '../../store/stock/stock.thunk';
import RequestManager from '../../store/request/manager';
import { Button, Card, Col, Divider, Row, Space, Table, Tabs, Typography, message } from 'antd';
import EditStockModal from '../../lib/components/Modals/EditStockModal';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import TabPane from 'antd/es/tabs/TabPane';
import getUTCDate from '../../lib/utils/date';


const StockDetailPage: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isApiLoading, setIsApiLoading] = React.useState(false);
	const request = useRequestState();
	const stocksState = useStockState();
	const authenticationState = useAuthenticationState();

	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);
	const [stock, setStock] = React.useState<any>(null);
	const [apiData, setApiData] = React.useState<any>(null);


	// const stock = React.useMemo(() => {
	// 	if (!stocksState.detail) {
	// 		return;
	// 	}
	// 	return stocksState.detail;
	// }, [stocksState.detail]);

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


	// React.useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const options = {
	// 				method: 'GET',
	// 				url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock?.stockSymbol}/asset-profile`,
	// 				headers: {
	// 					'X-RapidAPI-Key': '2c71ad3c52msh0b77d95cfe8c66ap15d1fbjsn03787be01f6b',
	// 					'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
	// 				}
	// 			};
	// 			setIsApiLoading(true);
	// 			const response = await axios.request(options);
	// 			setApiData(response.data);
	// 			console.log(response.data);
	// 			setIsApiLoading(false);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	if (stock) {
	// 		fetchData();
	// 	}
	// }, [stock]);

	// React.useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const options = {
	// 				method: 'GET',
	// 				url: 'https://alpha-vantage.p.rapidapi.com/query',
	// 				params: {
	// 					function: 'TIME_SERIES_DAILY',
	// 					symbol: `${stock?.stockSymbol}`,
	// 					outputsize: 'compact',
	// 					datatype: 'json'
	// 				},
	// 				headers: {
	// 					'X-RapidAPI-Key': '2c71ad3c52msh0b77d95cfe8c66ap15d1fbjsn03787be01f6b',
	// 					'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	// 				}
	// 			};

	// 			setIsApiLoading(true);
	// 			const response = await axios.request(options);
	// 			setApiData(response.data);
	// 			setIsApiLoading(false);
	// 		} catch (error) {
	// 			message.warning('API not Ready');
	// 		}
	// 	};

	// 	if (stock) {
	// 		fetchData();
	// 	}
	// }, [stock]);

	React.useEffect(() => {
		if (stocksState.detail) {
			setStock(stocksState.detail);
		}

	}, [stocksState.detail]);


	let chartData: any = [];
	if (apiData && apiData["Time Series (Daily)"]) {
		chartData = Object.entries(apiData["Time Series (Daily)"]).map(([date, values]: any) => ({
			date,
			close: parseFloat(values["4. close"])
		}));
	}


	const columns = [
		{
			title: 'Date',
			dataIndex: 'actionDate',
			key: 'actionDate',
			render: (date: string) => getUTCDate(date).toString(), // Adjust the rendering of the date if needed
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Transaction Type',
			dataIndex: 'action',
			key: 'action',
		},
	];

	let dataSource = [];
	if (stock && stock.stockLog) {
		dataSource = stock.stockLog.map((transaction: any, index: any) => ({
			key: index,
			actionDate: transaction.actionDate,
			quantity: transaction.quantity,
			price: transaction.price,
			action: transaction.action,
		}));
	}
	return (
		<>

			{stock && (
				<>
					<Row>
						<Col span={18} offset={3}>
							<Card bordered={false} style={{ width: "100%" }}>
								<Space style={{ display: 'flex', justifyContent: 'space-between' }}>
									<h1>{stock.stockName}</h1>
									<Button onClick={handleOpen}>Edit </Button>
								</Space>
								<Divider />
								<Space style={{ display: 'flex', justifyContent: 'space-between' }}>
									<Typography style={{ fontWeight: 500, fontSize: '16px' }}>Ticker: {stock.stockSymbol}</Typography>
									<Typography style={{ fontWeight: 500, fontSize: '16px' }}>Purchase Price: {stock.purchasePrice}</Typography>
									<Typography style={{ fontWeight: 500, fontSize: '16px' }}>Purchase Quanitity: {stock.purchaseQuantity}</Typography>
									<Typography style={{ fontWeight: 500, fontSize: '16px' }}>Current Quanitity: {stock.purchaseQuantity}</Typography>
								</Space>


								<Tabs defaultActiveKey="1" centered>
									<TabPane tab="Transaction History" key="1">
										{
											stock.stockLog && (
												<Table columns={columns} dataSource={dataSource} />
											)
										}
									</TabPane>
									<TabPane tab="Line Chart" key="2">
										{
											apiData && (
												<LineChart width={800} height={300} data={chartData}>
													<CartesianGrid strokeDasharray="3 3" />
													<XAxis dataKey="date" />
													<YAxis />
													<Tooltip />
													<Legend />
													<Line type="monotone" dataKey="close" stroke="#8884d8" />
												</LineChart>
											)
										}
									</TabPane>
									<TabPane tab="Analytics" key="3">
										{
											stock.stockData && (
												<>
													<h1>{stock.stockData.open}</h1>
													<h1>{stock.stockData.high}</h1>
													<h1>{stock.stockData.low}</h1>
													<h1>{stock.stockData.price}</h1>
													<h1>{stock.stockData.volume}</h1>
													<h1>{stock.stockData.latestTradingDay}</h1>
													<h1>{stock.stockData.previousClose}</h1>
													<h1>{stock.stockData.change}</h1>
													<h1>{stock.stockData.changePercent}</h1>

												</>
											)
										}
									</TabPane>
								</Tabs>
							</Card>
						</Col>
					</Row>
				</>
			)}



			<EditStockModal open={open} handleClose={handleClose} id={id} data={stock} />
		</>
	);
};

export default StockDetailPage;
