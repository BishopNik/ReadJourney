/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toastError, toastSuccess } from 'helpers';

export const fetchCardsByColumnId = createAsyncThunk(
	'card/fetchCards',
	async (columnId, thunkAPI) => {
		try {
			const { data } = await axios.get(`/card/${columnId}`);
			return { columnId, data };
		} catch ({ response }) {
			toastError(response?.data?.message);
			if (response.status === 401) window.location.reload();
			return thunkAPI.rejectWithValue(response?.data?.message);
		}
	}
);

export const addCard = createAsyncThunk('card/addCard', async (newCard, thunkAPI) => {
	try {
		const res = await axios.post('/card', newCard);
		toastSuccess(`Card has been created`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});

export const delCard = createAsyncThunk(
	'card/delCard',
	async ({ id: cardId, _id: columnId }, thunkAPI) => {
		try {
			await axios.delete(`/card/${cardId}`);
			toastSuccess('Successful removal');
			return { cardId, columnId };
		} catch ({ response }) {
			toastError(response?.data?.message);
			if (response.status === 401) window.location.reload();
			return thunkAPI.rejectWithValue(response?.data?.message);
		}
	}
);

export const updateCard = createAsyncThunk(
	'card/updateCard',
	async ({ id, columnId, oldColumnId, ...rest }, thunkAPI) => {
		try {
			const { data } = await axios.patch(`/card/${id}`, { columnId, ...rest });
			toastSuccess('The card has been updated');
			return { data, oldColumnId };
		} catch ({ response }) {
			toastSuccess('Error updating card');
			if (response.status === 401) window.location.reload();
			return thunkAPI.rejectWithValue(response?.data?.message);
		}
	}
);

export const removeCardInBase = createAsyncThunk(
	'card/removeCardInBase',
	async ({ id, columnId, oldColumnId, ...rest }, thunkAPI) => {
		try {
			const { data } = await axios.patch(`/card/${id}`, { columnId, ...rest });
			return { data, oldColumnId };
		} catch ({ response }) {
			if (response.status === 401) window.location.reload();
			return thunkAPI.rejectWithValue(response?.data?.message);
		}
	}
);
