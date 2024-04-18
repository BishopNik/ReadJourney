/** @format */

import toast from 'react-hot-toast';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Message = styled.span`
	display: flex;
	align-items: center;
`;

const ButtonClose = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	padding: 2px;
	background-color: transparent;
	border: 0.5px solid black;
	border-radius: 6px;
	cursor: pointer;
	font-size: 14px;
`;

const IconClose = styled(Icon)`
	width: 16px;
	height: 16px;
	cursor: pointer;
	stroke: black;
	transition: stroke 250ms cubic-bezier(0.4, 0, 0.2, 1);
	&:hover {
		stroke: ${props => props.theme.sidebar.hoverLogout};
	}
	&:focus {
		stroke: ${props => props.theme.sidebar.hoverLogout};
	}
`;

export function toastError(mes) {
	toast(
		t => (
			<Message>
				{mes}
				<ButtonClose onClick={() => toast.dismiss(t.id)}>
					<IconClose name='close' />
				</ButtonClose>
			</Message>
		),
		{
			icon: '❌',
			duration: 4000,
		}
	);
}

export function toastSuccess(mes) {
	toast(
		t => (
			<Message>
				{mes}
				<ButtonClose onClick={() => toast.dismiss(t.id)}>
					<IconClose name='close' />
				</ButtonClose>
			</Message>
		),
		{
			icon: '✅',
			duration: 2000,
		}
	);
}
