import React, { Component } from 'react';
import { AppLayout } from '../../layouts';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { Header } from '../../components/section';
import { Helmet } from 'react-helmet';
import './index.css';

export class MemberInfo extends Component {
	render() {
		return (
			<AppLayout>
				<Helmet>
					<meta charSet='utf-8' />
					<title>About our members | GoDiscover Safaris</title>
					<link rel='canonical' href='https://godiscoverafrica.rw/list' />
					<meta
						name='description'
						content='Information about the members of GoDiscover Safaris'
					/>
				</Helmet>
				<Header title='Become a Member' />

				<section className='mt-5 mb-5 become-member'>
					<Container>
						<Row>
							<Col
								md={4}
								className='py-5 member-descrption text-white text-center mr-4'
							>
								<Image
									alt='Travel Banner'
									title='Travel Banner'
									src='http://www.ansonika.com/mavia/img/registration_bg.svg'
									className='img-fluid mt-5'
								/>

								<h2 className='py-4'>Registration</h2>
								<p>
									Tation argumentum et usu, dicit viderer evertitur te has. Eu
									dictas concludaturque usu, facete detracto patrioque an per,
									lucilius pertinacia eu vel.
								</p>
							</Col>
							<Col md={7} className='bg-white py-5'>
								<Container>
									<Row className='mb-4'>
										<div className='stepwizard'>
											<div className='stepwizard-row'>
												<div className='stepwizard-step'>
													<Button
														variant='primary'
														className='btn-circle'
														disabled='disabled'
													>
														<i className='fa fa-user'></i>
													</Button>
													<p>Account</p>
												</div>
												<div className='stepwizard-step'>
													<Button
														variant='primary'
														className='btn-circle'
														disabled='disabled'
													>
														<i className='fa fa-user-plus'></i>
													</Button>
													<p>Membership</p>
												</div>
												<div className='stepwizard-step'>
													<Button
														variant='default'
														className='btn-circle'
														disabled='disabled'
													>
														<i className='fa fa-credit-card'></i>
													</Button>
													<p>Payment</p>
												</div>
											</div>
										</div>
									</Row>

									<h5 className='pb-4 border-bottom'>Membership Information</h5>

									<Form className='mt-4'>
										<Row>
											<Col>
												<Form.Group>
													<Form.Label>Password</Form.Label>
													<Form.Control placeholder='********' />
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<Form.Label>Confirm Password</Form.Label>
													<Form.Control placeholder='********' />
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group>
													<Form.Label>Image</Form.Label>
													<Form.Control as='file' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Documents</Form.Label>
													<Form.Control as='file' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Website Link</Form.Label>
													<Form.Control placeholder='Eg: https://www.google.com' />
												</Form.Group>
												<Form.Group>
													<Form.Label>Description</Form.Label>
													<Form.Control
														as='textarea'
														rows='3'
														placeholder='Description here...'
													/>
												</Form.Group>
												<Button
													type='button'
													variant='primary'
													className='mt-3 col-sm-3'
												>
													<i className='fa fa-paper-plane mr-1'></i> Submit
												</Button>
											</Col>
										</Row>
									</Form>
								</Container>
							</Col>
						</Row>
					</Container>
				</section>
			</AppLayout>
		);
	}
}
