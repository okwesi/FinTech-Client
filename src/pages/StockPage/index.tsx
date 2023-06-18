import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Divider, Row, Col, Space, Card, Typography, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useRapidStocksState, useStocksState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import stocksAsyncActions from '../../store/stocks/stocks.thunk';
import Stock from '../../models/Stock';
import rapidStocksAsyncActions from '../../store/rapidAPIStocks/rapidStocks.thunk';
import RapidStocks from '../../models/RapidStock';
import { Link } from 'react-router-dom';

const StockPage = () => {

	const dispatch = useDispatch<any>();
	const stocksState = useStocksState();
	const rapidStocksState = useRapidStocksState();


	React.useEffect(() => {
		dispatch(stocksAsyncActions.index());
	}, []);

	React.useEffect(() => {
		dispatch(rapidStocksAsyncActions.index());
	}, []);

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



	return (
		<div>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" align="top">
				<Col className="gutter-row" span={6}>
					<div style={{ width: '100%', overflow: 'hidden' }}>
						<Typography style={{fontWeight: 600, fontSize: '16px', margin: '3px 0'}} >Stock Markert</Typography>
						{rapidStocks?.map(({ _id, symbol, lastPrice, change }: RapidStocks) => (
							<Card
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
								key={_id}
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
						<Typography style={{textAlign: 'center'}} >
							<Link
								to="/stocks"
								style={{ color: 'blue', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }}
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
						<Typography style={{ fontWeight: 600, fontSize: '16px', margin: '3px 0' }} >Your Stocks</Typography>

						{stocks?.map(({ _id, stockName, stockSymbol, purchasePrice }: Stock) => (
							<Card
								key={_id}
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
							>
								<Typography style={{ fontWeight: 700 }}>{stockName}</Typography>
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
