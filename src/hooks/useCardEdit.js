/** @format */

import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { delCard } from 'redux/cards/operations';
import { resetError } from 'redux/cards/cardsSlice';
import { useCards } from './useCards';

export const useCardEditing = () => {
	const dispatch = useDispatch();
	const [cardForEditing, setCardForEditing] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { statusCard } = useCards();

	useEffect(() => {
		if (statusCard === false) dispatch(resetError());
	}, [dispatch, statusCard]);

	const editCard = useCallback(
		data => {
			if (statusCard) return;
			setIsOpen(true);
			setCardForEditing(data);
		},
		[statusCard]
	);

	const onRequestClose = useCallback(() => {
		setIsOpen(false);
		setCardForEditing(null);
	}, []);

	const deleteCard = useCallback(
		({ id, _id }) => {
			if (statusCard) return;
			dispatch(delCard({ id, _id }));
		},
		[dispatch, statusCard]
	);

	return {
		isOpen,
		setIsOpen,
		cardForEditing,
		editCard,
		onRequestClose,
		deleteCard,
	};
};
