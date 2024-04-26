/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import Icon from 'components/Icon';
import styles from '../styles/reading.module.css';
import Dashboard from 'components/Dashboard';
import Diary from 'components/Diary';
import Statictics from 'components/Statistics';
import {
	fetchBook,
	startReadingBook,
	stopReadingBook,
	StartStopSchema,
	MainContext,
} from 'helpers';

function ReadingPage() {
	const { setIsOpenFullReadModal } = useContext(MainContext);
	const { id } = useParams();
	const [activeSection, setActiveSection] = useState('diary');
	const [isLoading, setIsLoading] = useState(null);
	const [book, setBook] = useState(null);
	const [page, setPage] = useState(0);
	const [statusReading, setStatusReading] = useState(false);

	const actionReadBook = () => {
		if (!statusReading) {
			startReadingBook(book._id, page).then(data => {
				setBook(data);
				data && setStatusReading(!statusReading);
			});
		} else {
			stopReadingBook(book._id, page).then(data => {
				setBook(data);
				data && setStatusReading(!statusReading);
			});
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchBook(id).then(data => {
			setBook(data);
			setIsLoading(false);
		});
		return () => setBook(null);
	}, [id]);

	useEffect(() => {
		if (
			book &&
			!statusReading &&
			book.progress[book.progress.length - 1]?.finishPage === book.totalPages
		) {
			setIsOpenFullReadModal(true);
		}
	}, [book, setIsOpenFullReadModal, statusReading]);

	return (
		<ul className={styles.main}>
			<Dashboard>
				<p className={styles.title_dashboard}>Start page:</p>
				<Formik
					initialValues={{ page: page }}
					onSubmit={({ setSubmitting }) => {
						setSubmitting(false);
						actionReadBook();
					}}
					validationSchema={StartStopSchema}
				>
					{({ isSubmitting, touched, errors }) => (
						<Form autoComplete='off'>
							<label
								className={clsx(
									styles.field,
									errors.page && touched.page && styles.field_error,
									!errors.page && touched.page && styles.field_success
								)}
							>
								Page number:
								<Field
									className={styles.field_input}
									value={page}
									name='page'
									type='number'
									placeholder='0'
									onChange={({ target }) => setPage(parseInt(target.value))}
								/>
								<ErrorMessage
									className={styles.err_message}
									name='page'
									component='span'
								/>
								{errors.page && touched.page && styles.field_error && (
									<Icon name={'error'} className={styles.icon_status} />
								)}
								{!errors.page && touched.page && styles.field_success && (
									<Icon name={'success'} className={styles.icon_status} />
								)}
							</label>
							<button
								className={styles.button_action}
								type='submit'
								disabled={isSubmitting}
							>
								{statusReading ? 'To stop' : 'To start'}
							</button>
						</Form>
					)}
				</Formik>
				{book?.progress.length ? (
					<>
						<div className={styles.statistics_block}>
							<p className={styles.statistics_title}>
								{activeSection === 'diary' ? 'Diary' : 'Statistics'}
							</p>
							<ul className={styles.statistics_btns}>
								<li>
									<button
										className={styles.button_statistics}
										type='button'
										onClick={() => setActiveSection('diary')}
									>
										<Icon
											name={'hourglass'}
											className={clsx(
												styles.icon_statistics,
												activeSection === 'diary' &&
													styles.icon_statistics_ext
											)}
										/>
									</button>
								</li>
								<li>
									<button
										className={styles.button_statistics}
										type='button'
										onClick={() => setActiveSection('statistics')}
									>
										<Icon
											name={'piechart'}
											className={clsx(
												styles.icon_statistics,
												activeSection === 'statistics' &&
													styles.icon_statistics_ext
											)}
										/>
									</button>
								</li>
							</ul>
						</div>
						<div className={styles.statistics_data}>
							{activeSection === 'diary' ? (
								<Diary progress={book.progress} />
							) : (
								<Statictics progress={book.progress} totalPages={book.totalPages} />
							)}
						</div>
					</>
				) : (
					isLoading === false && (
						<>
							<p className={styles.progress_title}>Progress</p>

							<p className={styles.progress_text}>
								Here you will see when and how much you read. To record, click on
								the red button above.
							</p>
							<p className={styles.progress_container_logo}>🌟</p>
						</>
					)
				)}
			</Dashboard>

			<li className={styles.read_book}>
				<p className={styles.read_book_title}>My reading</p>
				<ul className={styles.book} key={book?._id}>
					<li className={styles.book_img_box}>
						{book ? (
							<img className={styles.book_img} src={book.imageUrl} alt='book' />
						) : (
							<p className={styles.book_img} />
						)}
					</li>
					<li className={styles.book_title_box}>
						<p className={styles.book_title}>{book && book.title}</p>
					</li>
					<li className={styles.book_author_box}>
						<p className={styles.book_author}>{book && book.author}</p>
					</li>
				</ul>
				<button className={styles.book_action_read} type='button' onClick={actionReadBook}>
					<div
						className={clsx(
							styles.book_action_read_icon,
							!statusReading ? styles.start_btn : styles.stop_btn
						)}
					></div>
				</button>
			</li>
		</ul>
	);
}

export default ReadingPage;
