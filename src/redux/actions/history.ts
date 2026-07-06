import { historyList } from '@/services/history.service';

import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface PropsGet {
    callback?: any;
    queries?: any;
}

export const getHistoryList =
    ({ queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'HISTORY_LIST_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await historyList(token.accessToken, queries);
            dispatch({
                type: 'HISTORY_LIST_SUCCESS',
                payload: response,
            });
            if (callback) {
                callback();
            }
        } catch (error: any) {
            if (error && error.response) {
                if (error.response.status === 401) {
                    dispatch(
                        postRefreshToken({
                            callback: () => {
                                dispatch(getHistoryList({ queries, callback }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'HISTORY_LIST_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'HISTORY_LIST_ERROR',
                    payload: error,
                });
            }
        }
    };
