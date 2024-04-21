/** @format */

import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const Context = ({ children }) => {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	return (
		<MainContext.Provider
			value={{
				isOpenSidebar,
				setIsOpenSidebar,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
