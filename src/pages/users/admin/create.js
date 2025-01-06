import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { createUser } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../utils/Loading';

export const UsersCreate = () => {
	const [validated, setValidated] = useState(false);
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		phoneNumber: '',
		organization: '',
	});
	const loading = useSelector(state => state.users.submittedData);
	const createFailure = useSelector(state => state.users.errors);
	const createSuccess = useSelector(state => state.users.createdUser);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const handleSubmit = e => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}
		e.preventDefault();
		setValidated(true);
		if (user.email) {
			dispatch(createUser(user));
		}
	};

	if (createSuccess) {
		return <Redirect to='/account/users' />;
	}

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>User | Create</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item'>
											<Link to='/account/users' className='breadcrumb-link'>
												Users
											</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											Create
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link to='/account/users' className='btn btn-block btn-light'>
							<i className='fa fa-arrow-left mr-1'></i> Go Back
						</Link>
					</Col>
				</Row>

				<div className='ecommerce-widget'>
					<Row>
						<Col xs={8} lg={8} md={12} sm={12}>
							<div className='card'>
								<div className='card-body'>
									<Form
										noValidate
										validated={validated}
										onSubmit={handleSubmit}
									>
										<Form.Group>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type='text'
												required
												name='firstName'
												value={user.firstName}
												placeholder='Eg: Manzi'
												className='form-control-lg'
												onChange={handleChange}
											/>
											<Form.Control.Feedback type='invalid'>
												First name is required
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type='text'
												required
												name='lastName'
												value={user.lastName}
												placeholder='Eg: Yves'
												className='form-control-lg'
												onChange={handleChange}
											/>
											<Form.Control.Feedback type='invalid'>
												Last name is required
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group>
											<Form.Label>Email Address</Form.Label>
											<Form.Control
												required
												type='email'
												name='email'
												value={user.email}
												placeholder='Eg: email@example.com'
												className='form-control-lg'
												onChange={handleChange}
											/>
											<Form.Control.Feedback type='invalid'>
												Email is required
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group>
											<Form.Label>Phone number</Form.Label>
											<Form.Control
												type='text'
												required
												name='phoneNumber'
												value={user.phoneNumber}
												placeholder='Eg: 25078........'
												className='form-control-lg'
												onChange={handleChange}
											/>
											<Form.Control.Feedback type='invalid'>
												Last name is required
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group>
											<Form.Label>Role</Form.Label>
											<Form.Control
												as='select'
												className='mr-sm-2'
												required
												custom
												value={user.role}
												name='role'
												onChange={handleChange}
											>
												<option value='' disabled={true}>
													Choose...
												</option>
												<option value='admin' se>Admin</option>
												<option value='user'>User</option>
											</Form.Control>
											<Form.Control.Feedback type='invalid'>
												Role is required
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group>
											<Form.Label>Organization</Form.Label>
											<Form.Control
												required
												type='text'
												name='organization'
												value={user.organization}
												onChange={handleChange}
											/>
											<Form.Control.Feedback type='invalid'>
												Organization is required
											</Form.Control.Feedback>
										</Form.Group>
										{/* {createSuccess && (
											<Alert className='alert-success'>{createSuccess}</Alert>
										)} */}
										{createFailure && (
											<Alert className='alert-danger'>{createFailure}</Alert>
										)}
										<Form.Group className='pt-1'>
											{loading ? null : (
												<Button
													type='submit'
													variant='primary'
													className=''
												>
													<i className='fa fa-save'></i> Create user
												</Button>
											)}
											{loading && <Loading />}
										</Form.Group>
									</Form>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</AdminLayout>
	);
};
