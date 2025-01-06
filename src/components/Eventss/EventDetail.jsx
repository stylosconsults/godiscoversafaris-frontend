/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
// import "animate.css";
import { AppLayout } from '../../layouts';
import { useParams } from 'react-router-dom';
import eventData from './eventData';
import ReactHtmlParser from 'react-html-parser';
import './index.css';
import { Header } from '../section';
import Contactinfo from '../../pages/contact/contactinfo';

const EventDetail = ({ events }) => {
  // const { id } = props.match.params;

  const { id } = useParams();
  const event = eventData.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <AppLayout>
      <div className='home-body'></div>
      <Header className='py-2 title text-light' title={event.title} />
      <br />
      <section className='faq bg-light py-5'>
        <Container>
          <Row>
            <Col sm={12}>
              <Card>
                <Card.Header className='justify-content-center text-center'>
                  <h4 className='title py-2 mt-4 justify-content-left text-left'>
                    {event.description}
                  </h4>
                </Card.Header>
                {/* <br /> */}
                {event.body &&
                  event.body.map((item, i) => (
                    <Card.Body>
                      <Accordion defaultActiveKey='0'>
                        {/* <Card> */}
                        <Accordion.Toggle
                          as={Card.Header}
                          style={{ marginBottom: '-15px' }}
                          eventKey={item.title}
                        >
                          <p className='title'>
                            <i class='fa fa-caret-right' aria-hidden='true'></i>{' '}
                            <b> {item.title}</b>
                          </p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item.title}>
                          <Card.Body className='text-normal'>
                            {ReactHtmlParser(item.description)}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Accordion>
                    </Card.Body>
                  ))}
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
	  <br/>
	  <br/>
	  <Contactinfo/>
    </AppLayout>
  );
};

export default EventDetail;
