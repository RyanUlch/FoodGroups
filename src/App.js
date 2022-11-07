/* Imports for React, Components, Helpers and Context */
import './App.css';
// Library Imports
import { useEffect, useState, useContext}	from 'react';
// Component Imports - Main Pages
import RecipePage 							from './Components/Pages/RecipePage/RecipePage';
import DinnerPage 							from './Components/Pages/DinnerPage/DinnerPage';
import LoginPage 							from './Components/Pages/LoginPage/LoginPage';
import AccountPage 							from './Components/Pages/AccountPage/AccountPage';
import WelcomePage							from './Components/Pages/WelcomePage/WelcomePage';
import LandingPage							from './Components/Pages/LandingPage/LandingPage';
// Helper Imports
import { getSessionConfirm } 				from './HelperFunctions/session';
import { retrieveImages } 					from './HelperFunctions/images';
// Context Import
import { UserContext }						from './Context/user-context';

/* App - Main Starting Point for application */
/* Uses Context to determine which of the main pages to show at any given time */
const App = () => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [dinnerList, setDinnerList] = useState([]);

	// Used to try and login through SessionIDs, if not, show login page
	useEffect(() => {
		if (sessionStorage.getItem('sessionID')) {
			getSessionConfirm(ctxDispatch);
		} else {
			ctxDispatch({ type: 'CHANGEPAGE', payload: 'landing' });
		}
	}, []);

	// Used to prevent retrieving images too early before context data is retrieved from Server
	useEffect(() => {
		retrieveImages(ctx, ctxDispatch);
	}, [ctx.loaded]);

	console.log(ctx);

	return (
			<>
					{ctx.page === 'loading' 					&& <><h1>Loading...</h1><p>Please Wait</p></> }
					{ctx.page === 'landing'	&& !ctx.user.userID	&& <LandingPage />}
					{ctx.page === 'login' 	&& !ctx.user.userID && <LoginPage />}
					{ctx.page === 'welcome'	&& ctx.user.userID	&& <WelcomePage dispatch={ctxDispatch}/>}
					{ctx.page === 'account' && ctx.user.userID 	&& <AccountPage />}
					{ctx.page === 'recipes'	&& ctx.user.userID 	&& <RecipePage onDinnerRecipes={setDinnerList} dinnerList={dinnerList} />}
					{ctx.page === 'dinner'	&& ctx.user.userID 	&& <DinnerPage dispatch={ctxDispatch} dinnerList={dinnerList}/>} 
			</>
	);
}

export default App;