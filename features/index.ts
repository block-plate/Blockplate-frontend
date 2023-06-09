import {AnyAction, CombinedState, combineReducers} from "redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from 'features/auth';
import globalReducer from 'features/global';
import {api} from "services/common";
import {useDispatch} from 'react-redux';
import produce from 'immer';
import {rtkQueryErrorLogger} from 'utils/rtk-query-error-logger';

const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
    switch (action.type) {
        case HYDRATE:
            return produce(state, (draft: any) => {
                draft.global.userInfo = action.payload.global.userInfo;
                draft.auth = action.payload.auth
            })
        default: {
            const combinedReducer = combineReducers({
                auth: authReducer,
                global: globalReducer,
                [api.reducerPath]: api.reducer,
            });
            return combinedReducer(state, action);
        }
    }
};

export const makeStore = () => configureStore({
    reducer: rootReducer, // 위에서 만든 persistReducer를 대입
    devTools: process.env.NODE_ENV !== 'production', // redux devTool을 보일건지 말건지에 대한 유무,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger)
    },
});


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch

export const wrapper = createWrapper<AppStore>(makeStore, {debug: false});