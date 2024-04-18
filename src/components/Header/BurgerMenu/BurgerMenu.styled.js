/** @format */

import styled from 'styled-components';
import Icon from 'components/Icon';

export const Button = styled.button`
	z-index: 999;
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	border: none;
	outline: none;
	background-color: transparent;
	cursor: pointer;

	@media screen and (min-width: 1440px) {
		opacity: 0;
	}
`;

export const IconMenu = styled(Icon)`
	width: 32px;
	height: 32px;
	stroke: ${props => props.theme.header.menuIcon};
	fill: transparent;
`;
