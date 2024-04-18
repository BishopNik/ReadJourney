/** @format */

import { useContext } from 'react';
import { MainContext } from 'helpers';
import { Button, IconMenu } from './BurgerMenu.styled';

const BurgenMenu = () => {
	const { setIsOpenSidebar } = useContext(MainContext);

	const handleBurger = () => setIsOpenSidebar(true);

	return (
		<Button type='button' onClick={handleBurger}>
			<IconMenu name='menu' />
		</Button>
	);
};

export default BurgenMenu;
