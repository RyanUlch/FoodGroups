// CSS Import
import classes from './LandingPage.module.css';
// Library Imports
import { useContext, useState, useEffect } from 'react';
// Component Imports
import Card from '../../Containers/Card/Card';
import Footer from '../../Containers/Footer/Footer';
// Context Import
import { UserContext } from '../../../Context/user-context';
import Header from '../../Containers/Header/Header';

// Page allowing user to login, or sign up 
const LandingPage = (props) => {
	const [ctx, dispatch] = useContext(UserContext);

	const pageHandler = (event) => {
		event.preventDefault();
		dispatch({
			type: 'CHANGEPAGE',
			payload: 'login',
		});
	}

	// Used to calculate the height that RecipeList should be at
	const [windowHeight, setWindowHeight] = useState(0);
	const setListHeight = () => {
		if (windowHeight !== window.innerHeight) {
			const eleContainer	= window.innerHeight;
			const eleHeader		= document.querySelector('#header').scrollHeight;
			const eleFooter		= document.querySelector('#footer').scrollHeight;
			const eleList		= document.querySelector('#landingPage');
			const listHeight 	= eleContainer-eleHeader-eleFooter;
			// console.log(`Container: ${eleContainer}, Header: ${eleHeader}, Footer: ${eleFooter}, Total: ${listHeight}`);
			eleList.style.height = `${listHeight}px`;
			setWindowHeight(eleContainer);
		}
	}

	useEffect(() => {
		setListHeight();
		window.addEventListener('resize', setListHeight);
		return () => {
			window.removeEventListener('resize', setListHeight)
		}
	}, []);

	return (
		<>
			<Header>
				<h1 className={classes.h1}>Welcome to Food-Groups!</h1>
				<button className={classes.btn} onClick={pageHandler}>
					Login/Sign-up
				</button>
			</Header>
			<main id='landingPage' className={classes.page}>
				<Card className={classes.card}>
					<h2>Create Recipes!</h2>
					<p className={classes.p}>Make you favorite recipes live all in one place. By default, all recipes you create are for you and you alone; so if you don't want to share with any groups, you don't have to!</p>
					<img className={classes.img} alt='Showing the Create Recipe User Interface' src='/images/addRecipe_ref.jpg' />
				</Card>
				<Card className={classes.card}>
				<h2>Join and Create Groups!</h2>
					<p className={classes.p}>With a simple group name and password, you can create and join groups for your family and friends. All you need is everyone to have a user account and to join the group with your group name and password. Share Recipes to these groups and see others recipes that they share as well.</p>
					<img className={classes.img} alt='Showing the Account User Interface' src='/images/groups_ref.jpg' />
				</Card>
				<Card className={classes.card}>
				<h2>Share your recipes with the world!</h2>
					<p className={classes.p}>Everyone is automatically enrolled into the 'Food-Groups All' group (You can leave this group at any time). If you find a recipe you like from this list, favorite it so that you won't lose it. These will appear in your recipes. (Please note, only the account that created a recipe can edit it. There is currently no way to copy a recipe for yourself, this may be added in the future.</p>
					<img className={classes.img} alt='Showing the Group Select User Interface' src='/images/allGroups_ref.jpg' />
				</Card>
				<Card className={classes.card}>
					<h2>Get Cooking!</h2>
					<p className={classes.p}>When you know what you want for dinner, select the recipes you want and set them for dinner. Once you have at least one recipe set, you can go to the dinner page which shows you the selected recipes in a cleaner display, where you can mark off what's been done!</p>
					<img className={classes.img} alt='Showing the dinner User Interface' src='/images/dinner_ref.jpg' />
				</Card>
				<Card>
					<h2>Are you Ready?</h2>
					<p className={classes.p}>If you are ready to get started, click the 'Login/Sign-up' button in the top left. Explore the site, and have fun!</p>
				</Card>
			</main>
			<Footer isLogin={true}/>
		</>
	);
}

export default LandingPage;