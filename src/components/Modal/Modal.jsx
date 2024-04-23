/** @format */

import React, { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: ' rgba(20, 20, 20, 0.6)',
		zIndex: 999,
		overflow: 'auto',
	},
	content: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		padding: 0,
		outline: 'none',
		overflow: 'hidden',
	},
};

const ModalWindow = ({ children, classModal, isOpen, onRequestClose }) => {
	useEffect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return (
		<Modal
			className={classModal}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
			contentLabel='onRequestClose'
		>
			{children}
		</Modal>
	);
};

export default ModalWindow;
