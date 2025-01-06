import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { logoutUser } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

const Logout = () => {
	const dispatch = useDispatch();

	const handleSignout = () => {
		dispatch(logoutUser());
	};

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const close = () => {
		setModal(false);
	};

	return (
		<div>
			<Link className='nav-link text-danger' onClick={toggle}>
				<i className='fas fa-newspaper'></i> Logout
			</Link>
			<Modal show={modal} onHide={toggle}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Are you sure you want to logout?
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button className="btn btn-sm" style={{backgroundColor: '#c3c3c3'}} onClick={() => close()}>
						No
					</Button>
					<Button className="btn btn-primary btn-sm" onClick={handleSignout}>
						Yes
					</Button>{' '}
				</Modal.Footer>
			</Modal>
		</div>
	);
};
export default Logout;
