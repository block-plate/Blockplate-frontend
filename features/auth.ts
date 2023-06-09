import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from "./index";

interface AuthTypes {
    accessToken: string | null;
}

const initialState: AuthTypes = {
    accessToken: null,
};

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const authSlice = createSlice({
    name: 'auth', // 해당 모듈의 이름. store.user 형식으로 추후 접근
    initialState,
    reducers: {
        setSession: (
            state: AuthTypes,
            action: PayloadAction<Partial<{ accessToken: string; }>>,
        ) => {
            const {accessToken} = action.payload;
            if (accessToken) {
                state.accessToken = accessToken;
            }
        },
    },
});

export const selectAuth = (state: AppState) => state.auth;
export const {setSession} = authSlice.actions;
export default authSlice.reducer;