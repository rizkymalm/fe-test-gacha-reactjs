import { walletAmount } from '@/services/wallet.service';

import type { Dispatch } from '../types';

interface PropsGet {
    data?: any;
    callback?: any;
}

export const getWalletAmount =
    ({ callback }: PropsGet) =>
    async (dispatch: Dispatch, getState: any) => {
        dispatch({
            type: 'WALLET_DETAIL_LOADING',
        });
        try {
            const { token } = getState().auth;
            const response = await walletAmount(token.accessToken);
            dispatch({
                type: 'WALLET_DETAIL_SUCCESS',
                payload: response.data,
            });

            callback();
        } catch (error: any) {
            if (error && error.response) {
                dispatch({
                    type: 'WALLET_DETAIL_ERROR',
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: 'WALLET_DETAIL_ERROR',
                    payload: error,
                });
            }
        }
    };
