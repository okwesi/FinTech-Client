import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestActions } from "../request";
import API from "../../lib/utils/api";
import Bond from "../../models/Bond";



export const show = createAsyncThunk(
    'bond/show',
    async ({ bondId, ...payload }: { bondId: string }, thunkApi) => {
        thunkApi.dispatch(requestActions.started(show.typePrefix));
        try {
            const response = await API.get<any, Bond>(`/user-bonds/${bondId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ payload: bondId, error });
        }
    }
);

const bondAsyncActions = {
    show,
};

export default bondAsyncActions;