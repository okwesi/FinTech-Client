import React from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import RequestManager from '../../store/request/manager';
import { useRequestState } from '../../store/selector';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authenticationAsyncActions from '../../store/authentication/authentication.thunk';
import isAnyEmpty from '../../lib/utils/isEmpty';

const SignnPage = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const [isLoading, setIsLoading] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const requestState = useRequestState();
	const [requestUpdatedAt] = React.useState(requestState.updatedAt);
	React.useEffect(() => {
		if (requestUpdatedAt === requestState.updatedAt) {
			return;
		}
		const RM = new RequestManager(requestState, dispatch);

		if (RM.isPending(authenticationAsyncActions.signIn.typePrefix)) {
			setIsLoading(true);
			return;
		}

		if (RM.isFulfilled(authenticationAsyncActions.signIn.typePrefix)) {
			RM.consume(authenticationAsyncActions.signIn.typePrefix);
			setIsLoading(false);
			message.success('Sign In Successful');
			navigate('/dispensaries');
			return;
		}

		if (RM.isRejected(authenticationAsyncActions.signIn.typePrefix)) {
			RM.consume(authenticationAsyncActions.signIn.typePrefix);
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, requestState.updatedAt]);

	const signIn = React.useCallback(() => {
		if (isAnyEmpty([email, password])) {
			message.error('Please fill all the fields');
			return;
		}
		setIsLoading(true);
		dispatch(authenticationAsyncActions.signIn({ email, password }));
	}, [dispatch, email, password, isLoading]);
	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Sign In</h1>
			{isLoading && <Typography style={{ textAlign: 'center' }}>Loading...</Typography>}
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Card style={{ width: '50%' }}>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Email "
							name="email "
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input value={email} onChange={(event) => setEmail(event.target.value)} />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" onClick={signIn}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	);
};

export default SignnPage;
