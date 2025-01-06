import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
// import event1 from "../../assets/assetss/event-bg.png";
import 'animate.css';
import { Link } from 'react-router-dom';
import eventData from './eventData';

const EventsGroup = () => {
  return (
    <div fluid className='bg-light py-0 '>
      <div className='event-container'>
        <div>
          <h1 className='text-light'>Events Management</h1>
          <p className='text-light'>
            In our experience, no single event is identical to another, that’s
            why we treat every event as if it were new and we pay full attention
            as if building from scratch. We carefully assess the needs of a
            clients’ event and offer solutions for its realisation, always with
            the client’s budget in mind.
          </p>
          <a
            href='/eventform'
            // target="_blank"
            rel='noopener noreferrer'
            className=''
          >
            <Button
              className='btn-custom-primary'
              style={{
                backgroundColor: '#065952',
                borderColor: '#065952',
                textAlign: 'center',
              }}
            >
              Request for event support{' '}
            </Button>
          </a>
        </div>
      </div>
      <Container fluid>
        <Row className='animate__animated animate__fadeIn custom-cards'>
          {eventData.map((event) => {
            return (
              <Col md={4} className='mb-4'>
                <Card>
                  <Card.Img variant='top' src={event.imageUrl} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Link to={`/events/${event.id}`}>
                        <Button
                          style={{
                            backgroundColor: '#065952',
                            borderColor: '#065952',
                            textAlign: 'center',
                          }}
                          className='text-white m-3 btn btn-lg animate__animated animate__pulse animate__infinite'
                        >
                          View more <ArrowRightCircle />
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default EventsGroup;
