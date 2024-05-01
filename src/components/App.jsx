/** @format */

import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { refreshTokens, refreshUser } from 'redux/auth/operations';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from 'hooks';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import SharedLayout from './SharedLayout';
import Loader from 'components/Loader';

const AuthPage = lazy(() => import('pages/AuthPage'));
const ReadingPage = lazy(() => import('pages/ReadingPage'));
const LibraryPage = lazy(() => import('pages/LibraryPage'));
const RecommendedPage = lazy(() => import('pages/RecommendedPage'));
const UnknownPage = lazy(() => import('pages/UnknownPage'));

function App() {
	const dispatch = useDispatch();
	const { isRefreshing } = useAuth();

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	useEffect(() => {
		const refreshInterval = setInterval(() => dispatch(refreshTokens()), 43200000);

		return () => clearInterval(refreshInterval);
	}, [dispatch]);

	return isRefreshing ? (
		<Loader />
	) : (
		<Routes>
			<Route path='/' element={<SharedLayout />}>
				<Route
					index
					element={<RestrictedRoute component={<AuthPage />} redirectTo='/recommended' />}
				/>
				<Route
					path='/registration'
					element={<RestrictedRoute component={<AuthPage />} redirectTo='/recommended' />}
				/>
				<Route
					path='/recommended'
					element={<PrivateRoute component={<RecommendedPage />} redirectTo='/' />}
				/>
				<Route
					path='/read/:id'
					element={<PrivateRoute component={<ReadingPage />} redirectTo='/' />}
				/>
				<Route
					path='/library'
					element={<PrivateRoute component={<LibraryPage />} redirectTo='/' />}
				/>

				<Route path='*' element={<UnknownPage />} />
			</Route>
		</Routes>
	);
}

export default App;
