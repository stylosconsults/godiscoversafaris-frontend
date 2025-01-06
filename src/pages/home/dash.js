import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLayout } from '../../layouts';
import { Container, Row, Col } from 'react-bootstrap';
import {
  getAllNews,
  getEvents,
  getPublications,
  getUsers,
  getSubscribers,
  getAllTours,
} from '../../redux/actions';

export const Dashboard = () => {
  const data = useSelector((state) => state.newsReducer.news);
  const tours = useSelector((state) => state.toursReducer.tours);
  const events = useSelector((state) => state.eventReducer.events);
  const publications = useSelector(
    (state) => state.publicationReducer.publications,
  );
  const users = useSelector((state) => state.users.usersData);
  const subscribers = useSelector(
    (state) => state.maillistReducer.subscribersSuccess,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getAllTours());
    dispatch(getEvents());
    dispatch(getPublications());
    dispatch(getUsers());
    dispatch(getSubscribers());
  }, [dispatch]);

  return (
    <AdminLayout>
      <Container fluid className='dashboard-content'>
        <Row>
          <Col sm={12}>
            <div className='page-header'>
              <h2 className='pageheader-title'>Dashboard</h2>
            </div>
          </Col>
        </Row>

        <div className='ecommerce-widget'>
          <Row>
            {/* <Col lg={3} md={6} sm={12} xs={12}>
              <div className='card border-3 border-top border-top-primary'>
                <div className='card-body'>
                  <h5 className='text-muted'>Users</h5>
                  <div className='metric-value d-inline-block'>
                    <h1 className='mb-1'>{users && users.length}</h1>
                  </div>
                </div>
              </div>
            </Col> */}

            <Col lg={3} md={6} sm={12} xs={12}>
              <div className='card border-3 border-top border-top-primary'>
                <div className='card-body'>
                  <h5 className='text-muted'>Publications</h5>
                  <div className='metric-value d-inline-block'>
                    <h1 className='mb-1'>
                      {publications && publications.length}
                    </h1>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12} xs={12}>
              <div className='card border-3 border-top border-top-primary'>
                <div className='card-body'>
                  <h5 className='text-muted'>Events</h5>
                  <div className='metric-value d-inline-block'>
                    <h1 className='mb-1'>{events && events.length}</h1>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12} xs={12}>
              <div className='card border-3 border-top border-top-primary'>
                <div className='card-body'>
                  <h5 className='text-muted'>Destinations</h5>
                  <div className='metric-value d-inline-block'>
                    <h1 className='mb-1'>{data && data.length}</h1>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} xs={12}>
              <div className='card border-3 border-top border-top-primary'>
                <div className='card-body'>
                  <h5 className='text-muted'>Tours</h5>
                  <div className='metric-value d-inline-block'>
                    <h1 className='mb-1'>{tours && tours.length}</h1>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {/* <Col lg={3} md={6} sm={12} xs={12}>
							<div className='card border-3 border-top border-top-primary'>
								<div className='card-body'>
									<h5 className='text-muted'>Members</h5>
									<div className='metric-value d-inline-block'>
										<h1 className='mb-1'>10</h1>
									</div>
								</div>
							</div>
						</Col> */}
          </Row>
        </div>
      </Container>
    </AdminLayout>
  );
};
