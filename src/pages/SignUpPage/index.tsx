import React from 'react';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { useRequestState } from '../../store/selector';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RequestManager from '../../store/request/manager';
import authenticationAsyncActions from '../../store/authentication/authentication.thunk';
import isAnyEmpty from '../../lib/utils/isEmpty';

const SignUpPage = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const request = useRequestState();
	const [requestUpdatedAt] = React.useState(request.updatedAt);

	React.useEffect(() => {
		if (requestUpdatedAt === request.updatedAt) {
			return;
		}
		const RM = new RequestManager(request, dispatch);

		if (RM.isFulfilled(authenticationAsyncActions.signUp.typePrefix)) {
			RM.consume(authenticationAsyncActions.signUp.typePrefix);
			setIsLoading(false);

			navigate('/Sign In');
			return;
		}
		if (RM.isRejected(authenticationAsyncActions.signUp.typePrefix)) {
			RM.consume(authenticationAsyncActions.signUp.typePrefix);
			message.error('Something went wrong');
			setIsLoading(false);
			return;
		}
	}, [requestUpdatedAt, request.updatedAt]);

	const signUp = React.useCallback(() => {
		if (isLoading) {
			return;
		}
		if (isAnyEmpty([email, password, username])) {
			message.error('Please fill all the fields');
			return;
		}
		setIsLoading(true);
		dispatch(
			authenticationAsyncActions.signUp({
				email: email,
				password: password,
				username: username,
			})
		);
	}, [dispatch, email, password, username]);

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Sign Up</h1>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Card style={{ width: '70%' }}>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: '100%' }}
						initialValues={{ remember: true }}
						autoComplete="off"
						onFinish={() => {}}
					>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{ required: true, message: 'Please input your username!' },
								{ min: 6, message: 'Username must be at least 6 characters long!' },
								{ max: 20, message: 'Username must be at most 20 characters long!' },
							]}
						>
							<Input value={username} onChange={(e) => setUsername(e.target.value)} />
						</Form.Item>
						<Form.Item
							label="Email "
							name="email "
							rules={[
								{ required: true, message: 'Please input your username!' },
								{ type: 'email', message: 'Please enter a valid email address!' },
							]}
						>
							<Input value={email} onChange={(e) => setEmail(e.target.value)} />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
								{ min: 6, message: 'Password must be at least 6 characters long!' },
								{ max: 20, message: 'Password must be at most 20 characters long!' },
								{
									pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
									message:
										'Password must contain at least 8 characters, including at least one letter, one number, and one special character!',
								},
							]}
						>
							<Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" onClick={signUp}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	);
};

export default SignUpPage;
