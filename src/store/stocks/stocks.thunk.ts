import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import API from '../../lib/utils/api';
import StocksResponse from '../../network/response/StocksResponse';

const index = createAsyncThunk('user-bonds/', async (payload, thunkApi) => {
    thunkApi.dispatch(requestActions.started(index.typePrefix));
    try {
        const response = await API.get<any, StocksResponse>('user-stocks/');

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue({ payload, error });
    }
});

const stocksAsyncActions = {
    index,
};

export default stocksAsyncActions;
