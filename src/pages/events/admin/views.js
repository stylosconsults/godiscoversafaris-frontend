import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Modal from 'react-bootstrap/Modal';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	Image,
	Alert,
} from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import './index.css';
import { AdminLayout } from '../../../layouts';

import { getEvent, deleteEvent, updateAnEvent } from '../../../redux/actions';
import ImageUpload from '../../../components/section/imageUpload';

export const EventsView = props => {
	const token = localStorage.IdToken;
	const decodedToken = jwtDecode(token);
	const { slug } = props.match.params;
	const [modal, setModal] = useState(false);

	const { history } = props;
	const [body, setBody] = useState('');
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [uploadImagePercent, SetUploadImagePercent] = useState(0);
	const [isImageChoosed, setIsImageChoosed] = useState(false);
	const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
	const [errors, setErrors] = useState(null);
	const [files, setFiles] = useState([]);
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);

	const [variables, setVariables] = useState({
		title: '',
		startDate: '',
		endDate: '',
		place: '',
		price: '',
		description: '',
		image: '',
	});
	const [startDateValue, onChangeStartDate] = useState(null);
	const [endDateValue, onChangeEndDate] = useState(null);

	const toggle = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	const setText = (e, editor) => {
		const textData = editor.getContent();
		setBody(textData);
	};

	const onChange = e =>
		setVariables({
			...variables,
			[e.target.name]: e.target.value,
		});

	const event = useSelector(state => state.eventReducer.event);
	// const message = useSelector(state => state.eventReducer.message);
	const error = useSelector(state => state.eventReducer.error);

	const dispatch = useDispatch();

	const deleteAnEvent = slug => {
		dispatch(deleteEvent(slug, history));
		setModal(false);
	};

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

	
	useEffect(() => {
		setVariables({
			title: event.title,
			startDate: event.startDate,
			endDate: event.endDate,
			place: event.place,
			price: event.price,
			description: event.description,
			image: event.image,
		});
		if (slug) {
			setEdit(true);
			setLoading(true);
		}
		if (files && files[0]) {
			setIsImageChoosed(true);
		}
		dispatch(getEvent(slug));
	}, [
		dispatch,
		event.description,
		event.endDate,
		event.image,
		event.place,
		event.price,
		event.startDate,
		event.title,
		files,
		slug,
	]);

	const data = {
		event: {
			...variables,
			startDate: startDateValue,
			endDate: endDateValue,
			description: body !== '' ? body : variables.description,
			image: uploadedImageUrl !== '' ? uploadedImageUrl : variables.image,
		},
	};

	const updateEvent = () => {
		if (startDateValue === null || endDateValue === null) {
			return setErrors(['Event period(dates) are required!']);
		}

		if (startDateValue > endDateValue) {
			return setErrors(['Starting date can not be greater than Ending date!']);
		}

		dispatch(updateAnEvent(slug, data, history));
	};

	return (
		<AdminLayout>
			<Container fluid className='dashboard-content'>
				<Row>
					<Col sm={10}>
						<div className='page-header'>
							<h2 className='pageheader-title'>Event | {event.title}</h2>
							<div className='page-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link to='/account' className='breadcrumb-link'>
												Dashboard
											</Link>
										</li>
										<li className='breadcrumb-item'>
											<Link to='/account/events' className='breadcrumb-link'>
												Events
											</Link>
										</li>
										<li className='breadcrumb-item'>View</li>
										<li className='breadcrumb-item active' aria-current='page'>
											{event.title}
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</Col>
					<Col sm={2}>
						<Link to='/account/events' className='btn btn-block btn-light'>
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
											<Form.Label>
												Starting Date{' '}
												{moment(variables.startDate).format('LLL')}{' '}
											</Form.Label>
											<DateTimePicker
												onChange={onChangeStartDate}
												value={startDateValue}
												className='date-controls'
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>
												Ending Date {moment(variables.endDate).format('LLL')}{' '}
											</Form.Label>
											<DateTimePicker
												onChange={onChangeEndDate}
												value={endDateValue}
												className='date-controls'
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>Place / Location</Form.Label>
											<Form.Control
												type='text'
												name='place'
												value={variables.place}
												onChange={onChange}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>Price / Amount</Form.Label>
											<Form.Control
												type='number'
												name='price'
												value={variables.price}
												onChange={onChange}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>Image Cover</Form.Label>
											<ImageUpload
												coverURL={
													variables.image !== ''
														? variables.image
														: '../../assets/assetss/event.png'
												}
												edit={edit}
												files={files}
												setFiles={setFiles}
												text='Event Cover '
												useDropzone={useDropzone}
												handleOnUploadImage={handleOnUploadImage}
												uploadImagePercent={uploadImagePercent}
												isImageChoosed={isImageChoosed}
												isUploadingImageStarted={isUploadingImageStarted}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>Description</Form.Label>
											<Editor
											    apiKey='rtvl5mnciwns1upf4xigvav5mqzimvy9kw68iqbbd0thtfau'
												init={{
													height: 300,
													menubar: false,
												}}
												name='description'
												value={variables.description}
												onChange={setText}
											/>
										</Form.Group>
									</Form>
								</div>
								<div className='card-footer'>
									<div className=''>
										<div>
											{errors &&
												errors.map((value, indx) => (
													<Alert key={indx} variant='danger'>
														{value}
													</Alert>
												))}
											{/* {message && <Alert variant='success'>{message}</Alert>} */}
											{error && <Alert variant='danger'>{error}</Alert>}
										</div>

										{decodedToken && decodedToken.role === 'admin' ? (
											<>
												<Button
													variant='danger'
													className='mr-2'
													onClick={() => toggle()}
												>
													<i className='fa fa-trash'></i> Delete
												</Button>

												<Button
													className='btn btn-lg'
													variant='primary'
													onClick={() => updateEvent()}
												>
													<i className='fa fa-save'></i>{' '}
													{loading ? 'Update' : 'Updating...'}
												</Button>
											</>
										) : (
											''
										)}
										{modal && (
											<Modal show={modal} onHide={() => closeModal()}>
												<Modal.Header closeButton key={event.id}>
													<Modal.Title id='contained-modal-title-vcenter'>
														Are you sure you want to detete this event? "
														<b style={{ color: 'brown' }}>{event.title}</b>"
													</Modal.Title>
												</Modal.Header>
												<Modal.Footer>
													<Button
														className='btn btn-sm'
														style={{ backgroundColor: '#c3c3c3' }}
														onClick={() => closeModal()}
													>
														No
													</Button>{' '}
													<Button
														className='btn btn-primary btn-sm'
														onClick={() => deleteAnEvent(event.slug)}
													>
														Yes
													</Button>{' '}
												</Modal.Footer>
											</Modal>
										)}
									</div>
								</div>
							</div>
						</Col>
						<Col sm={4}>
							<Image
								alt='Travel Banner'
								title='Travel Banner'
								src={
									event.image
										? event.image
										: '../../assets/assetss/event.png'
								}
								className='img-fluid'
							/>
						</Col>
					</Row>
				</div>
			</Container>
		</AdminLayout>
	);
};
