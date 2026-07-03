import { authRole, loginUser, refreshToken } from '../../services/auth.service';
import type { Dispatch } from '../types';

interface PropsPost {
    data?: any;
    callback?: any;
}

interface PropsGet {
    callback?: any;
}

export const postLoginUser =
    ({ data, callback }: PropsPost) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: 'AUTH_LOGIN_LOADING',
        });
        try {
            const response = await loginUser(data);
            const token = response?.data?.token;
            dispatch({
                type: 'AUTH_LOGIN_SUCCESS',
                payload: token,
            });

            callback(response);
        } catch (error: any) {
            if (error && error.response) {
                dispatch({
                    type: 'AUTH_LOGIN_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'AUTH_LOGIN_ERROR',
                    payload: error,
                });
            }
        }
    };

export const getAuthRole =
    ({ callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'AUTH_ROLE_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await authRole(token.accessToken);
            dispatch({
                type: 'AUTH_ROLE_SUCCESS',
                payload: response.data,
            });
            if (callback) {
                callback();
            }
        } catch (error: any) {
            if (error && error.response) {
                dispatch({
                    type: 'AUTH_ROLE_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'AUTH_ROLE_ERROR',
                    payload: error,
                });
            }
        }
    };

export const postRefreshToken =
    ({ callback }: PropsPost) =>
    async (dispatch: Dispatch, getState: any) => {
        try {
            const { token } = getState().auth;
            const response = await refreshToken(token.refreshToken);
            const data = response?.data?.token;
            dispatch({
                type: 'AUTH_REFRESH_TOKEN_SUCCESS',
                payload: data,
            });

            callback(response);
        } catch (error: any) {
            if (error && error.response) {
                dispatch({
                    type: 'LOGOUT',
                });
            }
        }
    };
