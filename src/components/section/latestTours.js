import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

import Spinner from '../spinner/Spinner';
import { getAllTours } from '../../redux/actions';

import './index.css';

export const LatestTours = ({isHome}) => {
  const [loading, setLoading] = useState(true);

  const data = useSelector((state) => state.toursReducer.tours);
  const theLoading = useSelector((state) => state.toursReducer.loading);
  const error = useSelector((state) => state.toursReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTours());
    setTimeout(function () {
      setLoading(!theLoading);
    }, 500);
  }, [dispatch, theLoading]);

  if (error) {
    console.log(error);
    console.clear();
  }

  return (
    <section className='st-news bg-light p-5'>
    {isHome && <h1 style={{textAlign:'center'}} className='p-4'>Explore our tour packages</h1>}
        <Row>
          <Col sm={12}>
            <Row>
              {data && !loading ? (
                <>
                  {data &&
                    data
                      .filter((singleTours) => singleTours.isPublished === true)
                      .slice(2, 5)
                      .map((singleTours, i) => (
                        <Col lg={4} md={4} sm={12} xs={12} key={i}>
                          <Link to={`/tour/${singleTours.slug}`}>
                            <div className='events-box background-white-light'>
                              <img
                                src={singleTours.image}
                                className='img-fluid tours-img-fit'
                                title={singleTours.title}
                                alt={singleTours.title}
                              />
                              <div className='content mt-3'>
                                <span className='text-bold text-small color-yellow'>
                                  {moment(singleTours.createdAt).format(
                                    'MMMM d, y',
                                  )}
                                </span>

                                <h5>{singleTours.title}</h5>

                                <p>
                                  {ReactHtmlParser(
                                    singleTours.toursBody.substr(0, 130),
                                  )}
                                  ...
                                  <br />
                                  <span className='news-body-shadow'></span>
                                </p>
                              </div>
                            </div>
                          </Link>
                        </Col>
                      ))}
                </>
              ) : (
                <Spinner />
              )}
            </Row>
          </Col>
        </Row>
        {isHome &&  <div className='d-flex justify-content-center'>
            <Link to='/tours'>
              <button
                style={{
                  backgroundColor: '#065952',
                  borderColor: '#065952',
                  textAlign: 'center',
                }}
                className='text-white m-3 btn btn-lg animate__animated animate__pulse animate__infinite'
              >
                More packages
              </button>
            </Link>
          </div>}
    </section>
  );
};
