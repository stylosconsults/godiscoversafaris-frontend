import React from "react";
import { Nav, NavDropdown, Navbar, Container,Button,Badge } from "react-bootstrap";
import "./index.css";

const MostTopNav = () => {
  return (
    <Container fluid className="mostnav d-flex py-2 px-5 align-items-center ">
        <h3 className="text-light pt-2">COVID-19</h3>
        <Button className="bg-transparent border-light ml-2 ">latest information</Button>
    </Container>
  );
};

export default MostTopNav;
