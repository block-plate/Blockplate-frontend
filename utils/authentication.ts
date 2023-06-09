import {AppState, AppStore} from 'features';
import {GetServerSidePropsContext} from 'next';
import {deleteCookie, getCookie, hasCookie, setCookie} from 'cookies-next';
// import {userApi} from 'services/user';
import {setUserInfo} from 'features/global';
import {setSession} from 'features/auth';
import {OptionsType} from 'cookies-next/src/types';
import {authApi} from "@/services/auth";

const ACCESS_TOKEN_KEY = 'Authentication';
const REFRESH_TOKEN_KEY = 'refresh_token';


export function clearTokens(options: OptionsType) {
    deleteCookie(ACCESS_TOKEN_KEY, options)
    deleteCookie(REFRESH_TOKEN_KEY, options)
}

export function setTokens(accessToken: string, refreshToken: string, options: OptionsType) {
    setCookie(ACCESS_TOKEN_KEY, accessToken, {...options, path: '/', maxAge: 60 * 60 * 24 * 7})
    setCookie(REFRESH_TOKEN_KEY, refreshToken, {...options, path: '/', maxAge: 60 * 60 * 24})
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message); // (1)
        this.name = "AuthenticationError"; // (2)
    }
}

export const isAuthenticationServerSide = async (store: AppStore, ctx: GetServerSidePropsContext) => {
    /**
     * 인증 정보를 서버사이드에서 초기화
     * redux store에서 auth.accessToken, global.userInfo를 초기화해준다.
     */
    let authentication = false;

    console.log(hasCookie(ACCESS_TOKEN_KEY, ctx));
    if (hasCookie(ACCESS_TOKEN_KEY, ctx)) {
        store.dispatch(setSession({accessToken: getCookie(ACCESS_TOKEN_KEY, ctx) as string}));

        authentication = true;
    }

    // if (!authentication ) {
    //     // const reIssueTokenPromise = store.dispatch(userApi.endpoints.reIssueToken.initiate({refreshToken: getCookie(REFRESH_TOKEN_KEY, ctx) as string ?? ''}))
    //
    //     try {
    //         // const {accessToken, refreshToken} = await reIssueTokenPromise.unwrap()
    //         store.dispatch(setSession({accessToken}));
    //         setTokens(accessToken, refreshToken, {req: ctx.req, res: ctx.res});
    //         authentication = true;
    //     } catch (e) {
    //         throw new AuthenticationError('토큰 재발급 중 오류')
    //     } finally {
    //         reIssueTokenPromise.unsubscribe()
    //     }
    // }

    if (authentication) {
        const userInfoPromise = store.dispatch(authApi.endpoints.getProfile.initiate({jwt: getCookie(ACCESS_TOKEN_KEY, ctx)}));
        try {
            const data = await userInfoPromise.unwrap();
            store.dispatch(setUserInfo({
                user_id: data.result['user_id'],
                name: data.result['name'],
                account: data.result['account'],
            }));
            return (store.getState() as AppState).auth;
        } catch (e: any) {
            // console.log(e.meta.baseQueryMeta.request);
            throw new AuthenticationError('유저 정보 조회 중 오류')
        } finally {
            userInfoPromise.unsubscribe()
        }
    } else {
        throw new AuthenticationError('로그인 필요')
    }
}