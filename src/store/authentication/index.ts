import { createSlice } from '@reduxjs/toolkit';
import API from '../../lib/utils/api';
import { requestActions } from '../request';
import { AuthenticationState, CPA } from '../types';
import authenticationAsyncActions from './authentication.thunk';
import { message as toast, message } from 'antd';
import AuthenticationResponse from '../../network/response/AuthenticationResponse';
import ErrorResponse from '../../network/response/ErrorResponse';

const initialState: AuthenticationState = {
	isAuthenticated: false,
	accessToken: '',
	expiryAt: -1,
};

const fillState = (state: AuthenticationState, { payload }: CPA<AuthenticationResponse>) => {
	state.isAuthenticated = true;
	state.accessToken = payload.accessToken;
	state.expiryAt = payload.expiryAt;
	localStorage.setItem('accessToken', payload.accessToken);
	API.addAccessToken(payload.accessToken);
};

const { actions, reducer: authenticationReducer } = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		restoreAccessToken: (state) => {
			API.addAccessToken(state.accessToken === '' ? undefined : state.accessToken);
		},
		removeAuthState: () => {
			API.removeAccessToken();
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticationAsyncActions.signIn.fulfilled.type, (state, action: CPA<AuthenticationResponse>) => {
				message.success('Sign In Successful');
				fillState(state, action);
				action.dispatch(
					requestActions.fulfilled({
						name: authenticationAsyncActions.signIn.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(authenticationAsyncActions.signUp.fulfilled.type, (state, action: CPA<AuthenticationResponse>) => {
				message.success('Sign Up Successful');
				fillState(state, action);
				action.dispatch(
					requestActions.fulfilled({
						name: authenticationAsyncActions.signUp.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(
				authenticationAsyncActions.signIn.rejected.type,
				(_, { payload, dispatch }: CPA<ErrorResponse>) => {
					const message = payload.error.status;
					// if (message.match(/invalid(\s|\_)credentials/is)) toast.error('Invalid Credentials. Try again!');
					dispatch(
						requestActions.rejected({
							name: authenticationAsyncActions.signIn.typePrefix,
							message: String(message),
							payload: { ...payload.error },
						})
					);
				}
			)
			.addCase(
				authenticationAsyncActions.signUp.rejected.type,
				(_, { payload, dispatch }: CPA<ErrorResponse>) => {
					const message = payload.error.status;

					dispatch(
						requestActions.rejected({
							name: authenticationAsyncActions.signUp.typePrefix,
							message: String(message),
							payload: { ...payload.error },
						})
					);
				}
			)
			.addCase(authenticationAsyncActions.signOut.rejected.type, (state, action: CPA<ErrorResponse>) => {
				toast.success('You have been logged out.');

				state.isAuthenticated = false;
				state.accessToken = '';
				state.expiryAt = -1;

				// LS.removeAccessToken();
				localStorage.setItem('accessToken', '');
				API.removeAccessToken();

				action.dispatch(
					requestActions.rejected({
						name: authenticationAsyncActions.signOut.typePrefix,
						message: 'You have been logged out.',
						payload: { ...action.payload.error },
					})
				);
			})
			.addCase(authenticationAsyncActions.signOut.fulfilled.type, (state, action: CPA) => {
				toast.success('You have been logged out.');

				state.isAuthenticated = false;
				state.accessToken = '';
				state.expiryAt = -1;

				// LS.removeAccessToken();
				localStorage.setItem('accessToken', '');
				API.removeAccessToken();

				action.dispatch(
					requestActions.fulfilled({
						name: authenticationAsyncActions.signOut.typePrefix,
						message: 'You have been logged out.',
						payload: { ...action.payload.error },
					})
				);
			});
	},
});

export const authenticationActions = actions;
export default authenticationReducer;
