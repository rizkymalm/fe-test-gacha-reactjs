import { type Action, type WalletState } from '../types';

const initialState: WalletState = {
    detail: {
        loading: false,
        data: '',
        error: undefined,
    },
    actions: {
        loading: false,
        error: '',
        type: null,
        message: '',
    },
};

const initialAction: Action = {
    type: '',
};

export const walletReducers = (
    state = initialState,
    action = initialAction
) => {
    switch (action.type) {
        // detail wallet
        case 'WALLET_DETAIL_SUCCESS':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'WALLET_DETAIL_LOADING':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    error: '',
                },
            };
        case 'WALLET_DETAIL_ERROR':
            return {
                ...state,
                detail: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'WALLET_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'WALLET_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'WALLET_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'WALLET_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
};
