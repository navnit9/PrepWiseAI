import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          PrepWise<span>AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links desktop-only">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
          <Link to="/mock-test" className={isActive('/mock-test')}>Mock Test</Link>
          <Link to="/ai-interview" className={isActive('/ai-interview')}>AI Interview</Link>
        </div>

        <div className="navbar-actions desktop-only">
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn mobile-only" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/mock-test" onClick={toggleMenu}>Mock Test</Link>
        <Link to="/ai-interview" onClick={toggleMenu}>AI Interview</Link>
        <div className="mobile-menu-actions">
          <Link to="/login" onClick={toggleMenu}>
            <Button variant="secondary" style={{width: '100%'}}>Login</Button>
          </Link>
          <Link to="/register" onClick={toggleMenu}>
            <Button variant="primary" style={{width: '100%'}}>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
