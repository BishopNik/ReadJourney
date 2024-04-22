/** @format */

import axios from 'axios';
import { toastError } from 'helpers';

export const fetchRecommendedBooks = async (title, author, page, limit) => {
	try {
		const res = await axios.get(`/books/recommend?page=${page}&limit=${limit}`, {
			title,
			author,
		});
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
	}
};
