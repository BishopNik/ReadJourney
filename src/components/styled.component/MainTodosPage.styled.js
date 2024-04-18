/** @format */

import styled from 'styled-components';

export const Container = styled.div`
	margin-left: auto;
	margin-right: auto;

	display: grid;
	grid-template-columns: 1fr;
	grid-template-areas:
		'h'
		'm';

	@media screen and (min-width: 375px) {
		max-width: 100vw;
	}

	@media screen and (min-width: 768px) {
		width: 768px;
	}

	@media screen and (min-width: 1440px) {
		display: grid;
		grid-template-columns: 260px auto;
		grid-template-areas:
			's h'
			's m';
		width: 100vw;
	}
`;

export const SideBar = styled.aside`
	grid-area: s;
	width: 225px;
	height: 100vh;
	min-height: 770px;
	background-color: ${props => props.theme.sidebar.background};
	display: flex;
	flex-direction: column;

	@media screen and (min-width: 768px) {
		width: 260px;
	}

	@media screen and (max-width: 1439px) {
		position: absolute;
		z-index: 9999;
	}
`;

export const Header = styled.header`
	grid-area: h;
	min-width: 320px;
	height: 60px;

	@media screen and (min-width: 768px) {
		height: 68px;
	}
`;

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	position: relative;
	grid-area: m;
	background-size: cover;
	background-position: center;
	min-width: 320px;
	height: calc(100vh - 60px);
	padding-top: 14px;
	padding-bottom: 24px;
	gap: 39px;

	@media screen and (min-width: 375px) {
		min-height: 702px;
	}

	@media screen and (min-width: 768px) {
		max-height: calc(100vh - 68px);
		padding-top: 26px;
		padding-bottom: 32px;
		gap: 26px;
		background-size: cover;
		background-position: center;
	}

	@media screen and (min-width: 1440px) {
		padding-top: 10px;
		padding-bottom: 8px;
		gap: 10px;

		background-size: cover;
	}
`;
