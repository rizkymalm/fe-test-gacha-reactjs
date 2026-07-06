import { type Action, type ItemState } from '../types';

const initialState: ItemState = {
    listGroup: {
        loading: false,
        data: '',
        error: undefined,
    },
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

export const itemReducers = (state = initialState, action = initialAction) => {
    switch (action.type) {
        // list group
        case 'ITEM_LIST_GROUP_SUCCESS':
            return {
                ...state,
                listGroup: {
                    ...state.listGroup,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'ITEM_LIST_GROUP_LOADING':
            return {
                ...state,
                listGroup: {
                    ...state.listGroup,
                    loading: true,
                    error: '',
                },
            };
        case 'ITEM_LIST_GROUP_ERROR':
            return {
                ...state,
                listGroup: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // list
        case 'ITEM_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'ITEM_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'ITEM_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'ITEM_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'ITEM_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'ITEM_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'ITEM_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
};
