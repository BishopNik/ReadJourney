/** @format */

import styled from 'styled-components';

export const LoaderBox = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 200px;
	height: 200px;
	padding: 10px;
	top: 30%;
	left: 50%;
	transform: translate(-50%);
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
`;

export const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
`;
