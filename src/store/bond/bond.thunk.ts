import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import API from '../../lib/utils/api';
import Bond from '../../models/Bond';
import { BondUpdateRequest } from '../../network/request/BondUpdateRequest';

export const show = createAsyncThunk('bond/show', async ({ bondId, ...payload }: { bondId: string }, thunkApi) => {
	thunkApi.dispatch(requestActions.started(show.typePrefix));
	try {
		const response = await API.get<any, Bond>(`/user-bonds/${bondId}`);
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue({ payload: bondId, error });
	}
});
const update = createAsyncThunk('bonds/update', async (payload: BondUpdateRequest, thunkAPI) => {
	thunkAPI.dispatch(requestActions.started(update.typePrefix));
	const { id } = payload;
	try {
		console.log('payload', payload);
		const response = await API.put<BondUpdateRequest, Bond>(`/user-bonds/${id}`, payload);
		console.log('response', response);

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ payload, error });
	}
});

const bondAsyncActions = {
	show,
	update,
};

export default bondAsyncActions;
