// CSS Import
import classes from './Header.module.css';

// Header for multiple pages, seperated out as to have uniform Styles
const Header = (props) => {
	return (
		<header className={classes.Header}>
			{props.children}
		</header>
	);
};

export default Header;