import { createSlice } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import { CPA, StocksState } from '../types';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import StocksResponse from '../../network/response/StocksResponse';
import stocksAsyncActions from './stocks.thunk';
import ErrorResponse from '../../network/response/ErrorResponse';
import Stock from '../../models/Stock';



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
        [stocksAsyncActions.store.fulfilled.type]: (state, action: CPA<Stock>) => {
            state.list.push(action.payload);
            state.updatedAt = Date.now();
            action.dispatch(
                requestActions.fulfilled({
                    name: stocksAsyncActions.store.typePrefix,
                    message: '',
                    payload: {},
                })
            );
        },
        [stocksAsyncActions.store.rejected.type]: (state, { payload, dispatch }: CPA<ErrorResponse>) => {
            if (payload.error.status === 401) {
                state = initialState;
            }

            dispatch(
                requestActions.rejected({
                    name: stocksAsyncActions.store.typePrefix,
                    message: '',
                    payload: {},
                })
            );
            return state;
        },
        // [stocksAsyncActions.delete.fulfilled.type]: (state, action: CPA<{ faqId: string }>) => {
        //     const list = [...state.list];
        //     state.list = list.filter(({ id }) => Number(id) !== Number(action.payload.faqId));
        //     state.updatedAt = Timing.now();
        //     action.dispatch(
        //         requestActions.fulfilled({
        //             name: stocksAsyncActions.delete.typePrefix,
        //             message: '',
        //             payload: {},
        //         })
        //     );
        // },
        // [stocksAsyncActions.delete.rejected.type]: (state, { payload, dispatch }: CPA<ErrorResponse>) => {
        //     if (payload.error.status === 401) {
        //         state = initialState;
        //     }

        //     dispatch(
        //         requestActions.rejected({
        //             name: stocksAsyncActions.delete.typePrefix,
        //             message: '',
        //             payload: {},
        //         })
        //     );
        //     return state;
        // },
    },
});

export default stocksReducer;
