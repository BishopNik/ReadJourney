/** @format */

import { Suspense, useContext, useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader';
import { MainContext } from 'helpers';
import { useAuth } from 'hooks';
import { logOut } from 'redux/auth/operations';
import styles from './sharedlayout.module.css';
import HeaderComponent from 'components/Header';

const SharedLayout = () => {
	const dispatch = useDispatch();
	const { isLoggedIn } = useAuth();
	const { isOpenSidebar, setIsOpenSidebar } = useContext(MainContext);
	const [status, setStatus] = useState(false);

	const sidebarRef = useRef(null);

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		setStatus(isOpenSidebar || window.innerWidth > 1439);
	// 	};
	// 	window.addEventListener('resize', handleResize);
	// 	handleResize();
	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, [isOpenSidebar]);

	// useEffect(() => {
	// 	if (window.innerWidth > 1439) return;
	// 	const handlerOnCloseWindow = ({ target }) => {
	// 		if (sidebarRef.current && !sidebarRef.current.contains(target)) {
	// 			setIsOpenSidebar(false);
	// 		}
	// 	};

	// 	window.addEventListener('click', handlerOnCloseWindow);

	// 	return () => {
	// 		window.removeEventListener('click', handlerOnCloseWindow);
	// 	};
	// }, [setIsOpenSidebar]);

	return isLoggedIn ? (
		<>
			<header className={styles.main}>
				<HeaderComponent />
			</header>
			<button
				type='button'
				onClick={() => dispatch(logOut())}
				style={{ position: 'absolute', top: '0' }}
			>
				Log out
			</button>
			<main>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</main>
		</>
	) : (
		<Suspense fallback={<Loader />}>
			<Outlet />
		</Suspense>
	);
};

export default SharedLayout;
