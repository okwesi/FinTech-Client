import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../lib/utils/api';
import { requestActions } from '../request';
import OkResponse from '../../network/response/OkResponse';
import AuthenticationResponse from '../../network/response/AuthenticationResponse';
import SignInRequest from '../../network/request/SignInRequest';
import SignUpRequest from '../../network/request/SignUpRequest';

const signIn = createAsyncThunk('authentication/sign-in', async (payload: SignInRequest, thunkApi) => {
	thunkApi.dispatch(requestActions.started(signIn.typePrefix));
	try {
		const response = await API.post<SignInRequest, AuthenticationResponse>('auth/signin', {
			...payload,
		});
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		return thunkApi.rejectWithValue({ payload, error });
	}
});

const signUp = createAsyncThunk('authentication/sign-up', async (payload: SignUpRequest, thunkApi) => {
	thunkApi.dispatch(requestActions.started(signUp.typePrefix));
	try {
		const response = await API.post<SignUpRequest, AuthenticationResponse>('/auth/signup', {
			...payload,
		});
		return response.data;
	} catch (error: any) {
		return thunkApi.rejectWithValue({ payload, error });
	}
});


const signOut = createAsyncThunk('authentication/sign-out', async (_, thunkApi) => {
	thunkApi.dispatch(requestActions.started('authentication/sign-out'));
	try {
		const response = await API.get<any, OkResponse>('/sign-out');
		return response.data;
	} catch (error: any) {
		return thunkApi.rejectWithValue({ error });
	}
});

const authenticationAsyncActions = {
	signIn,
	signOut,
	signUp,
	
};
export default authenticationAsyncActions;
