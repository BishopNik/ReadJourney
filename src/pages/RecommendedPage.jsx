/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import clsx from 'clsx';
import EllipsisText from 'react-ellipsis-text';
import Icon from 'components/Icon';
import styles from '../styles/recommended.module.css';
import Dashboard from 'components/Dashboard';
import { MainContext, fetchRecommendedBooks } from 'helpers';
import Loader from 'components/Loader';

function RecommendedPage() {
	const { setBook } = useContext(MainContext);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(0);
	const [perPage, setPerPage] = useState(2);
	const [books, setBooks] = useState([]);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');

	const handleResize = () => {
		if (window.innerWidth < 768) {
			setPerPage(2);
		} else if (window.innerWidth < 1280) {
			setPerPage(8);
		} else {
			// setPerPage(10);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		setIsLoading(true);
		setBooks([]);
		fetchRecommendedBooks(page, perPage, title, author)
			.then(data => {
				data?.totalPages ? setPages(data.totalPages) : setPages(0);
				setBooks(data?.results);
			})
			.finally(() => setIsLoading(false));
	}, [page, perPage, author, title]);

	return (
		<ul className={styles.main}>
			<Dashboard>
				<div>
					<p className={styles.title_dashboard}>Filters:</p>
					<Formik
						initialValues={{ title: '', author: '' }}
						onSubmit={({ title, author }, { setSubmitting }) => {
							setTitle(title);
							setAuthor(author);
							setSubmitting(false);
						}}
						onReset={() => {
							setTitle('');
							setAuthor('');
						}}
					>
						{({ isSubmitting }) => (
							<Form autoComplete='off'>
								<ul className={styles.field_container}>
									<li>
										<label className={styles.field}>
											Book title:
											<Field
												className={styles.field_input}
												name='title'
												type='text'
												placeholder='Enter text'
											/>
										</label>
									</li>
									<li>
										<label className={styles.field}>
											The author:
											<Field
												className={styles.field_input}
												name='author'
												type='text'
												placeholder='Enter text'
											/>
										</label>
									</li>
								</ul>
								<ul className={styles.container_button_action}>
									<li>
										<button
											className={styles.button_action}
											type='submit'
											disabled={isSubmitting}
										>
											To apply
										</button>
									</li>
									<li>
										<button
											className={styles.button_action}
											type='reset'
											disabled={isSubmitting}
										>
											Clear
										</button>
									</li>
								</ul>
							</Form>
						)}
					</Formik>
				</div>
				<div className={styles.library_block}>
					<p className={styles.library_title}>Start your workout</p>
					<ul className={styles.list_container}>
						<li className={styles.list_container_item}>
							<div className={styles.num_item}>1</div>
							<p className={styles.text_item}>
								<span className={styles.text_item_ext}>
									Create a personal library:
								</span>
								<span>
									{' '}
									add the books you intend to read <br />
									to it.
								</span>
							</p>
						</li>
						<li className={styles.list_container_item}>
							<div className={styles.num_item}>2</div>
							<p className={styles.text_item}>
								<span className={styles.text_item_ext}>
									Create your first workout:
								</span>
								<span> define a goal, choose a period, start training.</span>
							</p>
						</li>
					</ul>
					<ul className={styles.link_container}>
						<li>
							<Link to={'/library'} className={styles.link_to}>
								My library
							</Link>
						</li>
						<li className={styles.container_icon_link}>
							<Link to={'/library'} className={styles.link_to}>
								<Icon name={'library'} className={styles.icon_link} />
							</Link>
						</li>
					</ul>
				</div>
			</Dashboard>
			<li className={styles.recomm_book}>
				{isLoading && <Loader />}
				<div className={styles.title_recom_container}>
					<p className={styles.title_recom}>Recommended</p>
					<ul className={styles.button_nav_container}>
						<li>
							<button
								className={styles.button_nav}
								type='button'
								onClick={() => {
									if (page <= 1) {
										return;
									}
									setPage(page - 1);
								}}
								disabled={page <= 1}
							>
								<Icon
									name={'nav_left'}
									className={clsx(styles.icon_nav, page === 1 && styles.icon_ext)}
								/>
							</button>
						</li>
						<li>
							<button
								className={styles.button_nav}
								type='button'
								onClick={() => {
									if (page >= pages) {
										return;
									}
									setPage(page + 1);
								}}
								disabled={page >= pages}
							>
								<Icon
									name={'nav_rigth'}
									className={clsx(
										styles.icon_nav,
										page >= pages && styles.icon_ext
									)}
								/>
							</button>
						</li>
					</ul>
				</div>
				<ul className={styles.book_container}>
					{books?.length
						? books.map(book => (
								<li
									className={styles.book}
									key={book._id}
									onClick={() => setBook(book)}
								>
									<img
										className={styles.book_img}
										src={book.imageUrl}
										alt='book'
									/>
									<p className={styles.book_title}>
										<EllipsisText text={book.title} length={19} />
									</p>
									<p className={styles.book_author}>{book.author}</p>
								</li>
						  ))
						: Array.from({ length: 2 }, (_, i) => (
								<li className={styles.book} key={i}>
									<p className={styles.book_img} />
									<p className={styles.book_title_ext} />
									<p className={styles.book_author_ext} />
								</li>
						  ))}
				</ul>
			</li>
		</ul>
	);
}

export default RecommendedPage;
