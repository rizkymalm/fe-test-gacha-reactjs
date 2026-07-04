import { type Action, type GachaState } from '../types';

const initialState: GachaState = {
    item: {
        loading: false,
        data: '',
        error: undefined,
    },
    random: {
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

export const gachaReducers = (state = initialState, action = initialAction) => {
    switch (action.type) {
        // detail gacha item
        case 'GACHA_ITEM_SUCCESS':
            return {
                ...state,
                item: {
                    ...state.item,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'GACHA_ITEM_LOADING':
            return {
                ...state,
                item: {
                    ...state.item,
                    loading: true,
                    error: '',
                },
            };
        case 'GACHA_ITEM_ERROR':
            return {
                ...state,
                item: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // detail gacha item
        case 'GACHA_RANDOM_SUCCESS':
            return {
                ...state,
                random: {
                    ...state.random,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'GACHA_RANDOM_LOADING':
            return {
                ...state,
                random: {
                    ...state.random,
                    loading: true,
                    error: '',
                    data: '',
                },
            };
        case 'GACHA_RANDOM_ERROR':
            return {
                ...state,
                random: {
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
