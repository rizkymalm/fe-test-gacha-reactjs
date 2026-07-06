import {
    userInventory,
    userLatestInventory,
    userProfile,
} from '../../services/user.service';
import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface PropsGet {
    data?: any;
    callback?: any;
    queries?: any;
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
            if (callback) {
                callback();
            }
        } catch (error: any) {
            if (error && error.response) {
                if (error.response.status === 401) {
                    dispatch(
                        postRefreshToken({
                            callback: () => {
                                dispatch(getUserProfile({ callback }));
                            },
                        })
                    );
                }
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

export const getUserInventory =
    ({ queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_INVENTORY_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await userInventory(token.accessToken, queries);
            dispatch({
                type: 'USER_INVENTORY_SUCCESS',
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
                                dispatch(
                                    getUserInventory({ queries, callback })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'USER_INVENTORY_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'USER_INVENTORY_ERROR',
                    payload: error,
                });
            }
        }
    };

export const getUserLatestInventory =
    ({ queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_LATEST_INVENTORY_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await userLatestInventory(
                token.accessToken,
                queries
            );
            dispatch({
                type: 'USER_LATEST_INVENTORY_SUCCESS',
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
                                dispatch(
                                    getUserLatestInventory({
                                        queries,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'USER_LATEST_INVENTORY_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'USER_LATEST_INVENTORY_ERROR',
                    payload: error,
                });
            }
        }
    };
