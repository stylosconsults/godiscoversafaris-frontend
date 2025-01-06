import React, { useState } from 'react';
import {
	Button,
	Alert,
	ModalTitle,
	ModalBody,
	ModalFooter,
	Modal,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { unblockUser } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../utils/Loading';

const UnblockUser = props => {
	const loading = useSelector(state => state.users.submittedData);
	const unblockFailure = useSelector(state => state.users.errors);
	const unblockSuccess = useSelector(state => state.users.unblockedUser);
	const dispatch = useDispatch();

	const handleSignout = () => {
		dispatch(unblockUser(props.user.id));
	};

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const close = () => {
		setModal(false);
	};

	return (
		<div>
			<Link className='btn btn-primary btn-xs' onClick={toggle}>
				<i className='fas fa-unlock-alt'></i> Unblock User
			</Link>
			<Modal show={modal} onHide={toggle}>
				<Modal.Header closeButton>
					<ModalTitle>Are you sure you want to unblock this user?</ModalTitle>
				</Modal.Header>
				<ModalBody>
					Names: {props.user.lastName} {props.user.firstName} <br />
					Email: {props.user.email}
					{unblockFailure && (
						<Alert className='alert-warning'>{unblockFailure}</Alert>
					)}
					{unblockSuccess && (
						<Alert className='alert-success'>{unblockSuccess}</Alert>
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
					<Button className='btn btn-primary btn-sm' onClick={handleSignout}>
						Yes
					</Button>{' '}
				</ModalFooter>
			</Modal>
		</div>
	);
};
export default UnblockUser;
