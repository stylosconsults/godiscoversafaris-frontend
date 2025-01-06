import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AdminLayout } from '../../layouts';
import { Container, Row, Col } from 'react-bootstrap';
import { getSubscribers } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Loading from '../../utils/Loading';

export const Subscribers = () => {
	const loading = useSelector(state => state.maillistReducer.subscribeData);
	const subscribers = useSelector(
		state => state.maillistReducer.subscribersSuccess
	);
	const failure = useSelector(
		state => state.maillistReducer.subscribersFailure
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSubscribers());
	}, [dispatch]);

	if (failure) {
		return <Redirect to='/auth/login' />;
	}

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>Subscribers</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											{subscribers && subscribers.length} Subscribers
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
				</Row>

				<div className='ecommerce-widget'>
					<Row>
						<Col xs={12} lg={12} md={12} sm={12}>
							<div className='card'>
								<div className='card-body'>
									<table className='table table-striped table-hovered'>
										<thead>
											<tr>
												{/* <th scope='col'>#</th> */}
												<th scope='col'>Email</th>
												<th scope='col'>Joined Date</th>
											</tr>
										</thead>
										<tbody>
											{loading && (
												<tr>
													<td colSpan='7'>
														<center>
															<Loading />
														</center>
													</td>
												</tr>
											)}
											{subscribers &&
												subscribers.map((user, index) => (
													<tr key={index}>
														{/* <th scope='row'>{user.id}</th> */}
														<td>{user.email}</td>
														<td>{moment(user.createdAt).format('L')}</td>
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
