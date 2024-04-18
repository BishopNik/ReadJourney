/** @format */

import { useSelector } from 'react-redux';
import {
	selectUser,
	selectIsLoggedIn,
	selectIsRefreshing,
	statusUserError,
	selectIsLoading,
} from 'redux/auth/selectors';

export const useAuth = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isRefreshing = useSelector(selectIsRefreshing);
	const user = useSelector(selectUser);
	const errorUser = useSelector(statusUserError);
	const isLoading = useSelector(selectIsLoading);

	return {
		isLoggedIn,
		isRefreshing,
		user,
		errorUser,
		isLoading,
	};
};
