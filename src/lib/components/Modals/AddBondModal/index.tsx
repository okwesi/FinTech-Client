import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Typography, message } from 'antd';
import React from 'react';
import { useRequestState } from '../../../../store/selector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RequestManager from '../../../../store/request/manager';
import isAnyEmpty from '../../../utils/isEmpty';
import bondsAsyncActions from '../../../../store/bonds/bonds.thunk';
import moment from 'moment';

const AddBondModal = ({ handleClose, open }: any) => {
	const [bondName, setBondName] = React.useState('');
	const [faceValue, setFaceValue] = React.useState<any>();
	const [couponRate, setCouponRate] = React.useState<any>();
	const [purchaseValue, setPurchaseValue] = React.useState<any>();
	const [paymentFrequency, setPaymentFrequency] = React.useState('');
	const [maturityDate, setMaturityDate] = React.useState<any>(null);
	const [purchaseDate, setPurchaseDate] = React.useState<any>(null);
	const [organization, setOrganization] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const request = useRequestState();
	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

	const { Option } = Select;

	const paymentFrequencyOptions = ['Annual', 'Semi-annual', 'Quarterly', 'Monthly'];

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(bondsAsyncActions.store.typePrefix)) {
			RM.consume(bondsAsyncActions.store.typePrefix);
			message.success('Stock added successfully');
			setIsLoading(false);
			handleClose();
			return;
		}

		if (RM.isRejected(bondsAsyncActions.store.typePrefix)) {
			RM.consume(bondsAsyncActions.store.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch, navigate]);

	const store = React.useCallback(() => {
		if (isLoading) {
			return;
		}

		if (isAnyEmpty([bondName, faceValue, couponRate, maturityDate, paymentFrequency, purchaseDate, organization])) {
			message.error('Please fill all the fields');
			return;
		}

		setIsLoading(true);
		console.log('here');
		dispatch(
			bondsAsyncActions.store({
				bondName,
				faceValue,
				couponRate,
				maturityDate,
				purchaseValue,
				paymentFrequency,
				purchaseDate,
				organization,
			})
		);
	}, [
		bondName,
		faceValue,
		couponRate,
		maturityDate,
		purchaseValue,
		paymentFrequency,
		purchaseDate,
		organization,
		dispatch,
	]);

	return (
		<>
			<Modal
				centered
				open={open}
				onOk={store}
				onCancel={handleClose}
				width={700}
				style={{ opacity: isLoading ? 0.5 : 1 }}
			>
				<Typography style={{ fontWeight: '600', fontSize: '20px' }}>Add Bond</Typography>
				<Divider />
				<Form>
					<Form.Item>
						<Input placeholder="Bond Name" value={bondName} onChange={(e) => setBondName(e.target.value)} />
					</Form.Item>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<Input
									type="number"
									placeholder="Face Value"
									value={faceValue ?? ''}
									onChange={(e) => setFaceValue(Number(e.target.value))}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<Input
									type="number"
									placeholder="Purchase Value"
									value={purchaseValue ?? ''}
									onChange={(e) => setPurchaseValue(Number(e.target.value))}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<Input
									type="number"
									placeholder="Coupon Rate"
									value={couponRate ?? ''}
									onChange={(e) => setCouponRate(Number(e.target.value))}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="paymentFrequency">
								<Select
									placeholder="Payment Frequency"
									value={paymentFrequency}
									onChange={(value) => setPaymentFrequency(value)}
								>
									{paymentFrequencyOptions.map((option) => (
										<Option key={option} value={option}>
											{option}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<DatePicker
									style={{ width: '100%' }}
									value={purchaseDate ? moment(purchaseDate, 'YYYY-MM-DD') : null}
									onChange={(date, dateString) => setPurchaseDate(dateString)}
									placeholder="Purchase Date"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<DatePicker
									style={{ width: '100%' }}
									value={maturityDate ? moment(maturityDate, 'YYYY-MM-DD') : null}
									onChange={(date, dateString) => setMaturityDate(dateString)}
									placeholder="Maturity Date"
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item>
						<Input
							placeholder="Organization"
							value={organization}
							onChange={(e) => setOrganization(e.target.value)}
						/>
					</Form.Item>
					{/* <Button type="primary" onClick={store}>
						Submit here
					</Button> */}
				</Form>
			</Modal>
		</>
	);
};

export default AddBondModal;
