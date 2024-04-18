/** @format */

import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import ModalWindow from '../Modal';
import { customStyles } from '../Modal.styled';
import {
	CloseButton,
	ModalContainer,
	AddButton,
	FormTitle,
	IconClose,
} from './AddCardModal.styled';
import { addCardValidationSchema } from 'helpers';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from 'redux/cards/operations';
import { useCards } from 'hooks';
import { resetError } from 'redux/cards/cardsSlice';

export const AddCardModal = ({ isOpen, onRequestClose, columnId, cardForEditing }) => {
	const dispatch = useDispatch();
	const { statusCreateCard } = useCards();
	const { allCards } = useCards();

	const isEdit = !!cardForEditing;

	const handleFormSubmit = values => {
		if (cardForEditing) {
			dispatch(
				updateCard({
					...values,
					columnId,
					id: cardForEditing?._id,
					oldColumnId: cardForEditing?.columnId,
				})
			);
		} else {
			const indexCard = allCards[columnId].length;
			dispatch(addCard({ ...values, indexCard, columnId }));
		}
	};

	useEffect(() => {
		if (statusCreateCard === false && isOpen) {
			onRequestClose();
			dispatch(resetError());
		}
	}, [dispatch, isOpen, onRequestClose, statusCreateCard]);

	return (
		<ModalWindow isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
			<ModalContainer>
				<CloseButton onClick={onRequestClose}>
					<IconClose name='close' />
				</CloseButton>
				<FormTitle>{isEdit ? 'Edit' : 'Add'} Card</FormTitle>
				<Formik
					initialValues={{
						name: cardForEditing?.name || '',
						text: cardForEditing?.text || '',
						priority: cardForEditing?.priority || 'without',
						deadline: cardForEditing?.deadline || 0,
					}}
					validationSchema={addCardValidationSchema}
					onSubmit={handleFormSubmit}
				>
					{({ setFieldValue, values, isSubmitting }) => (
						<Form autoComplete='off'>
							<AddButton type='submit' disabled={isSubmitting}>
								{isEdit ? 'Edit' : 'Add'}
							</AddButton>
						</Form>
					)}
				</Formik>
			</ModalContainer>
		</ModalWindow>
	);
};
