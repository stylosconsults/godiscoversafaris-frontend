import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import LoadingStyle from './LoadingStyle';
const Loading = () => {
	return (
		<div className='sweet-loading mt-3'>
			<BeatLoader
				css={LoadingStyle}
				size={10}
				color={'#123abc'}
				loading={true}
			/>
		</div>
	);
};

export default Loading;
