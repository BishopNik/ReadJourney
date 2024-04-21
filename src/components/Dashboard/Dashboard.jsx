/** @format */

import React from 'react';
import styles from './dashboard.module.css';

function Dashboard({ children }) {
	return <li className={styles.dashboard}>{children}</li>;
}

export default Dashboard;
