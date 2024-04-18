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
import { boardsReducer } from './boards/boardsSlice';
import { columnsReducer } from './columns/columnsSlice';
import { cardsReducer } from './cards/cardsSlice';

const persistConfigAuth = {
	key: 'auth',
	storage,
	whitelist: ['token'],
};

const persistConfigBoard = {
	key: 'board',
	storage,
	whitelist: ['activeBoard'],
};

const tokenPersistedReducer = persistReducer(persistConfigAuth, authReducer);

const boardPersistedReducer = persistReducer(persistConfigBoard, boardsReducer);

export const store = configureStore({
	reducer: {
		auth: tokenPersistedReducer,
		boards: boardPersistedReducer,
		columns: columnsReducer,
		cards: cardsReducer,
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
