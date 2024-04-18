/** @format */

import { useSelector } from 'react-redux';

import { cardsState, cardsLoading, cardsError, createStatus } from 'redux/cards/selectors';

export const useCards = () => {
	const allCards = useSelector(cardsState);
	const statusCard = useSelector(cardsLoading);
	const statusError = useSelector(cardsError);
	const statusCreateCard = useSelector(createStatus);

	return {
		allCards,
		statusCard,
		statusError,
		statusCreateCard,
	};
};
