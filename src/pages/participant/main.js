import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { AppLayout } from '../../layouts';
import { LatestNews } from '../../components/section';
import { NewsBox } from '../../components/section';

import './index.css';

export const News = () => {
	return (
		<AppLayout>
			<section className='st-about-head py-5'>
				<Container>
					<Row>
						<NewsBox />
					</Row>

					<Row className='mt-5'>
						<LatestNews />
					</Row>
				</Container>
			</section>
		</AppLayout>
	);
};
