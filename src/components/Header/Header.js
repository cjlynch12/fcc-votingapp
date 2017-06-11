import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
  	<img className="header-logo" src="./images/logo.png" alt="2poll logo" />
  	<h1 className="header-title">2POLL</h1>
  	<nav className="header-nav">
		<Link className="header-nav-about">About</Link>
		<Link className="header-nav-polllist">Poll list</Link>
		<Link className="header-nav-signin">Sign in</Link>
  	</nav>
  </header>
);

export default Header;