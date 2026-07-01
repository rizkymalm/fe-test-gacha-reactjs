import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type { Action } from '../types';
import { authReducers } from './authReducers';

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
});

const rootReducer = (state: any, action: Action) => {
    let res = state;
    if (action.type === 'LOGOUT') {
        res = undefined;
    }
    return appReducer(res, action);
};

export default persistReducer(persistConfig, rootReducer);
