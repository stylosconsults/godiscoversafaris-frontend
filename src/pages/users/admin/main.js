import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';
import { AdminLayout } from '../../../layouts';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	Alert,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from 'react-bootstrap';
import { getUsers } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../../utils/Loading';
import { changeUserStatus } from '../../../redux/actions';

export const UsersMain = () => {
	const [modal, setModal] = useState(false);
	const [userId, setUserId] = useState(0);
	const [userStatus, setUserStatus] = useState(false);
	const [statusMessage, setMessage] = useState('');

	const toggle = (id, status, message) => {
		setModal(true);
		setUserId(id);
		setUserStatus(status);
		setMessage(message);
	};

	const close = () => {
		setModal(false);
	};

	const loading = useSelector(state => state.users.requestData);
	const users = useSelector(state => state.users.usersData);
	const count = useSelector(state => state.users.countUsers);
	const failure = useSelector(state => state.users.errors);

	const blockFailure = useSelector(state => state.users.error);
	const blockSuccess = useSelector(state => state.users.message);

	const submitChangeUserStatus = () => {
		const data = {
			isActive: userStatus === true ? false : true,
		};
		dispatch(changeUserStatus(userId, data));
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	if (failure) {
		return <Redirect to='/auth/login' />;
	}

	const logged = jwtDecode(localStorage.IdToken);
	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>Users</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											{count} Users
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link
							to='/account/users/create'
							className='btn btn-block btn-light'
						>
							<i className='fa fa-plus-circle mr-1'></i> Add New
						</Link>
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
												<th scope='col'>First Name</th>
												<th scope='col'>Last Name</th>
												<th scope='col'>Email</th>
												<th scope='col'>Role</th>
												<th scope='col'>Organization</th>
												<th scope='col'>Joined_Date</th>
												<th scope='col'></th>
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
											{users &&
												users.map((user, index) => (
													<tr key={index}>
														{/* <th scope='row'>{user.id}</th> */}
														<td cope='row'>{user.firstName}</td>
														<td>{user.lastName}</td>
														<td>{user.email}</td>
														<td>{user.role}</td>
														<td>{user.organization}</td>
														<td>{moment(user.createdAt).format('L')}</td>
														<td>
															{logged.role === 'admin' && (
																<Form>
																	<Button
																		variant={
																			user.isActive === false
																				? 'primary'
																				: 'danger'
																		}
																		title={
																			user.isActive === false
																				? 'Click to activated this User'
																				: 'Click to deactivated this User'
																		}
																		className='btn btn-xs'
																		onClick={() =>
																			toggle(
																				user.id,
																				user.isActive,
																				!user.isActive
																					? 'unblock this user?'
																					: 'block this user?'
																			)
																		}
																		style={{ display: 'flex' }}
																	>
																		{user.isActive === false ? (
																			<i className='fas fa-unlock-alt mr-1'></i>
																		) : (
																			<i className='fa fa-lock mr-1'></i>
																		)}

																		{user.isActive === false
																			? 'Unblock User'
																			: 'Block User'}
																	</Button>

																	<Modal
																		show={modal}
																		onHide={() => close()}
																		key={user.id}
																	>
																		<Modal.Header closeButton>
																			<ModalTitle>
																				Are you sure you want to {statusMessage}
																			</ModalTitle>
																		</Modal.Header>
																		<ModalBody>
																			Names: {user.lastName} {user.firstName}{' '}
																			<br />
																			Email: {user.email}
																			{blockFailure && (
																				<Alert className='alert-warning'>
																					{blockFailure}
																				</Alert>
																			)}
																			{blockSuccess && (
																				<Alert className='alert-success'>
																					{blockSuccess}
																				</Alert>
																			)}
																			{loading && <Loading />}
																		</ModalBody>
																		<ModalFooter>
																			<Button
																				className='btn btn-sm'
																				style={{ backgroundColor: '#c3c3c3' }}
																				onClick={() => close()}
																			>
																				No
																			</Button>
																			<Button
																				className='btn btn-primary btn-sm'
																				onClick={() =>
																					submitChangeUserStatus(
																						user.isActive,
																						user.id
																					)
																				}
																			>
																				Yes
																			</Button>{' '}
																		</ModalFooter>
																	</Modal>
																</Form>
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
