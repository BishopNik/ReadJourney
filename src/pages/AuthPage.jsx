/** @format */

import React from 'react';
import AuthForm from 'components/AuthForm';
import styles from 'styles/auth.module.css';
import iPhone1x from '../img/logo_authpage/iPhone_15.png';
import iPhone2x from '../img/logo_authpage/iPhone_15@2x.png';

function AuthPage() {
	return (
		<ul className={styles.main}>
			<li className={styles.form}>
				<AuthForm />
			</li>
			<li className={styles.iphone}>
				<img
					className={styles.iphone_img}
					src={iPhone1x}
					srcSet={`${iPhone1x} 1x, ${iPhone2x} 2x`}
					loading='lazy'
					alt='Iphone 15'
				/>
			</li>
		</ul>
	);
}

export default AuthPage;
