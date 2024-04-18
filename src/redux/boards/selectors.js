/** @format */

export const boardsState = state => state.boards.items;

export const statusLoadingState = state => state.boards.isLoading;

export const statusError = state => state.boards.error;

export const modalData = state => state.boards.createEditBoardModal;

export const activeBoardState = state => state.boards.activeBoard;
