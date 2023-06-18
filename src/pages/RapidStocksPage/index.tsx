import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Row, Col, Space, Card, Typography, Button, Divider } from 'antd';
import React from 'react';
import { useRapidStocksState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import rapidStocksAsyncActions from '../../store/rapidAPIStocks/rapidStocks.thunk';
import RapidStocks from '../../models/RapidStock';

const RapidStocksPage = () => {
	const dispatch = useDispatch<any>();
	const rapidStocksState = useRapidStocksState();

	React.useEffect(() => {
		dispatch(rapidStocksAsyncActions.index());
	}, []);

	const rapidStocks = React.useMemo(() => {
		if (!rapidStocksState.list) {
			return;
		}
		return rapidStocksState.list;
	}, [rapidStocksState.list]);

	return (
		<div>
			<Row gutter={[16, 16]}>
				{rapidStocks?.map(({ _id, symbol, lastPrice, change, previousClose, dayHigh, dayLow }: RapidStocks) => (
					<Col span={8} key={_id}>
						<Card bordered={false}>
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
									<Typography>
										<CaretUpOutlined style={{ color: 'greenyellow', marginRight: '5px' }} />
										<b>{change.toFixed(2)}%</b>
									</Typography>
								) : (
									<Typography>
										<CaretUpOutlined style={{ color: 'red', marginRight: '5px' }} />
										<b>{change.toFixed(2)}%</b>
									</Typography>
								)}
							</div>
							<Divider />
							<div>
								<Row gutter={[16, 16]} justify="space-evenly">
									<Col span={8}>
										<Typography style={{ textAlign: 'center' }}>
											<b>Previous Close</b>
										</Typography>
										<Typography style={{ textAlign: 'center' }}>{previousClose}</Typography>
									</Col>
									<Col span={8}>
										<Typography style={{ textAlign: 'center' }}>
											<b>Day High</b>
										</Typography>
										<Typography style={{ textAlign: 'center' }}>{dayHigh}</Typography>
									</Col>
									<Col span={8}>
										<Typography style={{ textAlign: 'center' }}>
											<b>Day Low</b>
										</Typography>
										<Typography style={{ textAlign: 'center' }}>{dayLow}</Typography>
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default RapidStocksPage;
