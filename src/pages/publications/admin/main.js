import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import {
	getPublications,
	changePublicationStatus,
} from '../../../redux/actions';

export const PublicationsMain = () => {
	const token = localStorage.IdToken;
	const decodedToken = jwtDecode(token);

	const publications = useSelector(
		state => state.publicationReducer.publications
	);

	// const message = useSelector(state => state.publicationReducer.message);
	const error = useSelector(state => state.publicationReducer.error);

	const dispatch = useDispatch();

	const submitPublicationStatus = (publicationStatus, id) => {
		const data = {
			status: publicationStatus === true ? 'false' : 'true',
		};
		dispatch(changePublicationStatus(id, data));
	};

	useEffect(() => {
		dispatch(getPublications());
	}, [dispatch]);

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>GODISCOVER AFRICADocuments </h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											GODISCOVER AFRICADocuments
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link
							to='/account/publications/create'
							className='btn btn-block btn-light'
						>
							<i className='fa fa-plus-circle mr-1'></i> Add New
						</Link>
					</Col>
				</Row>

				<div className='ecommerce-widget'>
					<Row>
						<div>
							{/* {message && <Alert variant='success'>{message}</Alert>} */}
							{error && <Alert variant='danger'>{error}</Alert>}
						</div>
						<Col xs={12} lg={12} md={12} sm={12}>
							<div className='card'>
								<div className='card-body'>
									<table className='table table-striped table-hovered'>
										<thead>
											<tr>
												<th scope='col'>#</th>
												<th scope='col'>Title</th>
												<th scope='col'>Document Link</th>
												<th scope='col'>Document Type</th>
												<th scope='col'>Date</th>
												<th scope='col'>Status</th>
												<th scope='col'></th>
											</tr>
										</thead>
										<tbody>
											{publications &&
												publications.map((publication, index) => (
													<tr>
														<th scope='row'>{index + 1}</th>
														<td>{publication.title.substr(0, 80)}...</td>
														<td title={publication.pubDocument}>
															<a
																href={publication.pubDocument}
																target='_blank'
																rel='noopener noreferrer'
																style={{ color: '#ec7500' }}
																aria-label='View document'
															>
																View Document
															</a>
														</td>
														<td>{publication.category}</td>
														<td>
															{moment(publication.createdAt).format('LL')}
														</td>
														<td>
															{decodedToken && decodedToken.role === 'admin' && (
																<Form>
																	<Button
																		variant={
																			publication.status === false
																				? 'success'
																				: 'warning'
																		}
																		title={
																			publication.status === false
																				? 'Click to activated this publication'
																				: 'Click to deactivated this publication'
																		}
																		className='btn-xs'
																		onClick={() =>
																			submitPublicationStatus(
																				publication.status,
																				publication.id
																			)
																		}
																		style={{ display: 'flex' }}
																	>
																		{publication.status === false ? (
																			<i className='fas fa-check mr-1'></i>
																		) : (
																			<i className='fa fa-ban mr-1'></i>
																		)}
																		{publication.status === false
																			? 'Activate'
																			: 'Deactivate'}
																	</Button>
																</Form>
															)}
														</td>
														<td>
															<Link
																to={`/account/publications/view/${publication.id}`}
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
