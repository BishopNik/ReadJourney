/** @format */

import styled from 'styled-components';
import Modal from 'react-modal';

export const ModalMain = styled(Modal)`
	width: fit-content;
	height: fit-content;
	border-radius: 8px;
	border: none;
	outline: none;
	overflow: hidden;
`;

export const customStyles = {
	overlay: {
		position: 'absolute',
		backgroundColor: 'rgba(78, 74, 72, 0.6)',
		zIndex: '999',
	},
	content: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		padding: 0,
		borderRadius: 5,
		border: 'none',
		backgroundColor: '#151515',
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
	},
};
