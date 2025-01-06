import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import moment from 'moment';
import { createComment, getCommentsNews } from '../../redux/actions';

import './index.css';

export const CommentBox = props => {
	// const { comments } = props.oneNews;
	const loading = props.loading;
	const { slug } = props.slug;
	const [variables, setVariables] = useState({
		names: '',
		email: '',
		commentBody: '',
		slug,
	});

	const dispatch = useDispatch();
	const errors = useSelector(state => state.commentReducer.errors);
	const message = useSelector(state => state.commentReducer.message);
	const comments = useSelector(state => state.commentReducer.comments);

	const onChangeComment = e =>
		setVariables({
			...variables,
			[e.target.name]: e.target.value,
		});

	const data = {
		comment: { ...variables },
	};

	const submitComment = () => {
		dispatch(createComment(data, slug));
	};

	useEffect(() => {
		dispatch(getCommentsNews(slug));
	}, [dispatch, slug]);

	// if(message) {
	// 	window.location.href= `/news/${slug}`;
	// }

	return (
		<div>
			<Row className='mt-3 p-3 border-top'>
				<h5>Leave a Comment </h5>
			</Row>
			<Row className='mb-5 comment-form'>
				<Col sm={12}>
					<Form>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Full Name</Form.Label>
									<Form.Control
										placeholder='Eg: John Peter'
										name='names'
										value={variables.names}
										onChange={onChangeComment}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										placeholder='Eg: email@example.com'
										name='email'
										value={variables.email}
										onChange={onChangeComment}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Comment</Form.Label>
									<Form.Control
										as='textarea'
										placeholder='Comment here...'
										name='commentBody'
										value={variables.commentBody}
										onChange={onChangeComment}
									/>
								</Form.Group>

								<Row className='mt-3 p-3'>
									<div>
										{errors &&
											errors.map((err, i) => (
												<Alert key={i} variant='danger'>
													{err}
												</Alert>
											))}

										{message && <Alert variant='success'>{message}</Alert>}
									</div>
								</Row>

								<Button
									type='button'
									variant='primary'
									className='mt-3 col-sm-3'
									onClick={() => submitComment()}
								>
									<i className='fa fa-paper-plane mr-1'></i> Comment
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col sm={12}>
					<h5>
						<i className='fa fa-comment'></i> Comments{' '}
						<b>
							{comments && comments.length > 0
								? comments.filter(comment => comment.isActive === true).length
								: 'No comment created'}
						</b>
					</h5>
				</Col>
			</Row>
			<Row>
				{loading ? (
					<>
						{comments &&
							comments
								.filter(comment => comment.isActive === true)
								.map((comment, index) => (
									<Col lg={12} md={12} sm={12} key={index}>
										<div className='comment-box' key={index}>
											<div className='comment-box-head'>
												<div className='media'>
													<div className='media-left'>
														<span className='avatar-text'>
															{comment.names.substring(0, 1).toUpperCase()}
														</span>
													</div>
													<div className='media-body'>
														<h4 class='media-heading'>{comment.names}</h4>
														<div class='date'>
															{moment(comment.createdAt).format('LLL')}
														</div>
													</div>
												</div>
											</div>
											<div className='comment-box-body'>
												<div className='detail'> {comment.commentBody} </div>
											</div>
										</div>
									</Col>
								))}
					</>
				) : (
					<Spinner />
				)}
			</Row>
		</div>
	);
};
