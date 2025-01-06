import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const OurWork = () => {
	return (
		<section
			id={'gala-dinner'}
			className='pt-block-association members-section section gala-dinner py-5'
		>
			<Container className='py-5'>
				<Row className=''>
					<Col lg={12}>
						<div className='content about-description text-center py-5 mt-5'>
							<p className='content-bottom'>OUR WORKS</p>
							<p className='bold about-description text-justify'>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
								<br />
								i.e. sustainable attractions that are eco-friendly, with long
								term environmental impact.
							</p>
							<p className='text-normal bold content-gala'></p>
						</div>
					</Col>
				</Row>
				<Row className='justify-content-center py-1 mb-5'>
					<Col lg={12}>
						<div className='content text-center'>
							<h2 className='text-title text-white py-2'>
								Highlights From 2019 Edition
							</h2>
						</div>
						<Row>
							<Col>
								<Image
									src='https://picsum.photos/200/300/?blur=2'
									alt=''
									className='img-fluid rounded-right border border-warning'
								/>
							</Col>
							<Col>
								<Image
									src='https://picsum.photos/200/300/?blur=2'
									alt=''
									className='img-fluid rounded-right border border-warning'
								/>
							</Col>
							<Col>
								<Image
									src='https://picsum.photos/200/300/?blur=2'
									alt=''
									className='img-fluid rounded-right border border-warning'
								/>
							</Col>
							<Col>
								<Image
									src='https://picsum.photos/200/300/?blur=2'
									alt=''
									className='img-fluid rounded-right border border-warning'
								/>
							</Col>
						</Row>
					</Col>
				</Row>
				<br />
			</Container>
		</section>
	);
};
