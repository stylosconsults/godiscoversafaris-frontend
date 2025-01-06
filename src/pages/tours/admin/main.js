import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLayout } from '../../../layouts';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import { getAllTours, changeToursStatus } from '../../../redux/actions';

import Spinner from '../../../components/spinner/Spinner';

export const ToursMain = () => {
  const token = localStorage.IdToken;
  const decodedToken = jwtDecode(token);

  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.toursReducer.tours);
  const theLoading = useSelector((state) => state.toursReducer.loading);
  const error = useSelector((state) => state.toursReducer.error);
  // const message = useSelector(state => state.toursReducer.message);

  const submitToursStatus = (toursStatus, slug) => {
    const data1 = {
      isPublished: toursStatus === true ? 'false' : 'true',
    };
    dispatch(changeToursStatus(slug, data1));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTours());
    setLoading(!theLoading);
  }, [dispatch, theLoading]);

  if (error) {
    console.log('error');
  }
  return (
    <AdminLayout>
      <Container fluid className='dashboard-content'>
        <Row>
          <Col sm={10}>
            <div className='page-header'>
              <h2 className='pageheader-title'>Tours</h2>
              <div className='page-breadcrumb'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/account' className='breadcrumb-link'>
                        Dashboard
                      </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      Tours
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </Col>
          <Col sm={2}>
            <Link
              to='/account/tours/create'
              className='btn btn-block btn-light'
            >
              <i className='fa fa-plus-circle mr-1'></i> Add Tour
            </Link>
          </Col>
        </Row>

        <div className='ecommerce-widget'>
          <Row>
            <div>
              {/* {message && <Alert variant='success'>{message}</Alert>} */}
              {error && <Alert variant='danger'>{error}</Alert>}
            </div>
            <Col xs={12} lg={12} md={12} sm={12}>
              <div className='card'>
                <div className='card-body'>
                  <table className='table table-striped table-hovered'>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th></th>
                        <th scope='col'>Title</th>
                        {/* <th scope='col'>Views</th> */}
                        {/* <th scope='col'>Comments</th> */}
                        <th scope='col'>Price</th>
                        <th scope='col'>Published_At</th>
                        <th scope='col'></th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && !loading ? (
                        <>
                          {data &&
                            data.map((singleTours, i) => (
                              <tr>
                                <th scope='row'>{i + 1}</th>
                                <td>
                                  <Image
                                    alt={singleTours.title}
                                    title={singleTours.title}
                                    src={singleTours.image}
                                    className='img-fluid'
                                    width={50}
                                  />
                                </td>
                                <td> {singleTours.title.substr(0, 40)}... </td>
                                {/* <td>
																	{singleTours.views &&
																	singleTours.views.numberOfReading
																		? singleTours.views.numberOfReading
																		: 0}{' '}
																	<i className='fa fa-eye ml-1'></i>
																</td>
																<td>
																	{singleTours.comments.length}{' '}
																	<i className='fa fa-comment ml-1'></i>
																</td> */}
                                <td>
                                  {singleTours.price1} | {singleTours.price2} | {' '}
                                  {singleTours.price3} | {singleTours.price4} |
                                  {singleTours.pric5}
                                </td>
                                <td>
                                  {moment(singleTours.createdAt).format(
                                    'MMMM d, y',
                                  )}
                                </td>

                                <td>
                                  {decodedToken &&
                                    decodedToken.role === 'admin' && (
                                      <Form>
                                        <Button
                                          variant={
                                            singleTours.isPublished === false
                                              ? 'success'
                                              : 'warning'
                                          }
                                          title={
                                            singleTours.isPublished === false
                                              ? 'Click to publish this tours'
                                              : 'Click to unpublish this tours'
                                          }
                                          className='btn-xs'
                                          onClick={() =>
                                            submitToursStatus(
                                              singleTours.isPublished,
                                              singleTours.slug,
                                            )
                                          }
                                          style={{ display: 'flex' }}
                                        >
                                          {singleTours.isPublished === false ? (
                                            <i className='fas fa-check mr-1'></i>
                                          ) : (
                                            <i className='fa fa-ban mr-1'></i>
                                          )}
                                          {singleTours.isPublished === false
                                            ? 'Publish'
                                            : 'UnPublish'}
                                        </Button>
                                      </Form>
                                    )}
                                </td>
                                <td>
                                  <Link
                                    to={`/account/tours/view/${singleTours.slug}`}
                                    className='btn btn-primary btn-xs'
                                  >
                                    <i className='fa fa-tasks mr-1'></i> Action
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </>
                      ) : (
                        <Spinner />
                      )}
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
};
