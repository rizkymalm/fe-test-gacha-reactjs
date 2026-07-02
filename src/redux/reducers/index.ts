import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type { Action } from '../types';
import { authReducers } from './authReducers';
import { userReducers } from './userReducers';
import { walletReducers } from './walletReducers';

interface PersistProps {
    key: string;
    storage: any;
}

const persistConfig: PersistProps = {
    key: 'gamedashboard',
    storage,
};

const appReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    wallet: walletReducers,
});

const rootReducer = (state: any, action: Action) => {
    let res = state;
    if (action.type === 'LOGOUT') {
        res = undefined;
    }
    return appReducer(res, action);
};

export default persistReducer(persistConfig, rootReducer);
