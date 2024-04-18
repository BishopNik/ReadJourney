/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { addCard, delCard, fetchCardsByColumnId, updateCard, removeCardInBase } from './operations';

const initialState = {
	items: {},
	createCardModal: null,
	isLoading: false,
	error: null,
};

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		resetError: state => {
			state.error = null;
			state.createCardModal = null;
		},
		updateStateAfterDeleteColumn: (state, { payload }) => {
			const { id } = payload;
			const { [id]: deletedColumn, ...restColumns } = state.items;
			state.items = restColumns;
		},
		removeCard: (state, { payload }) => {
			const { oldColumnId, columnId, id, indexCard } = payload;
			const cardToRemove = state.items[oldColumnId].find(card => card._id === id);

			if (!cardToRemove) return;

			const tempOldArrayCard = [...state.items[oldColumnId]];
			const oldIndex = tempOldArrayCard.findIndex(card => card._id === id);
			tempOldArrayCard.splice(oldIndex, 1);

			if (oldColumnId === columnId) {
				tempOldArrayCard.splice(indexCard, 0, cardToRemove);
				state.items[oldColumnId] = tempOldArrayCard;
			} else {
				const tempNewArrayCard = [...state.items[columnId]];
				cardToRemove.columnId = columnId;
				tempNewArrayCard.splice(indexCard, 0, cardToRemove);
				state.items = {
					...state.items,
					[columnId]: tempNewArrayCard,
					[oldColumnId]: tempOldArrayCard,
				};
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCardsByColumnId.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchCardsByColumnId.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const { columnId, data } = payload;
				state.items[columnId] = data.sort((c1, c2) => c1.indexCard - c2.indexCard);
			})
			.addCase(fetchCardsByColumnId.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
				state.createCardModal = true;
			})
			.addCase(addCard.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addCard.fulfilled, (state, { payload }) => {
				state.error = null;
				state.isLoading = false;
				state.createCardModal = false;
				const { columnId } = payload;
				state.items[columnId] = [...state.items[columnId], payload].sort(
					(c1, c2) => c1.indexCard - c2.indexCard
				);
			})
			.addCase(addCard.rejected, (state, { payload }) => {
				state.error = payload;
				state.isLoading = false;
			})
			.addCase(delCard.pending, state => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(delCard.fulfilled, (state, { payload }) => {
				state.error = null;
				state.isLoading = false;
				const { cardId, columnId } = payload;

				state.items[columnId] = (state.items[columnId] || [])
					.filter(item => item._id !== cardId)
					.sort((c1, c2) => c1.indexCard - c2.indexCard);
			})
			.addCase(delCard.rejected, (state, { payload }) => {
				state.error = payload;
				state.isLoading = false;
			})
			.addCase(updateCard.pending, state => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(updateCard.fulfilled, (state, { payload }) => {
				state.error = null;
				state.createCardModal = false;
				state.isLoading = false;
				const { data, oldColumnId } = payload;
				const { columnId: newColumnId, _id } = data;
				let tmArrOldCol = null;
				let tmArrNewCol = null;

				if (oldColumnId !== newColumnId) {
					tmArrOldCol = state.items[oldColumnId]
						?.filter(item => item._id !== _id)
						.sort((c1, c2) => c1.indexCard - c2.indexCard);
					tmArrNewCol = [...state.items[newColumnId], data].sort(
						(c1, c2) => c1.indexCard - c2.indexCard
					);

					state.items = {
						[oldColumnId]: tmArrOldCol,
						[newColumnId]: tmArrNewCol,
					};
				} else {
					tmArrNewCol = state.items[newColumnId]
						.map(item => {
							if (item._id === _id) return data;
							return item;
						})
						.sort((c1, c2) => c1.indexCard - c2.indexCard);
					state.items[newColumnId] = tmArrNewCol;
				}
			})
			.addCase(updateCard.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})
			.addCase(removeCardInBase.pending, state => {
				state.error = null;
				state.isLoading = true;
			})
			.addCase(removeCardInBase.fulfilled, state => {
				state.error = null;
				state.isLoading = false;
			})
			.addCase(removeCardInBase.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			});
	},
});

export const cardsReducer = cardsSlice.reducer;

export const { resetError, updateStateAfterDeleteColumn, removeCard } = cardsSlice.actions;
