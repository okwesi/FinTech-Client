import { createSlice } from '@reduxjs/toolkit';
import { Roles } from '../../lib/utils/enum';
import User from '../../models/User';

import authenticationAsyncActions from '../authentication/authentication.thunk';
import { requestActions } from '../request';
import { CPA } from '../types';
import userAsyncActions from './user.thunk';
import OkResponse from '../../network/response/OkResponse';
import AuthenticationResponse from '../../network/response/AuthenticationResponse';




const initialState: User = {
	_id: '',
	email: '',
	username: '',
	roleId: Roles.USER,
	createdAt: '',
	updatedAt: '',
};

// const fillAuth = (state: typeof initialState, { payload }: CPA<AuthenticationResponse>) => {
// 	state._id = payload.user.id;
// 	state.email = payload.user.email;
// 	state.roleId = payload.user.roleId;
// 	state.username = payload.user.username;
// 	state.createdAt = payload.user.createdAt;
// 	state.updatedAt = payload.user.updatedAt;
// };

const fillUser = (state: typeof initialState, { payload }: CPA<User>) => {
	state._id = payload._id;
	state.email = payload.email;
	state.roleId = payload.roleId;
	state.username = payload.username;
	state.createdAt = payload.createdAt;
	state.updatedAt = payload.updatedAt;
};

const { reducer: userReducer } = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// .addCase(authenticationAsyncActions.signIn.fulfilled.type, fillAuth)
			// .addCase(authenticationAsyncActions.signUp.fulfilled.type, fillAuth)
			.addCase(authenticationAsyncActions.signOut.fulfilled.type, () => initialState)
			.addCase(authenticationAsyncActions.signOut.rejected.type, () => initialState)
			.addCase(userAsyncActions.deleteAccount.fulfilled.type, (_, action: CPA<OkResponse>) => {
				action.dispatch(
					requestActions.fulfilled({
						name: userAsyncActions.deleteAccount.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			
	},
});

export default userReducer;
