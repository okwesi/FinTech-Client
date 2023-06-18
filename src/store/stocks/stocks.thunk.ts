import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import API from '../../lib/utils/api';
import StocksResponse from '../../network/response/StocksResponse';
import CreateStockRequest from '../../network/request/CreateStockRequest';
import Stock from '../../models/Stock';

const index = createAsyncThunk('user-stocks/', async (payload, thunkApi) => {
    thunkApi.dispatch(requestActions.started(index.typePrefix));
    try {
        const response = await API.get<any, StocksResponse>('user-stocks/');

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue({ payload, error });
    }
});

const store = createAsyncThunk('stocks/create', async (payload: CreateStockRequest, thunkAPI) => {
    thunkAPI.dispatch(requestActions.started('stocks/create'));
    try {
        const response = await API.post<CreateStockRequest, Stock>('/user-stocks/', payload);

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ payload, error });
    }
});
const stocksAsyncActions = {
    index,
    store,
};

export default stocksAsyncActions;
