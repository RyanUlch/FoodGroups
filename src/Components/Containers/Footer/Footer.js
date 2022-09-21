// CSS Import
import classes from './Footer.module.css';
// Library Imports
import { useContext, useState } from 'react';
// Component Imports
import Card from '../../Containers/Card/Card';

const Footer = (props) => {
	return (
		<Card className={classes.card}>
			<footer className={classes.footer}>
				<div className={`${classes.attrMain} ${classes.attr}`}>
					Created By: Ryan Ulch
				</div>
				<div className={`${classes.attrSub} ${classes.attr}`}>
					Icons by <a target="_blank" href="https://icons8.com">Icons8</a>:&nbsp;&nbsp; 
					<a target="_blank" href="https://icons8.com/icon/82751/user">[User]</a>&nbsp;-&nbsp; 
					<a target="_blank" href="https://icons8.com/icon/85056/password">[Password]</a>&nbsp;-&nbsp;
					<a target="_blank" href="https://icons8.com/icon/85467/mail">[Mail]</a>&nbsp;-&nbsp;
					<a target="_blank" href="https://icons8.com/icon/83887/enter">[Enter]</a>
				</div>
			</footer>
		</Card>
	)
}

export default Footer;