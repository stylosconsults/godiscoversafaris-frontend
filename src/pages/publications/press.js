import React from 'react';
import { Helmet } from 'react-helmet';
import { AppLayout } from '../../layouts';
import { Container, Row, Col } from 'react-bootstrap';
import { RightBar } from '../../components/section';
import { PressRelease } from '../../components/publication/mainPressRelease';
import './index.css';

export const PressView = () => {
	return (
		<AppLayout>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Press Release | GoDiscover Safaris</title>
				<link rel='canonical' href='https://godiscoverafrica.rw/list' />
				<meta
					name='description'
					content='Press Release of GoDiscover Safaris'
				/>
			</Helmet>
			<section>
				<Container className='py-4'>
					<Row>
						<Col sm={12}>
							<h1 className='text-title text-bold py-1'>Press Releases</h1>
						</Col>
					</Row>

					<Row className='mt-4'>
						<Col sm={8}>
							<PressRelease />
						</Col>

						<Col sm={4}>
							<RightBar tweet={true} news={false} />
						</Col>
					</Row>
				</Container>
			</section>
		</AppLayout>
	);
};
