import React, { useEffect, useState } from "react";
import { AppLayout } from "../../layouts";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import moment from "moment";
import { RightBar } from "../../components/section";
import "./index.css";
import { getEvents } from "../../redux/actions";
import Spinner from "../../components/spinner/Spinner";

export const Events = () => {
  const [loading, setLoading] = useState(true);
  const events = useSelector((state) => state.eventReducer.events);
  const error = useSelector((state) => state.eventReducer.error);
  const theLoading = useSelector((state) => state.eventReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    setTimeout(function () {
      setLoading(!theLoading);
    }, 500);
  }, [dispatch, theLoading]);

  return (
    <AppLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Events | GoDiscover Safaris</title>
        <link rel="canonical" href="https://godiscoverafrica.rw//events" />
        <meta name="description" content="GoDiscover Safaris Events" />
      </Helmet>
      <section className="bg-light">
        <Container className="mt-2">
          <Row>
            <Col sm={12}>
              <h1 className="text-title text-bold mt-3 py-4">Events</h1>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={8}>
              <Row>
                <Col sm={12}>
                  {events && !loading ? (
                    <>
                      <Row>
                        <div>{error && <h4>{error}</h4>}</div>
                        {events &&
                          events
                            .filter((event) => event.isApproved === true)
                            .slice(0, 4)
                            .map((event, idx) => (
                              <Col lg={6} md={6} sm={12} xs={12} key={idx}>
                                <Link to={`/event/${event.slug}`}>
                                  <div className="events-box background-white-light mb-5">
                                    <div className="event-img-box">
                                      <img
                                        src={
                                          event.image
                                            ? event.image
                                            : "../../assets/assetss/event.png"
                                        }
                                        className="img-fluid"
                                        alt=""
                                        data-aos="fade-up"
                                        data-aos-easing="ease-in"
                                        data-aos-delay="500"
                                      ></img>
                                    </div>
                                    <div className="events-status-box">
                                      <span className="price-event">
                                        {event.price
                                          ? event.price + " $"
                                          : "Free entry"}
                                      </span>
                                    </div>
                                    <div className="content p-3 mt-2">
                                      <span
                                        className="text-bold text-small color-yellow"
                                        data-aos="fade-in"
                                        data-aos-easing="ease-in"
                                        data-aos-delay="500"
                                      >
                                        {moment(event.startDate).format("LLL")}{" "}
                                        CAT
                                      </span>

                                      <h2
                                        className="text-bold text-upper-case text-normal mt-2"
                                        data-aos="fade-right"
                                        data-aos-easing="ease-in"
                                        data-aos-delay="500"
                                      >
                                        {event.title}
                                      </h2>
                                    </div>
                                  </div>
                                </Link>
                              </Col>
                            ))}
                      </Row>
                    </>
                  ) : events.length === 0 ||
                    events === null ||
                    events === undefined ? (
                    <div>{<h4>No previous events avalaible</h4>}</div>
                  ) : (
                    <Spinner />
                  )}
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              {/* <RightBar tweet={true} news={true} /> */}
            </Col>
          </Row>
        </Container>
      </section>
    </AppLayout>
  );
};
