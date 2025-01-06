import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
import { getPublications } from '../../redux/actions';

import './index.css';

export const RightBar = props => {
	const tweet = props.tweet ?? true;
	const news = props.news ?? true;

	const publications = useSelector(
		state => state.publicationReducer.publications
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPublications());
	}, [dispatch]);

	return (
		<section className='st-news'>
			<Container>
				{tweet === true ? (
					<Row className='mb-4'>
						<div className='col-sm-12'>
							<TwitterTimelineEmbed
								sourceType='profile'
								screenName={process.env.REACT_APP_TWITTER_NAME}
								options={{ height: 300 }}
							/>

							<TwitterFollowButton
								screenName={process.env.REACT_APP_TWITTER_NAME}
							/>
						</div>
					</Row>
				) : (
					''
				)}

				{news === true ? (
					<div>
						<Row className='mb-4 col-sm-12'>
							<h4>
								<b>Advertisement</b>
							</h4>
						</Row>
						<Row>
							{publications &&
								publications
									.filter(
										publication =>
											publication.status === true &&
											publication.category === 'publication'
									)
									.slice(0, 3)
									.map((publication, index) => (
										<Col
											lg={12}
											md={6}
											sm={6}
											xs={6}
											className='mb-3 border-bottom'
										>
											<p className='mt-3'>
												<a
													href={publication.pubDocument}
													rel='noopener noreferrer'
													aria-label={publication.title}
												>
													<b>{publication.title}</b>
												</a>
											</p>
										</Col>
									))}
						</Row>
					</div>
				) : (
					''
				)}
			</Container>
		</section>
	);
};
