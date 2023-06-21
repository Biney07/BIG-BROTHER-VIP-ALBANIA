import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import foto from '../../Images/logo.png'
import { Link } from 'react-router-dom';
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
      <img src={foto} className="logo"></img>
      <div className={`nav-links ${mobileMenuOpen ? 'mobile-menu' : ''}`}>
        <ul className="nav-menu">
          <Link to={'/home'} className="active"><a href="" className="link">Home</a></Link>
          <Link to={'/dancers'}><a href="" className="link">Dancers</a></Link>
          <Link to={'/videos'}> <a href="" className="link">Videos</a></Link>
          <Link to={'/votat'}><a href="" className="link">Votat</a></Link>
          <Link to={'/home'}><a href="" className="link">Contact</a></Link>

        </ul>
      </div>
      <MenuIcon className="menu-hamburger" onClick={toggleMobileMenu} />
    </nav>
  );
};

export default Navbar;
