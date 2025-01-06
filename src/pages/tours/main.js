import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { AppLayout } from '../../layouts';
import { LatestTours } from '../../components/section';
import { ToursBox } from '../../components/section';

import './index.css';

export const Tours = () => {
	return (
		<AppLayout>
			<div className="home-body"></div>
			<section className='py-5 about-screen px-4'>
				<Container>
					<Row>
						<ToursBox />
					</Row>
					</Container>
					<Row className='mt-5'>
						<LatestTours />
					</Row>
				
			</section>
		</AppLayout>
	);
};
