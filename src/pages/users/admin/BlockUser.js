import React, { useState } from 'react';
import {
	Button,
	Alert,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { blockUser } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../utils/Loading';

const BlockUser = props => {
	const loading = useSelector(state => state.users.submittedData);
	const blockFailure = useSelector(state => state.users.errors);
	const blockSuccess = useSelector(state => state.users.blockedUser);
	const dispatch = useDispatch();

	const handleBlock = () => {
		dispatch(blockUser(props.user.id));
	};

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const close = () => {
		setModal(false);
	};

	return (
		<div>
			<Link className='btn btn-danger btn-xs' onClick={toggle}>
				<i className='fas fa-ban'></i> Block User
			</Link>
			<Modal show={modal} onHide={toggle}>
				<Modal.Header closeButton>
					<ModalTitle>Are you sure you want to block this user?</ModalTitle>
				</Modal.Header>
				<ModalBody>
					Names: {props.user.lastName} {props.user.firstName} <br />
					Email: {props.user.email}
					{blockFailure && (
						<Alert className='alert-warning'>{blockFailure}</Alert>
					)}
					{blockSuccess && (
						<Alert className='alert-success'>{blockSuccess}</Alert>
					)}
					{loading && <Loading />}
				</ModalBody>
				<ModalFooter>
					<Button
						className='btn btn-sm'
						style={{ backgroundColor: '#c3c3c3' }}
						onClick={() => close()}
					>
						No
					</Button>
					<Button className='btn btn-primary btn-sm' onClick={handleBlock}>
						Yes
					</Button>{' '}
				</ModalFooter>
			</Modal>
		</div>
	);
};
export default BlockUser;
