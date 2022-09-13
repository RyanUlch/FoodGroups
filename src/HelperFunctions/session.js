// Table of Contents:
	// line 9		- Attempt Session Connection

/* Helper/ServerHost Imports */
import { getGroups } from './groups';
import { postFetch } from './serverHost';

	/* Attempt Session Connection */
/* Attempts to log in using authenticated token in sessionStorage, failing will show login screen */
export const getSessionConfirm = (dispatch) => {
	postFetch(
	// Path:
		'sessions',
	// Body:
		{ userID: sessionStorage.getItem('userID'), token: sessionStorage.getItem('sessionID') },
	// SuccessHandler:
		(response) => {
			dispatch({ type: 'LOGIN', payload: response.payload	});
			getGroups(response.payload.userID, dispatch);
		},
	// FailureHandler:
		() => { console.log('needlogin'); dispatch({ type: 'CHANGEPAGE', payload: 'login'})}
	);
}