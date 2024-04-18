/** @format */

import { useNavigate } from 'react-router-dom';

const UnknownPage = () => {
 const navigate = useNavigate();
	return (
		<div>
			<h1>Ups... Page not found.</h1>
			<button onClick={() => navigate(-1)}>{'Back'}</button>
		</div>
	);
};

export default UnknownPage;
