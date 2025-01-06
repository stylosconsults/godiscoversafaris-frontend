import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { AdminLayout } from '../../../layouts';
import {
	Container,
	Row,
	Col,
	Image,
	Alert,
	Button,
	Form,
} from 'react-bootstrap';

import { getEvents, changeEventStatus } from '../../../redux/actions';

export const EventsMain = () => {
	const token = localStorage.IdToken;
	const decodedToken = jwtDecode(token);

	const events = useSelector(state => state.eventReducer.events);
	const error = useSelector(state => state.eventReducer.error);

	const dispatch = useDispatch();

	const submitEventStatus = (eventStatus, slug) => {
		const data = {
			isApproved: eventStatus === true ? 'false' : 'true',
		};
		dispatch(changeEventStatus(slug, data));
	};

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>Events</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											Events
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link
							to='/account/events/create'
							className='btn btn-block btn-light'
						>
							<i className='fa fa-plus-circle mr-1'></i> Add New
						</Link>
					</Col>
				</Row>

				<div className='ecommerce-widget'>
					<Row>
						<div>{error && <Alert variant='danger'>{error}</Alert>}</div>
						<Col xs={12} lg={12} md={12} sm={12}>
							<div className='card'>
								<div className='card-body'>
									<table className='table table-striped table-hovered'>
										<thead>
											<tr>
												<th scope='col'>#</th>
												<th></th>
												<th scope='col'>Title</th>
												<th scope='col'>Starting_Date</th>
												<th scope='col'>Ending_Date</th>
												<th scope='col'>Place</th>
												<th scope='col'>Price</th>
												<th scope='col'></th>
												<th scope='col'></th>
											</tr>
										</thead>
										<tbody>
											{events.map((event, index) => (
												<tr>
													<th scope='row'>{index + 1}</th>
													<th>
														<Image
															alt='Travel Banner'
															title='Travel Banner'
															src={
																event.image
																	? event.image
																	: '../../assets/assetss/event.png'
															}
															className='img-fluid'
															width={50}
														/>
													</th>
													<td>{event.title}</td>
													<td>{moment(event.startDate).format('LLL')}</td>
													<td>{moment(event.endDate).format('LLL')}</td>
													<td>{event.place}</td>
													<td>
														{event.price ? event.price + ' $' : 'Free entry'}
													</td>
													<td>
														{decodedToken && decodedToken.role === 'admin' && (
															<Form>
																<Button
																	variant={
																		event.isApproved === false
																			? 'success'
																			: 'warning'
																	}
																	title={
																		event.isApproved === false
																			? 'Click to activated this event'
																			: 'Click to deactivated this event'
																	}
																	className='btn-xs'
																	onClick={() =>
																		submitEventStatus(
																			event.isApproved,
																			event.slug
																		)
																	}
																	style={{ display: 'flex' }}
																>
																	{event.isApproved === false ? (
																		<i className='fas fa-check mr-1'></i>
																	) : (
																		<i className='fa fa-ban mr-1'></i>
																	)}
																	{event.isApproved === false
																		? 'Activate'
																		: 'Deactivate'}
																</Button>
															</Form>
														)}
													</td>
													<td>
														<Link
															to={`/account/events/view/${event.slug}`}
															className='btn btn-primary btn-xs'
														>
															<i className='fa fa-tasks mr-1'></i> Action
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</AdminLayout>
	);
};
