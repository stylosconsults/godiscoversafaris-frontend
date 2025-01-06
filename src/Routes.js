import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from './utils/AuthRoute';
import { Dashboard } from './pages/home';
import { About } from './pages/about';
import { Subscribers, Unsubscribe } from './pages/maillist';
import { Contact } from './pages/contact';
import { UsersMain, UsersCreate, UsersView } from './pages/users';
import HomeBody from './components/homee/HomeBody';
import ServicesPage from './pagess/ServicesPage';
import EventPage from './pagess/EventPage';
import {
  ViewEvent,
  EventsMain,
  EventsCreate,
  EventsView,
  Events,
} from './pages/events';
import {
  News,
  NewsView,
  NewsMain,
  NewsCreate,
  NewsAdminView,
  NewsComment,
  Destinations,
  DestionationView,
} from './pages/blogs';

import {
  Tours,
  ToursView,
  ToursMain,
  ToursCreate,
  ToursAdminView,
  ToursComment,
} from './pages/tours';
// import {
//   MemberJoin,
//   MemberList,
//   // MembersMain,
//   MembersView,
//   MemberBenefits,
//   // MemberInfo,
// } from "./pages/members";
import {
  Publication,
  PublicationsMain,
  PublicationsCreate,
  PublicationsView,
  PressView,
} from './pages/publications';
import { Terms } from './pages/terms';
import { Faq } from './pages/faq';
import { Policy } from './pages/policy';
import {
  Login,
  ResetPassword,
  ForgotPassword,
  ResetAccount,
} from './pages/users';
import TicketForm from './components/requestform/TicketForm';
import EventForm from './components/requestform/EventFrom';
import EventDetail from './components/Eventss/EventDetail';
import { ParticipantMain } from './pages/participant/admin/main';
import ParticipantForm from './pages/participant/ParticipantForm';
import { Airticket, RentalCar, Accommodation } from './pages/otherpages';
import ViewOrder from './pagess/ViewOrder';
import Pay from './components/payment/pay';
import { TourBookings } from './pages/toursBookings/main';
import ScrollToTop from './Scrolltop';


export default function Routes() {
  return (
    <Router>
         <ScrollToTop />
      <Switch>
        <Route exact path='/' component={HomeBody} />
        <Route exact path='/ticket' component={TicketForm} />
        <Route exact path='/eventform' component={EventForm} />
        <Route exact path='/accommodation' component={Accommodation} />
        <Route exact path='/carrental' component={RentalCar} />
        <Route exact path='/airticket' component={Airticket} />
        <Route exact path='/about' component={About} />
        <Route exact path='/pay' component={Pay} />
        <Route exact path='/services' component={ServicesPage} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/events' component={EventPage} />
        <Route exact path='/participant' component={ParticipantForm} />
        <Route exact path='/events/:id' component={EventDetail} />
        <Route exact path='/previous-events' component={Events} />
        <Route exact path='/event/:slug' component={ViewEvent} />
        <Route exact path='/myorder/:id' component={ViewOrder} />

        <Route exact path='/destinations' component={Destinations} />
        <Route exact path='/tours' component={Tours} />
        <Route exact path='/tour/:slug' component={ToursView} />
        <Route exact path='/tour/:slug' component={ToursView} />
        <Route exact path='/destination/:slug' component={DestionationView} />

        <Route exact path='/tours' component={Tours} />
        <Route exact path='/tour/:slug' component={ToursView} />

        <Route exact path='/publications' component={Publication} />
        <Route exact path='/press-releases' component={PressView} />

        <Route exact path='/terms' component={Terms} />
        <Route exact path='/policy' component={Policy} />
        <Route exact path='/faq' component={Faq} />

        <Route exact path='/auth/login' component={Login} />
        <Route
          exact
          path='/auth/password/new/:token'
          component={ResetPassword}
        />
        <Route exact path='/auth/password/forgot' component={ForgotPassword} />
        <Route
          exact
          path='/auth/set-new-password/:token'
          component={ResetAccount}
        />

        <AuthRoute exact path='/account' component={Dashboard} />

        <AuthRoute exact path='/account/users' component={UsersMain} />
        <AuthRoute exact path='/account/users/create' component={UsersCreate} />
        <AuthRoute exact path= '/account/tour-bookings' component={TourBookings} />
        
        <AuthRoute
          exact
          path='/account/users/view/:name'
          component={UsersView}
        />
        {/* <AuthRoute
          exact
          path="/account/members/view/:name"
          component={MembersView}
        /> */}

        <AuthRoute exact path='/account/events' component={EventsMain} />
        <AuthRoute exact path='/account/events/participant' component={ParticipantMain} />
        <AuthRoute
          exact
          path='/account/events/create'
          component={EventsCreate}
        />
        <AuthRoute
          exact
          path='/account/events/view/:slug'
          component={EventsView}
        />

        <AuthRoute exact path='/account/destinations' component={NewsMain} />
        <AuthRoute exact path='/account/destinations/create' component={NewsCreate} />
        <AuthRoute
          exact
          path='/account/destinations/view/:slug'
          component={NewsAdminView}
        />
        <AuthRoute
          exact
          path='/account/destinations/comment/:slug'
          component={NewsComment}
        />

        <AuthRoute exact path='/account/tours' component={ToursMain} />
        <AuthRoute exact path='/account/tours/create' component={ToursCreate} />
        <AuthRoute
          exact
          path='/account/tours/view/:slug'
          component={ToursAdminView}
        />
        <AuthRoute
          exact
          path='/account/tours/comment/:slug'
          component={ToursComment}
        />

        <AuthRoute
          exact
          path='/account/publications'
          component={PublicationsMain}
        />
        <AuthRoute
          exact
          path='/account/publications/create'
          component={PublicationsCreate}
        />
        <AuthRoute
          exact
          path='/account/publications/view/:id'
          component={PublicationsView}
        />
        <AuthRoute exact path='/account/subscribers' component={Subscribers} />
        <Route exact path='/maillist/unsubcribe/:id' component={Unsubscribe} />
      </Switch>
    </Router>
  );
}
