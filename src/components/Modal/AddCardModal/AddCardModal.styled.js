/** @format */

import styled from 'styled-components';
import Icon from 'components/Icon';
import { Field, ErrorMessage } from 'formik';

export const ModalContainer = styled.div`
	position: relative;
	outline: none;
	background: ${props => props.theme.modal.backgroundMain};
	color: ${props => props.theme.help.modalTextMain};
	padding: 24px;
	border-radius: 8px solid rgba(17, 17, 17, 0.1);
	min-width: 320px;
	@media (max-width: 767px) {
		width: 335px;
	}
	@media (min-width: 768px) {
		width: 350px;
	}
	margin: 0 auto;
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 14px;
	right: 14px;
	width: 18px;
	height: 18px;
	background: ${props => props.theme.modal.backgroundSecondary};
	border: none;
	cursor: pointer;
`;

export const IconClose = styled(Icon)`
	position: absolute;
	transform: translate(-50%, -50%);
	width: 16px;
	height: 16px;
	cursor: pointer;
	stroke: ${props => props.theme.modal.iconClose};
	transition: stroke 250ms cubic-bezier(0.4, 0, 0.2, 1);
	&:hover {
		stroke: ${props => props.theme.sidebar.hoverLogout};
	}
	&:focus {
		stroke: ${props => props.theme.sidebar.hoverLogout};
	}
`;

export const FormTitle = styled.h2`
	color: ${props => props.theme.modal.textMain};
	font-family: Poppins;
	font-size: 18px;
	font-weight: 500;
	line-height: 27px;
	margin: 0px;
	cursor: default;
`;

export const SubTitles = styled.h3`
	color: ${props => props.theme.modal.textSecondary};
	font-family: Poppins;
	font-size: 12px;
	font-weight: 400;
	line-height: 18px;
	margin: 0;
	cursor: default;
`;

export const StyledInput = styled(Field)`
	width: 100%;
	color: ${props => props.theme.profile.textMain};
	padding: 14px 18px;
	margin: 24px 0 14px 0;
	border: 1px solid ${props => props.theme.profile.inputBorder};
	border-radius: 8px;
	outline: none;
	box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.08);
	background: ${props => props.theme.modal.backgroundSecondary};
	opacity: 0.4;

	&:hover {
		opacity: 1;

		color: ${props => props.theme.modal.textMain};

		&:focus {
			border-color: ${props => props.theme.modal.textAccent};
		}

		::placeholder {
			color: ${props => props.theme.modal.textSecondary};
		}
	}
`;

export const TextArea = styled.textarea`
	width: 100%;
	color: ${props => props.theme.profile.textMain};
	height: 154px;
	padding: 14px 18px;
	margin-bottom: 24px;
	outline: none;
	border: 1px solid ${props => props.theme.profile.inputBorder};
	border-radius: 8px;
	box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.08);
	background: ${props => props.theme.modal.backgroundSecondary};
	opacity: 0.4;

	&:hover {
		opacity: 1;

		color: ${props => props.theme.modal.textMain};

		&:focus {
			border-color: ${props => props.theme.modal.textAccent};
		}

		::placeholder {
			color: ${props => props.theme.modal.textSecondary};
		}
	}
`;

export const RadioButtonContainer = styled.div`
	display: flex;
	gap: 8px;
	margin-bottom: 14px;
	margin-top: 4px;
`;

export const RadioButton = styled.div`
	position: relative;
`;

export const Input = styled.input`
	position: absolute;
	-webkit-appearance: none;
	appearance: none;
`;

export const Label = styled.label`
	padding-left: 15px;
	cursor: pointer;

	&::before {
		content: '';
		display: block;
		width: 14px;
		height: 14px;
		border: 1px solid;
		${({ color }) => `border-color: ${color};`}
		${({ color }) => `background-color: ${color};`}
    border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		transition: background-color 0.2s ease;
	}

	&::after {
		content: '';
		display: block;
		width: 8px;
		height: 8px;
		${({ color }) => `background-color: ${color};`}

		border-radius: 50%;
		position: absolute;
		top: 3px;
		left: 3px;
		z-index: 2;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	${Input}:checked + &::after {
		opacity: 1;
	}

	${Input}:checked + &::before {
		background-color: transparent;
	}
`;

export const AddButton = styled.button`
	background-color: ${props => props.theme.help.buttonBackground};
	color: ${props => props.theme.addcolum.buttonBackground};
	padding: 10px 0 10px 0;
	border: none;
	border-radius: 8px;
	width: 100%;
	min-height: 49px;
	border-radius: 8px solid rgba(17, 17, 17, 0.1);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 40px;

	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 21px;

	&::before {
		content: '+';
		display: block;
		width: 28px;
		height: 28px;
		background-color: ${props => props.theme.sidebar.addButtonColor};
		border-radius: 8px;
		color: ${props => props.theme.modal.plusColor};
		font-size: 20px;
		text-align: center;
		line-height: 28px;
		margin-right: 10px;
	}

	&:hover {
		background-color: ${props => props.theme.sidebar.hoverLogout};
	}

	&:focus {
		background-color: ${props => props.theme.sidebar.hoverLogout};
		outline: none;
	}
`;

export const IconDown = styled(Icon)`
	width: 18px;
	height: 18px;
	stroke: ${props => props.theme.help.buttonBackground};
	position: absolute;
	top: 0;
	left: 115px;
	cursor: pointer;
`;

export const DataContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 4px;
`;

export const ErrorMsg = styled(ErrorMessage)`
	position: absolute;
	top: 0;
	left: 40%;
	opacity: 0.8;
	border: 1px solid gray;
	border-radius: 10px;
	padding: 10px;
	background-color: white;
	color: black;
	font-size: 10px;
	font-weight: normal;
	letter-spacing: 0.04em;
	line-height: 1.45;
`;

export const FieldContainer = styled.div`
	position: relative;
`;
