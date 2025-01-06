import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap';
import Logout from '../../pages/users/auth/Logout';

const NavBar = () => {
	const [isHovered, setHovered] = useState(false);

	const handleNavMenuOpen = () => {
		setHovered(true);
	};
	const handleNavMenuClose = () => {
		setHovered(false);
	};
	return (
		<div className='dashboard-header'>
			<Navbar className='navbar navbar-expand-lg bg-white fixed-top'>
				<Navbar.Brand>
					<Link to='/'>
						<Image
							alt='GoDiscover Safaris Logo'
							title='GoDiscover Safaris Logo'
							src='https://res.cloudinary.com/dfsai53mw1/image/upload/v1700398863/WEBS/godiscover/Godiscover_ystvkb.png'
							width='30%'
							className='img-fluid d-inline-block align-top ml-2 logo'
						/>
					</Link>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='navBarMenu' />

				<Navbar.Collapse id='navBarMenu'>
					<Nav className='mr-auto'></Nav>

					<Nav className='ml-auto mr-4'>
						<NavDropdown
							title='My account'
							alignLeft
							className='dropdow fade-up'
							onMouseOver={handleNavMenuOpen}
							onMouseLeave={handleNavMenuClose}
							show={isHovered}
							style={{ 
								backgroundColor: '#065952'
							 }}
						>
							<NavDropdown.Item style={{ 
								backgroundColor: 'grey'
								 }}>
								<Logout />
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
export default NavBar;
