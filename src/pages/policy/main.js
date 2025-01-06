import React, { Component } from 'react';
import { AppLayout } from '../../layouts';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../../components/section';

import './index.css';

export class Policy extends Component {
	render() {
		return (
			<AppLayout>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Privacy and Policy | GoDiscover Safaris</title>
					<link rel='canonical' href='https://godiscoverafrica.rw/list' />
					<meta
						name='description'
						content='Privacy and Policy of GoDiscover Safaris'
					/>
				</Helmet>
				<Header title='Privacy Policy' />

				<section className='mt-5  mb-5 policy' style={{backgroundColor: "white"}}>
					<Container>
						<Row>
							<Col sm={10}>
								<h1 className='text-title text-bold mt-3 py-4'>Privacy Commitment</h1>
								<p>
									GoDiscover Safaris Inc. (“GODISCOVER,” “we,” or “us”) knows
									your personal data privacy is important. We are committed to
									respecting your privacy, and we take the responsibility of
									protecting your privacy seriously.
								</p>
								<p>
									For this reason, we have created this Privacy Policy to help
									you understand how we collect, store, process, use and protect
									the information we collect through our website and the
									websites of our associated services such as www.godiscoverafrica.rw
									and other websites we own or manage now or in the future
									(collectively referred to as “website,” “our website,” or
									“this website”). <br />
									<br />
									This Privacy Policy is a binding agreement between you and
									GODISCOVER. We regularly review and update this Privacy Policy (also
									referred to in this agreement as “this policy”). This Privacy
									Policy may be amended, so we recommend that you check it
									regularly. Your continued use of this website after the
									posting of any changes will constitute your acceptance of
									those changes.
								</p>

								<h4 className='title'>
									Information We Collect and How We Use It
								</h4>
								<ul>
									<li>
										<span className='bold'>
											Information You Choose to Give Us:{' '}
										</span>
										We receive and store any information you enter on our
										website or give us by phone, email, our reporting and other
										forms, or in any other way including but not limited to in
										person at our events. On our website, you may request and
										obtain information, register for our events, subscribe to
										our newsletter, and use any other services we provide.
									</li>
								</ul>
								<p>
									To take advantage of these offerings, it is necessary for you
									to disclose personal information (referred to as “personal
									information,” “personally identifiable information,” “personal
									data,” and “your information”) to us, including but not
									limited to one or more of the following identifying
									information: name, age, address, telephone number, email
									address, and credit card details. We use the information you
									provide to respond to your requests, communicate with you,
									provide information about our company and promotional material
									from some of our partners, to deliver membership benefits, and
									customize and improve our services. To purchase our goods or
									services, you must submit financial information in addition to
									certain personal information, which we use to bill you for the
									purchased goods or services. We do not, however, store your
									entire credit card number or bank account information.
									Instead, we keep the last four digits of your credit card,
									debit card, or electronic card number and payment type for
									reference. You have the right to review or have your personal
									information deleted from our system at any time. See below for
									more details.
								</p>
								<ul>
									<li>
										<span className='bold'>Survey Data: </span> The GODISCOVER
										occasionally conducts industry and customer surveys. Your
										survey responses are linked to an IP address and ID number.
										When survey results are reported, they are always aggregated
										meaning survey results are combined and presented as a
										group. Apart from your IP address and survey ID number, your
										personal information is not linked to your survey unless you
										expressly opt in to provide your contact information within
										the survey or in a separate form following the survey. Your
										participation in our surveys is entirely optional. You have
										the choice to decline participation in any industry or
										customer survey.
									</li>
									<li>
										<span className='bold'>
											Information We Automatically Receive From Our Website:{' '}
										</span>{' '}
										We automatically receive and store certain types of
										information whenever you visit our website. Like many
										websites, we may use cookies, which allow us to
										automatically collect certain types of information when your
										Web browser accesses our website or when you view
										advertisements and other content served by us or on our
										behalf on other websites. See the “More About Cookies”
										section below for more information about cookies.
									</li>
									<li>
										<span className='bold'>Information From Others: </span> We
										might receive information from third parties about you whom
										you authorize to interact with our website to provide or
										receive personalized information about you. You have the
										right to have that information deleted at your request
										subject to the terms of this agreement.
									</li>
								</ul>
								<h4 className='title'>
									More About Cookies and Cookie Equivalents
								</h4>
								<p>
									GODISCOVER AFRICAreserves the right to use cookies and the technological
									equivalents of cookies, including social media pixels and
									HTML5 Web Storage (also known as ‘Web Storage’). We use
									cookies to personalize content and ads, to provide social
									media features and to analyze our traffic. We also share
									information about site usage with our partners who may combine
									it with other information that you have provided to them or
									that they have collected from your use of their services.
									Cookies are alphanumeric identifiers that are placed on your
									computer’s hard drive that help us provide our services.{' '}
									<br />
									<br />
									Cookies allow us to recognize your device, make navigating our
									site easier, allow access to members-only and delegate-only
									paid features, provide certain features such as data access
									control and user permission validation and provide
									personalized advertisements about our services on other
									websites. For instance, cookies allow us to make it easier for
									us to give you access to the members-only HUB and to provide
									dynamic and relevant information to you for your business
									interests and needs as you navigate our website for. Most
									browsers automatically accept all cookies by default. <br />
									<br />
									If located in Europe, you have the right to choose whether or
									not to accept cookies. However, they are an important part of
									how our website’s function, so you should be aware that if you
									choose to refuse, disable, or remove cookies, this could
									affect the availability and functionality of our website. Most
									web browsers are set to accept cookies by default. You should
									be able to adjust your browser’s settings to reject new
									cookies, prompt you before accepting a cookie, or disable
									cookies. Check your browser’s help section for instructions on
									how to do this. <br />
									<br />
									The use of cookies by our partners and affiliates is also
									covered by this Privacy Policy. We do not have access or
									control over these third-party cookies or policies.
								</p>
							</Col>
						</Row>
					</Container>
				</section>
			</AppLayout>
		);
	}
}
