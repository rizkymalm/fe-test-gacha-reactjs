import {
    userCreate,
    userDetail,
    userInventory,
    userLatestInventory,
    userList,
    userProfile,
} from '../../services/user.service';
import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface PropsGet {
    data?: any;
    callback?: any;
    queries?: any;
}

interface PropsDetail {
    callback?: any;
    id: any;
}

interface PropsPost {
    callback?: any;
    data: any;
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

export const getUserList =
    ({ queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_LIST_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await userList(token.accessToken, queries);
            dispatch({
                type: 'USER_LIST_SUCCESS',
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
                                    getUserList({
                                        queries,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'USER_LIST_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'USER_LIST_ERROR',
                    payload: error,
                });
            }
        }
    };

export const getUserDetail =
    ({ id, callback }: PropsDetail) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_DETAIL_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await userDetail(token.accessToken, id);
            dispatch({
                type: 'USER_DETAIL_SUCCESS',
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
                                    getUserDetail({
                                        id,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'USER_DETAIL_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'USER_DETAIL_ERROR',
                    payload: error,
                });
            }
        }
    };

export const postUserCreate =
    ({ data, callback }: PropsPost) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'USER_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await userCreate(token.accessToken, data);
            dispatch({
                type: 'USER_ACTION_SUCCESS',
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
                                    postUserCreate({
                                        data,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'USER_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'USER_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };
