// CSS Import
import classes from './AccountDropDown.module.css';
// Library Imports
import { useState, useEffect } from 'react';
// Helper Imports
import { logout } from '../../../../HelperFunctions/account';

// Dropdown menu on hover letting user log out, or go to Account Page
const AccountDropDown = (props) => {
	const [hovered, setHovered] = useState(false);
	const [shownMenu, setShownMenu] = useState(null);
	
	// Change page to Account
	const openAccountPage = () => {
		props.dispatch({ type: 'CHANGEPAGE', payload: 'account'});
	}

	// Log user out, will set page to Login Page
	const logoutHandler = () => {
		logout(props.dispatch);
	}

	const [dropdownMenu, setDropdownMenu] = useState(
		<div className={classes.menu} >				
			<li onClick={openAccountPage}>Account</li>
			<li onClick={logoutHandler}>Logout</li>
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