import { type Action, type AuthState } from '@/redux/types';

const initialState: AuthState = {
    login: {
        loading: false,
        error: undefined,
        isLogin: false,
    },
    token: {
        accessToken: '',
        refreshToken: '',
    },
    role: {
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

const initialActionAuth: Action = {
    type: '',
};

export const authReducers = (
    state = initialState,
    action = initialActionAuth
) => {
    switch (action.type) {
        case 'AUTH_LOGIN_LOADING':
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                    error: '',
                },
            };

        case 'AUTH_LOGIN_SUCCESS':
            return {
                ...state,
                login: {
                    ...state.login,
                    isLogin: true,
                    loading: false,
                    error: undefined,
                },
                token: action.payload,
            };

        case 'AUTH_REFRESH_TOKEN_SUCCESS':
            return {
                ...state,
                token: action.payload,
            };

        case 'AUTH_LOGIN_ERROR':
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: action.payload,
                },
            };

        case 'AUTH_LOGIN_ERROR_CLEAR':
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: undefined,
                },
            };

        case 'LOGOUT':
            return {
                ...state,
                login: {
                    isLogin: false,
                    loading: false,
                    error: undefined,
                },
                token: {
                    accessToken: '',
                    refreshToken: '',
                },
                actions: {
                    loading: false,
                    error: '',
                    type: null,
                    message: '',
                },
            };

        // Role
        case 'AUTH_ROLE_SUCCESS':
            return {
                ...state,
                role: {
                    ...state.role,
                    loading: false,
                    data: action.payload,
                },
            };
        case 'AUTH_ROLE_LOADING':
            return {
                ...state,
                role: {
                    ...state.role,
                    loading: true,
                    error: '',
                },
            };
        case 'AUTH_ROLE_ERROR':
            return {
                ...state,
                role: {
                    loading: false,
                    data: '',
                    error: action.payload,
                },
            };

        //  actions
        case 'AUTH_ACTION_LOADING':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: true,
                    error: '',
                    message: '',
                },
            };
        case 'AUTH_ACTION_SUCCESS':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    type: 'success',
                    message: action.payload,
                },
            };
        case 'AUTH_ACTION_ERROR':
            return {
                ...state,
                actions: {
                    ...state.actions,
                    loading: false,
                    error: action.payload,
                    type: 'failed',
                },
            };
        case 'AUTH_ACTION_CLEAR':
            return {
                ...state,
                actions: initialState.actions,
            };

        default:
            return state;
    }
};
