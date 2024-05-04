/** @format */

import React from 'react';
import clsx from 'clsx';

function Dashboard({ children, style }) {
	return <li className={clsx(style && style)}>{children}</li>;
}

export default Dashboard;
