// Table of Contents:
	// line 12		- Attempt Login
	// line 35		- Attempt Create User
	// line 58		- Logout Handler
	// line 65		- Add Favorite
	// line 78		- Remove Favorite

/* Helper/ServerHost Imports */
import { getGroups } from './groups';
import { postFetch, setSession } from './serverHost';

	/* Attempt Login  */
/* Sends Server entered username and password to verify user account. if successful, handle login; else, display error */
export const getUserAccount = (user, pass, ctx, dispatch, setError) => {
	postFetch(
	// Path:
		'accounts/login',
	// Body:
		{ username: user, password: pass },
	// SuccessHandler:
		(response) => {
			setSession(response.payload);
			setError(null);
			dispatch({ type: 'LOGIN', payload: response.payload });
			getGroups(response.payload.userID, dispatch);
		},
	// FailureHandler:
		(msg) => {
			setSession();
			setError(msg);
		}
	);
}

	/* Attempt Create User */
/* Sends server requested username/password/email, if all is well, login in with new account */
export const createUserAccount = (user, email, pass, ctx, dispatch, setError) => {
	postFetch(
	// Path:
		'accounts/signup',
	// Body: 
		{ username: user, email: email, password: pass },
	// SuccessHandler
		(response) => {
			setSession(response.payload);
			setError(null);
			dispatch({ type: 'LOGIN', payload: response.payload });
			getGroups(response.payload.userID, dispatch);
		},
	// FailureHandler
		(msg) => {
			setSession();
			setError(msg);
		}
	);
};

	/* Logout handler */
/* No need to contact server, when user logs out, they lose their session token */ 
export const logout = (dispatch) => {
	setSession();
	dispatch({ type: 'LOGOUT' });
}

	/* Add Favorite */
/* Add Recipe to user relationship DB */ /* Add Recipe to user relationship DB */ /* Add Recipe to user relationship DB */ 
export const addFavorite = (userID, recipeID, dispatch) => {
	postFetch(
	// Path:
		'accounts/addFav',
	// Body:
		{ userID: userID, recipeID: recipeID },
	// SuccessHandler:
		() => {	dispatch({ type: 'ADDFAV', payload: recipeID }); }
	);
};

	/* Remove Favorite */
/* Remove Recipe to user relationship DB */
export const removeFavorite = (userID, recipeID, dispatch) => {
	postFetch(
	// Path:
		'accounts/remFav',
	// Body:
		{ userID: userID, recipeID: recipeID },
	// SuccessHandler:
		() => {	dispatch({ type: 'REMFAV', payload: recipeID }); }
	);
}