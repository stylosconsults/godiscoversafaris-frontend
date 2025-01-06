import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { Button } from "react-bootstrap";

const SideBar = () => {
  const logged = jwtDecode(localStorage.IdToken);
  return (
    <div className="nav-left-sidebar sidebar-dark">
      <div className="menu-list">
        <nav className="navbar navbar-expand-lg navbar-light py-4">
          <Link to="/account" className="d-xl-none d-lg-none">
            Dashboard
          </Link>

          <Button type="button" className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav flex-column">
              <li className="nav-item ">
                <Link to="/account" className="nav-link">
                  <i className="fab fa-android"></i> Dashboard
                </Link>
              </li>
              {logged.role === "admin" && (
                <>
                  {/* <li className='nav-item '>
                    <Link to='/account/users' className='nav-link'>
                      <i className='fa fa-users'></i> Users
                    </Link>
                  </li> */}
                  {/* <li className='nav-item '>
                    <Link to='/account/subscribers' className='nav-link'>
                      <i className='fas fa-file'></i> Subscribers
                    </Link>
                  </li> */}
                  {/* <li className='nav-item '>
										<Link to='/account/members' className='nav-link'>
											<i className='fa fa-fw fa-user-circle'></i> Members
										</Link>
									</li> */}
                </>
              )}
              <li className="nav-item ">
                <Link to="/account/events" className="nav-link">
                  <i className="fa fa-calendar"></i> Events
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/account/events/participant" className="nav-link">
                  <i className="fas fa-newspaper"></i> Participants
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/account/destinations" className="nav-link">
                  <i className="fas fa-newspaper"></i> Destinations
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/account/tours" className="nav-link">
                  <i className="fas fa-newspaper"></i> Tours
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/account/tour-bookings" className="nav-link">
                  <i className="fas fa-newspaper"></i>Tour Bookings
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/account/publications" className="nav-link">
                  <i className="fas fa-file"></i> GODISCOVER Documents
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
