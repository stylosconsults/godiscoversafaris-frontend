/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import * as API from '../../../api/index';
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

import Spinner from '../../../components/spinner/Spinner';

export const ParticipantMain = () => {
  const token = localStorage.IdToken;
  const decodedToken = jwtDecode(token);

  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const error = useSelector((state) => state.newsReducer.error);

  const getAllParticipants = async () => {
    const allParticipants = await API.getParticipants('/api/participant/all');

    try {
      const allParticipantsList = await allParticipants.json();
      if (allParticipants.status === 200) {
        setLoading(!loading);
        setParticipants(allParticipantsList);
      }
    } catch (error) {
      console.log(error);
      console.clear();
    }
  };

  useEffect(() => {
    getAllParticipants();
  }, []);

  if (error) {
    console.log('error');
  }

  return (
    <AdminLayout>
      <Container fluid className='dashboard-content'>
        <Row>
          <Col sm={10}>
            <div className='page-header'>
              <h2 className='pageheader-title'>Participants</h2>
              <div className='page-breadcrumb'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/account' className='breadcrumb-link'>
                        Dashboard
                      </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      Participant
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </Col>
          {/* <Col sm={2}>
            <Link to='/account/destinations/create' className='btn btn-block btn-light'>
              <i className='fa fa-plus-circle mr-1'></i> Add New
            </Link>
          </Col> */}
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
                        <th scope='col'>Event Name</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Family Name</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Position</th>
                        {/* <th scope='col'>Department</th> */}
                        <th scope='col'>Organization</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Country</th>
                        <th scope='col'>Town</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Email</th>
                        {/* <th scope='col'>Diet Requirements</th> */}
                        <th scope='col'>Amount</th>
                        <th scope='col'>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        <>
                          {participants &&
                            participants.map((event, i) => (
                              <tr key={event.id}>
                                <th scope='row'>{i + 1}</th>
                                <td>{event.eventName}</td>
                                <td>{event.title}</td>
                                <td>{event.familyName}</td>
                                <td>{event.firstName}</td>
                                <td>{event.position}</td>
                                {/* <td>{event.department}</td> */}
                                <td>{event.organization}</td>
                                <td>{event.address}</td>
                                <td>{event.country}</td>
                                <td>{event.town}</td>
                                <td>{event.phone}</td>
                                <td>{event.email}</td>
                                {/* <td>{event.dietRequirements}</td> */}
                                <td>{event.amount}</td>
                                <td>
                                  {moment(event.createdAt).format('MMMM d, y')}
                                </td>
                              </tr>
                            ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan='17'>
                            <Spinner />
                          </td>
                        </tr>
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
