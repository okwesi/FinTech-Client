import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'lib/util';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import ErrorResponse from '../../network/response/ErrorResponse';
import { CPA } from '../types';
import { requestActions } from '../request';
import Bond from '../../models/Bond';
import bondAsyncActions from './bond.thunk';

export type BondState = {
	detail: Bond | null;
	updatedAt: number;
};

const initialState: BondState = {
	detail: null,
	updatedAt: -1,
};

const { reducer: bondReducer, actions } = createSlice({
	name: 'bond',
	initialState,
	reducers: {
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(bondAsyncActions.show.fulfilled.type, (state, action: CPA<Bond>) => {
				state.detail = action.payload;
				state.updatedAt = Date.now();
				action.dispatch(
					requestActions.fulfilled({
						name: bondAsyncActions.show.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(bondAsyncActions.show.rejected.type, (state, action: CPA<ErrorResponse>) => {
				state = initialState;
				const message = action.payload.error.message;
				action.dispatch(
					requestActions.rejected({
						name: bondAsyncActions.show.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(bondAsyncActions.update.fulfilled.type, (state, action: CPA<Bond>) => {
				state.detail = action.payload;
				state.updatedAt = Date.now();
				action.dispatch(
					requestActions.fulfilled({
						name: bondAsyncActions.update.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(bondAsyncActions.update.rejected.type, (state, action: CPA<ErrorResponse>) => {
				state = initialState;
				const message = action.payload.error.message;
				action.dispatch(
					requestActions.rejected({
						name: bondAsyncActions.update.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(authenticationAsyncActions.signOut.fulfilled.type, () => initialState)
			.addCase(authenticationAsyncActions.signOut.rejected.type, () => initialState);
	},
});
export const { resetState } = actions;
export default bondReducer;
