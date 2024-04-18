/** @format */

import data from 'img/list_img.json';
import { StyledAvatar } from './Avatar.styled';

const Avatar = () => {
	return (
		<>
			<StyledAvatar src={data.avatar} alt='User avatar' />
		</>
	);
};

export default Avatar;
