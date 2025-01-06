import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const TinyEditor = props => {
	const { onChange } = props;

	return (
		<div>
			<Editor
				apiKey='rtvl5mnciwns1upf4xigvav5mqzimvy9kw68iqbbd0thtfau'
				init={{
					height: 300,
					menubar: false,
				}}
				name='newsBody'
				// value={value}
				onChange={onChange}
			/>
		</div>
	);
};
