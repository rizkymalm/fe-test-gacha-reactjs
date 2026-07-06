import { type Action, type UserState } from '../types';

const initialState: UserState = {
    profile: {
        loading: false,
        data: '',
        error: undefined,
    },
    inventory: {
        loading: false,
        data: '',
        error: undefined,
    },
    latestInventory: {
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

export const userReducers = (state = initialState, action = initialAction) => {
    switch (action.type) {
        // detail user
        case 'USER_PROFILE_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_PROFILE_LOADING':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_PROFILE_ERROR':
            return {
                ...state,
                profile: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // INVENTORY user
        case 'USER_INVENTORY_SUCCESS':
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_INVENTORY_LOADING':
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_INVENTORY_ERROR':
            return {
                ...state,
                inventory: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        // LATEST INVENTORY user
        case 'USER_LATEST_INVENTORY_SUCCESS':
            return {
                ...state,
                latestInventory: {
                    ...state.latestInventory,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'USER_LATEST_INVENTORY_LOADING':
            return {
                ...state,
                latestInventory: {
                    ...state.latestInventory,
                    loading: true,
                    error: '',
                },
            };
        case 'USER_LATEST_INVENTORY_ERROR':
            return {
                ...state,
                latestInventory: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'USER_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'USER_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'USER_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'USER_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
};
