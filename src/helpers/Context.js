/** @format */

import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const Context = ({ children }) => {
	const [book, setBook] = useState(null);
	return (
		<MainContext.Provider
			value={{
				book,
				setBook,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
