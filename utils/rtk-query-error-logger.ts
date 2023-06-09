import {isRejectedWithValue} from '@reduxjs/toolkit'
import type {MiddlewareAPI, Middleware} from '@reduxjs/toolkit'
import {toast} from 'react-toastify';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        if (action.payload.data?.detail === "Not Found API") toast.error("요청하신 API를 찾을 수 없습니다.");
        else {
            console.warn(action)
            if (action.payload.data?.message){
                if(typeof action.payload.data.message == 'object'){
                    toast.warn(action.payload.data.message[0])
                }
                else{
                    toast.warn(action.payload.data.message)
                }
            }
        }
    }

    return next(action)
}