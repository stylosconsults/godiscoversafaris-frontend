import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Twitter, Facebook, Whatsapp } from 'react-social-sharing';
import ReactHtmlParser from 'react-html-parser';
import { AppLayout } from '../../layouts';
import { getSingleTours } from '../../redux/actions';

import './index.css';
import Spinner from '../../components/spinner/Spinner';
import { Booking } from '../booking/main';

export const ToursView = (props) => {
  const [loading, setLoading] = useState(true);
  const { slug } = props.match.params;
  const urlPath = window.location.toString();

  const oneTours = useSelector((state) => state.toursReducer.oneTours);
  const theLoading = useSelector((state) => state.toursReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleTours(slug));
    setLoading(!theLoading);
  }, [dispatch, slug, theLoading]);

  // const jsonData =
  //   oneTours.itenerary &&
  //   oneTours.itenerary.map((jsonString) => JSON.parse(jsonString));
  return (
    <AppLayout>
      <div className='home-body'></div>
      <section className='st-read-tours py-4 mt-5 mb-5 bg-light'>
        <Container>
          <Row>
            <Col sm={8}>
              <Row>
                <Col sm={12}>
                  <h2 className='mb-2'>
                    <b> {oneTours.title}</b>
                  </h2>
                  {/* <span className='mb-2 mt-1'>
                    {//moment(oneTours.createdAt).format('MMMM d, y')}
                  </span> */}

                  {!loading && oneTours.image ? (
                    <Image
                      alt='Travel Banner'
                      title='Travel Banner'
                      src={oneTours.image}
                      className='img-fluid mt-3 mb-2'
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <Spinner />
                  )}

                  <p className='mt-4'> {ReactHtmlParser(oneTours.toursBody)}</p>
                </Col>

                {/* <Col sm={12}>
                <div className='py-2' style={{ marginBottom: '10px' }}>
                  {oneTours.price1 !== 0 ? (
                    <b> ${oneTours.price1} for 1 Person</b>
                  ) : (
                    ''
                  )}
                </div>
                </Col>
                <Col sm={12}>
                <div className='py-2' style={{ marginBottom: '10px' }}>
                  {oneTours.price2 !== 0 ? (
                    <b> ${oneTours.price2} for 2 Person</b>
                  ) : (
                    ''
                  )}
                </div>
                </Col>
                <Col sm={12}>
                <div className='py-2' style={{ marginBottom: '10px' }}>
                  {oneTours.price3 !== 0 ? (
                    <b> ${oneTours.price3} for 3 Person</b>
                  ) : (
                    ''
                  )}
                </div>
                </Col>

                <Col sm={12}>
                <div className='py-2' style={{ marginBottom: '10px' }}>
                  {oneTours.price4 !== 0 ? (
                    <b> ${oneTours.price4} for 4 Person</b>
                  ) : (
                    ''
                  )}
                </div>
                </Col>
                <Col sm={12}>
                <div className='py-2' style={{ marginBottom: '10px' }}>
                  {oneTours.price5 !== 0 ? (
                    <b> ${oneTours.price5} for 5 Person</b>
                  ) : (
                    ''
                  )}
                </div>
                </Col> */}
                {/* <Row>
                  {jsonData && !loading && jsonData.length >0 ? (
                    <>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th>What we will do</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jsonData &&
                            jsonData.map((da, i) => (
                              <tr key={i}>
                                <td>Day {da.day}</td>
                                <td>
                                  <h6> {da.title}</h6>
                                  <br />
                                  {da.body}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                  <div>
                   {loading ? (<Spinner />):''} 
                   </div>
                  )}
                </Row> */}

                <Col sm={12}>
                  <Facebook solidcircle big link={urlPath} />
                  <Twitter solidcircle big link={urlPath} />
                  <Whatsapp
                    solidcircle
                    big
                    message='Share on Whatsapp'
                    link={urlPath}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Booking
                price1={oneTours.price1}
                price2={oneTours.price2}
                price3={oneTours.price3}
                price4={oneTours.price4}
                price5={oneTours.price5}
                id={oneTours.id}
                itemType={'tour'}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </AppLayout>
  );
};
