import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'lib/util';
import authenticationAsyncActions from '../authentication/authentication.thunk';
import ErrorResponse from '../../network/response/ErrorResponse';
import { CPA } from '../types';
import { requestActions } from '../request';
import Bond from '../../models/Bond';
import bondAsyncActions from './stock.thunk';

export type BondState = {
    detail: Bond | null;
    updatedAt: number;
};

const initialState: BondState = {
    detail: null,
    updatedAt: -1,
};


const  {reducer : bondReducer} = createSlice({
    name: 'bond',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bondAsyncActions.show.fulfilled.type, (state, action: CPA<Bond>) => {
                state.detail = action.payload;
                state.updatedAt = Date.now();
                action.dispatch(
                    requestActions.fulfilled({
                        name: bondAsyncActions.show.typePrefix,
                        message: '',
                        payload: {},
                    })
                );
            })
            .addCase(bondAsyncActions.show.rejected.type, (state, action: CPA<ErrorResponse>) => {
                state = initialState;
                const message = action.payload.error.message;
                action.dispatch(
                    requestActions.fulfilled({
                        name: bondAsyncActions.show.typePrefix,
                        message: '',
                        payload: {},
                    })
                );
            })
            .addCase(authenticationAsyncActions.signOut.fulfilled.type, () => initialState)
            .addCase(authenticationAsyncActions.signOut.rejected.type, () => initialState);
    },
});;

export default bondReducer;
