import { createSlice } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import { CPA, RapidStocksState } from '../types';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import RapidStocksResponse from '../../network/response/RapidStockResponse';
import rapidStocksAsyncActions from './rapidStocks.thunk';

const initialState: RapidStocksState = {
	list: [],
	updatedAt: -1,
};

const { reducer: rapidStocksReducer } = createSlice({
	name: 'rapidstocks',
	initialState,
	reducers: {},
	extraReducers: {
		[authenticationAsyncActions.signOut.fulfilled.type]: () => initialState,
		[authenticationAsyncActions.signOut.rejected.type]: () => initialState,
		[rapidStocksAsyncActions.index.fulfilled.type]: (state, action: CPA<RapidStocksResponse>) => {
			state.list = action.payload;
			state.updatedAt = Date.now();
			action.dispatch(
				requestActions.fulfilled({
					name: rapidStocksAsyncActions.index.typePrefix,
					message: '',
					payload: {},
				})
			);
		},
		[rapidStocksAsyncActions.index.rejected.type]: (state, action: CPA) => {
			state = initialState;
			const message = 'Error';
			action.dispatch(
				requestActions.fulfilled({
					name: rapidStocksAsyncActions.index.typePrefix,
					message: '',
					payload: {},
				})
			);
		},
	},
});

export default rapidStocksReducer;
