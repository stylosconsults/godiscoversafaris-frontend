import React, { useState } from 'react';
import { Image, Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/css/admin.css';
import Loading from '../../../utils/LoadingSmall';

export const ResetPassword = () => {
	const lastPath = window.location.pathname;
	const urlPath = lastPath.split('/');
	const token = urlPath[4];
	const [user, setUser] = useState({
		password: '',
		confirmPassword: '',
	});
	const [validated, setValidated] = useState(false);
	const [success, setSuccess] = useState(false);
	const loading = useSelector(state => state.auth.resetData);
	const resetFailure = useSelector(state => state.auth.resetPswdFailure);
	const resetSuccess = useSelector(state => state.auth.resetPswdSuccess);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const clearInputs = () => {
		setUser({ password: '', confirmPassword: '' });
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
		if (user.password && user.confirmPassword) {
			dispatch(resetPassword(userData));
		}
		clearInputs();
	};

	if (resetSuccess) {
		setTimeout(() => {
			setSuccess(true);
		}, 3000);
	}

	if (success) {
		return <Redirect to='/auth/login' />;
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
						<h4 className='text-center'>Reset new password</h4>
						<span class='splash-description'>
							Now you can create your new password for account
						</span>
						{resetFailure && (
							<Alert className='alert-warning'>{resetFailure}</Alert>
						)}
						{resetSuccess && (
							<Alert className='alert-success'>{resetSuccess}</Alert>
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
									New password is required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Confirm password</Form.Label>
								<Form.Control
									required
									type='password'
									name='confirmPassword'
									value={user.confirmPassword}
									placeholder='********'
									className='form-control-lg'
									onChange={handleChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Confirm password is required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='pt-1'>
								<Button
									type='submit'
									variant='primary'
									className='btn-block btn-xl'
								>
									Reset Password
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
