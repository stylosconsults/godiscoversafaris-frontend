import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import jwtDecode from 'jwt-decode';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';

import {
	getCommentsTours,
	changeCommentStatus,
	deleteComment,
} from '../../../redux/actions';

export const ToursComment = props => {
	const { slug } = props.match.params;
	const token = localStorage.IdToken;
	const decodedToken = jwtDecode(token);

	const [modal, setModal] = useState(false);
	const [commentId, setCommentId] = useState('');

	const toggle = id => {
		setCommentId(id);
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};

	const comments = useSelector(state => state.commentReducer.comments);
	// const message = useSelector(state => state.commentReducer.message);
	const error = useSelector(state => state.commentReducer.error);

	const dispatch = useDispatch();

	const submitCommentStatus = (commentStatus, id) => {
		const data = {
			status: commentStatus === true ? 'false' : 'true',
		};
		dispatch(changeCommentStatus(id, data, slug));
	};

	const deleteAComment = () => {
		dispatch(deleteComment(commentId, slug));
		setModal(false);
	};

	useEffect(() => {
		dispatch(getCommentsTours(slug));
	}, [dispatch, slug]);

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>Destinations</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item'>
											<Link to='/account/destinations' className='breadcrumb-link'>
												Destinations
											</Link>
										</li>
										<li className='breadcrumb-item'>View</li>
										<li className='breadcrumb-item'>
											<Link
												to={`/account/destinations/view/${slug}`}
												className='breadcrumb-link'
											>
												{slug}
											</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											Comment
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link
							to={`/account/destinations/view/${slug}`}
							className='btn btn-block btn-light'
						>
							<i className='fa fa-arrow-left mr-1'></i> Go Back
						</Link>
					</Col>
				</Row>

				<div className='ecommerce-widget'>
					<Row>
						<div>
							{/* {message && <Alert variant='success'>{message}</Alert>}{' '} */}
							{error && <Alert variant='danger'>{error}</Alert>}
						</div>
						<Col xs={12} lg={12} md={12} sm={12}>
							<div className='card'>
								<div className='card-body'>
									<table className='table table-striped table-hovered'>
										<thead>
											<tr>
												<th scope='col'>#</th>
												<th scope='col'>Full Name</th>
												<th scope='col'>Email Address</th>
												<th scope='col' style={{ width: '30%' }}>
													Comment
												</th>
												<th scope='col'>Posted At</th>
												<th scope='col'></th>
											</tr>
										</thead>
										<tbody>
											{comments &&
												comments.map((comment, index) => (
													<tr key={index}>
														<th scope='row'>{index + 1}</th>
														<td>{comment.names}</td>
														<td>{comment.email}</td>
														<td>{comment.commentBody}</td>
														<td>{moment(comment.createdAt).format('L')}</td>
														<td>
															{decodedToken && decodedToken.role === 'admin' ? (
																<Form>
																	<Button
																		variant={
																			comment.isActive === false
																				? 'success'
																				: 'warning'
																		}
																		className='btn-xs'
																		onClick={() =>
																			submitCommentStatus(
																				comment.isActive,
																				comment.id
																			)
																		}
																	>
																		{comment.isActive === false ? (
																			<i className='fas fa-check mr-1'></i>
																		) : (
																			<i className='fa fa-ban mr-1'></i>
																		)}
																		{comment.isActive === false
																			? 'Enable'
																			: 'Disable'}
																	</Button>

																	<Button
																		variant='danger'
																		className='btn-xs'
																		onClick={() => toggle(comment.id)}
																		style={{ marginLeft: 10 }}
																		key={comment.id}
																	>
																		Delete
																	</Button>
																</Form>
															) : (
																''
															)}

															{modal && (
																<Modal
																	show={modal}
																	onHide={() => closeModal()}
																	onkey={comment.id}
																>
																	<Modal.Header closeButton key={comment.id}>
																		<Modal.Title id='contained-modal-title-vcenter'>
																			Are you sure you want to detete this
																			comment?
																		</Modal.Title>
																	</Modal.Header>
																	<Modal.Footer>
																		<Button
																			className='btn btn-sm'
																			style={{ backgroundColor: '#c3c3c3' }}
																			onClick={() => closeModal()}
																		>
																			NO
																		</Button>{' '}
																		<Button
																			className='btn btn-primary btn-sm'
																			onClick={() => deleteAComment()}
																		>
																			YES
																		</Button>{' '}
																	</Modal.Footer>
																</Modal>
															)}
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
