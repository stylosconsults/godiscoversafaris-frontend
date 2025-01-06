import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './index.css';

export const Header = (props) => {
	return (
		<Container>
			<Row className='col-sm-12'>
				<h2 className='bold text-light'>{props.title}</h2>
			</Row>
		</Container>
	);
};
