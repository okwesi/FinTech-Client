import { Button, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, Typography } from 'antd';
import React from 'react';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const AddStockModal = ({ handleClose, open }: any) => {
	const [stockName, setStockName] = React.useState('');
	const [purchasePrice, setPurchasePrice] = React.useState('');
	const [purchaseQuantity, setPurchaseQuantity] = React.useState('');
	const [stockSymbol, setStockSymbol] = React.useState('');
	const [purchaseDate, setPurchaseDate] = React.useState<Date | null>(null);
	const [brokerage, setBrokerage] = React.useState('');

	return (
		<>
			<Modal centered open={open} onOk={handleClose} onCancel={handleClose} width={700}>
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
							value={purchaseDate}
							onChange={(date) => setPurchaseDate(date?.toDate() ?? null)}
						/>
					</Form.Item>
					<Form.Item name="brokerage">
						<Input
							placeholder="Brokerage"
							value={brokerage}
							onChange={(e) => setBrokerage(e.target.value)}
						/>
					</Form.Item>
					<Form.Item>
						<button type="submit">Submit</button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AddStockModal;
