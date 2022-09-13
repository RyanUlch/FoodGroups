// CSS Import
import classes from './IngredientForm.module.css';
// Library Imports
import { useState } from 'react';

// Form to set individual ingredients
const IngredientForm = (props) => {
	// Set initial state of ingredient
	const [ingredient, setIngredient] = useState({
		ingredient: props.edit.ingredient,
		amount: props.edit.amount,
		unit: props.edit.unit,
		key: props.value,
		index: props.formState.ingredients.findIndex(ele => ele.key === props.value),
	});

	// Change state both in ingredient form and formState
	const onChangeHandler = (event) => {
		let newIngredient;
		let index;
		setIngredient((ingrPrevState) => {
			newIngredient = {...ingrPrevState};
			index = ingrPrevState.index;
			newIngredient[event.target.id] = event.target.value;
			
			return newIngredient;
		});

		props.setFormState((formPrevState) => {
			const newIngredients = [...formPrevState.ingredients];
			newIngredients[index] = newIngredient;
			return {
				...formPrevState,
				ingredients: newIngredients,
			};
		});
	};

	return (
		<span className={classes.recipeIngredientInput} id={props.value}>
			<div className={classes.together}>
				<label htmlFor='ingredient'>Ingredient:</label>
				<input className={classes.ingredient} onChange={onChangeHandler} value={ingredient.ingredient} name='ingredient' type='text' id='ingredient' maxLength='200' required/>
			</div>
			<div className={classes.together}>
				<label htmlFor='amount'>Qty:</label>
				<input className={classes.quantity} onChange={onChangeHandler} value={ingredient.amount} name='amount' type='number' min='0' id='amount' step='1' required/>
			</div>
			<div className={classes.together}>
				<label htmlFor='unit'>Unit:</label>
				<input className={classes.unit} onChange={onChangeHandler} value={ingredient.unit} name='unit' type='text' id='unit' maxLength='50' required/>
			</div>
			{props.onRemove && <button type='button' className={classes.removeButton} value={props.value} onClick={props.onRemove}>-</button>}
		</span>
	);
	
}

export default IngredientForm;