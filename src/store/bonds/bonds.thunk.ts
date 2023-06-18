import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import API from '../../lib/utils/api';
import BondsResponse from '../../network/response/BondsResponse';

const index = createAsyncThunk('user-bonds/', async (payload, thunkApi) => {
    thunkApi.dispatch(requestActions.started(index.typePrefix));
    try {
        const response = await API.get<any, BondsResponse>('user-bonds/');

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue({ payload, error });
    }
});

const bondsAsyncActions = {
    index,
};

export default bondsAsyncActions;
