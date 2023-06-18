import { Col, DatePicker, Divider, Form, Input, Modal, Row, Typography, message } from 'antd';
import React from 'react';
import bondAsyncActions from '../../../../store/bond/bond.thunk';
import RequestManager from '../../../../store/request/manager';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useRequestState } from '../../../../store/selector';

const EditBondModal = ({ handleClose, open, id, data }: any) => {
	const [bondName, setBondName] = React.useState<any>(data?.bondName || null);
	const [purchaseValue, setPurchaseValue] = React.useState<any>(data?.purchaseValue || null);
	const [purchaseDate, setPurchaseDate] = React.useState<any>(data?.purchaseDate || null);
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const request = useRequestState();
	const [requestUpdatedAt, setRequestUpdatedAt] = React.useState(request.updatedAt);

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}

		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(bondAsyncActions.update.typePrefix)) {
			RM.consume(bondAsyncActions.update.typePrefix);
			message.success('Bond updeee successfully');
			setIsLoading(false);
			handleClose();
			return;
		}

		if (RM.isRejected(bondAsyncActions.update.typePrefix)) {
			RM.consume(bondAsyncActions.update.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt, dispatch, navigate]);

	const update = React.useCallback(() => {
		if (isLoading) {
			return;
		}
		if (!id) {
			return;
		}
		setIsLoading(true);
		dispatch(
			bondAsyncActions.update({
				id: id,
				bondName,
				purchaseValue,
				purchaseDate,
			})
		);
	}, [bondName, purchaseValue, dispatch, id, isLoading]);

	return (
		<>
			<Modal
				centered
				open={open}
				onOk={update}
				onCancel={handleClose}
				width={700}
				style={{ opacity: isLoading ? 0.5 : 1 }}
			>
				<Typography style={{ fontWeight: '600', fontSize: '20px' }}>Add Bond</Typography>
				<Divider />
				<Form>
					<Form.Item initialValue={bondName}>
						<Input
							placeholder="Bond Name"
							value={bondName}
							onChange={(e) => setBondName(e.target.value)}
						/>
					</Form.Item>
					<Form.Item initialValue={purchaseValue}>
						<Input
							type="number"
							placeholder="Purchase Value"
							value={purchaseValue ?? ''}
							onChange={(e) => setPurchaseValue(Number(e.target.value))}
						/>
					</Form.Item>
					<Form.Item initialValue={purchaseDate}>
						<DatePicker
							style={{ width: '100%' }}
							value={purchaseDate ? moment(purchaseDate, 'YYYY-MM-DD') : null}
							onChange={(date, dateString) => setPurchaseDate(dateString)}
							placeholder="Purchase Date"
						/>
					</Form.Item>
				</Form>

			</Modal>
		</>
	);
}

export default EditBondModal;
