import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Row, Col, Card, Typography, Divider, Space, Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useBondsState } from '../../store/selector';
import bondsAsyncActions from '../../store/bonds/bonds.thunk';
import Bond from '../../models/Bond';
import UTC from '../../lib/utils/date';

const BondsPage = () => {
	const dispatch = useDispatch<any>();
	const bondsState = useBondsState();

	const bonds = React.useMemo(() => {
		if (bondsState.list.length === 0) {
			return;
		}
		return bondsState.list;
	}, [bondsState.list]);

	React.useEffect(() => {
		dispatch(bondsAsyncActions.index())
	}, [])

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
						{bonds?.map(({ _id, bondName, maturityDate, purchaseDate, purchaseValue }: Bond) => (
							<Card
								key={_id}
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
							>
								<Typography style={{ fontWeight: 700 }}>{bondName}</Typography>
								<Divider />
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Typography style={{ fontWeight: 500 }}>Purcase: {UTC(purchaseDate)}</Typography>
									{true ? (
										<Typography style={{ fontWeight: 400 }}>
											{' '}
											<CaretUpOutlined style={{ color: 'greenyellow' }} /> ${purchaseValue}
										</Typography>
									) : (
										<Typography style={{ fontWeight: 400 }}>
											{' '}
											<CaretDownOutlined style={{ color: 'red' }} /> ${purchaseValue}
										</Typography>
									)}
									<Typography style={{ fontWeight: 500 }}>Marity: {UTC(maturityDate)}</Typography>
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
