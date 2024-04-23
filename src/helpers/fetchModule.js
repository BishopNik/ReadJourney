/** @format */

import axios from 'axios';
import { toastError } from 'helpers';

export const fetchRecommendedBooks = async (page = 1, limit = 2, title = '', author = '') => {
	try {
		const res = await axios.get(
			`/books/recommend?page=${page}&limit=${limit}&title=${title}&author=${author}`
		);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
	}
};

export const addBooksToLibrary = async id => {
	try {
		const res = await axios.post(`books/add/${id}`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
	}
};
