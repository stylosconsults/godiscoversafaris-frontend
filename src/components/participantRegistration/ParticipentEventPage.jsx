import React ,{ useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppLayout } from "../../layouts";
import ParticipantForm from "./ParticipantForm";
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions";
import Spinner from "../../components/spinner/Spinner";

const ParticipentEvent = () => {
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
      <Container fluid className="bg-white">
        <Row>
          <Col className="intro-col my-3" lg={12} sm={12}>
            <h1 className="header text-light">Participant Registration form</h1>
            <p className="para text-light">GoDiscover International Conference</p>
            <p className="para text-light">29 May 2024, Kigali Convention Canter, Kigali, Rwanda</p>
          </Col>
          <Col className="second-intro">
            <Link to="#">info@godiscoverafrica.rw</Link>
            <p className="para002">(+250) 791 349 744</p>
            <p className="para002">Kigali Rwanda </p>
            <Link to="#">https://godiscoverafrica.rw</Link>
          </Col>
        </Row>
        <ParticipantForm />
        <div>
          <h1 className="reg-header">Data Protection Statement & Personality / Image Rights</h1>
          <p>
            By filling out the registration form, the participant gives consent
            that GoDiscover can process the data provided within the framework
            of the conference and allow photographs to be made during the
            conference. This includes, unless registered participants object,
            all handling needed for the applicant’s participation at the event
            and for the drafting of a list of participants which will be
            distributed at the conference, and placing photographs in the
            pictures gallery accessible only by participants, in the GoDiscover
            newsletter or selecting some for articles on the conference in a
            journal or newspaper, or in any other web/printed publication.
          </p>
          <p>
            Right of access: applicants have a right to access and ask for
            changing or deleting their personal data, which will be kept by
            GoDiscover.
          </p>
          <p>
            GoDiscover would like to contact you occasionally to keep you
            informed of future GoDiscover events and other relevant information.
            If you do not wish us to do this, please tick this box to be removed
            from our general distribution list
          </p>
        </div>
      </Container>
    </AppLayout>
  );
};

export default ParticipentEvent;
