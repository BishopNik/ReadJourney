/** @format */

import { createPortal } from 'react-dom';
import { ColorRing } from 'react-loader-spinner';
import { LoaderBox, Overlay } from './Loader.styled';

const loaderPortal = document.querySelector('#loader-root');

const Loader = () => {
	return createPortal(
		<Overlay style={{ zIndex: '9999' }}>
			<LoaderBox>
				<ColorRing
					visible={true}
					height='240'
					width='240'
					ariaLabel='blocks-loading'
					wrapperStyle={{}}
					wrapperClass='blocks-wrapper'
					colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
				/>
			</LoaderBox>
		</Overlay>,
		loaderPortal
	);
};

export default Loader;
