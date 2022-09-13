// CSS Import
import classes from './RecipeBar.module.css';

// Used to contain user interaction on Recipe Page (Sort/Filter/Add to 'Dinner')
const RecipeBar = (props) => {
	return (
		<aside className={`${classes.recipe_bar} deselectItem`}>
			{props.children}
		</aside>
	);
}

export default RecipeBar;