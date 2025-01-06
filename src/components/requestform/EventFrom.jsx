import React from "react";
import { AppLayout } from "../../layouts";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Header } from '../../components/section';
import { Helmet } from 'react-helmet';
import "./index.css";
import { ContactForm } from "../../pages/contact/ContactForm";

const EventForm = () => {
  return (
    <AppLayout>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Make a request for an event management support | GoDiscover Safaris</title>
					<link rel='canonical' href='https://godiscoversafaris.com' />
					<meta
						name='description'
						content='Make a request for an event management support'
					/>
				</Helmet>
				<div className="home-body"></div>
				<Header title='Make a request for an event management support' />

				<section className='mt-5 mb-5 become-member bg-light'>
					<Container>
						<Row className="justify-content-center">
							<Col md={8} className='bg-white py-5 px-5'>
								<Container className="px-5">
									<h5 className='py-4 border-bottom'>Fill the form below</h5>
									<ContactForm/>
								</Container>
							</Col>
						</Row>
					</Container>
				</section>
			</AppLayout>
  );
};

export default EventForm;
