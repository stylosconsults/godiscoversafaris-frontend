import React from 'react';
import NavBar from './partials/Navbar';
import SideBar from './partials/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

import '../assets/css/admin.css';

export const AdminLayout = props => {
	return (
		<div className='admin'>
			<div className='dashboard-main-wrapper'>
				<NavBar />
				<SideBar />

				<div className='dashboard-wrapper'>
					<div className='dashboard-ecommerce'>{props.children}</div>

					<section className='footer'>
						<Container fluid>
							<Row>
								<Col sm={12}>Copyright ©2023 GODISCOVER. All rights reserved</Col>
							</Row>
						</Container>
					</section>
				</div>
			</div>
		</div>
	);
};
