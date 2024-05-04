/** @format */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import EllipsisText from 'react-ellipsis-text';
import clsx from 'clsx';
import Icon from 'components/Icon';
import styles from '../styles/library.module.css';
import Dashboard from 'components/Dashboard';
import {
	MainContext,
	fetchRecommendedBooks,
	fetchOwnBooks,
	addBookToLibrary,
	deleteBookFromLibrary,
	AddBookSchema,
} from 'helpers';

function LibraryPage() {
	const { setBook, setBookOwn, isOpenSuccessModal, setIsOpenSuccessModal } =
		useContext(MainContext);
	const [isOpenSelect, setIsOpenSelect] = useState(false);
	const [books, setBooks] = useState([]);
	const [ownBooks, setOwnBooks] = useState([]);
	const [pages, setPages] = useState(0);
	const [selectedOption, setSelectedOption] = useState('All books');
	const options = ['Unread', 'In progress', 'Done', 'All books'];

	const handleSelect = option => {
		setSelectedOption(option);
	};

	const handlerOnCloseKeySelect = useCallback(
		({ key }) => {
			if (key === 'Escape' && isOpenSelect) {
				setIsOpenSelect(false);
			}
		},
		[isOpenSelect]
	);

	const handlerOnCloseClickSelect = useCallback(({ target }) => {
		if (
			!target.classList.contains(styles.icon_chevron) &&
			!target.classList.contains(styles.filter_menu_item) &&
			!target.classList.contains(styles.filter_menu) &&
			!target.classList.contains(styles.filter_container) &&
			target.tagName.toLowerCase() !== 'use'
		) {
			setIsOpenSelect(false);
		}
	}, []);

	const handleOpenSelect = ({ target }) => {
		if (!target.classList.contains(styles.filter_menu)) {
			setIsOpenSelect(!isOpenSelect);
		}
	};

	const handleAddBook = async ({ title, author, totalPages }) => {
		const res = await addBookToLibrary(title, author, totalPages);
		if (res === 201) {
			setIsOpenSuccessModal(true);
			const books = await fetchOwnBooks();
			setOwnBooks(books);
		}
	};

	const handleDelete = async id => {
		await deleteBookFromLibrary(id);
		const books = await fetchOwnBooks();
		setOwnBooks(books);
	};

	useEffect(() => {
		fetchRecommendedBooks(1, 3).then(data => {
			data?.totalPages ? setPages(data.totalPages) : setPages(0);
			setBooks(data?.results);
		});
		fetchOwnBooks().then(data => setOwnBooks(data));
	}, []);

	useEffect(() => {
		if (isOpenSuccessModal) {
			fetchOwnBooks().then(data => setOwnBooks(data));
		}
	}, [isOpenSuccessModal]);

	useEffect(() => {
		if (isOpenSelect) {
			window.addEventListener('keydown', handlerOnCloseKeySelect);
			window.addEventListener('click', handlerOnCloseClickSelect);
		}
		return () => {
			window.removeEventListener('keydown', handlerOnCloseKeySelect);
			window.removeEventListener('click', handlerOnCloseClickSelect);
		};
	}, [handlerOnCloseClickSelect, handlerOnCloseKeySelect, isOpenSelect]);

	useEffect(() => {
		const stId = setInterval(() => {
			const newPage = Math.floor(Math.random() * pages) + 1;
			fetchRecommendedBooks(newPage, 3).then(data => {
				setBooks(data?.results);
			});
		}, 15000);
		return () => clearInterval(stId);
	}, [pages]);

	return (
		<ul className={styles.main}>
			<Dashboard>
				<div>
					<p className={styles.title_dashboard}>Filters:</p>
					<Formik
						initialValues={{ title: '', author: '', totalPages: 0 }}
						onSubmit={(value, { setSubmitting, resetForm }) => {
							handleAddBook(value);
							setSubmitting(false);
							resetForm();
						}}
						validationSchema={AddBookSchema}
					>
						{({ isSubmitting, errors, touched }) => (
							<Form autoComplete='off'>
								<ul className={styles.field_container}>
									<li>
										<label
											className={clsx(
												styles.field,
												errors.title && touched.title && styles.field_error,
												!errors.title &&
													touched.title &&
													styles.field_success
											)}
										>
											Book title:
											<Field
												className={styles.field_input}
												name='title'
												type='text'
												placeholder='Enter text'
											/>
											<ErrorMessage
												className={styles.err_message}
												name='title'
												component='span'
											/>
											{errors.title &&
												touched.title &&
												styles.field_error && (
													<Icon
														name={'error'}
														className={styles.icon_status}
													/>
												)}
											{!errors.title &&
												touched.title &&
												styles.field_success && (
													<Icon
														name={'success'}
														className={styles.icon_status}
													/>
												)}
										</label>
									</li>
									<li>
										<label
											className={clsx(
												styles.field,
												errors.author &&
													touched.author &&
													styles.field_error,
												!errors.author &&
													touched.author &&
													styles.field_success
											)}
										>
											The author:
											<Field
												className={styles.field_input}
												name='author'
												type='text'
												placeholder='Enter text'
											/>
											<ErrorMessage
												className={styles.err_message}
												name='author'
												component='span'
											/>
											{errors.author &&
												touched.author &&
												styles.field_error && (
													<Icon
														name={'error'}
														className={styles.icon_status}
													/>
												)}
											{!errors.author &&
												touched.author &&
												styles.field_success && (
													<Icon
														name={'success'}
														className={styles.icon_status}
													/>
												)}
										</label>
									</li>
									<li>
										<label
											className={clsx(
												styles.field,
												errors.totalPages &&
													touched.totalPages &&
													styles.field_error,
												!errors.totalPages &&
													touched.totalPages &&
													styles.field_success
											)}
										>
											Number of pages:
											<Field
												className={styles.field_input}
												name='totalPages'
												type='number'
												placeholder='0'
											/>
											<ErrorMessage
												className={styles.err_message}
												name='totalPages'
												component='span'
											/>
											{errors.totalPages &&
												touched.totalPages &&
												styles.field_error && (
													<Icon
														name={'error'}
														className={styles.icon_status}
													/>
												)}
											{!errors.totalPages &&
												touched.totalPages &&
												styles.field_success && (
													<Icon
														name={'success'}
														className={styles.icon_status}
													/>
												)}
										</label>
									</li>
								</ul>
								<button
									className={styles.button_action}
									type='submit'
									disabled={isSubmitting}
								>
									Add book
								</button>
							</Form>
						)}
					</Formik>
				</div>
				<div className={styles.recomm_book_block}>
					<p className={styles.recomm_book_title}>Recommended books</p>
					<ul className={styles.list_container}>
						{books?.length
							? books?.map(({ _id, imageUrl, title, author }) => (
									<li
										className={styles.book}
										key={_id}
										onClick={() => setBook({ _id, imageUrl, title, author })}
									>
										<img
											className={styles.book_img}
											src={imageUrl}
											alt='book'
										/>
										<p className={styles.book_title}>
											<EllipsisText text={title} length={14} />
										</p>
										<p className={styles.book_author}>{author}</p>
									</li>
							  ))
							: Array.from({ length: 3 }, (_, i) => (
									<li className={styles.book} key={i}>
										<p className={styles.book_img} />
										<p className={styles.book_title_ext} />
										<p className={styles.book_author_ext} />
									</li>
							  ))}
					</ul>
					<ul className={styles.link_container}>
						<li>
							<Link to={'/recommended'} className={styles.link_to}>
								Home
							</Link>
						</li>
						<li className={styles.container_icon_link}>
							<Link to={'/recommended'} className={styles.link_to}>
								<Icon name={'library'} className={styles.icon_link} />
							</Link>
						</li>
					</ul>
				</div>
			</Dashboard>
			<li className={styles.my_library}>
				<div className={styles.my_library_title_box}>
					<p className={styles.my_library_title}>My library</p>
					<div className={styles.filter_container} onClick={handleOpenSelect}>
						{selectedOption}
						<Icon name={'chevron-down'} className={styles.icon_chevron} />
						{isOpenSelect && (
							<ul className={styles.filter_menu}>
								{options.map((i, idx) => (
									<li
										key={idx}
										className={clsx(
											styles.filter_menu_item,
											selectedOption === i && styles.filter_menu_item_ext
										)}
										onClick={() => handleSelect(i)}
									>
										{i}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<ul className={styles.book_container}>
					{ownBooks?.length ? (
						ownBooks
							.filter(
								({ status }) =>
									status === selectedOption.toLowerCase() ||
									selectedOption === 'All books'
							)
							.map(({ _id, imageUrl, title, author, totalPages }) => (
								<li
									className={styles.my_library_book}
									key={_id}
									onClick={() =>
										setBookOwn({ _id, imageUrl, title, author, totalPages })
									}
								>
									{imageUrl ? (
										<img
											className={styles.my_library_book_img}
											src={imageUrl}
											alt='book'
										/>
									) : (
										<p className={styles.my_library_book_img} />
									)}
									<p className={styles.my_library_book_title}>
										<EllipsisText text={title} length={16} />
									</p>
									<p className={styles.my_library_book_author}>{author}</p>
									<button
										type='button'
										className={styles.my_library_icon_trash}
										onClick={() => handleDelete(_id)}
									>
										<Icon name={'trash'} className={styles.icon_trash} />
									</button>
								</li>
							))
					) : (
						<li className={styles.book_container_empty}>
							<p className={styles.book_container_logo}>📚</p>
							<p className={styles.book_container_text}>
								To start training, add{' '}
								<span className={styles.book_container_text_ext}>
									some of your books
								</span>{' '}
								or from the recommended ones
							</p>
						</li>
					)}
				</ul>
			</li>
		</ul>
	);
}

export default LibraryPage;
