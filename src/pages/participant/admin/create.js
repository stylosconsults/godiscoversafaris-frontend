import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { TinyEditor } from '../../../components/plugin';
import { createOneNews } from '../../../redux/actions';
import ImageUpload from '../../../components/section/imageUpload';

export const NewsCreate = () => {
	const [body, setBody] = useState('');
	const [variables, setVariables] = useState({
		title: '',
		newsBody: '',
		authorId: '',
		image: '',
	});
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [uploadImagePercent, SetUploadImagePercent] = useState(0);
	const [isImageChoosed, setIsImageChoosed] = useState(false);
	const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
	const [errors, setErrors] = useState(null);
	const [files, setFiles] = useState([]);

	const handleOnUploadImage = async e => {
		e.preventDefault();
		setIsUploadingImageStarted(true);
		let data = new FormData();
		data.append('file', files[0]);
		data.append('tags', `celestin, image`);
		data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own
		// data.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
		data.append('timestamp', (Date.now() / 1000) | 0);
		data.append('folder', 'QUINCAPARADI/ITEMS');

		const options = {
			onUploadProgress: progressEvent =>
			SetUploadImagePercent(
				Math.round((progressEvent.loaded * 100) / progressEvent.total)
			),
		};

		await fetch(
			`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
			{
				method: 'post',
				body: data,
			},
			options
		)
			.then(resp => resp.json())
			.then(data => {
				SetUploadImagePercent(100);
				setUploadedImageUrl(data.secure_url);
				localStorage.removeItem('imageUrl');
				localStorage.setItem('imageUrl', data.secure_url);
				console.log('UPLOADED', data.secure_url);
			})
			.catch(err =>{ 
				setIsUploadingImageStarted(false);
				console.log(err);});
		
	};

	const setText = (e, editor) => {
		const textData = editor.getContent();
		setBody(textData);
	};

	const dispatch = useDispatch();

	const errorss = useSelector(state => state.newsReducer.errors);
	// const message = useSelector(state => state.newsReducer.message);
	const loading = useSelector(state => state.newsReducer.loading);

	const onChange = e =>
		setVariables({
			...variables,
			[e.target.name]: e.target.value,
		});

	const data = {
		news: {
			...variables,
			newsBody: body,
			image: uploadedImageUrl !== '' ? uploadedImageUrl : '',
		},
	};

	useEffect(() => {
		if (files && files[0]) {
			setIsImageChoosed(true);
		}
	}, [files]);

	const submitNews = () => {
		if (uploadedImageUrl === '') {
			return setErrors(['Please upload blog Cover image to cloud!']);
		}

		if (files.length === 0) {
			return setErrors(['Blog Cover image is Required!']);
		}

		dispatch(createOneNews(data));
	};

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>Destinations |Create</h2>
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
										<li className='breadcrumb-item active' aria-current='page'>
											Create
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link to='/account/destinations' className='btn btn-block btn-light'>
							<i className='fa fa-arrow-left mr-1'></i> Go Back
						</Link>
					</Col>
				</Row>

				<div className='ecommerce-widget'>
					<Row>
						<Col xs={8} lg={8} md={12} sm={12}>
							<div className='card'>
								<div className='card-body'>
									<Form>
										<Form.Group>
											<Form.Label>Title</Form.Label>
											<Form.Control
												type='text'
												name='title'
												value={variables.title}
												onChange={onChange}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>Image Cover</Form.Label>
											<ImageUpload
												files={files}
												setFiles={setFiles}
												text='Blog Cover '
												useDropzone={useDropzone}
												handleOnUploadImage={handleOnUploadImage}
												uploadImagePercent={uploadImagePercent}
												isImageChoosed={isImageChoosed}
												isUploadingImageStarted={isUploadingImageStarted}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>Body</Form.Label>
											<TinyEditor onChange={setText} value={body} />
										</Form.Group>
									</Form>

									<Row className='mt-3'>
										<Col xs={12} lg={12} md={12} sm={12}>
											<div>
												{errors &&
													errors.map((value, indx) => (
														<Alert key={indx} variant='danger'>
															{value}
														</Alert>
													))}

												{errorss &&
													errorss.map((err, i) => (
														<Alert key={i} variant='danger'>
															{err}
														</Alert>
													))}

												{/* {message && <Alert variant='success'>{message}</Alert>} */}
											</div>
										</Col>
									</Row>
								</div>
								<div className='card-footer'>
									<div className=''>
										<Button
											className='btn btn-lg'
											variant='primary'
											onClick={() => submitNews()}
										>
											<i className='fa fa-save'></i>{' '}
											{loading ? 'Save' : 'Saving...'}
										</Button>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</AdminLayout>
	);
};
