/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser, refreshTokens } from './operations';

const initialState = {
	user: { name: null, email: null },
	token: null,
	refreshToken: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				if (payload === undefined) {
					state.isLoading = false;
					return;
				}
				state.user = { name: payload.name, email: payload.email };
				state.token = payload.token;
				state.refreshToken = payload.refreshToken;
				state.isLoggedIn = true;
				state.isLoading = false;
			})
			.addCase(register.rejected, state => {
				state.isLoading = false;
			})
			.addCase(logIn.pending, state => {
				state.isLoading = true;
			})
			.addCase(logIn.fulfilled, (state, { payload }) => {
				state.user = { name: payload.name, email: payload.email };
				state.token = payload.token;
				state.refreshToken = payload.refreshToken;
				state.isLoggedIn = true;
				state.isLoading = false;
			})
			.addCase(logIn.rejected, state => {
				state.isLoading = false;
			})
			.addCase(logOut.pending, state => {
				state.isLoading = true;
			})
			.addCase(logOut.fulfilled, state => {
				state.user = { name: null, email: null };
				state.token = null;
				state.refreshToken = null;
				state.isLoggedIn = false;
			})
			.addCase(logOut.rejected, state => {
				state.isLoading = false;
			})
			.addCase(refreshUser.pending, state => {
				state.isRefreshing = true;
			})
			.addCase(refreshUser.fulfilled, (state, { payload }) => {
				state.user = { name: payload.name, email: payload.email };
				state.token = payload.token;
				state.refreshToken = payload.refreshToken;
				state.isLoggedIn = true;
				state.isRefreshing = false;
			})
			.addCase(refreshUser.rejected, state => {
				state.isRefreshing = false;
				state.isLoggedIn = false;
			})
			.addCase(refreshTokens.fulfilled, (state, { payload }) => {
				state.token = payload.token;
				state.refreshToken = payload.refreshToken;
				state.isLoggedIn = true;
			})
			.addCase(refreshTokens.rejected, state => {
				state.isLoggedIn = false;
			});
	},
});

export const authReducer = authSlice.reducer;
