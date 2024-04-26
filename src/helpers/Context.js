/** @format */

import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const Context = ({ children }) => {
	const [book, setBook] = useState(null);
	const [bookOwn, setBookOwn] = useState(null);
	const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
	const [isOpenFullReadModal, setIsOpenFullReadModal] = useState(false);

	return (
		<MainContext.Provider
			value={{
				book,
				setBook,
				bookOwn,
				setBookOwn,
				isOpenSuccessModal,
				setIsOpenSuccessModal,
				isOpenFullReadModal,
				setIsOpenFullReadModal,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
