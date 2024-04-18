/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBoards, addBoard, editBoard, delBoard } from './operations';

const initialState = {
	items: [],
	activeBoard: null,
	isLoading: false,
	createEditBoardModal: {
		isOpen: true,
		boardId: null,
	},
	error: null,
};

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		resetError: state => {
			state.error = null;
			state.createEditBoardModal = { isOpen: true, boardId: null };
		},
		setActiveBoard: (state, { payload }) => {
			state.activeBoard = payload;
		},
		resetActiveBoard: state => {
			state.activeBoard = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAllBoards.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchAllBoards.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.items = payload;
			})
			.addCase(fetchAllBoards.rejected, (state, { error }) => {
				state.isLoading = false;
				state.error = error.message;
			})
			.addCase(addBoard.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addBoard.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.items.push(payload);
				state.activeBoard = payload._id;
				state.createEditBoardModal.isOpen = false;
				state.createEditBoardModal.boardId = payload._id;
			})
			.addCase(addBoard.rejected, (state, { error }) => {
				state.isLoading = false;
				state.error = error.message;
			})
			.addCase(editBoard.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(editBoard.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.items = state.items.map(item => {
					if (item._id === payload._id) return payload;
					return item;
				});
				state.createEditBoardModal.isOpen = false;
				state.createEditBoardModal.boardId = payload._id;
			})
			.addCase(editBoard.rejected, (state, { error }) => {
				state.isLoading = false;
				state.error = error.message;
			})
			.addCase(delBoard.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(delBoard.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.items = state.items.filter(item => item._id !== payload);
			})
			.addCase(delBoard.rejected, (state, { error }) => {
				state.isLoading = false;
				state.error = error.message;
			});
	},
});

export const boardsReducer = boardsSlice.reducer;

export const { resetError, setActiveBoard, resetActiveBoard } = boardsSlice.actions;
