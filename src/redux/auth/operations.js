/** @format */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from 'helpers';

axios.defaults.baseURL = 'https://readjourney.b.goit.study/api';

const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
	try {
		const res = await axios.post('/users/signup', credentials);
		setAuthHeader(res.data.token);
		toastSuccess(`Registration successful`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		return thunkAPI.rejectWithValue(response);
	}
});

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
	try {
		const res = await axios.post('/users/signin', credentials);
		setAuthHeader(res.data.token);
		toastSuccess(`Login successful`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		return thunkAPI.rejectWithValue(response);
	}
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		await axios.post('/users/signout');
		toastSuccess(`Logout successful`);
		clearAuthHeader();
		window.location.reload();
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response);
	}
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
	const state = thunkAPI.getState();
	const persistedToken = state.auth.token;

	if (persistedToken === null) {
		return thunkAPI.rejectWithValue(`Not valid token`);
	}

	try {
		setAuthHeader(persistedToken);
		const res = await axios.get('/users/current');
		return res.data;
	} catch ({ response }) {
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});

export const refreshTokens = createAsyncThunk('auth/refreshTokens', async (_, thunkAPI) => {
	const state = thunkAPI.getState();
	const refreshToken = state.auth.refreshToken;

	if (refreshToken === null) {
		return thunkAPI.rejectWithValue(`Error refreshing token.`);
	}
	try {
		setAuthHeader(refreshToken);
		const res = await axios.get('/users/current/refresh');
		setAuthHeader(res.data.token);
		return res.data;
	} catch ({ response }) {
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});
