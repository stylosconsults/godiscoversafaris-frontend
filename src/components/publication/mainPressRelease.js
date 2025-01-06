import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublications } from '../../redux/actions';

export const PressRelease = () => {
	const presReleases = useSelector(
		state => state.publicationReducer.publications
	);
	// const error = useSelector(state => state.publicationReducer.error);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPublications());
	}, [dispatch]);

	return (
		<div className='publication'>
			<ul>
				{presReleases &&
					presReleases
						.filter(
							pressRelease =>
								pressRelease.status === true &&
								pressRelease.category === 'Press Release'
						)
						// .slice(0, 4)
						.map((pressRelease, idx) => (
							<li key={idx}>
								<i className='fa fa-chevron-right mr-2'></i>
								<b>
									<a
										href={pressRelease.pubDocument}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={pressRelease.title}
									>
										{pressRelease.title}
									</a>
								</b>
							</li>
						))}
			</ul>
		</div>
	);
};
