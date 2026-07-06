import { type Action, type HistoryState } from '../types';

const initialState: HistoryState = {
    list: {
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

export const historyReducers = (
    state = initialState,
    action = initialAction
) => {
    switch (action.type) {
        // list
        case 'HISTORY_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'HISTORY_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'HISTORY_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'HISTORY_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'HISTORY_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'HISTORY_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'HISTORY_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
};
