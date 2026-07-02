import { loginUser } from '../../services/auth.service';
import type { Dispatch } from '../types';

interface PropsPost {
    data?: any;
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
