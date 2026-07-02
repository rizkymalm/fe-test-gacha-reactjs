import { userProfile } from '../../services/user.service';
import type { Dispatch } from '../types';

interface PropsGet {
    data?: any;
    callback?: any;
}

export const getUserProfile =
    ({ callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_PROFILE_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await userProfile(token.accessToken);
            dispatch({
                type: 'USER_PROFILE_SUCCESS',
                payload: response.data,
            });

            callback();
        } catch (error: any) {
            if (error && error.response) {
                dispatch({
                    type: 'USER_PROFILE_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'USER_PROFILE_ERROR',
                    payload: error,
                });
            }
        }
    };
