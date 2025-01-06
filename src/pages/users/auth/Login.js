import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Image, Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/css/admin.css';
import Loading from '../../../utils/LoadingSmall';

export const Login = () => {
	const [validated, setValidated] = useState(false);
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const loading = useSelector(state => state.auth.loginData);
	const loginFailure = useSelector(state => state.auth.loginFailure);
	const loginSuccess = useSelector(state => state.auth.loginSuccess);

	const token = localStorage.IdToken;

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
		if (user.email && user.password) {
			dispatch(loginUser(user));
		}
	};

	if (loginSuccess) {
		return <Redirect to='/account' />;
	}

	if (token) {
		return <Redirect to='/account' />;
	}

	return (
		<div className='auth-body'>
			<div className='splash-container'>
				<div className='card'>
					<div className='card-header text-center py-3'>
						<Image
							src='https://res.cloudinary.com/dfsai53mw1/image/upload/v1700398863/WEBS/godiscover/Godiscover_ystvkb.png'
							alt='Image Logo'
							className='splash-img-header img-fluid'
						/>
					</div>
					<div className='card-body'>
						<h4 className='text-center'>Login</h4>
						<span className='splash-description'>
							Please enter your email and password to log in
						</span>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
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
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									type='password'
									name='password'
									value={user.password}
									placeholder='********'
									className='form-control-lg'
									onChange={handleChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Password is required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='pt-1'>
								<Button
									type='submit'
									variant='primary'
									className='btn-block btn-xl'
								>
									Log In
								</Button>
								{loading && <Loading />}
							</Form.Group>

							{loginFailure && (
								<Alert className='alert-danger'>{loginFailure}</Alert>
							)}
						</Form>
					</div>
					<div className='card-footer text-center'>
						<span>
							Forgot your password ?{' '}
							<Link to='/auth/password/forgot' className='link'>
								Reset Password
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
