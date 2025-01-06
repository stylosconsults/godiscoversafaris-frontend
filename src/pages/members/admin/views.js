import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { TinyEditor } from '../../../components/plugin';

export class MembersView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.match.params.name,
		};
	}

	render() {
		return (
			<AdminLayout>
				<Container fluid className='dashboard-content'>
					<Row>
						<Col sm={10}>
							<div className='page-header'>
								<h2 className='pageheader-title'>
									Member | {this.state.title}
								</h2>
								<div className='page-breadcrumb'>
									<nav aria-label='breadcrumb'>
										<ol className='breadcrumb'>
											<li className='breadcrumb-item'>
												<Link to='/account' className='breadcrumb-link'>
													Dashboard
												</Link>
											</li>
											<li className='breadcrumb-item'>
												<Link to='/account/members' className='breadcrumb-link'>
													Members
												</Link>
											</li>
											<li className='breadcrumb-item'>View</li>
											<li
												className='breadcrumb-item active'
												aria-current='page'
											>
												{this.state.title}
											</li>
										</ol>
									</nav>
								</div>
							</div>
						</Col>
						<Col sm={2}>
							<Link to='/account/members' className='btn btn-block btn-light'>
								<i className='fa fa-arrow-left mr-1'></i> Go Back
							</Link>
						</Col>
					</Row>

					<div className='ecommerce-widget'>
						<Row>
							<Col xs={8} lg={8} md={12} sm={12}>
								<div className='card'>
									<div className='card-body'>
										<Form>
											<Form.Group>
												<Form.Label>Full Name</Form.Label>
												<Form.Control type='text' />
											</Form.Group>
											<Form.Group>
												<Form.Label>Email Address</Form.Label>
												<Form.Control type='email' />
											</Form.Group>
											<Form.Group>
												<Form.Label>Description</Form.Label>
												<TinyEditor />
											</Form.Group>
										</Form>
									</div>
									<div className='card-footer'>
										<div className=''>
											<Button variant='danger' className='mr-2'>
												<i className='fa fa-trash'></i> Delete
											</Button>
											<Button variant='primary'>
												<i className='fa fa-save'></i> Save
											</Button>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</AdminLayout>
		);
	}
}
