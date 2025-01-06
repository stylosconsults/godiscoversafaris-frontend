import React from "react";
import EventsGroup from "../components/Eventss/EventsGroup";
import EventSponsor from "../components/Eventss/EventSponsor";
import { AppLayout } from "../layouts";

const EventPage = () => {
  return (
    <AppLayout>
      <div className="events-parent">
        <div>
          <EventsGroup />
        </div>
      </div>
    </AppLayout>
  );
};

export default EventPage;
