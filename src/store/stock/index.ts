import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'lib/util';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import stockAsyncActions from './stock.thunk';
import ErrorResponse from '../../network/response/ErrorResponse';
import { CPA } from '../types';
import { requestActions } from '../request';
import Stock from '../../models/Stock';

export type StockState = {
	detail: Stock | null;
	updatedAt: number;
};

const initialState: StockState = {
	detail: null,
	updatedAt: -1,
};

const { reducer: stockReducer } = createSlice({
	name: 'stock',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(stockAsyncActions.show.fulfilled.type, (state, action: CPA<Stock>) => {
				state.detail = action.payload;
				state.updatedAt = Date.now();
				action.dispatch(
					requestActions.fulfilled({
						name: stockAsyncActions.show.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(stockAsyncActions.show.rejected.type, (state, action: CPA<ErrorResponse>) => {
				state = initialState;
				const message = action.payload.error.message;
				action.dispatch(
					requestActions.fulfilled({
						name: stockAsyncActions.show.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(stockAsyncActions.update.fulfilled.type, (state, action: CPA<Stock>) => {
				state.detail = action.payload;
				state.updatedAt = Date.now();
				action.dispatch(
					requestActions.fulfilled({
						name: stockAsyncActions.update.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(stockAsyncActions.update.rejected.type, (state, action: CPA<ErrorResponse>) => {
				state = initialState;
				const message = action.payload.error.message;
				action.dispatch(
					requestActions.rejected({
						name: stockAsyncActions.update.typePrefix,
						message: '',
						payload: {},
					})
				);
			})
			.addCase(authenticationAsyncActions.signOut.fulfilled.type, () => initialState)
			.addCase(authenticationAsyncActions.signOut.rejected.type, () => initialState);
	},
});

export default stockReducer;
