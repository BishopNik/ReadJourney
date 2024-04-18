/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser, changeUserInfo, changeTheme } from './operations';

const initialState = {
	user: { name: null, email: null, avatarURL: null, thema: null },
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addToken: (state, { payload }) => {
			state.token = payload;
		},
	},
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
				state.user = payload.user;
				state.token = payload.token;
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
				state.user = payload.user;
				state.token = payload.token;
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
				state.isLoggedIn = false;
			})
			.addCase(logOut.rejected, state => {
				state.isLoading = false;
			})
			.addCase(refreshUser.pending, state => {
				state.isRefreshing = true;
			})
			.addCase(refreshUser.fulfilled, (state, { payload }) => {
				state.user = payload;
				state.isLoggedIn = true;
				state.isRefreshing = false;
			})
			.addCase(refreshUser.rejected, state => {
				state.isRefreshing = false;
				state.isLoggedIn = false;
			})
			.addCase(changeUserInfo.pending, state => {
				state.isLoading = true;
			})
			.addCase(changeUserInfo.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				if (payload.token) state.token = payload.token;
				state.isLoading = false;
			})
			.addCase(changeUserInfo.rejected, state => {
				state.isLoading = false;
			})
			.addCase(changeTheme.pending, state => {
				state.isLoading = true;
			})
			.addCase(changeTheme.fulfilled, (state, { payload }) => {
				state.user.thema = payload.user.thema;
				state.isLoading = false;
			})
			.addCase(changeTheme.rejected, state => {
				state.isLoading = false;
			});
	},
});

export const { addToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
