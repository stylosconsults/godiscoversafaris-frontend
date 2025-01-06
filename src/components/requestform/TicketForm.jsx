import React from "react";
import { AppLayout } from "../../layouts";
import { Container, Row, Col, Form } from "react-bootstrap";
import ticket from "../../assets/assetss/ticket.svg";
import "./index.css";
import { BeatLoader } from "react-spinners";

const TicketForm = () => {
  return (
    <AppLayout>
      <Container fluid className="bg-white">
        <Row>
          <Col className="form-column d-flex flex-column justify-content-center align-items-center">
            <img src={ticket} alt="" />
            <h3 className="text-light">Book Now for you next destination</h3>
          </Col>
          <Col className="p-5">
            <Form onSubmit="">
              <Form.Group>
                <Form.Label>fullName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user name"
                  required
                  name="fullName"
                  className="form-control-lg"
                />
                <Form.Control.Feedback type="invalid">
                  Full name is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Eg: email@example.com"
                  required
                  name="email"
                  className="form-control-lg"
                />
                <Form.Control.Feedback type="invalid">
                  email is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>depature date</Form.Label>
                <Form.Control
                  type="Date"
                  placeholder="21"
                  required
                  name="dapartureDate"
                  className="form-control-lg"
                />
                <Form.Control.Feedback type="invalid">
                  departure date required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>arrival date</Form.Label>
                <Form.Control
                  type="Date"
                  placeholder="Eg: email@example.com"
                  required
                  name="arrivalDate"
                  className="form-control-lg"
                />
                <Form.Control.Feedback type="invalid">
                  enter your arrival date
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>departure name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="add your departure name"
                  required
                  name="email"
                  className="form-control-lg"
                />
                <Form.Control.Feedback type="invalid">
                  Full name is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>destination name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="add your destination name..."
                  required
                  name="email"
                  className="form-control-lg"
                />
                <Form.Control.Feedback type="invalid">
                  Full name is required
                </Form.Control.Feedback>
              </Form.Group>
              <button type="submit" className="mt-3 col-sm-4 btn-ticket ">
                {" "}
                <BeatLoader color="#fff" />
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default TicketForm;
