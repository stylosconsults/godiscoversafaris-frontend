import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Associations } from '../associations';

export default function SummaryInfo() {
	return (
		<div className="mb-4">
			<section className='custom-about-action-section py-5 mb-4'>
				<Container>
					<Row>
						<Col lg={6} md={4} sm={12}>
							<div className='left'>
								<h2 className='text-large text-bold member-title mt-5'>
									What Are Our <br />{' '}
									<span className='color-yellow'>Members</span> Associations{' '}
									<span className='color-yellow'>?</span>
								</h2>
							</div>
						</Col>

						<Col lg={3} md={4} sm={12} className='border-right'>
							<Container className='background-white-light py-5 text-center'>
								<h2 class='text-large'>5+</h2>
								<h3 className='text-bold text-normal mt-3'>Associations</h3>
								<p className='mt-4 text-small'>
									<i>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</i>
								</p>
							</Container>
						</Col>

						<Col lg={3} md={4} sm={12}>
							<Container className='background-white-light py-5 text-center'>
								<h2 class='text-large'>850+</h2>
								<h3 className='text-bold text-normal mt-3'>Members</h3>
								<p className='mt-4 text-small'>
									<i>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</i>
								</p>
							</Container>
						</Col>
					</Row>

					<Associations />
				</Container>
			</section>
		</div>
	);
}
