import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { NewsHeaderCard } from 'react-ui-cards';
import './index.css';
import Spinner from '../spinner/Spinner';
import { getFiveNews } from '../../redux/actions';

export const NewsBox = () => {
	const [loading, setLoading] = useState(true);

	const news = useSelector(state => state.newsReducer.fiveNews);
	const fiveLoading = useSelector(state => state.newsReducer.loading);
	const error = useSelector(state => state.newsReducer.error);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFiveNews());
		setTimeout(function () {
			setLoading(!fiveLoading);
		}, 500);
	}, [dispatch, fiveLoading]);

	if (error) {
		console.log(error);
		console.clear();
	}

	return (
		<section className='st-news'>
			<Row>
				<Col sm={12}>
					{news && !loading ? (
						<>
							<Row>
								<Col lg={5} md={6} sm={12} xs={12} className='big-news'>
									{news &&
										news
											.slice(0, 1)
											.map((oneNews, indx) => (
												<NewsHeaderCard
													key={indx}
													href={`/blog/${oneNews.slug}`}
													thumbnail={oneNews.image}
													title={oneNews.title}
													// author={oneNews.author.organization}
													date={moment(oneNews.createdAt).format('MMMM d, y')}
												/>
											))}
								</Col>
								<Col lg={7} md={6} sm={12} xs={12}>
									<div className='news-box'>
										{news &&
											news
												.slice(1, 3)
												.map((oneNews, indx) => (
													<NewsHeaderCard
														key={indx}
														href={`/blog/${oneNews.slug}`}
														thumbnail={oneNews.image}
														title={oneNews.title}
														// author={oneNews.author.organization}
														date={moment(oneNews.createdAt).format('MMMM d, y')}
													/>
												))}
									</div>

									<div className='news-box'>
										{news &&
											news
												.slice(3, 5)
												.map((oneNews, indx) => (
													<NewsHeaderCard
														key={indx}
														href={`/blog/${oneNews.slug}`}
														thumbnail={oneNews.image}
														title={oneNews.title}
														// author={oneNews.author.organization}
														date={moment(oneNews.createdAt).format('MMMM d, y')}
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
