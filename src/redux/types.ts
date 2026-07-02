interface Payload {
    data?: any;
    token?: string;
    id?: string | number;
    statusCode?: string | number;
    message?: string;
}

interface Params {
    type: string;
    payload?: Payload;
}

export type Dispatch = (params: Params | Function) => void;

export type GetState = () => Reducers;

export interface Action {
    type: string;
    payload?: Payload;
}

export interface Reducers {
    auth: AuthState;
    user: UserState;
    wallet: WalletState;
}

export interface AuthState {
    login: {
        loading: boolean;
        error: any | undefined;
        isLogin: boolean;
    };
    token: {
        accessToken: '';
        refreshToken: '';
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface ProductState {
    list: {
        loading: boolean;
        error: any | undefined;
        data: any;
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface WalletState {
    detail: {
        loading: boolean;
        error: any | undefined;
        data: any;
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface UserState {
    profile: {
        loading: boolean;
        error: any | undefined;
        data: any;
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}
