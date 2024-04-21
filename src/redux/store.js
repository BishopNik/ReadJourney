/** @format */

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';

const persistConfigAuth = {
	key: 'token',
	storage,
	whitelist: ['token'],
};

const tokenPersistedReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
	reducer: {
		auth: tokenPersistedReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
