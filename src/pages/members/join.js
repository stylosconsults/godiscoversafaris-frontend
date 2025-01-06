import React, { Component } from 'react';
import { AppLayout } from '../../layouts';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import './index.css';

export class MemberJoin extends Component {
	render() {
		return (
			<AppLayout>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Apply for membership | GoDiscover Safaris</title>
					<link rel='canonical' href='https://godiscoverafrica.rw/list' />
					<meta
						name='description'
						content='Apply to become a member of GoDiscover Safaris'
					/>
				</Helmet>
				
	
			</AppLayout>
		);
	}
}
