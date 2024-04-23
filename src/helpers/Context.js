/** @format */

import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const Context = ({ children }) => {
	const [book, setBook] = useState(null);
	const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

	return (
		<MainContext.Provider
			value={{
				book,
				setBook,
				isOpenSuccessModal,
				setIsOpenSuccessModal,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
