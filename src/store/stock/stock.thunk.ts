import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestActions } from "../request";
import Stock from "../../models/Stock";
import  API from "../../lib/utils/api";



export const show = createAsyncThunk(
    'stock/show',
    async ({ stockId, ...payload }: { stockId: string }, thunkApi) => {
        thunkApi.dispatch(requestActions.started(show.typePrefix));
        try {
            const response = await API.get<any, Stock>(`/user-stocks/${stockId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ payload: stockId, error });
        }
    }
);

const stockAsyncActions = {
    show,
};

export default stockAsyncActions;