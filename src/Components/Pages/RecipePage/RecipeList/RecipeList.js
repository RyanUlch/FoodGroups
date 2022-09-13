// CSS Import
import classes from './RecipeList.module.css';
// Library Imports
import { useEffect, useState, useContext } from 'react';
// Component Imports
import Recipe from './Recipe/Recipe';
// Context Import
import { UserContext } from '../../../../Context/user-context';

// Contains all the Recipe Cards that are filtered and sorted
const RecipeList = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [shownRecipes, setShownRecipes] = useState(null);

	// Create a "Recipe' for each item in the context order
	useEffect(() => {
		if (ctx.recipeOrder.order) {
			const recipeList = [];
			for (const recipe of ctx.recipeOrder.order) {
				recipeList.push(<Recipe isSelected={props.selected === recipe} onSelectItem={props.onSelectItem} key={recipe} id={recipe} />);
			}
			setShownRecipes(recipeList.length > 0 ? recipeList : null);
		}
	}, [ctx.recipeOrder.order]);

	// If context is not yet finished initialization, show loading text
	if (!ctx.loaded) {
		return ('Loading...');
	} else {
		return (
			<div className={`${classes.recipeList} deselectItem`}>
				{shownRecipes && shownRecipes}
				{!shownRecipes && ctx.recipes.length > 0 && `There are no recipes with that combination of group and search term.`}
				{!shownRecipes && ctx.recipes.length === 0 && `You don't have any recipes. Create one by clicking 'Add Recipe', or join a group by clicking your user name in the top-right and then click join group.`}
			</div>
		);
	}
};

export default RecipeList;