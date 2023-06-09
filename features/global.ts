import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from "./index";

export interface GlobalState {
    userInfo: {
        user_id: string
        name: string,
        account: string
    } | null
}

const initialState: GlobalState = {
    userInfo: null,
};

const globalDataSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setUserInfo: (
            state: GlobalState,
            action: PayloadAction<{ user_id: string, name: string, account: string }>,
        ) => {
            state.userInfo = action.payload
        }
    },
});


export const selectGlobalData = (state: AppState) => state.global;
export const {setUserInfo} = globalDataSlice.actions;
export default globalDataSlice.reducer;