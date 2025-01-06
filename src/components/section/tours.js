import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { NewsHeaderCard } from 'react-ui-cards';
import './index.css';
import Spinner from '../spinner/Spinner';
import { getFiveTours } from '../../redux/actions';

export const ToursBox = () => {
	const [loading, setLoading] = useState(true);

	const tours = useSelector(state => state.toursReducer.fiveTours);
	console.log("tours", tours)
	const fiveLoading = useSelector(state => state.toursReducer.loading);
	const error = useSelector(state => state.toursReducer.error);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFiveTours());
		setTimeout(function () {
			setLoading(!fiveLoading);
		}, 500);
	}, [dispatch, fiveLoading]);

	if (error) {
		console.log(error);
		console.clear();
	}

	return (
		<section className='st-news bg-light'>
			<Row>
				<Col sm={12}>
					{tours && !loading ? (
						<>
							<Row>
								<Col lg={5} md={6} sm={12} xs={12} className='big-news'>
									{tours &&
										tours
											.slice(0, 1)
											.map((oneTours, indx) => (
												<NewsHeaderCard
													key={indx}
													href={`/tour/${oneTours.slug}`}
													thumbnail={oneTours.image}
													title={oneTours.title}
													author={ oneTours.price1 !==0?`$`+ oneTours.price1:"" }
													// date={moment(oneTours.createdAt).format('MMMM d, y')}
												/>
											))}
								</Col>
								<Col lg={7} md={6} sm={12} xs={12}>
									<div className='news-box'>
										{tours &&
											tours
												.slice(1, 3)
												.map((oneTours, indx) => (
													<NewsHeaderCard
														key={indx}
														href={`/tour/${oneTours.slug}`}
														thumbnail={oneTours.image}
														title={oneTours.title}
														author={oneTours.price1 !==0?`$`+ oneTours.price1:"" }
														// date={moment(oneTours.createdAt).format('MMMM d, y')}
													/>
												))}
									</div>

									<div className='news-box'>
										{tours &&
											tours
												.slice(3, 5)
												.map((oneTours, indx) => (
													<NewsHeaderCard
														key={indx}
														href={`/tour/${oneTours.slug}`}
														thumbnail={oneTours.image}
														title={oneTours.title}
														// author={oneTours.author.organization}
														author={oneTours.price1 !==0?`$`+ oneTours.price1:"" }
														// date={moment(oneTours.createdAt).format('MMMM d, y')}
													/>
												))}
									</div>
								</Col>
							</Row>
						</>
					) : (
						<Spinner />
					)}
				</Col>
			</Row>
		</section>
	);
};
