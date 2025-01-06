import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Alert } from 'react-bootstrap';
import { userUnsubscribe } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/admin.css';
import Loading from '../../utils/LoadingSmall';

export const Unsubscribe = () => {
	const lastPath = window.location.pathname;
	const urlPath = lastPath.split('/');
	const id = urlPath[3];
	const loading = useSelector(state => state.maillistReducer.subscribeData);
	const unsubscribeFailure = useSelector(
		state => state.maillistReducer.unsubscribeFailure
	);
	const unsubscribeSuccess = useSelector(
		state => state.maillistReducer.unsubscribeSuccess
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userUnsubscribe(id));
	}, [dispatch, id]);

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
						<h4 className='text-center'>Unsubscribe to our Mail List</h4>
						{unsubscribeFailure && (
							<Alert className='alert-warning'>{unsubscribeFailure}</Alert>
						)}
						{loading && <Loading />}
						{unsubscribeSuccess && (
							<Alert className='alert-success'>
								{unsubscribeSuccess}{' '}
								<div className='card-footer text-center'>
									<span>
										<Link to='/' className='link'>
											Back Home
										</Link>
									</span>
								</div>
							</Alert>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
