import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import Stock from '../../models/Stock';
import API from '../../lib/utils/api';
import { StockUpdateRequest } from '../../network/request/StockUpdateRequest';

export const show = createAsyncThunk('stock/show', async ({ stockId, ...payload }: { stockId: string }, thunkApi) => {
	thunkApi.dispatch(requestActions.started(show.typePrefix));
	try {
		const response = await API.get<any, Stock>(`/user-stocks/${stockId}`);
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue({ payload: stockId, error });
	}
});

const update = createAsyncThunk('stocks/update', async (payload: StockUpdateRequest, thunkAPI) => {
	thunkAPI.dispatch(requestActions.started(update.typePrefix));
	const { id } = payload;
	try {
		const response = await API.put<StockUpdateRequest, Stock>(`/stocks/${id}`, payload);

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ payload, error });
	}
});

const stockAsyncActions = {
	show,
	update,
};

export default stockAsyncActions;
