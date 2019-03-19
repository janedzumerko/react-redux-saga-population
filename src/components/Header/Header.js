import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<header className="Header">
			<nav>
				<ul>
					<li>
						<NavLink activeClassName="activeRoute" to="/report" exact>
							REPORT
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="activeRoute" to="/dashboard">
							DASHBOARD
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
