/** @format */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from 'helpers';

export const fetchAllBoards = createAsyncThunk('boards/fetchAll', async (_, thunkAPI) => {
	try {
		const response = await axios.get('/boards');
		return response.data;
	} catch ({ response }) {
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data.message);
	}
});
export const getBoardById = createAsyncThunk('boards/:boardName', async (boardId, thunkAPI) => {
	try {
		const response = await axios.get(`/boards/${boardId}`);
		return response.data;
	} catch ({ response }) {
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data.message);
	}
});

export const addBoard = createAsyncThunk('boards/addBoard', async (newBoard, thunkAPI) => {
	try {
		const response = await axios.post('/boards', newBoard);
		toastSuccess('Board has been created');
		return response.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data.message);
	}
});

export const editBoard = createAsyncThunk(
	'boards/editBoard',
	async ({ _id, name, icon, background }, thunkAPI) => {
		try {
			const response = await axios.patch(`/boards/${_id}`, { name, icon, background });
			return response.data;
		} catch ({ response }) {
			toastError(response?.data?.message);
			if (response.status === 401) window.location.reload();
			return thunkAPI.rejectWithValue(response?.data?.message);
		}
	}
);

export const delBoard = createAsyncThunk('boards/delBoard', async (id, thunkAPI) => {
	try {
		await axios.delete(`/boards/${id}`);
		toastSuccess(`Successful removal`);
		return id;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response.status === 401) window.location.reload();
		return thunkAPI.rejectWithValue(response?.data?.message);
	}
});
