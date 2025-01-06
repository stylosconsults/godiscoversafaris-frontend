import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

import { RightBar } from '.';
import Spinner from '../spinner/Spinner';
import { getAllNews } from '../../redux/actions';

import './index.css';

export const LatestHomepageNews = () => {
	const [loading, setLoading] = useState(true);

	const data = useSelector(state => state.newsReducer.news);
	const theLoading = useSelector(state => state.newsReducer.loading);
	const error = useSelector(state => state.newsReducer.error);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllNews());
		setLoading(!theLoading);
	}, [dispatch, theLoading]);

	if (error) {
		console.log('error');
	}

	return (
		<section className='st-news py-4'>
			<Container>
				<Row>
					<Col sm={8}>
						<h4 className='col-sm-12 mb-4'>News</h4>
						<Row>
							{data && !loading ? (
								<>
									{data &&
										data
											.filter(singleNews => singleNews.isPublished === true)
											.slice(0, 2)
											.map((singleNews, i) => (
												<Col lg={6} md={6} sm={12} xs={12} key={i}>
													<Link to={`/blog/${singleNews.slug}`}>
														<div className='events-box'>
															<img
																src={singleNews.image}
																className='img-fluid news-img-fit'
																title={singleNews.title}
																alt={singleNews.title}
																data-aos='fade-up'
																data-aos-easing='ease-in'
																data-aos-delay='500'
															></img>
															<div className='content mt-3'>
																<span
																	className='text-bold text-small color-yellow'
																	data-aos='fade-in'
																	data-aos-easing='ease-in'
																	data-aos-delay='500'
																>
																	{moment(singleNews.createdAt).format(
																		'MMMM d, y'
																	)}
																</span>
																<h5>{singleNews.title}</h5>

																<p>
																	{ReactHtmlParser(
																		singleNews.newsBody.substr(0, 130)
																	)}
																	...
																	<br />
																	<span className='news-body-shadow'></span>
																</p>
															</div>
														</div>
													</Link>
												</Col>
											))}
								</>
							) : (
								<Spinner />
							)}
						</Row>
					</Col>
					<Col sm={4}>
						<h4 className='col-sm-12 mb-4'>
							<b>Latest Tweets</b>
						</h4>
						<RightBar tweet={true} news={false} />
					</Col>
				</Row>
			</Container>
		</section>
	);
};
