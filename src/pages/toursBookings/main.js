/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import * as API from "../../api/index";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTourBookings } from "../../api/bookingsApi";
import { AdminLayout } from "../../layouts";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Alert,
} from "react-bootstrap";

import Spinner from "../../components/spinner/Spinner";
import axios from "axios";
const token = localStorage.getItem("IdToken");
const baseUrl = process.env.REACT_APP_BACKEND;
export const TourBookings = () => {
  const token = localStorage.IdToken;
  const decodedToken = jwtDecode(token);

  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const error = useSelector((state) => state.newsReducer.error);

  const getAllParticipants = async () => {
    const allParticipants = await API.getParticipants("/api/participant/all");

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

  const getAllTourBookings = async () => {
    const allBookings = await axios.get(`${baseUrl}/api/order`);
    setBookings(
      allBookings.data.allorders.filter((items) => items.itemType === "tour")
    );
    console.log(
      allBookings.data.allorders.filter((items) => items.itemType === "tour")
    );
  };

  const getTours = async () => {
    const allTours = await axios.get(`${baseUrl}/api/tours`);
    setTours(allTours.data.tours);
    console.log(allTours.data.tours);
  };

  useEffect(() => {
    getAllParticipants();
    getAllTourBookings();
    getTours();
  }, []);

  if (error) {
    console.log("error");
  }

  return (
    <AdminLayout>
      <Container fluid className="dashboard-content">
        <Row>
          <Col sm={10}>
            <div className="page-header">
              <h2 className="pageheader-title">Bookings</h2>
              <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/account" className="breadcrumb-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Bookings
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

        <div className="ecommerce-widget">
          <Row>
            <div>
              {/* {message && <Alert variant='success'>{message}</Alert>} */}
              {error && <Alert variant="danger">{error}</Alert>}
            </div>
            <Col xs={12} lg={12} md={12} sm={12}>
              <div className="card">
                <div className="card-body">
                  <table className="table table-striped table-hovered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">client Name</th>
                        <th scope="col">Tour name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Booking Status</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        {/* <th scope='col'>Diet Requirements</th> */}
                        <th scope="col">Amount</th>
                        <th scope="col">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading ? (
                        <>
                          {bookings &&
                            bookings.map((tourBooking, index) => {
                              // Find the corresponding tour in allTours array
                              const tour = tours.find(
                                (t) => t.id === tourBooking.itemsArray[0].id
                              );
                              console.log("id", tour);
                              // If tour is found, display the tour name
                              const tourName = tour
                                ? tour.title
                                : "Tour Not Found";
                              return (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{tourBooking.client.names}</td>
                                  <td>{tourName}</td>{" "}
                                  {/* Display the tour name */}
                                  <td>{tourBooking.client.address}</td>
                                  <td>{tourBooking.status}</td>
                                  <td>{tourBooking.client.phoneNumber}</td>
                                  <td>{tourBooking.clientEmail}</td>
                                  <td>{tourBooking.amount}</td>
                                  <td>
                                    {moment(tourBooking.createdAt).format(
                                      "MMMM d, y"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </>
                      ) : (
                        <tr>
                          <td colSpan="17">
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
