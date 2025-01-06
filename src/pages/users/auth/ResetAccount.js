import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Form, Button, Alert } from 'react-bootstrap';
import { resetAccount } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/css/admin.css';
import Loading from '../../../utils/LoadingSmall';

export const ResetAccount = () => {
	const lastPath = window.location.pathname;
	const urlPath = lastPath.split('/');
	const token = urlPath[3];
	const [validated, setValidated] = useState(false);
	const [user, setUser] = useState({
		password: '',
		confirmPassword: '',
	});
	// const [success, setSuccess] = useState(false);
	const loading = useSelector(state => state.auth.resetAccountData);
	const resetFailure = useSelector(state => state.auth.resetAccountFailure);
	const resetSuccess = useSelector(state => state.auth.resetAccountSuccess);

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
		const userData = {
			token,
			password: user.password,
			confirmPassword: user.confirmPassword,
		};
		if (user.confirmPassword && user.password) {
			dispatch(resetAccount(userData));
		}
	};
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
						<h4 className='text-center'>Reset Account password</h4>
						<span class='splash-description'>
							Please create new password to your account
						</span>
						{resetFailure && (
							<Alert className='alert-warning'>{resetFailure}</Alert>
						)}
						{resetSuccess && (
							<Alert className='alert-success'>
								{resetSuccess}{' '}
								<div className='card-footer text-center'>
									<span>
										<Link to='/auth/login' className='link'>
											Login with
										</Link>
									</span>
								</div>
							</Alert>
						)}
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>New password</Form.Label>
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
									New Password is required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Confirm password</Form.Label>
								<Form.Control
									required
									type='password'
									name='confirmPassword'
									value={user.confirmPassword}
									placeholder='*********'
									className='form-control-lg'
									onChange={handleChange}
								/>
								<Form.Control.Feedback type='invalid'>
									confirm password is required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='pt-1'>
								<Button
									type='submit'
									variant='primary'
									className='btn-block btn-xl'
								>
									Reset Password Account
								</Button>
								{loading && <Loading />}
							</Form.Group>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};
