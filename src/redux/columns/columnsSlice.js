/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
  addColumn,
  delColumn,
  fetchColumnsByIdBoards,
  updateColumn,
} from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  createEditColumnModal: {
    isOpen: true,
    columnId: null,
  },
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
      state.createCardModal = null;
      state.createEditColumnModal = { isOpen: true, columnId: null };
    },

    updateStateAfterDeleteBoard: (state, { payload }) => {
      const { id } = payload;
      state.items = state.items.filter(item => item.boardId !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchColumnsByIdBoards.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchColumnsByIdBoards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchColumnsByIdBoards.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addColumn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addColumn.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.items.push(payload);
        state.createEditColumnModal.isOpen = false;
        state.createEditColumnModal.boardId = payload._id;
      })
      .addCase(addColumn.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(delColumn.pending, (state, { payload }) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(delColumn.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.items = state.items.filter(item => item._id !== payload);
      })
      .addCase(delColumn.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(updateColumn.pending, (state, { payload }) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateColumn.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.items = state.items.map(item => {
          if (item._id === payload._id) return payload;
          return item;
        });
        state.createEditColumnModal.isOpen = false;
        state.createEditColumnModal.boardId = payload._id;
      })
      .addCase(updateColumn.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const columnsReducer = columnsSlice.reducer;

export const { resetError, updateStateAfterDeleteBoard } = columnsSlice.actions;
