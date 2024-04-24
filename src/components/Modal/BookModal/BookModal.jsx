/** @format */

import React, { useContext } from 'react';
import EllipsisText from 'react-ellipsis-text';
import Icon from 'components/Icon';
import ModalWindow from '../Modal';
import styles from './bookmodal.module.css';
import { MainContext, addBookToLibraryById, toastError } from 'helpers';

function BookModal() {
	const { book, setBook, setIsOpenSuccessModal } = useContext(MainContext);
	const isOpen = book !== null;

	const onRequestClose = () => setBook(null);

	const handlerAddToLibrary = async () => {
		const data = await addBookToLibraryById(book._id);
		if (data._id) {
			onRequestClose();
			setIsOpenSuccessModal(true);
		} else toastError('Book not added to library...');
	};

	return (
		<ModalWindow classModal={styles.main} isOpen={isOpen} onRequestClose={onRequestClose}>
			{book && (
				<>
					<button
						type='button'
						className={styles.menu_close}
						onClick={() => setBook(null)}
					>
						<Icon name={'close_burger'} className={styles.icon_menu} />
					</button>
					<ul className={styles.book}>
						<li className={styles.book_img_box}>
							<img className={styles.book_img} src={book.imageUrl} alt='book' />
						</li>
						<li className={styles.book_title_box}>
							<p className={styles.book_title}>
								<EllipsisText text={book.title} length={19} />
							</p>
						</li>
						<li className={styles.book_author_box}>
							<p className={styles.book_author}>{book.author}</p>
						</li>
						<li className={styles.total_page_box}>
							<p className={styles.total_page}>{book.totalPages} pages</p>
						</li>
						<button
							className={styles.button_add}
							type='button'
							onClick={handlerAddToLibrary}
						>
							Add to library
						</button>
					</ul>
				</>
			)}
		</ModalWindow>
	);
}

export default BookModal;
