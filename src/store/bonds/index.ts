import { createSlice } from '@reduxjs/toolkit';
import { requestActions } from '../request';
import { BondsState, CPA, StocksState } from '../types';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import bondsAsyncActions from './bonds.thunk';
import ErrorResponse from '../../network/response/ErrorResponse';
import BondsResponse from '../../network/response/BondsResponse';
import Bond from '../../models/Bond';



const initialState: BondsState = {
    list: [],
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    },
    updatedAt: -1,
};



const { reducer: bondsReducer } = createSlice({
    name: 'bonds',
    initialState,
    reducers: {},
    extraReducers: {
        [authenticationAsyncActions.signOut.fulfilled.type]: () => initialState,
        [authenticationAsyncActions.signOut.rejected.type]: () => initialState,
        [bondsAsyncActions.index.fulfilled.type]: (state, action: CPA<BondsResponse>) => {
            state.list = action.payload.bonds;
            state.pagination = action.payload.pagination;
            action.dispatch(
                requestActions.fulfilled({
                    name: bondsAsyncActions.index.typePrefix,
                    message: '',
                    payload: {},
                })
            );
        },
        [bondsAsyncActions.index.rejected.type]: (state, action: CPA<ErrorResponse>) => {
            state = initialState;
            const message = action.payload.error.message;
            action.dispatch(
                requestActions.fulfilled({
                    name: bondsAsyncActions.index.typePrefix,
                    message: '',
                    payload: {},
                })
            );
        },
        [bondsAsyncActions.store.fulfilled.type]: (state, action: CPA<Bond>) => {
            state.list.push(action.payload);
            state.updatedAt = Date.now();
            action.dispatch(
                requestActions.fulfilled({
                    name: bondsAsyncActions.store.typePrefix,
                    message: '',
                    payload: {},
                })
            );
        },
        [bondsAsyncActions.store.rejected.type]: (state, { payload, dispatch }: CPA<ErrorResponse>) => {
            if (payload.error.status === 401) {
                state = initialState;
            }

            dispatch(
                requestActions.rejected({
                    name: bondsAsyncActions.store.typePrefix,
                    message: '',
                    payload: {},
                })
            );
            return state;
        },
    },
});

export default bondsReducer;
