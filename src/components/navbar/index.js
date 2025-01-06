import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Navbar, Form, Nav, Image, NavDropdown } from 'react-bootstrap';
import './index.css';

export const NavBar = () => {
	// const [isHovered1, setHovered1] = useState(false);
	const [isHovered2, setHovered2] = useState(false);
	const [isHovered3, setHovered3] = useState(false);
	const [isHovered4, setHovered4] = useState(false);

	// const handleNavMenuOpen1 = () => {
	// 	setHovered1(true);
	// };

	const handleNavMenuOpen2 = () => {
		setHovered2(true);
	};

	const handleNavMenuOpen3 = () => {
		setHovered3(true);
	};

	// const handleNavMenuClose1 = () => {
	// 	setHovered1(false);
	// };

	const handleNavMenuClose2 = () => {
		setHovered2(false);
	};
	const handleNavMenuClose3 = () => {
		setHovered3(false);
	};

	return (
		<Navbar
			className='custom-navbar border-bottom'
			collapseOnSelect
			sticky='top'
			expand='lg'
		>
			<Navbar.Brand>
				<Link to='/'>
					<Image
						alt='GoDiscover Safaris Logo'
						title='GoDiscover Safaris Logo'
						src='https://res.cloudinary.com/dfsai53mw1/image/upload/v1700398863/WEBS/godiscover/Godiscover_ystvkb.png'
						width='40%'
						className='img-fluid d-inline-block align-top ml-2 logo'
					/>
				</Link>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='navBarMenu' />

			<Navbar.Collapse id='navBarMenu'>
				<Nav className='mr-auto'></Nav>
				<Nav className='mx-auto'>
					<Nav.Link>
						<Link to='/'>Home</Link>
					</Nav.Link>
					<NavDropdown
						title='About'
						alignLeft
						className='dropdown fade-up'
						onMouseOver={() => setHovered4(true)}
						onMouseLeave={() => setHovered4(false)}
						show={isHovered4}
					>
						<NavDropdown.Item>
							<NavLink to='/about#who-we-are'>Who We Are</NavLink>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<NavLink to='/about#board-of-directors'>
								Teams
							</NavLink>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<NavLink to='/about#gala-dinner'>Tourism Award</NavLink>
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link>
						<Link to='/services'>Services</Link>
					</Nav.Link>
					<NavDropdown
						title='Media'
						alignLeft
						className='dropdown fade-up'
						onMouseOver={handleNavMenuOpen2}
						onMouseLeave={handleNavMenuClose2}
						show={isHovered2}
					>
						<NavDropdown.Item>
							<Link to='/publications'>Publications</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to='/press-releases'>Press Releases</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to='/blogs'>Blogs</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Link to='/events'>Events</Link>
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link>
						<Link to='/contact'>Contact Us</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to='/faq'>FAQ</Link>
					</Nav.Link>
				</Nav>
				<Form inline>
					<Nav.Link className='ml-5 btn btn-covid'>
						<NavLink to='/#covid-19'><b>COVID-19</b></NavLink>
					</Nav.Link>{' '}
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};
