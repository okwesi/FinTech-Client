import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import axios from 'axios';

const index = createAsyncThunk('rapid-stocks/', async (_, thunkApi) => {
    thunkApi.dispatch(requestActions.started(index.typePrefix));
    try {
        const options = {
            method: 'GET',
            url: 'https://latest-stock-price.p.rapidapi.com/price',
            params: {
                Indices: 'NIFTY 50'
            },
            headers: {
                'X-RapidAPI-Key': '2c71ad3c52msh0b77d95cfe8c66ap15d1fbjsn03787be01f6b',
                'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        console.log(response.data);

        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue({ error });
    }
});

const rapidStocksAsyncActions = {
    index,
};

export default rapidStocksAsyncActions;
