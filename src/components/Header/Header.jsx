/** @format */

import { useContext } from 'react';
import { MainContext } from 'helpers';
import Icon from 'components/Icon';
import styles from './header.module.css';
import { useAuth } from 'hooks';

const Header = () => {
	const { user } = useAuth();
	const { setIsOpenSidebar } = useContext(MainContext);

	const handleBurger = () => setIsOpenSidebar(true);

	return (
		<>
			<Icon name={'logo'} className={styles.icon_logo} />
			<div className={styles.user_logo}>{user.name[0]}</div>
			<button type='button' className={styles.burger_button} onClick={handleBurger}>
				<Icon name={'menu'} className={styles.icon_menu} />
			</button>
		</>
	);
};

export default Header;
