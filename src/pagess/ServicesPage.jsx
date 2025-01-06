import React from "react";
import CardsGroup from "../components/Eventss/services/CardsGroup";
import { AppLayout } from "../layouts";

const ServicesPage = () => {
  return (
    <div className="events-parent">
      <AppLayout>
        <div className="home-body"></div>
        <CardsGroup />
      </AppLayout>
    </div>
  );
};

export default ServicesPage;
