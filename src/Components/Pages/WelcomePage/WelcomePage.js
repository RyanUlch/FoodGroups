// CSS Import
import classes from './WelcomePage.module.css';
// Component Imports
import Card from '../../Containers/Card/Card';
import Footer from '../../Containers/Footer/Footer';

// Page showing some instructions that aren't immediately clear from the get go (FAQs from test users as well)
const WelcomePage = (props) => {
	// Go back to the main Recipes page
	const closeMessage = () => {
		props.dispatch({ type: 'CHANGEPAGE', payload: 'recipes'});
	}
	console.log('on welcome page');
	return (
		<>
			<main className={classes.main}>
				<Card className={classes.card}>
					<h1 className={classes.mainTitle}>Welcome to Food-Groups!</h1>
					<p className={classes.subtitle}>This is a website to share recipes with those you care about. Before you get started there is just a few key things to note:</p>
					<hr className={classes.hr}/>
					<ul>
						<li>Everyone is automatically joined to a global group called 'Food-Groups All'. You can choose to share your recipes to this group, but be aware that anyone that creates an account is able to see these recipes (please be respectful with these recipes)</li>
						<li>You may leave 'Food-Groups All' at anytime on the account page, you can also rejoin that group if you choose to (instructions on Account Page)</li>
						<li>This site is a singular persons project and still in active development. Any issues you run into, or questions you may have please send to <a href='mailto: RyanUlchDev@Gmail.com'>RyanUlchDev@Gmail.com</a></li>
						<li>You can filter which groups you see the recipes for in the dropdown on the top-left. You always start with your own recipes selected</li>
						<li>Since the filter is set to your recipes at first, you won't see any recipes when you click the button below, to do so you can do any of the following:
							<ul>
								<li>Add a recipe of your own with the 'Add Recipe" button in the top-right. You will own this recipe and can edit it as you'd like</li>
								<li>Set the group filter to a group of your choice, or 'All Recipes' to see everything available</li>
								<li>If you click on any recipe, you may 'favorite' the recipe. This recipe will then show up in your recipes, however you won't be able to edit it yourself (only the author has that privillage)</li>
							</ul>
						</li>
						<li>You can Create or Join groups in the Account Page. You get there by hovering (or tapping) on your username in the top-right and selecting "Account"</li>
						<li>If you were told by someone else to join their group, they will need to provide you with the name and password that was set for that group</li>
						<li>If you need to see this message again, there will be a link in the footer labelled 'Welcome Message'</li>
						<li>Have fun, be kind, and above all make some food</li>
					</ul>
					<hr className={classes.hr}/>
					<div className={classes.buttonContainer}>
						<button className={classes.button} onClick={closeMessage}>Let's Get Cooking!</button>
					</div>
				</Card>
			</main>
			<Footer></Footer>
		</>
	);

}

export default WelcomePage;