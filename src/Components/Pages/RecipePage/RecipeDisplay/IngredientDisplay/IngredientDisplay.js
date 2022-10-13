// CSS Import
import classes from './IngredientDisplay.module.css';
// Library Imports
import { useEffect, useState } from 'react';

// Display ingredients with corrected amount based on the serving size
const IngredientDisplay = (props) => {
	const [amount, setAmount] = useState(Number(props.ingredient.amount) / Number(props.servings));

	// Set the initial amount when selected (needed as the inital serving size might not be 1)
	useEffect(() => {
		setAmount(Number(props.ingredient.amount) / Number(props.servings));
	}, [props.ingredient]);

	return (
		<li className={classes.listItem}>
			<span className={classes.name}>{props.ingredient.ingredient}</span>
			<span className={classes.amount}>{amount * props.servings}</span>
			<span className={classes.unit}>{props.ingredient.unit}</span>
		</li>
	);
}

export default IngredientDisplay;