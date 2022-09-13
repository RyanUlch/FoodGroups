// CSS Import
import classes from './AccountDropDown.module.css';
// Library Imports
import { useState, useEffect } from 'react';
// Component Imports
import Card from '../../../Containers/Card/Card';

// Dropdown menu on hover letting user log out, or go to Account Page
const AccountDropDown = (props) => {
	const [hovered, setHovered] = useState(false);
	const [shownMenu, setShownMenu] = useState(null);
	
	// Change page to Account
	const openAccountPage = () => {
		props.dispatch({ type: 'CHANGEPAGE', payload: 'account'});
	}

	// Log user out, will set page to Login Page
	const logout = () => {
		props.dispatch({ type: 'LOGOUT'	});
	}

	const [dropdownMenu, setDropdownMenu] = useState(
		<div className={classes.menu} >
			{/* <Card > */}
				
			<li onClick={openAccountPage}>Account</li>
			<li onClick={logout}>Logout</li>
				
			{/* </Card> */}
		</div>
	);

	// Show Menu
	const openMenu = () => {
		setShownMenu(dropdownMenu);
	}

	// Hide Menu
	const closeMenu = () => {
		setShownMenu(null);
	}
	
	// Use Timer to remove menu if users cursor is off of menu for 1 second
	useEffect(() => {
		let interval = null;
		if (shownMenu && !hovered) {
			interval = setInterval(() => {
				closeMenu();
			}, 1000);
		} else if (hovered) {
			openMenu();	
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [shownMenu, hovered]);

	return (
		<ul className={classes.list} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
			<li>{props.name}</li>
			{shownMenu}
		</ul>
	);
}

export default AccountDropDown;