// CSS Import
import classes from './DinnerPage.module.css';
// Component Imports
import Header from '../../Containers/Header/Header';
import DinnerRecipeItem from './DinnerRecipeItem/DinnerRecipeItem';

// Shows the recipes the user selected for 'Dinner', allows user to interact with recipes marking off completed
// instructions, as well as giving user a basic timer for instructions that have a suggested time
const DinnerPage = (props) => {

	// Change page back to main Recipes page (this does not remove anything from what is selected for 'Dinner')
	const goBackHandler = () => {
		props.dispatch({ type: 'CHANGEPAGE', payload: 'recipes'});
	};

	// Display recipes as Cards from DinnerRecipeItem (Not useEffect as recipes will not be added/removed while on this page)
	const getRecipes = () => {
		const recipes = [];
		for (const id of props.dinnerList) {
			recipes.push(<DinnerRecipeItem key={id} id={id} />);
		}
		return recipes;
	};

	return (
		<div className={classes.page}>
			<Header className={classes.Header}>
				<h1 className={classes.title}>Lets Get Started!</h1>
				<button className={classes.goback} onClick={goBackHandler}>Go Back to Recipes</button>
			</Header>
			<main className={classes.recipes}>
				{getRecipes()}
			</main>
		</div>
	);
}

export default DinnerPage;