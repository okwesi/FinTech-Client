import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import API from '../../lib/utils/api';
import BondsResponse from '../../network/response/BondsResponse';
import CreateBondRequest from '../../network/request/CreateBondRequest';
import Bond from '../../models/Bond';

const index = createAsyncThunk('user-bonds/', async (payload, thunkApi) => {
	thunkApi.dispatch(requestActions.started(index.typePrefix));
	try {
		const response = await API.get<any, BondsResponse>('user-bonds/');

		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue({ payload, error });
	}
});

const store = createAsyncThunk('bonds/create', async (payload: CreateBondRequest, thunkAPI) => {
	thunkAPI.dispatch(requestActions.started('bonds/create'));
	try {
		console.log(payload);
		const response = await API.post<CreateBondRequest, Bond>('/user-bonds/', payload);

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ payload, error });
	}
});

const destroy = createAsyncThunk('bonds/delete', async (bondId: string, thunkAPI) => {
	thunkAPI.dispatch(requestActions.started('bonds/delete'));
	try {
		const response = await API.delete<any, any>(`/user-bonds/${bondId}/`);

		return { bondId };
	} catch (error) {
		return thunkAPI.rejectWithValue({ payload: bondId, error });
	}
});

const bondsAsyncActions = {
	index,
	store,
	destroy,
};

export default bondsAsyncActions;
