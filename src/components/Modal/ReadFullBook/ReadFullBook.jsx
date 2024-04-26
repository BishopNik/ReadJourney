/** @format */

import React, { useContext, useEffect, useCallback, useState } from 'react';
import Icon from 'components/Icon';
import ModalWindow from '../Modal';
import { MainContext } from 'helpers';
import styles from './readfullbook.module.css';

function ReadFullBook() {
	const { isOpenFullReadModal, setIsOpenFullReadModal } = useContext(MainContext);
	const [timeForClose, setTimeForClose] = useState(5);

	const onRequestClose = useCallback(
		() => setIsOpenFullReadModal(false),
		[setIsOpenFullReadModal]
	);

	useEffect(() => {
		if (!isOpenFullReadModal) return;
		const timeoutId = setTimeout(() => onRequestClose(), 5000);
		const timerId = setInterval(() => {
			setTimeForClose(prevTime => prevTime - 1);
		}, 1000);
		return () => {
			clearTimeout(timeoutId);
			clearTimeout(timerId);
			setTimeForClose(5);
		};
	}, [isOpenFullReadModal, onRequestClose]);

	return (
		<ModalWindow
			classModal={styles.main}
			isOpen={isOpenFullReadModal}
			onRequestClose={onRequestClose}
		>
			<button type='button' className={styles.menu_close} onClick={onRequestClose}>
				<Icon name={'close_burger'} className={styles.icon_menu} />
				<span className={styles.num_menu}>{timeForClose}</span>
			</button>
			<ul className={styles.content}>
				<li className={styles.content_icon_box}>
					<p className={styles.content_icon}>📚</p>
				</li>
				<li className={styles.content_title_box}>
					<p className={styles.content_title}>The book is read</p>
				</li>
				<li className={styles.content_text_box}>
					<p className={styles.content_text}>
						It was an <span className={styles.content_text_ext}>exciting journey</span>,
						where each page revealed new horizons, and the characters became inseparable
						friends.
					</p>
				</li>
			</ul>
		</ModalWindow>
	);
}

export default ReadFullBook;
