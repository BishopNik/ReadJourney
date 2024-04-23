/** @format */

import React, { useContext, useEffect, useCallback, useState } from 'react';
import Icon from 'components/Icon';
import ModalWindow from '../Modal';
import { MainContext } from 'helpers';
import styles from './successmodal.module.css';

function SuccessModal() {
	const { isOpenSuccessModal, setIsOpenSuccessModal } = useContext(MainContext);
	const [timeForClose, setTimeForClose] = useState(5);

	const onRequestClose = useCallback(() => setIsOpenSuccessModal(false), [setIsOpenSuccessModal]);

	useEffect(() => {
		if (!isOpenSuccessModal) return;
		const timeoutId = setTimeout(() => onRequestClose(), 5000);
		const timerId = setInterval(() => {
			setTimeForClose(prevTime => prevTime - 1);
		}, 1000);
		return () => {
			clearTimeout(timeoutId);
			clearTimeout(timerId);
			setTimeForClose(5);
		};
	}, [isOpenSuccessModal, onRequestClose]);

	return (
		<ModalWindow
			classModal={styles.main}
			isOpen={isOpenSuccessModal}
			onRequestClose={onRequestClose}
		>
			<button type='button' className={styles.menu_close} onClick={onRequestClose}>
				<Icon name={'close_burger'} className={styles.icon_menu} />
				<span className={styles.num_menu}>{timeForClose}</span>
			</button>
			<ul className={styles.content}>
				<li className={styles.content_icon_box}>
					<p className={styles.content_icon}>👍</p>
				</li>
				<li className={styles.content_title_box}>
					<p className={styles.content_title}>Good job</p>
				</li>
				<li className={styles.content_text_box}>
					<p className={styles.content_text}>
						Your book is now in{' '}
						<span className={styles.content_text_ext}>the library!</span> The joy knows
						no bounds and now you can start your training
					</p>
				</li>
			</ul>
		</ModalWindow>
	);
}

export default SuccessModal;
