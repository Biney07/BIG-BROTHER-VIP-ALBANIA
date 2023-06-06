import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    setNavbarScrolled(scrolled);
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
      <a href="#" className="logo">Logo</a>
      <div className={`nav-links ${mobileMenuOpen ? 'mobile-menu' : ''}`}>
        <ul className="nav-menu">
          <li className="active"><a href="">Home</a></li>
          <li><a href="">About Us</a></li>
          <li><a href="">Services</a></li>
          <li><a href="">Careers</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </div>
      <MenuIcon className="menu-hamburger" onClick={toggleMobileMenu} />
    </nav>
  );
};

export default Navbar;
