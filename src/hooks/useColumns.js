/** @format */

import { useSelector } from 'react-redux';

import { modalData, columnsState, columnsLoading, columnsError } from 'redux/columns/selectors';

export const useColumns = () => {
	const allColumns = useSelector(columnsState);
	const statusColumn = useSelector(columnsLoading);
	const statusError = useSelector(columnsError);
	const { isOpen, columnId } = useSelector(modalData);

	return {
		allColumns,
		statusColumn,
		statusError,
		isOpen,
		columnId,
	};
};
