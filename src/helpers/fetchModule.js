/** @format */

import axios from 'axios';
import { toastError, toastSuccess } from 'helpers';

export const fetchRecommendedBooks = async (page = 1, limit = 2, title = '', author = '') => {
	try {
		let url = `/books/recommend?page=${page}&limit=${limit}`;
		if (title) {
			url += `&title=${title}`;
		}
		if (author) {
			url += `&author=${author}`;
		}

		const res = await axios.get(url);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const addBookToLibraryById = async id => {
	try {
		const res = await axios.post(`/books/add/${id}`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const fetchOwnBooks = async (status = '') => {
	try {
		let url = `/books/own`;
		if (status) {
			url += `&status=${status}`;
		}

		const res = await axios.get(url);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const fetchBook = async id => {
	try {
		const res = await axios.get(`/books/${id}`);
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const addBookToLibrary = async (title, author, totalPages) => {
	try {
		const res = await axios.post(`/books/add`, { title, author, totalPages });
		return res.status;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const deleteBookFromLibrary = async id => {
	try {
		const res = await axios.delete(`/books/remove/${id}`);
		toastSuccess('Book deleted from library.');
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const startReadingBook = async (id, page) => {
	try {
		const res = await axios.post('/books/reading/start', { id, page });
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const stopReadingBook = async (id, page) => {
	try {
		const res = await axios.post('/books/reading/finish', { id, page });
		return res.data;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};

export const deleteReadingOfBook = async (idBook, idReading) => {
	try {
		const res = await axios.delete(`/books/reading?bookId=${idBook}&readingId=${idReading}`);
		toastSuccess('Reading of the book deleted.');
		return res.status;
	} catch ({ response }) {
		toastError(response?.data?.message);
		if (response?.status === 401) {
			window.location.reload();
		}
	}
};
