// CSS Import
import classes from './RecipeDisplay.module.css';
// Library Imports
import { useState, useEffect, useContext } from 'react';
// Component Imports
import Card from '../../../Containers/Card/Card';
import ServingSizeSelector from './ServingSizeSelector/ServingSizeSelector';
import IngredientDisplay from './IngredientDisplay/IngredientDisplay';
// Context Import
import { UserContext } from '../../../../Context/user-context';
// Helper Function Imports
import { addFavorite, removeFavorite } from '../../../../HelperFunctions/account';

// Shows all Recipe information on Recipe Page. Can set for dinner, or edit recipe here (if user is the owner)
const RecipeDisplay = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [isDinner, setIsDinner] = useState(false);
	const [recipe, setRecipe] = useState(null);

	// Set the selected recipe based on the RecipeID provided by props
	useEffect(() => {
		const index = ctx.recipes.findIndex(ele => ele.recipeID === props.id);
		setRecipe(ctx.recipes[index]);
	}, [props.id]);

	// Display all ingredients for Recipe
	const ingredients = () => {
		let arr = [<h5 className={classes.subtitle}>Ingredients:</h5>];
		for (const ingredient of recipe.ingredients) {
			arr.push(<IngredientDisplay key={arr.length} ingredient={ingredient} servings={recipe.servings}/>);//<li key={arr.length}>{ingredient.ingredient} {ingredient.amount * recipe.servings} {ingredient.unit}</li>)
		}
		return arr;
	};

	// Display all instructions for Recipe
	const instructions = () => {
		let arr = [<h5 className={classes.subtitle}>Instructions:</h5>];
		for (const instruction of recipe.instructions) {
			arr.push(<li className={classes.instruction} key={arr.length}>{instruction.instruction}<span className={classes.timer}>{timerEval(instruction)}</span></li>)
		}
		return arr;
	};

	// Display suggested time if there is one
	const timerEval = (instruction) => {
		let timerString = '';
		if (instruction.timer[0] === 0 && instruction.timer[1] === 0) {
			return '';
		}
		if (instruction.timer[0] > 0) {
			timerString += `${instruction.timer[0]}m `; 
		}
		if (instruction.timer[1] > 0) {
			timerString += `${instruction.timer[1]}s`;
		}
		return timerString;
	};

	// Display image associated with recipe
	const displayImg = () => {
		let imgPath;
		if (recipe.imgURL) {
			imgPath = recipe.imgURL;
		} else {
			imgPath = require(`../../../../Assets/default.jpeg`);
		}
		return imgPath;
	};

	// Open the edit recipe modal
	const editRecipeHandler = () => {
		props.onSetEditModal(true);
		props.onSetEdit(props.id);
	};

	// Set this recipe for dinner, remove if already there
	const selectForDinnerHandler = () => {
		if (isDinner) {
			props.onDinnerSelect((prevState) => {
				return prevState.filter((x) => x !== props.id);
				
			});
			setIsDinner(false);
		} else {
			props.onDinnerSelect((prevState) => {
				return [
					...prevState,
					props.id,
				]
			});
			setIsDinner(true);
		}
	};

	// Remove from favorite recipes (only available if not the owner)
	const removeFavoriteHandler = () => {
		removeFavorite(ctx.user.userID, recipe.recipeID, ctxDispatch);
	};

	// Add to favorite recipes (only available if not the owner)
	const addFavoriteHandler = () => {
		addFavorite(ctx.user.userID, recipe.recipeID, ctxDispatch);
	};

	// Sets initial dinner button toggle (to remember state when user clicks away and then back)
	useEffect(() => {
		setIsDinner(props.dinnerList.includes(props.id) ? true : false);
	}, [props.dinnerList, props.id]);

	// If recipe isn't loaded yet, show Loading text in Cared
	if (!recipe) {
		return (
			<Card className={`${classes.showRecipe}`}>Loading...</Card>
		);
	} else {
		return (
    		<Card className={`${classes.showRecipe} itemSelected`}>
				<div className={classes.displayContainer}>
					<h4>{recipe.recipeName}</h4>
					{ recipe.owner === ctx.user.userID ? <button onClick={editRecipeHandler}>Edit Recipe</button> : 'This Recipe is owned by someone else' }
					{ recipe.owner !== ctx.user.userID && ctx.user.recipeIDs.includes(recipe.recipeID) && <button onClick={removeFavoriteHandler}>Remove from Favorites</button>}
					{ recipe.owner !== ctx.user.userID && !ctx.user.recipeIDs.includes(recipe.recipeID) && <button onClick={addFavoriteHandler}>Add to Favorites</button>} 
					<button className={classes.forDinner} onClick={selectForDinnerHandler}>{isDinner ? 'Unset for Dinner' : 'Set for Dinner'}</button>
					<div className={classes.recipeHeader}>
						<p className={classes.description}>{recipe.recipeDescription}</p>
						<img className={classes.image} src={displayImg()} />
					</div>
					<hr />
					<ServingSizeSelector servings={recipe.servings} onSelectServingSize={setRecipe}/>
					<hr />
					<div className={classes.sidebyside}>
						<ul className={classes.ingredients}>{ingredients()}</ul> 
						<ol className={classes.instructions}>{instructions()}</ol>
					</div>
				</div>
			</Card>
  		);
	}
}

export default RecipeDisplay;