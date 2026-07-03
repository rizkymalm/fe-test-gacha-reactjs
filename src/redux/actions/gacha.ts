import { itemListGroup } from '@/services/item.service';

import type { Dispatch } from '../types';
import { postRefreshToken } from './auth';

interface PropsGet {
    data?: any;
    callback?: any;
}

export const getGachaItem =
    ({ callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'GACHA_ITEM_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await itemListGroup(token.accessToken);
            dispatch({
                type: 'GACHA_ITEM_SUCCESS',
                payload: response.data,
            });
            if (callback) {
                callback();
            }
        } catch (error: any) {
            if (error && error.response) {
                if (error.response.status) {
                    dispatch(
                        postRefreshToken({
                            callback: () => {
                                dispatch(getGachaItem({ callback }));
                            },
                        })
                    );
                }
                dispatch({
                    type: 'GACHA_ITEM_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'GACHA_ITEM_ERROR',
                    payload: error,
                });
            }
        }
    };
