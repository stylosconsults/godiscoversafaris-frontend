import React from "react";
import { Button, Container } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";

const EventsWelcome = ({event}) => {
  return (
    <div className="event-container">
      <div >
        <h1 className="text-light">{event.title}</h1>
        <p className="text-light">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventsWelcome;
