import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { AdminLayout } from '../../../layouts';
import DocumentUpload from '../../../components/section/documentUpload';
import { createPublication } from '../../../redux/actions';

export const PublicationsCreate = props => {
	const { history } = props;
	const [uploadedDocumentUrl, setUploadedDocumentUrl] = useState('');
	const [uploadDocumentPercent, SetUploadDocumentPercent] = useState(0);
	const [isDocumentChoosed, setIsDocumentChoosed] = useState(false);
	const [isUploadingDocumentStarted, setIsUploadingDocumentStarted] = useState(
		false
	);
	const [errors, setErrors] = useState(null);
	const [files, setFiles] = useState([]);
	const [variables, setVariables] = useState({
		title: '',
		category: '',
		pubDocument: '',
	});

	const handleOnUploadDocument = async e => {
		e.preventDefault();
		setIsUploadingDocumentStarted(true);
	

		let data = new FormData();
		data.append('file', files[0]);
		data.append('tags', `celestin, image`);
		data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Replace the preset name with your own
		// data.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
		data.append('timestamp', (Date.now() / 1000) | 0);
		data.append('folder', 'QUINCAPARADI/ITEMS');

		const options = {
			onUploadProgress: progressEvent =>
			SetUploadDocumentPercent(
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
				SetUploadDocumentPercent(100);
				setUploadedDocumentUrl(data.secure_url);
				console.log('URRRRR', data.secure_url);
			})
			.catch(err =>{ 
				setIsUploadingDocumentStarted(false);
				console.log(err);});
	};

	const dispatch = useDispatch();

	const errorss = useSelector(state => state.publicationReducer.errors);
	// const message = useSelector(state => state.publicationReducer.message);
	const loading = useSelector(state => state.publicationReducer.loading);

	const onChange = e =>
		setVariables({
			...variables,
			[e.target.name]: e.target.value,
		});

	const data = {
		publication: {
			...variables,
			pubDocument: uploadedDocumentUrl !== '' ? uploadedDocumentUrl : '',
		},
	};

	useEffect(() => {
		if (files && files[0]) {
			setIsDocumentChoosed(true);
		}
	}, [files]);

	const submitPublication = () => {
		if (uploadedDocumentUrl === '') {
			return setErrors(['Please upload publication document to cloud!']);
		}

		if (files.length === 0) {
			return setErrors(['Publication document is Required!']);
		}

		dispatch(createPublication(data, history));
	};

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>GODISCOVER AFRICADocument | Create</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item'>
											<Link
												to='/account/publications'
												className='breadcrumb-link'
											>
												GODISCOVER AFRICADocuments
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
						<Link
							to='/account/publications'
							className='btn btn-block btn-light'
						>
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
											<Form.Label>Document Type</Form.Label>

											<Form.Control
												as='select'
												className='mr-sm-2'
												required
												custom
												value={variables.category}
												name='category'
												onChange={onChange}
											>
												<option value='' disabled={true}>
													select...
												</option>
												<option value='publication'>Advertisement</option>
												{/* <option value='Press Release'>Press Release</option>
												<option value='Covid-19'>Covid-19</option> */}
											</Form.Control>
										</Form.Group>

										<Form.Label>Document</Form.Label>
										<Form.Group>
											<DocumentUpload
												files={files}
												setFiles={setFiles}
												text='document'
												useDropzone={useDropzone}
												handleOnUploadDocument={handleOnUploadDocument}
												uploadDocumentPercent={uploadDocumentPercent}
												isDocumentChoosed={isDocumentChoosed}
												isUploadingDocumentStarted={isUploadingDocumentStarted}
											/>
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
											onClick={() => submitPublication()}
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
