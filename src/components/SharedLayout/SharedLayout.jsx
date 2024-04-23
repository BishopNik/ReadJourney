/** @format */

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import { useAuth } from 'hooks';
import styles from './sharedlayout.module.css';
import HeaderComponent from 'components/Header';
import { BookModal } from 'components/Modal';

const SharedLayout = () => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? (
		<>
			<header className={styles.main}>
				<HeaderComponent />
			</header>

			<main>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
				<BookModal />
			</main>
		</>
	) : (
		<Suspense fallback={<Loader />}>
			<Outlet />
		</Suspense>
	);
};

export default SharedLayout;
