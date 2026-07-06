import {
    createEvent,
    eventActive,
    eventDetail,
    eventItemAdd,
    eventItemDeleteItem,
    eventItemExclude,
    eventItemUpdateDropRate,
    eventList,
    eventUpdateStatus,
} from '@/services/event.service';

import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface PropsGet {
    data?: any;
    callback?: any;
    queries?: any;
    id?: string;
}

interface PropsAction {
    data?: any;
    callback?: any;
    id?: string;
}

export const getEventActive =
    ({ callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ACTIVE_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventActive(token.accessToken);
            dispatch({
                type: 'EVENT_ACTIVE_SUCCESS',
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
                                dispatch(getEventActive({ callback }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ACTIVE_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ACTIVE_ERROR',
                    payload: error,
                });
            }
        }
    };

export const getEventList =
    ({ queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_LIST_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventList(token.accessToken, queries);
            dispatch({
                type: 'EVENT_LIST_SUCCESS',
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
                                dispatch(getEventList({ callback, queries }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_LIST_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_LIST_ERROR',
                    payload: error,
                });
            }
        }
    };

export const getEventDetail =
    ({ id, callback }: PropsAction) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_DETAIL_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventDetail(token.accessToken, id || '');
            dispatch({
                type: 'EVENT_DETAIL_SUCCESS',
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
                                dispatch(getEventDetail({ callback, id }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_DETAIL_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_DETAIL_ERROR',
                    payload: error,
                });
            }
        }
    };

export const getEventItemExclude =
    ({ id, queries, callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ITEMS_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventItemExclude(
                token.accessToken,
                queries,
                id || ''
            );
            dispatch({
                type: 'EVENT_ITEMS_SUCCESS',
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
                                dispatch(
                                    getEventItemExclude({
                                        callback,
                                        id,
                                        queries,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ITEMS_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ITEMS_ERROR',
                    payload: error,
                });
            }
        }
    };

export const patchEventUpdateStatus =
    ({ data, id, callback }: PropsAction) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventUpdateStatus(
                token.accessToken,
                data,
                id || ''
            );
            dispatch({
                type: 'EVENT_ACTION_SUCCESS',
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
                                dispatch(
                                    patchEventUpdateStatus({
                                        data,
                                        id,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };

// export const patchEventUpdateItem =
//     ({ data, id, callback }: PropsAction) =>
//     async (dispatch: Dispatch, getState: any) => {
//         dispatch({
//             type: 'EVENT_ACTION_LOADING',
//         });
//         try {
//             const { token } = getState().auth;
//             const response = await eventUpdateItem(
//                 token.accessToken,
//                 data,
//                 id || ''
//             );
//             dispatch({
//                 type: 'EVENT_ACTION_SUCCESS',
//                 payload: response.data,
//             });
//             if (callback) {
//                 callback();
//             }
//         } catch (error: any) {
//             if (error && error.response) {
//                 if (error.response.status === 401) {
//                     dispatch(
//                         postRefreshToken({
//                             callback: () => {
//                                 dispatch(
//                                     patchEventUpdateItem({
//                                         data,
//                                         id,
//                                         callback,
//                                     })
//                                 );
//                             },
//                         })
//                     );
//                 }
//                 dispatch({
//                     type: 'EVENT_ACTION_ERROR',
//                     payload: error.response.data,
//                 });
//             } else {
//                 dispatch({
//                     type: 'EVENT_ACTION_ERROR',
//                     payload: error,
//                 });
//             }
//         }
//     };

export const postEventItemAdd =
    ({ data, id, callback }: PropsAction) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventItemAdd(
                token.accessToken,
                data,
                id || ''
            );
            dispatch({
                type: 'EVENT_ACTION_SUCCESS',
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
                                dispatch(
                                    postEventItemAdd({
                                        data,
                                        id,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };

export const patchEventItemUpdateDropRate =
    ({ data, id, callback }: PropsAction) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventItemUpdateDropRate(
                token.accessToken,
                data,
                id || ''
            );
            dispatch({
                type: 'EVENT_ACTION_SUCCESS',
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
                                dispatch(
                                    patchEventItemUpdateDropRate({
                                        data,
                                        id,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };

export const deleteEventItemDeleteItem =
    ({ id, callback }: PropsAction) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await eventItemDeleteItem(
                token.accessToken,
                id || ''
            );
            dispatch({
                type: 'EVENT_ACTION_SUCCESS',
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
                                dispatch(
                                    deleteEventItemDeleteItem({
                                        id,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };

export const postCreateEvent =
    ({ data, callback }: PropsAction) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'EVENT_ACTION_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await createEvent(token.accessToken, data);
            dispatch({
                type: 'EVENT_ACTION_SUCCESS',
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
                                dispatch(
                                    postCreateEvent({
                                        data,
                                        callback,
                                    })
                                );
                            },
                        })
                    );
                }
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'EVENT_ACTION_ERROR',
                    payload: error,
                });
            }
        }
    };
