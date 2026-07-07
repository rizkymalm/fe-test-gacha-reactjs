import { roleList } from '@/services/role.service';

import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface Props {
    callback?: any;
}

export const getRoleList =
    ({ callback }: Props) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'ROLE_LIST_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await roleList(token.accessToken);
            dispatch({
                type: 'ROLE_LIST_SUCCESS',
                payload: response,
            });
            if (callback) {
                callback(response);
            }
        } catch (error: any) {
            if (error && error.response) {
                if (error.response.status === 401) {
                    dispatch(
                        postRefreshToken({
                            callback: () => {
                                dispatch(
                                    getRoleList({
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'ROLE_LIST_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'ROLE_LIST_ERROR',
                    payload: error,
                });
            }
        }
    };
