/** @format */

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from 'components/Header';
import { BookModal, SuccessModal, ReadFullBook } from 'components/Modal';
import Loader from 'components/Loader';
import { useAuth } from 'hooks';
import styles from './sharedlayout.module.css';

const SharedLayout = () => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? (
		<>
			<header className={styles.main}>
				<HeaderComponent />
			</header>

			<main>
				<BookModal />
				<SuccessModal />
				<ReadFullBook />
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
