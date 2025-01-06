import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col } from 'react-bootstrap';

export class MembersMain extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [1, 2, 3, 4, 5] };
	}
	render() {
		return (
			<AdminLayout>
				<Container fluid className='dashboard-content'>
					<Row>
						<Col sm={12}>
							<div className='page-header'>
								<h2 className='pageheader-title'>Members</h2>
								<div className='page-breadcrumb'>
									<nav aria-label='breadcrumb'>
										<ol className='breadcrumb'>
											<li className='breadcrumb-item'>
												<Link to='/account' className='breadcrumb-link'>
													Dashboard
												</Link>
											</li>
											<li
												className='breadcrumb-item active'
												aria-current='page'
											>
												Members
											</li>
										</ol>
									</nav>
								</div>
							</div>
						</Col>
					</Row>

					<div className='ecommerce-widget'>
						<Row>
							<Col xs={12} lg={12} md={12} sm={12}>
								<div className='card'>
									<div className='card-body'>
										<table className='table table-striped table-hovered'>
											<thead>
												<tr>
													<th scope='col'>#</th>
													<th scope='col'>Full Name</th>
													<th scope='col'>Email</th>
													<th scope='col' style={{ width: '50%' }}>
														Description
													</th>
													<th scope='col'></th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map(index => (
													<tr>
														<th scope='row'>{index}</th>
														<td>Imena Org</td>
														<td>johnpeter@gmail.com</td>
														<td>
															In publishing and graphic design, Lorem ipsum is a
															placeholder text commonly used to demonstrate the
															visual form of a document or a typeface without
															relying on meaningful content
														</td>
														<td>
															<Link
																to='/account/members/view/john-peter'
																className='btn btn-primary btn-xs'
															>
																<i className='fa fa-tasks mr-1'></i> Action
															</Link>
														</td>
													</tr>
												))}
											</tbody>
										</table>
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
