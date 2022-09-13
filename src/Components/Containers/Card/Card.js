// CSS Import
import classes from './Card.module.css';

/* Card Component Wrapper to give uniform style to items/elements*/
const Card = (props) => {
	return (
		<div onClick={props.onClick} className={`${classes.card} ${props.className}`}>
			{props.children}
		</div>
	);
}

export default Card;