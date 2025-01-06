import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBarPage from "../pagess/navPage/NavBarPage";
import "./index.css";
import { Footer } from "../components/footer";
export const AppLayout = (props) => {
  return (
    <div className="home-styles">
      <NavBarPage />
      <main className="carousel-container">{props.children}</main>
      <br/>
			<br/>
      <Footer />
    </div>
  );
};
