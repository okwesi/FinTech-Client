import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../lib/utils/api';
import User from '../../models/User';

import { requestActions } from '../request';

// const updateUser = createAsyncThunk('user/update', async (payload: UpdateUserRequest, thunkApi) => {
// 	thunkApi.dispatch(requestActions.started(updateUser.typePrefix));
// 	try {
// 		const response = await API.put<any, User>('/profile/details', payload);

// 		return response.data;
// 	} catch (error) {
// 		return thunkApi.rejectWithValue({ payload, error });
// 	}
// });

const deleteAccount = createAsyncThunk('user/delete-account', async (payload, thunkApi) => {
	thunkApi.dispatch(requestActions.started(deleteAccount.typePrefix));
	try {
		const response = await API.get<any, User>('/user/delete-account');

		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue({ payload, error });
	}
});

const userAsyncActions = {
	// updateUser,
	deleteAccount,
};
export default userAsyncActions;
