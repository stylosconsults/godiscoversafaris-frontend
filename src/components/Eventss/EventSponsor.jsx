import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import event from "../../assets/assetss/godiscover.jpeg"

const EventSponsor = () => {
  const sponsorLogos=Array(18).fill(event)
  return (
    <Container fluid className="partner-section">
      <h1 className="partners-header">OUR PARTNERS</h1>
      <Row className="bg-light ">
        {
          sponsorLogos.map((logo,index)=>(
            <Col key={index} md={2}>
              <img src={logo} alt={`Partner Logo ${index + 1}`} className="partner-image"  />
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export default EventSponsor
