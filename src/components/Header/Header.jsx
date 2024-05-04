/** @format */

import { useEffect, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { logOut } from 'redux/auth/operations';
import Icon from 'components/Icon';
import styles from './header.module.css';
import { useAuth } from 'hooks';

const Header = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { user } = useAuth();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const handleBurger = () => {
		if (window.innerWidth >= 768) return;
		setIsOpenSidebar(!isOpenSidebar);
	};

	const handlerOnCloseWindow = useCallback(
		({ target, key }) => {
			if (target.classList.contains(styles.menu_backdrop) || key === 'Escape') {
				setIsOpenSidebar(false);
			}
		},
		[setIsOpenSidebar]
	);

	useEffect(() => {
		if (isOpenSidebar) document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpenSidebar]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				window.addEventListener('keydown', handlerOnCloseWindow);
			} else {
				window.removeEventListener('keydown', handlerOnCloseWindow);
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handlerOnCloseWindow]);

	return (
		<>
			{isOpenSidebar && (
				<div className={styles.menu_backdrop} onClick={handlerOnCloseWindow}>
					<div className={styles.menu_container}>
						<button type='button' className={styles.menu_close} onClick={handleBurger}>
							<Icon name={'close_burger'} className={styles.icon_menu} />
						</button>
						<ul className={styles.link_container}>
							<li>
								<Link
									to={'/recommended'}
									className={clsx(
										styles.link_to_other_action,
										pathname === '/recommended' && styles.link_to_ext
									)}
									onClick={handleBurger}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to={'/library'}
									className={clsx(
										styles.link_to_other_action,
										pathname === '/library' && styles.link_to_ext
									)}
									onClick={handleBurger}
								>
									My library
								</Link>
							</li>
						</ul>
						<button
							type='button'
							className={styles.button_logout}
							onClick={() => dispatch(logOut())}
						>
							Log out
						</button>
					</div>
				</div>
			)}
			<Icon name={'logo'} className={styles.icon_logo} />
			<div className={styles.user_logo_mobile}>{user.name[0]}</div>
			<button type='button' className={styles.burger_button} onClick={handleBurger}>
				<Icon name={'menu'} className={styles.icon_menu} />
			</button>
			<ul className={styles.link_container}>
				<li>
					<Link
						to={'/recommended'}
						className={clsx(
							styles.link_to_other_action,
							pathname === '/recommended' && styles.link_to_ext
						)}
						onClick={handleBurger}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						to={'/library'}
						className={clsx(
							styles.link_to_other_action,
							pathname === '/library' && styles.link_to_ext
						)}
						onClick={handleBurger}
					>
						My library
					</Link>
				</li>
			</ul>
			<div className={styles.container_user_logo_tablet}>
				<div className={styles.user_logo_tablet}>{user.name[0]}</div>
				<button
					type='button'
					className={styles.button_logout_tablet}
					onClick={() => dispatch(logOut())}
				>
					Log out
				</button>
			</div>
		</>
	);
};

export default Header;
