// CSS Import
import classes from './Card.module.css';

/* Card Component Wrapper to give uniform style to items/elements*/
const Card = (props) => {
	return (
		<div id={props.id} onClick={props.onClick} className={`${classes.card} ${classes.cardError} ${props.className}`}>
			{props.children}
		</div>
	);
}

export default Card;