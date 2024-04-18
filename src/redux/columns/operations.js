/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toastError, toastSuccess } from 'helpers';

export const fetchColumnsByIdBoards = createAsyncThunk(
	'column/fetchColumnsByIdBoards',
	async (columnId, thunkAPI) => {
		try {
			const res = await axios.get(`/column/${columnId}`);
			return res.data;
		} catch ({ response }) {
			toastError(response?.data?.message);
			if (response.status === 401) window.location.reload();
			return thunkAPI.rejectWithValue(response?.data?.message);
		}
	}
);
export const addColumn = createAsyncThunk('column/addColum', async (newColum, thunkAPI) => {
	try {
		const res = await axios.post('/column', newColum);
		toastSuccess(`Column has been created`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});
export const delColumn = createAsyncThunk('column/delColumn', async (columnId, thunkAPI) => {
	try {
		await axios.delete(`/column/${columnId}`);
		toastSuccess('Successful removal');
		return columnId;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});
export const updateColumn = createAsyncThunk('column/updateColumn', async (updColumn, thunkAPI) => {
	try {
		const { id, ...rest } = updColumn;
		const res = await axios.patch(`/column/${id}`, rest);
		toastSuccess(`Column has been updated`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});
