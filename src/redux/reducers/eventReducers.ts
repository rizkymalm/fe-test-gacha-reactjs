import { type Action, type EventState } from '../types';

const initialState: EventState = {
    list: {
        loading: false,
        data: '',
        error: undefined,
    },
    active: {
        loading: false,
        data: '',
        error: undefined,
    },
    detail: {
        loading: false,
        data: '',
        error: undefined,
    },
    items: {
        // this is for add new item on event(exclude item that exist in event)
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

export const eventReducers = (state = initialState, action = initialAction) => {
    switch (action.type) {
        // detail gacha item
        case 'EVENT_LIST_SUCCESS':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'EVENT_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: '',
                },
            };
        case 'EVENT_LIST_ERROR':
            return {
                ...state,
                list: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // detail event active
        case 'EVENT_ACTIVE_SUCCESS':
            return {
                ...state,
                active: {
                    ...state.active,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'EVENT_ACTIVE_LOADING':
            return {
                ...state,
                active: {
                    ...state.active,
                    loading: true,
                    error: '',
                    data: '',
                },
            };
        case 'EVENT_ACTIVE_ERROR':
            return {
                ...state,
                active: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // detail event
        case 'EVENT_DETAIL_SUCCESS':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'EVENT_DETAIL_LOADING':
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    error: '',
                    data: '',
                },
            };
        case 'EVENT_DETAIL_ERROR':
            return {
                ...state,
                detail: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // list not existing item in event
        case 'EVENT_ITEMS_SUCCESS':
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'EVENT_ITEMS_LOADING':
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: true,
                    error: '',
                    data: '',
                },
            };
        case 'EVENT_ITEMS_ERROR':
            return {
                ...state,
                items: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'EVENT_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'EVENT_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'EVENT_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'EVENT_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
};
