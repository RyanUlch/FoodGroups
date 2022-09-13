// CSS Import
import classes from './Recipe.module.css';
// Library Imports
import { useEffect, useContext, useState } from 'react';
// Component Imports
import Card from '../../../../Containers/Card/Card';
// Context Import
import { UserContext } from '../../../../../Context/user-context';

// Shows recipe card with name, partial description, and image
const Recipe = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [selected, setSelected] = useState(false);
	const [recipe, setRecipe] = useState(null);

	// Get the recipes information from the ID supplied by props
	useEffect(() => {
		setRecipe(ctx.recipes[ctx.recipes.findIndex(ele => ele.recipeID === props.id)]);
	}, [props.id]);

	// set if this recipe is selected for the Recipe Display
	const onSelectHandler = (event) => {
		event.bubbles = false;
		props.onSelectItem(props.id);
	}

	// Get image path of recipe
	const displayImg = () => {
		let imgPath;
		if (recipe.imgURL) {
			imgPath = recipe.imgURL;
		} else {
			imgPath = require(`../../../../../Assets/default.jpeg`);
		}
		return imgPath;
	};

	// If the recipe is not yet loaded, show loading within Card
	if (recipe) {
		return (
			<Card >
				<div onClick={onSelectHandler} className={`${classes.recipeCard} ${props.isSelected && classes.selected} itemSelected`}>
					{recipe !== null ? <h3 className={classes.title}>{recipe.recipeName}</h3> : ''}
					{recipe !== null ? <p className={classes.recipeDescription}>{recipe.recipeDescription}</p> : ''}
					{recipe !== null ? <img draggable='false' className={classes.image} src={displayImg()} /> : '' }
				</div>
			</Card>
		)
	} else {
		return (
			<Card >
				<p>Loading...</p>
			</Card>
		);
	}
}

export default Recipe;