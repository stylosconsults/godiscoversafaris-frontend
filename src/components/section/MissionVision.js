import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Quote from '../../assets/img/quote.png';
export default function MissionVision() {
	return (
		<section className='custom-about-section py-5' id={'mission-vision'}>
			<Container>
				<Row>
					<Col lg={12} md={12} sm={12}>
						<Row>
							<Col lg={4} md={4} sm={12} className='mb-4'>
								<Container className='background-white-light py-2 text-center'>
									<Image
										src={Quote}
										className='img-fluid'
										title='image'
										alt='image'
									/>
									<h2 className='text-bold text-normal mt-2'>Core Values</h2>
									<p className='mt-2 text-small'>
										<i>>> Accountability and transparency</i>

										<br />

										<i>>> Member orientation</i>
									</p>
								</Container>
							</Col>

							<Col lg={4} md={4} sm={12} className='mb-4'>
								<Container className='background-white-light py-2 text-center'>
									<Image
										src={Quote}
										className='img-fluid'
										title='image'
										alt='image'
									/>
									<h2 className='text-bold text-normal mt-2'>Mission</h2>
									<p className='mt-2 text-small'>
										<i>
											To effectively advocate and reinforce an enabling business
											environment for its members
										</i>
									</p>
								</Container>
							</Col>

							<Col lg={4} md={4} sm={12} className='mb-4'>
								<Container className='background-white-light py-3 text-center'>
									<Image
										src={Quote}
										className='img-fluid'
										title='image'
										alt='image'
									/>
									<h2 className='text-bold text-normal mt-2'>Vision</h2>
									<p className='mt-2 text-small'>
										<i>
											To ensure profitable and sustainable tourism businesses
											for a prosperous Rwanda
										</i>
									</p>
								</Container>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</section>
	);
}
