import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Divider, Row, Col, Space, Card, Typography, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useStocksState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import stocksAsyncActions from '../../store/stocks/stocks.thunk';
import Stock from '../../models/Stock';

const StockPage = () => {

	const dispatch = useDispatch<any>();
	const stocksState = useStocksState();

	const stocks = React.useMemo(() => {
		if (stocksState.list.length === 0) {
			return;
		}
		return stocksState.list;
	}, [stocksState.list]);

	React.useEffect(() => {
		dispatch(stocksAsyncActions.index())
	}, [])

	
	return (
		<div>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" align="top">
				<Col className="gutter-row" span={5}>
					<div style={{ height: 500, width: '100%', overflow: 'hidden' }}>
						{stocks?.map(({_id } : any) => (
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
									<Typography style={{ fontWeight: 500 }}>AAAL</Typography>
									<Typography style={{ fontWeight: 400 }}>$50</Typography>
									{false ? (
										<CaretUpOutlined style={{ color: 'greenyellow' }} />
									) : (
										<CaretDownOutlined style={{ color: 'red' }} />
									)}
								</div>
							</Card>
						))}
					</div>
				</Col>
				<Col className="gutter-row" id="middle" span={12}>
					<div
						style={{
							width: '100%',
							height: '100vh',
						}}
					>
						{stocks?.map(({_id, stockName, stockSymbol, purchasePrice} : Stock) => (
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
				<Col className="gutter-row" span={5}>
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
