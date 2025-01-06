/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { AppLayout } from '../../layouts';
import {
	Container,
	Row,
	Col,
	ResponsiveEmbed,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { sendContactEmail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { ContactForm } from './ContactForm';
import Contactinfo from './contactinfo';

export const Contact = () => {
	const [validated, setValidated] = useState(false);
	const [user, setUser] = useState({
		names: '',
		email: '',
		subject: '',
		message: '',
	});
	const loading = useSelector(state => state.contact.contactData);
	const contactFailed = useSelector(state => state.contact.contactFailure);

	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(user => ({ ...user, [name]: value }));
	};

	const handleSubmit = e => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}
		e.preventDefault();
		setValidated(true);
		if (user.email && user.message) {
			dispatch(sendContactEmail(user));
		}
		if (!loading && contactFailed === null) {
			setTimeout(function () {
				setUser({
					names: '',
					email: '',
					subject: '',
					message: '',
				});
				setValidated(false);
			}, 1500);
		}
	};

	return (
		<AppLayout>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Contact | GoDiscover Safaris</title>
				<link rel='canonical' href='https://godiscoverafrica.rw//contact' />
				<meta
					name='description'
					content='Contact GoDiscover Safaris on the following address: email: +250 791 349 744, email: info@godiscoverafrica.rw '
				/>
			</Helmet>
			<div className="home-body"></div>
			<Contactinfo/>
		</AppLayout>
	);
};
