import { CaretUpOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Card, Typography, Divider, Space, Button, Popconfirm, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useBondsState, useRequestState } from '../../store/selector';
import bondsAsyncActions from '../../store/bonds/bonds.thunk';
import Bond from '../../models/Bond';
import UTC from '../../lib/utils/date';
import RequestManager from '../../store/request/manager';
import { useNavigate } from 'react-router-dom';
import bondReducer, { resetState } from '../../store/bond';

const BondsPage = () => {
	const dispatch = useDispatch<any>();
	const bondsState = useBondsState();
	const navigate = useNavigate();

	const request = useRequestState();
	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

	const [isLoading, setIsLoading] = React.useState(false);

	const bonds = React.useMemo(() => {
		if (bondsState.list.length === 0) {
			return;
		}
		return bondsState.list;
	}, [bondsState.list]);

	React.useEffect(() => {
		dispatch(bondsAsyncActions.index());
		dispatch(resetState());
	}, []);

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(bondsAsyncActions.destroy.typePrefix)) {
			RM.consume(bondsAsyncActions.destroy.typePrefix);
			message.success('Bond deleted successfully');
			setIsLoading(false);
			return;
		}

		if (RM.isRejected(bondsAsyncActions.destroy.typePrefix)) {
			RM.consume(bondsAsyncActions.destroy.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch]);

	// const stocks = React.useMemo(() => {
	// 	if (!stocksState.list) {
	// 		return;
	// 	}
	// 	return stocksState.list;
	// }, [stocksState.list]);

	const destroy = React.useCallback(
		(bondId: string) => {
			if (isLoading) {
				return;
			}
			setIsLoading(true);
			dispatch(bondsAsyncActions.destroy(bondId));
		},
		[isLoading, dispatch]
	);

	return (
		<div>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" align="top">
				<Col className="gutter-row" span={5}></Col>
				<Col className="gutter-row" id="middle" span={12}>
					<div
						style={{
							width: '100%',
							height: '100vh',
						}}
					>
						{bonds?.map((bond: Bond) => (
							<Card
								key={bond._id}
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
								onClick={() => {
									navigate(`/bonds/${bond._id}`, { state: { bond } });
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
									<Typography style={{ fontWeight: 700 }}>{bond.bondName}</Typography>
									<Popconfirm
										title="Are you sure you want to delete this?"
										onConfirm={() => destroy(bond._id)}
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
									<Typography style={{ fontWeight: 500 }}>
										Purcase: {UTC(bond.purchaseDate)}
									</Typography>
									{true ? (
										<Typography style={{ fontWeight: 400 }}>
											{' '}
											<CaretUpOutlined style={{ color: 'greenyellow' }} /> ${bond.purchaseValue}
										</Typography>
									) : (
										<Typography style={{ fontWeight: 400 }}>
											{' '}
											<CaretDownOutlined style={{ color: 'red' }} /> ${bond.purchaseValue}
										</Typography>
									)}
									<Typography style={{ fontWeight: 500 }}>
										Marity: {UTC(bond.maturityDate)}
									</Typography>
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
				<Col className="gutter-row" span={5}></Col>
			</Row>
		</div>
	);
};

export default BondsPage;
