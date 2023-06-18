import { createSlice } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import { CPA, StocksState } from '../types';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import StocksResponse from '../../network/response/StocksResponse';
import stocksAsyncActions from './stocks.thunk';
import ErrorResponse from '../../network/response/ErrorResponse';



const initialState: StocksState = {
    list: [],
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    },
    updatedAt: -1,
};



const { reducer: stocksReducer } = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
    extraReducers: {
        [authenticationAsyncActions.signOut.fulfilled.type]: () => initialState,
        [authenticationAsyncActions.signOut.rejected.type]: () => initialState,
        [stocksAsyncActions.index.fulfilled.type]: (state, action: CPA<StocksResponse>) => {
            state.list = action.payload.stocks;
            state.pagination = action.payload.pagination;
            action.dispatch(
                requestActions.fulfilled({
                    name: stocksAsyncActions.index.typePrefix,
                    message: '',
                    payload: {},
                })
            );
        },
        [stocksAsyncActions.index.rejected.type]: (state, action: CPA<ErrorResponse>) => {
            state = initialState;
            const message = action.payload.error.message;
            action.dispatch(
                requestActions.fulfilled({
                    name: stocksAsyncActions.index.typePrefix,
                    message: '',
                    payload: {},
                })
            );
        },
    },
});

export default stocksReducer;
