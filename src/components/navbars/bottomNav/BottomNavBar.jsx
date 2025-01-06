import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../../../redux/actions';

const BottomNavBar = () => {
  const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get current location
  const data = useSelector((state) => state.newsReducer.news);
  const theLoading = useSelector((state) => state.newsReducer.loading);
  const error = useSelector((state) => state.newsReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNews());
    setTimeout(function () {
      setLoading(!theLoading);
    }, 500);
  }, [dispatch, theLoading]);

  if (error) {
    console.error('Error fetching news:', error);
  }

  const isDestinationsActive = location.pathname.startsWith('/destinations') || 
    (data && data.some((newsItem) => location.pathname === `/destination/${newsItem.slug}`));

  return (
    <Navbar
      className='custom-navbar'
      sticky='top'
      expand='md'
      expanded={expanded}
    >
      <Navbar.Toggle
        aria-controls='basic-navbar-nav'
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='md-auto'>
          <Nav.Link>
            <NavLink
              to='/'
              activeClassName='active'
              // onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              to='/services'
              activeClassName='active'
            >
              Services
            </NavLink>
          </Nav.Link>
          <NavDropdown
            title='Destinations'
            alignLeft
            className={`dropdown fade-up ${isDestinationsActive ? 'active' : ''}`} // Dynamically add active class
          >
            <NavDropdown.Item>
              <NavLink
                to='/destinations'
                className='sub-link'
                activeClassName='active'
              >
                All Destinations
              </NavLink>
            </NavDropdown.Item>
            {data && data.length > 0
              ? data
                  .filter((newsItem) => newsItem.isPublished === true)
                  .map((newsItem, index) => (
                    <NavDropdown.Item key={index}>
                      <NavLink
                        to={`/destination/${newsItem.slug}`}
                        className='sub-link'
                        activeClassName='active'
                      >
                        {newsItem.title}
                      </NavLink>
                    </NavDropdown.Item>
                  ))
              : ''}
          </NavDropdown>
          <Nav.Link>
            <NavLink
              to='/about'
              activeClassName='active'
            >
              About us
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink
              to='/contact'
              activeClassName='active'
            >
              Contact Us
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BottomNavBar;
