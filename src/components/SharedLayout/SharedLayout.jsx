/** @format */

import { Suspense, useContext, useEffect, useState, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import { Container, Main, SideBar, Header } from 'components/styled.component/MainTodosPage.styled';
import { MainContext } from 'helpers';
import { StyleSheetManager } from 'styled-components';
import { HeaderComponent } from 'components/Header';
import { useAuth, useBoards, useCards, useColumns } from 'hooks';

const SharedLayout = () => {
	const { allBoards, statusLoading } = useBoards();
	const { board } = useParams();
	const { isLoggedIn } = useAuth();
	const { statusCard } = useCards();
	const { statusColumn } = useColumns();
	const selectedBoard = allBoards.find(item => item._id === board);

	const { isOpenSidebar, setIsOpenSidebar } = useContext(MainContext);

	const [status, setStatus] = useState(false);
	const sidebarRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			setStatus(isOpenSidebar || window.innerWidth > 1439);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isOpenSidebar]);

	useEffect(() => {
		if (window.innerWidth > 1439) return;
		const handlerOnCloseWindow = ({ target }) => {
			if (sidebarRef.current && !sidebarRef.current.contains(target)) {
				setIsOpenSidebar(false);
			}
		};

		window.addEventListener('click', handlerOnCloseWindow);

		return () => {
			window.removeEventListener('click', handlerOnCloseWindow);
		};
	}, [setIsOpenSidebar]);

	const bg = selectedBoard?.background !== '100' ? selectedBoard?.background : undefined;

	return isLoggedIn ? (
		<StyleSheetManager shouldForwardProp={prop => prop !== 'backgroundId'}>
			<Container>
				{status && <SideBar ref={sidebarRef}></SideBar>}
				<Header>
					<HeaderComponent />
				</Header>
				<Main backgroundId={bg}>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
					{(statusCard || statusColumn || statusLoading) && <Loader />}
				</Main>
			</Container>
		</StyleSheetManager>
	) : (
		<Suspense fallback={<Loader />}>
			<Outlet />
		</Suspense>
	);
};

export default SharedLayout;
