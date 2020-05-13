import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { checkTokenExpirationMiddleware } from '../middleware/check_token_expiration_middleware';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users', 'likes', 'settings', 'conversations', 'blocked_users', 'alerts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [thunkMiddleware, checkTokenExpirationMiddleware, logger];
if (process.env.NODE_ENV !== 'production') {
  middleware = [ ...middleware ]
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);
