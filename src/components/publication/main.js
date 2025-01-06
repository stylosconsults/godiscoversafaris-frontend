import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublications } from '../../redux/actions';

export const Publication = () => {
	const publications = useSelector(
		state => state.publicationReducer.publications
	);
	// const error = useSelector(state => state.publicationReducer.error);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPublications());
	}, [dispatch]);

	return (
		<div className='publication'>
			{/* <div>{error && <h4>{error}</h4>}</div> */}
			<ul>
				{publications &&
					publications
						.filter(
							publication =>
								publication.status === true &&
								publication.category === 'publication'
						)
						// .slice(0, 4)
						.map((publication, idx) => (
							<li>
								<i className='fa fa-chevron-right mr-2'></i>
								<b>
									<a
										href={publication.pubDocument}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={publication.title}
									>
										{publication.title}
									</a>
								</b>
							</li>
						))}
			</ul>
		</div>
	);
};
