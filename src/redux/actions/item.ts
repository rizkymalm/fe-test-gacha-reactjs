import { itemCreate, itemList } from '@/services/item.service';

import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface PropsGet {
    limit?: number;
    page?: number;
    callback?: any;
    queries?: any;
}

interface PropsPost {
    callback?: any;
    data: any;
}

export const getItemList =
    ({ queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'ITEM_LIST_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await itemList(token.accessToken, queries);
            dispatch({
                type: 'ITEM_LIST_SUCCESS',
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
                                dispatch(getItemList({ queries, callback }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'ITEM_LIST_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'ITEM_LIST_ERROR',
                    payload: error,
                });
            }
        }
    };

export const postItemCreate =
    ({ data, callback }: PropsPost) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'ITEM_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await itemCreate(token.accessToken, data);
            dispatch({
                type: 'ITEM_ACTION_SUCCESS',
                payload: response.data,
            });
            if (callback) {
                callback(response.data);
            }
        } catch (error: any) {
            if (error && error.response) {
                if (error.response.status === 401) {
                    dispatch(
                        postRefreshToken({
                            callback: () => {
                                dispatch(postItemCreate({ data, callback }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'ITEM_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'ITEM_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };
