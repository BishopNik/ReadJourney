/** @format */

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/Icon';
import ModalWindow from '../Modal';
import styles from './bookmodal.module.css';
import { MainContext, addBookToLibraryById, toastError } from 'helpers';

function BookModal() {
	const navigation = useNavigate();
	const { book, setBook, bookOwn, setBookOwn, setIsOpenSuccessModal } = useContext(MainContext);
	const isOpen = book !== null || bookOwn !== null;
	const element = bookOwn ? bookOwn : book;

	const onRequestClose = () => (book ? setBook(null) : setBookOwn(null));

	const handlerAddToLibrary = async () => {
		const data = await addBookToLibraryById(element._id);
		if (data._id) {
			onRequestClose();
			setIsOpenSuccessModal(true);
		} else toastError('Book not added to library...');
	};

	const handlerStartReadBook = async () => {
		navigation(`/read/${element._id}`);
		onRequestClose();
	};

	return (
		<ModalWindow classModal={styles.main} isOpen={isOpen} onRequestClose={onRequestClose}>
			{element && (
				<>
					<button type='button' className={styles.menu_close} onClick={onRequestClose}>
						<Icon name={'close_burger'} className={styles.icon_menu} />
					</button>
					<ul className={styles.book}>
						<li className={styles.book_img_box}>
							{element.imageUrl ? (
								<img
									className={styles.book_img}
									src={element.imageUrl}
									alt='book'
								/>
							) : (
								<p className={styles.book_img} />
							)}
						</li>
						<li className={styles.book_title_box}>
							<p className={styles.book_title}>{element.title}</p>
						</li>
						<li className={styles.book_author_box}>
							<p className={styles.book_author}>{element.author}</p>
						</li>
						<li className={styles.total_page_box}>
							<p className={styles.total_page}>{element.totalPages} pages</p>
						</li>
						<button
							className={styles.button_add}
							type='button'
							onClick={book ? handlerAddToLibrary : handlerStartReadBook}
						>
							{book ? 'Add to library' : 'Start reading'}
						</button>
					</ul>
				</>
			)}
		</ModalWindow>
	);
}

export default BookModal;
