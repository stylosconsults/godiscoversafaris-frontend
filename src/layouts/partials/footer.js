import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Footer extends React.Component {
	render() {
		return (
			<section className='footer'>
				<Container fluid>
					<Row>
						<Col sm={12}>
							Copyright © {new Date().getFullYear()} GODISCOVER. All rights reserved
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}
