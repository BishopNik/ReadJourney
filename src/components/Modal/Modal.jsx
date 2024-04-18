/** @format */

import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { ModalMain } from './Modal.styled';
import { MainContext } from 'helpers';

Modal.setAppElement('#modal-root');

const ModalWindow = ({ children, isOpen, onRequestClose, style }) => {
	const { setIsOpenSidebar } = useContext(MainContext);

	useEffect(() => {
		if (isOpen) {
			setIsOpenSidebar(false);
		}
	}, [isOpen, setIsOpenSidebar]);

	return (
		<ModalMain
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={style}
			contentLabel='onRequestClose'
		>
			{children}
		</ModalMain>
	);
};

export default ModalWindow;
