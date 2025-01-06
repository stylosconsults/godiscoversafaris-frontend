import React from 'react';
import { AppLayout } from '../../layouts';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { Header } from '../../components/section';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';

import './index.css';

export const Faq = () => {

	const aboutTourism = [
		{
			key: 21,
			question: `When is it best to visit and where to stay?`,
			answer: `Rwanda as a destination, can be visited all year around, its parks are accessible throughout the year and all other destinations are readily available throughout the year. However, let’s note that there are two rainy seasons which start from March to end May and the other one from September to December others months are sunny. `,
		},

		{
			key: 26,
			question: `In the event my COVID-19 results are delayed, what happens? Who pays the additional waiting nights/days and if I had a tourism booking, do I get a refund?`,
			answer: `Each hotel will have a site manager who will advise on the results within the allotted time. The Rwanda Development Board reservations team <b>(reservations@rdb.rw)</b> can facilitate the rescheduling of booked permits in case of any issue related to the COVID-19 pandemic in line with the revised booking policy.`,
		},
		{
			key: 27,
			question: `Can I continue to stay in the same hotel after receiving my test results?`,
			answer: `The Government of Rwanda has negotiated special rates at the designated hotels for the waiting period. Should a guest wish to remain in the hotel after receiving a negative test result, they are welcome to extend their stay at the hotel’s regular rates; however, they will be assigned a new room.`,
		},
		{
			key: 29,
			question: `Is there any tax exoneration on tourism entities during  COVID 19 pandemic?`,
			answer: `Refer Them to RRA customer care line 3004`,
		},
	];

	const aboutCovid = [
		{
			key: 30,
			question: `If I tested negative for COVID-19 on arrival in Rwanda and will spend less than 120 hours in the country, do I need to take another test to depart from Rwanda?`,
			answer: `Please refer to this	<a href="https://www.rbc.gov.rw." aria-label='rbc'
			rel='noopener noreferrer' target="_blank">www.rbc.gov.rw.</a>
			`,
		},
		{
			key: 31,
			question: `While I am waiting for my COVID19 test results at a designated hotel, can I be visited by friends?`,
			answer: `No. Guests waiting for their results at designated hotels are required to remain in isolation. They are welcome to use electronic devices while at the hotel but must respect the privacy of other guests at all times. more information refer <a href="https://www.rbc.gov.rw." aria-label='rbc'
			rel='noopener noreferrer' target="_blank">www.rbc.gov.rw.</a>
			`,
		},
		{
			key: 32,
			question: `In the event my COVID-19 results are delayed, what happens? Who pays the additional waiting nights/days and if I had a tourism booking, do I get a refund?`,
			answer: `Each hotel will have a site manager who will advise on the results within the allotted time. The Rwanda Development Board reservations team <b>(reservations@rdb.rw)</b>can facilitate the rescheduling of booked permits in case of any issue related to the COVID-19 pandemic in line with the revised booking policy.`,
		},
		{
			key: 33,
			question: `Can I continue to stay in the same hotel after receiving my test results?`,
			answer: `The Government of Rwanda has negotiated special rates at the designated hotels for the waiting period. Should a guest wish to remain in the hotel after receiving a negative test result, they are welcome to extend their stay at the hotel’s regular rates; however, they will be assigned a new room.`,
		},
		{
			key: 35,
			question: `Is there any support related to HR management during this pandemic?`,
			answer: `COVID 19 period should not be taken as a useless period, a lot can be done with regards to staff in the T & H sector. Most importantly,  employers should not just lay them down  without considering other options like training, rotations...`,
		},
		{
			key: 36,
			question: `Is it mandatory to take a COVID-19 test before departure from Rwanda?`,
			answer: `All travellers departing from Rwanda must test negative for COVID-19. The only accepted test is a SARS-CoV 2 Real Time Polymerase Chain Reaction (RT-PCR) performed within 120 hours before departure. Other tests, such as Rapid Diagnostics Test (RDTs), are not accepted. We encourage travellers to book and pay for their tests at least 2 days prior to departure through the online platform available on <a href="https://www.rbc.gov.rw." aria-label='rbc'
			rel='noopener noreferrer' target="_blank">www.rbc.gov.rw.</a> 
			Guests will be facilitated to take this final test in popular tourist locations including Musanze, Nyagatare, Nyamasheke, Rwamagana and Rubavu. Visitors can also be tested in Kigali at Amahoro Stadium “Petit Stade” in Remera and the Rwanda Biomedical Centre Gikondo Branch at the Office of Vaccination Programme on KK 6 Ave. The cost of the test is USD 50. More details and payment methods can be found here.`,
		},
		// {
		// 	key: 37,
		// 	question: `Is there any tax exoneration on tourism entities during  COVID 19 pandemic?`,
		// 	answer: `Refer Them to RRA customer care line 3004.`,
		// },
		{
			key: 38,
			question: `As a business owner in the hospitality and tourism sector, what am I requested to open again as businesses are now allowed to open?`,
			answer: `First read the instructions published by RDB regarding all types of business falling under the T & H sector. May 2020`,
		},
		{
			key: 39,
			question: `What are the sanctions an entity can face if they do not abide by COVID 19 prevention measures?`,
			answer: `There are various measures taken by the government of Rwanda to control COVID 19 pandemic and some sanctions including fines and permanent closure of entities have been put in place. <a href="https://www.gov.rw/koronavirusi/" 	aria-label='gov'
			rel='noopener noreferrer' target="_blank">https://www.gov.rw/koronavirusi/</a> `,
		},
	];
	return (
		<AppLayout>
			<Helmet>
				<meta charSet='utf-8' />
				<title>FAQ | GoDiscover Safaris</title>
				<link rel='canonical' href='https://godiscoverafrica.rw//faq' />
				<meta
					name='description'
					content='GoDiscover Safaris Frequently Asked Questions (FAQs)'
				/>
			</Helmet>
			<br />
			<Header className='py-2 title text-light' title='Frequently Asked Questions (FAQs)' />
			<section className='faq bg-light py-5 '>
				<Container>
					<Row>
						<Col sm={12}>
							<Card>
								
								
								<Card.Header>
									<h4 className='title py-2 mt-4'>QUESTIONS ABOUT TOURISM</h4>
								</Card.Header>
								{/* <br /> */}
								{aboutTourism &&
									aboutTourism.map((item, i) => (
										<Card.Body>
											<Accordion defaultActiveKey='0'>
												{/* <Card> */}
												<Accordion.Toggle
													as={Card.Header}
													style={{ marginBottom: '-15px' }}
													eventKey={item.key}
												>
													<p className='title'>
														<i class='fa fa-caret-right' aria-hidden='true'></i>{' '}
														<b> {item.question}</b>
													</p>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey={item.key}>
													<Card.Body className='text-normal'>
														{ReactHtmlParser(item.answer)}
													</Card.Body>
												</Accordion.Collapse>
											</Accordion>
										</Card.Body>
									))}
							
								{/* about COVID */}
								<Card.Header>
									<h4 className='title py-2 mt-4'>QUESTIONS ABOUT COVID-19</h4>
								</Card.Header>
								{/* <br /> */}
								{aboutCovid &&
									aboutCovid.map((item, i) => (
										<Card.Body>
											<Accordion defaultActiveKey='0'>
												{/* <Card> */}
												<Accordion.Toggle
													as={Card.Header}
													style={{ marginBottom: '-15px' }}
													eventKey={item.key}
												>
													<p className='title'>
														<i class='fa fa-caret-right' aria-hidden='true'></i>{' '}
														<b> {item.question}</b>
													</p>
												</Accordion.Toggle>
												<Accordion.Collapse eventKey={item.key}>
													<Card.Body className='text-normal'>
														{ReactHtmlParser(item.answer)}
													</Card.Body>
												</Accordion.Collapse>
											</Accordion>
										</Card.Body>
									))}
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</AppLayout>
	);
};
