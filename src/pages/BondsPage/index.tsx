import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Row, Col, Card, Typography, Divider, Space, Button } from 'antd';
import React from 'react';

const BondsPage = () => {
	const cardData = [
		{ title: 'My First Bond', price: 50, positiveChange: false },
		{ title: 'My First Bond', price: 50, positiveChange: false },
		{ title: 'My First Bond', price: 50, positiveChange: false },
		{ title: 'My First Bond', price: 50, positiveChange: false },
	];
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
						{cardData.map((data, index) => (
							<Card
								key={index}
								bordered={false}
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
							>
								<Typography style={{ fontWeight: 700 }}>{data.title}</Typography>
								<Divider />
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Typography style={{ fontWeight: 500 }}>AAAL</Typography>
									{true ? (
										<Typography style={{ fontWeight: 400 }}>
											{' '}
											<CaretUpOutlined style={{ color: 'greenyellow' }} /> ${data.price}
										</Typography>
									) : (
										<Typography style={{ fontWeight: 400 }}>
											{' '}
											<CaretDownOutlined style={{ color: 'red' }} /> ${data.price}
										</Typography>
									)}
									<Typography style={{ fontWeight: 400 }}> 25-10-2023</Typography>
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
