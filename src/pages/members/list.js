import React from 'react';
import { AppLayout } from '../../layouts';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import './index.css';
export const MemberList = () => {
	return (
		<AppLayout>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Members  | GoDiscover Safaris</title>
				<link rel='canonical' href='https://godiscoverafrica.rw/list' />
				<meta
					name='description'
					content='Members of Rwand GoDiscover Safaris'
				/>
			</Helmet>
			
		</AppLayout>
	);
};
