import { Col, DatePicker, Divider, Form, Input, Modal, Row, Typography } from 'antd';
import React from 'react';

const AddBondModal = ({ handleClose, open }: any) => {
	const [bondName, setBondName] = React.useState('');
	const [faceValue, setFaceValue] = React.useState<number | null>(null);
	const [couponRate, setCouponRate] = React.useState<number | null>(null);
	const [maturityDate, setMaturityDate] = React.useState<Date | null>(null);
	const [purchaseValue, setPurchaseValue] = React.useState<number | null>(null);
	const [paymentFrequency, setPaymentFrequency] = React.useState('');
	const [purchaseDate, setPurchaseDate] = React.useState<Date | null>(null);
	const [organization, setOrganization] = React.useState('');
	return (
		<>
			<Modal centered open={open} onOk={handleClose} onCancel={handleClose} width={700}>
				<Typography style={{ fontWeight: '600', fontSize: '20px' }}>Add Bond</Typography>
				<Divider />
				<Form>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<Input
									placeholder="Bond Name"
									value={bondName}
									onChange={(e) => setBondName(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<Input
									placeholder="Face Value"
									value={faceValue??''}
									onChange={(e) => setFaceValue(Number(e.target.value))}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<Input
									placeholder="Coupon Rate"
									value={couponRate?? ''}
									onChange={(e) => setCouponRate(Number(e.target.value))}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<DatePicker
									style={{ width: '100%' }}
									value={maturityDate?? null}
									onChange={(date) => setMaturityDate(date?.toDate() ?? null)}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item>
						<Input
							placeholder="Purchase Value"
							value={purchaseValue ?? ''}
							onChange={(e) => setPurchaseValue(Number(e.target.value))}
						/>
					</Form.Item>
					<Form.Item>
						<Input
							placeholder="Payment Frequency"
							value={paymentFrequency}
							onChange={(e) => setPaymentFrequency(e.target.value)}
						/>
					</Form.Item>
					<Form.Item>
						<DatePicker
							style={{ width: '100%' }}
							value={purchaseDate?? null}
							onChange={(date) => setPurchaseDate(date?.toDate() ?? null)}
						/>
					</Form.Item>
					<Form.Item>
						<Input
							placeholder="Organization"
							value={organization}
							onChange={(e) => setOrganization(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AddBondModal;
