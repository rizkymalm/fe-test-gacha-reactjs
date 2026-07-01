import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

import rootReducer from './reducers';

const initialState: any = {};
const middlewares: any[] = [thunk];

const store: any = createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(...middlewares))
        : applyMiddleware(...middlewares)
);

const persistor = persistStore(store);

export { persistor, store };
