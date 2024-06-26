/** @format */

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import clsx from 'clsx';
// import moment from 'moment';
import Icon from 'components/Icon';
import styles from '../styles/reading.module.css';
import Dashboard from 'components/Dashboard';
import Diary from 'components/Diary';
import Statictics from 'components/Statistics';
import {
	fetchBook,
	startReadingBook,
	stopReadingBook,
	deleteReadingOfBook,
	StartStopSchema,
	MainContext,
} from 'helpers';

function ReadingPage() {
	const { setIsOpenFullReadModal } = useContext(MainContext);
	const { id } = useParams();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [activeSection, setActiveSection] = useState('diary');
	const [isLoading, setIsLoading] = useState(null);
	const [isReadBook, setIsReadBook] = useState(null);
	const [book, setBook] = useState(null);
	const [page, setPage] = useState(0);
	const [errorPageCount, setErrorPageCount] = useState(false);
	const [statusReading, setStatusReading] = useState(false);
	const [isTouch, setIsTouch] = useState(false);

	// const totalReadTime = book?.progress.reduce((totalReadTime, process) => {
	// 	if (process?.finishPage && process?.startPage) {
	// 		const timeRead = moment(process.finishReading).diff(process.startReading, 'seconds');
	// 		totalReadTime += timeRead;
	// 		return totalReadTime;
	// 	}
	// 	return totalReadTime;
	// }, 0);
	// const duration = moment.duration(totalReadTime, 'seconds');
	// const hours = duration.hours();
	// const minutes = duration.minutes();

	const actionReadBook = () => {
		setIsSubmitting(true);
		if (!statusReading) {
			startReadingBook(book._id, page)
				.then(data => {
					if (data) {
						setBook(data);
						setStatusReading(!statusReading);
						setIsSubmitting(false);
					}
				})
				.finally(() => setIsSubmitting(false));
		} else {
			stopReadingBook(book._id, page)
				.then(data => {
					if (data) {
						setBook(data);
						setStatusReading(!statusReading);
					}
				})
				.finally(() => setIsSubmitting(false));
		}
	};

	const fetchingData = useCallback(async () => {
		setIsLoading(true);
		const data = await fetchBook(id);
		if (data) {
			setBook(data);
			if (data.progress.length && !data.progress[data.progress.length - 1].finishPage) {
				setStatusReading(true);
			}
			if (data.progress.length) {
				if (data.progress[data.progress.length - 1]?.finishPage) {
					setPage(data.progress[data.progress.length - 1].finishPage);
				} else if (data.progress[data.progress.length - 2]?.finishPage) {
					setPage(data.progress[data.progress.length - 2].finishPage);
				}
			}
		}
		setIsLoading(false);
	}, [id]);

	const handlerDeleteReading = async idReading => {
		const res = await deleteReadingOfBook(book._id, idReading);
		if (res === 200) {
			fetchingData();
		}
	};

	const validateField = useCallback(
		value => {
			if (Number(value) > book.totalPages) {
				setErrorPageCount('There is no such page in the book');
			} else {
				StartStopSchema.validate({ page: Number(value) })
					.then(() => setErrorPageCount(null))
					.catch(errors => setErrorPageCount(errors.message));
			}
		},
		[book]
	);

	useEffect(() => {
		if (!book) return;
		validateField(page);
	}, [book, page, validateField]);

	useEffect(() => {
		fetchingData();
		return () => setBook(null);
	}, [fetchingData]);

	useEffect(() => {
		if (!book) return;
		if (
			!statusReading &&
			book.progress[book.progress.length - 1]?.finishPage >= book.totalPages
		) {
			setIsOpenFullReadModal(true);
			setIsReadBook(true);
		} else {
			setIsReadBook(false);
		}
	}, [book, setIsOpenFullReadModal, statusReading]);

	return (
		<ul className={styles.main}>
			<Dashboard style={styles.dashboard_container}>
				<div>
					<p className={styles.title_dashboard}>
						{statusReading ? 'Stop' : 'Start'} page:
					</p>
					<Formik
						initialValues={{ page: page }}
						onSubmit={_ => {
							if (errorPageCount) return;
							actionReadBook();
						}}
					>
						<Form autoComplete='off'>
							<label
								className={clsx(
									styles.field,
									!isReadBook && isReadBook !== null && isTouch
										? errorPageCount
											? styles.field_error
											: styles.field_success
										: null
								)}
							>
								Page number:
								<Field
									className={styles.field_input}
									value={page}
									name='page'
									type='number'
									placeholder='0'
									disabled={isReadBook}
									onBlur={() => setIsTouch(true)}
									onChange={({ target }) => {
										validateField(target.value);
										setPage(Number(target.value));
									}}
								/>
								{!isReadBook && errorPageCount && isTouch && (
									<span className={styles.err_message}>{errorPageCount}</span>
								)}
								{!isReadBook && isReadBook !== null && isTouch ? (
									errorPageCount ? (
										<Icon name={'error'} className={styles.icon_status} />
									) : (
										<Icon name={'success'} className={styles.icon_status} />
									)
								) : null}
							</label>
							<button
								className={styles.button_action}
								type='submit'
								disabled={isSubmitting || isReadBook}
							>
								{statusReading ? 'To stop' : 'To start'}
							</button>
						</Form>
					</Formik>
				</div>
				{book?.progress.length && book.progress[book.progress.length - 1]?.finishPage ? (
					<div className={styles.statistics_container}>
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
						{activeSection === 'statistics' && (
							<>
								<p className={styles.statistics_text}>
									Each page, each chapter is a new round of knowledge, a new step
									towards understanding. By rewriting statistics, we create our
									own reading history.
								</p>
							</>
						)}
						<div
							className={clsx(
								styles.statistics_data,
								activeSection === 'diary' && styles.statistics_data_ext
							)}
						>
							{activeSection === 'diary' ? (
								<Diary
									progress={book.progress}
									totalPages={book.totalPages}
									deleteReadingOfBook={handlerDeleteReading}
								/>
							) : (
								<Statictics progress={book.progress} totalPages={book.totalPages} />
							)}
						</div>
					</div>
				) : (
					isLoading === false && (
						<div>
							<p className={styles.progress_title}>Progress</p>

							<p className={styles.progress_text}>
								Here you will see when and how much you read. To record, click on
								the red button above.
							</p>
							<p className={styles.progress_container_logo}>🌟</p>
						</div>
					)
				)}
			</Dashboard>

			{book && (
				<li className={styles.read_book}>
					<ul className={styles.read_book_title_container}>
						<li>
							<p className={styles.read_book_title}>My reading</p>
						</li>
						{!statusReading && (
							<li>
								<p className={styles.read_book_time}>
									{book?.timeLeftToRead?.hours
										? `${book.timeLeftToRead.hours} hours and`
										: null}{' '}
									{book.timeLeftToRead?.minutes
										? `${book.timeLeftToRead?.minutes} minutes left`
										: null}
								</p>
							</li>
						)}
					</ul>
					<ul className={styles.book} key={book?._id}>
						<li className={styles.book_img_box}>
							{book.imageUrl ? (
								<img className={styles.book_img} src={book.imageUrl} alt='book' />
							) : (
								<p className={styles.book_img} />
							)}
						</li>
						<li className={styles.book_title_box}>
							<p className={styles.book_title}>{book.title}</p>
						</li>
						<li className={styles.book_author_box}>
							<p className={styles.book_author}>{book.author}</p>
						</li>
					</ul>
					<button
						className={styles.book_action_read}
						type='button'
						onClick={actionReadBook}
						disabled={isSubmitting || isReadBook}
					>
						<div
							className={clsx(
								styles.book_action_read_icon,
								!statusReading ? styles.start_btn : styles.stop_btn
							)}
						></div>
					</button>
				</li>
			)}
		</ul>
	);
}

export default ReadingPage;
