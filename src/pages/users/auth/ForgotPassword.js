import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Form, Button, Alert } from 'react-bootstrap';
import '../../../assets/css/admin.css';
import { sendLinkResetPassword } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../utils/LoadingSmall';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [validated, setValidated] = useState(false);
	const loading = useSelector(state => state.auth.sendLinkData);
	const sendLinkFailed = useSelector(state => state.auth.sendLInkFailure);
	const sendLinkSucceeded = useSelector(state => state.auth.sendLinkSuccess);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { value } = e.target;
		setEmail(value);
	};

	const handleSubmit = e => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}
		setValidated(true);
		e.preventDefault();
		if (email) {
			dispatch(sendLinkResetPassword({ email }));
		}
		// setEmail('');
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
						<span class='splash-description'>
							Please enter your email to receive password reset link
						</span>
						{sendLinkFailed && (
							<Alert className='alert-warning'>{sendLinkFailed}</Alert>
						)}
						{sendLinkSucceeded && (
							<Alert className='alert-success'>{sendLinkSucceeded}</Alert>
						)}
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									required
									type='email'
									name='email'
									value={email}
									placeholder='Eg: email@example.com'
									className='form-control-lg'
									onChange={handleChange}
								/>
								<Form.Control.Feedback type='invalid'>
									Email is required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='pt-1'>
								<Button
									type='submit'
									variant='primary'
									className='btn-block btn-xl'
								>
									Request Password Reset
								</Button>
								{loading && <Loading />}
							</Form.Group>
						</Form>
					</div>
					<div className='card-footer text-center'>
						<span>
							Return to
							<Link to='/auth/login' className='link'>
								Login
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
