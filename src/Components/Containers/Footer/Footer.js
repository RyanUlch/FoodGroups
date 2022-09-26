// CSS Import
import classes from './Footer.module.css';
// Library Imports
import { useContext } from 'react';
// Component Imports
import Card from '../../Containers/Card/Card';
// Context Import
import { UserContext } from '../../../Context/user-context';

const Footer = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);

	const welcomeMsg = () => {
		ctxDispatch({ type: 'CHANGEPAGE', payload: 'welcome' });
	}

	return (
		<Card className={classes.card}>
			<footer className={classes.footer}>
				<div className={`${classes.attrMain} ${classes.attr}`}>
					Created By: Ryan Ulch
				</div>
				<div className={classes.attrSub}>
					
				</div>
				<div className={`${classes.attrSub} ${classes.attr}`}>
					<a href='' onClick={welcomeMsg}>Welcome Message</a>&nbsp;&nbsp;
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