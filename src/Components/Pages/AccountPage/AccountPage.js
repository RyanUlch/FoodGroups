// CSS Import
import classes from './AccountPage.module.css';
// Library Imports
import { useEffect, useState, useContext } from 'react';
// Component Imports
import JoinGroupModal from './JoinGroup/JoinGroup';
import CreateGroupModal from './CreateGroup/CreateGroup';
import Card from '../../Containers/Card/Card';
import Footer from '../../Containers/Footer/Footer';
// Context Import
import { UserContext } from '../../../Context/user-context';
// Helper Function Imports
import { leaveGroup } from '../../../HelperFunctions/groups';
import { deleteRecipe } from '../../../HelperFunctions/recipes';

// Page allowing user to make changes to their account

/* As of right now, this page has very few options as this is not meant for
	widespread distribution, things like changing passwords, deleting account, etc
	should be added if used in a larger market */

const AccountPage = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [groups, setGroups] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [modal, setModal] = useState('');

	// Triggered from a change in groups, if added/removed. Shows the groups the user currently belongs to
	useEffect(() => {
		setGroups([]);
		if (ctx.groups) {
			for (const group of ctx.groups) {
				setGroups(prevState => {
					return [
						...prevState,
						<li key={group.groupID}><span key={group.groupID} id={group.groupID} onClick={leaveGroupHandler}>(X)</span> {group.groupName} </li>
					]
				})
			}
		}
	}, [ctx.groups]);

	// Triggered from a change in recipes, if removed (Can't add new recipes from here). Shows the recipes the user created themselves
	useEffect(() => {
		if (ctx.recipes) {
			setRecipes([]);
			for (const recipe of ctx.recipes) {
				if (recipe.owner === ctx.user.userID) {
					setRecipes(prevState => {
						return [
							...prevState,
							<li className={classes.recipelist} key={recipe.recipeID}><span key={recipe.recipeID} id={recipe.recipeID} onClick={deleteRecipeHandler}>(X)</span> {recipe.recipeName}</li>
						];
					});
				}
			}
		}
	}, [ctx.recipes]);

	// Confirm user wishes to delete a recipe, send info to helper function
	const deleteRecipeHandler = (event) => {
		if(window.confirm('Are you sure you want to delete this recipe?')) {
			const groups = [];
			for (const group of ctx.groups) {
				if (group.recipeIDs.includes(Number(event.target.id))) {
					groups.push(group.groupID);
				};
			};
			deleteRecipe(event.target.id, ctx.user.userID, ctxDispatch);
		}
	}

	// Confirm user wishes to leave a group, send info to helper function
	const leaveGroupHandler = (event) => {
		if(window.confirm('Are you sure you want to leave this group?')) {
			leaveGroup(ctx.user.userID, event.target.id, ctxDispatch);
		}
	}

	// Opens the modal to join a new group
	const joinButtonHandler = () => {
		setModal('join');
	};

	// Opens the modal to create a new group
	const createButtonHandler = () => {
		setModal('create');
	};

	// Go back to the main Recipes page
	const goBackHandler = () => {
		ctxDispatch({ type: 'CHANGEPAGE', payload: 'recipes'});
	}

	if (ctx.loaded) {
		return (
			<>
			<main>
				{modal === 'join' && <JoinGroupModal onCloseModal={setModal}/>}
				{modal === 'create' && <CreateGroupModal  onCloseModal={setModal}/>}

				<button className={classes.goback} onClick={goBackHandler}>Go Back</button>
				<h1 className={classes.title}>{`Hello ${ctx.user.username}`}</h1>

				<hr />
				<Card className={classes.card}>
					<section className={classes.groups}>
						<h2 className={classes.grouptitle}>You're apart of these Groups:</h2>
						<ul className={classes.list}>
							{groups.length ? groups : <p className={classes.norecipes}>No Groups Joined</p>}
						</ul>
						<button className={classes.button} onClick={joinButtonHandler}>Join Group</button>
						<button className={classes.button} onClick={createButtonHandler}>Create Group</button>
					</section>
				</Card>
				<hr />
				<Card className={classes.card}>
					<section className={classes.recipes}>
						<h2 className={classes.recipetitle}>You've made these Recipes:</h2>
						<ul className={`${classes.ulist} ${classes.list}`}>
							{recipes.length ? recipes : 'No Recipes Created'}
						</ul>
					</section>
				</Card>
			</main>
			<Footer></Footer>
			</>
		);
	} else {
		return (
			<Card className={classes.cardError}>
				<h1>Page is Loading...</h1>
				<p> If this page does not load in a few seconds, there may be an issue with the server connection. Click the button below to be redirected back to the Recipe Page...</p>
				<button onClick={goBackHandler}>Go Back</button>
			</Card>
		)
	}
}

export default AccountPage;