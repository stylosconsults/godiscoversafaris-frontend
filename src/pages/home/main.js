import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'dotenv/config';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Container, Row, Col, Button, ResponsiveEmbed } from 'react-bootstrap';
import { AppLayout } from '../../layouts';
import { getPublications } from '../../redux/actions';
import { Subscribe } from '../maillist';
import './new.css';

export const Home = () => {
	const publications = useSelector(
		state => state.publicationReducer.publications
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPublications());
	}, [dispatch]);

	return (
		<AppLayout>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Home | GoDiscover Safaris</title>
				<link rel='canonical' href='https://godiscoverafrica.rw/' />
			</Helmet>
			<section className='video-screen'>
				{/* <div className='content text-left' style={{ top: 160 }}>
					<p className='content-top'>GoDiscover Safaris</p>
					<p className='content-bottom'>Effective advocacy for tourism</p>
				</div> */}
			<h1>SLIDE SHOW IMAGES</h1>
			</section>

			<div className='phone-responsive-welcome'>
				<p>Welcome to </p>
				<h2>Rwanda</h2>
				<h2>GoDiscover Safaris</h2>
			</div>

			<section className='about-screen mt-0'>
				<Container className='py-3'>
					<Row className='py-2 border-top'>
						<Col lg={6} md={5} sm={12} xs={12}>
							<h1 className='title'>
							GoDiscover <br />
							Safaris
							</h1>
						</Col>
						<Col lg={6} md={7} sm={12} xs={12}>
							<p className='description'>
								GoDiscover Safaris was established in 2006, with a
								mandate of enhancing business opportunities through effective
								lobbying and advocacy for the tourism and hospitality industry
								in Rwanda.
							</p>
							<Link to='/about'>
								<Button
									variant='default'
									className='btn btn-custom-primary mt-0'
								>
									Read more
								</Button>
							</Link>
						</Col>
					</Row>
				</Container>
			</section>

			<section className='covid-screen mt-2 static' id={'covid-19'}>
				<Container>
					<Row>
						<Col>
							<Col lg={12} className='justify-content-center'>
								<p className='description justify-content-center'>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
								<center className='mb-3'>
									<Link to='/faq'>
										<Button
											variant='default'
											className='btn btn-custom-primary mt-0 py-3 pl-5 pr-5'
										>
											<b>Read more FAQs</b>
										</Button>
									</Link>
								</center>
							</Col>
						</Col>
					</Row>

				</Container>
			</section>
			<section className='about-news mt-0 section static static-one'>
				<Container
					style={{
						paddingTop: 0,
						paddingBottom: 0,
						marginTop: '-20px',
					}}
				>
					<Row className='mt-0'>
						<Col lg={4} md={4} sm={4} xs={12}>
							<Link to='/Destinations'>
								<div className='news-block text-center mb-3'>
									<p>Destinations</p>
								</div>
							</Link>
						</Col>
						<Col lg={4} md={4} sm={4} xs={12}>
							<Link to='/Destinations'>
								<div className='news-block text-center mb-3'>
									<p>Destinations</p>
								</div>
							</Link>
						</Col>
						<Col lg={4} md={4} sm={4} xs={12}>
							<Link to='/blogs'>
								<div className='news-block text-center mb-3'>
									<p>BLOGS</p>
								</div>
							</Link>
						</Col>
						
					</Row>
				</Container>
			</section>
			<section className='about-screen mt-0'>
				<Container className='py-4'>
					<p className='title text-center'>GODISCOVER AFRICAOFFICE</p>
					<Row className='border-top'>
						<Col lg={6} md={6} sm={12} xs={12} className='p-2 mt-1'>
							<p className='title pb-3'>Location</p>
							<ResponsiveEmbed aspectRatio='4by3' className='mt-2'>
								<embed src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63799.99735817496!2d30.103524999999998!3d-1.9533690000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc76b5e00aaa31b51!2sM%26M%20Plaza!5e0!3m2!1sen!2srw!4v1605274623851!5m2!1sen!2srw' />
							</ResponsiveEmbed>
						</Col>
						<Col lg={6} md={6} sm={12} xs={12} className='pt-2 pl-5 pr-5 mt-1'>
							<p className='text-normal'>
								<p className=' title'>Contacts</p>
								<p className='py-2'>
									<i className='fa fa-phone mr-2'></i> ‎+250 791 349 744 <br />
									<i className='fa fa-inbox mr-2'></i> info@godiscoverafrica.rw <br />
								
								</p>

								<p>
									Kigali, Rwanda <br />
									Kicukiro KK 366 Street <br />
								
								</p>

								<div className='menu social-icon py-4'>
									<a
										href='#'
										className='mr-3'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Facebook page'
									>
										<i className='fab fa-facebook'></i>
									</a>
									<a
										href='#'
										className='mr-3'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Twitter page'
									>
										<i className='fab fa-twitter'></i>
									</a>
									<a
										href='#'
										className='mr-3'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Instagram page'
									>
										<i className='fab fa-instagram'></i>
									</a>

									<a
										href='#'
										className='mr-3'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Linkedin page'
									>
										<i className='fab fa-linkedin'></i>
									</a>
								</div>
							</p>
							<Link to='/contact'>
								<Button
									variant='default'
									className='btn btn-custom-primary mt-3'
								>
									Contact us
								</Button>
							</Link>
						</Col>
					</Row>
					<Row className='justify-content-center py-1'>
						<Col lg={6} md={6} sm={12} xs={12}>
							<p className='text-title text-center'>
								Subscribe to our mailing list to receive tourism updates, event
								notices, and publications.{' '}
							</p>
							<Subscribe />
						</Col>
					</Row>
				</Container>
			</section>
		</AppLayout>
	);
};
