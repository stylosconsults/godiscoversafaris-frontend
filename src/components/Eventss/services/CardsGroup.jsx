import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import 'animate.css';
import "./index.css";
import servicesData from "../servicesData";

const CardsGroup = () => {
  return (
      <Container fluid className="mt-4 bg-light py-5 ">
        <Row className="justify-content-md-center animate__animated animate__fadeIn">
          <Col md={5} className="mb-4">
          <a href="/tours">
            <Card className="card-1">
              <Card.Body>
                <Card.Title>{servicesData[0].title}</Card.Title>
                <br/>
                <Card.Text className="text-light">
                {servicesData[0].description}
                </Card.Text>
                {/* <Button className="btn-custom-primary animate-button bg-transparent border-light">Button <ArrowRightCircle/></Button> */}
              </Card.Body>
            </Card>
            </a>
          </Col>
          <Col md={5} className="mb-4">
          <a href="/airticket">
            <Card className="card-2">
              <Card.Body>
                <Card.Title> {servicesData[1].title}</Card.Title>
                <br/>
                <Card.Text className="text-light">
                {servicesData[1].description}
                </Card.Text>
                {/* <Button className="btn-custom-primary animate-button bg-transparent border-light">Button <ArrowRightCircle/></Button> */}
              </Card.Body>
            </Card>
            </a>
          </Col>
          <Col md={5} className="mb-4">
          <a href="/carrental">
            <Card className="card-3">
              <Card.Body>
                <Card.Title>{servicesData[2].title}</Card.Title>
                <br/>
                <Card.Text className="text-light">
                {servicesData[2].description}
                </Card.Text>
                {/* <Button className="btn-custom-primary animate-button bg-transparent border-light">Button <ArrowRightCircle className="animate__animated animate__fadeIn"/></Button> */}
              </Card.Body>
            </Card>
            </a>
          </Col>
          <Col md={5} className="mb-4">
          <a href="/events">
            <Card className="card-4">
              <Card.Body>
                <Card.Title>{servicesData[3].title}</Card.Title>
                <br/>
                <Card.Text className="text-light">
                {servicesData[3].description}
                </Card.Text>
                {/* <Button className="btn-custom-primary animate-button bg-transparent border-light">Button <ArrowRightCircle/></Button> */}
              </Card.Body>
            </Card>
            </a>
          </Col>
          <Col md={5} className="mb-4">
          <a href="/accomodation">
            <Card className="card-5">
              <Card.Body>
                <Card.Title>{servicesData[4].title}</Card.Title>
                <br/>
                <Card.Text className="text-light">
                {servicesData[4].description}
                </Card.Text>
                {/* <Button className="btn-custom-primary animate-button bg-transparent border-light">Button <ArrowRightCircle/></Button> */}
              </Card.Body>
            </Card>
            </a>
          </Col>
        </Row>
      </Container>
  );
};

export default CardsGroup;
