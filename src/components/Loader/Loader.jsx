/** @format */

import { createPortal } from 'react-dom';
import { RotatingLines } from 'react-loader-spinner';
import { LoaderBox, Overlay } from './Loader.styled';

const loaderPortal = document.querySelector('#loader-root');

const Loader = () => {
	return createPortal(
		<Overlay style={{ zIndex: '9999' }}>
			<LoaderBox>
				<RotatingLines
					visible={true}
					height='96'
					width='96'
					strokeWidth='5'
					animationDuration='0.75'
					ariaLabel='rotating-lines-loading'
					wrapperStyle={{}}
					wrapperClass=''
				/>
			</LoaderBox>
		</Overlay>,
		loaderPortal
	);
};

export default Loader;
