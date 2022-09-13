// Table of Contents:
	// line 11		- Get Groups
	// line 27		- Attempt Join Group
	// line 42		- Attempt Create Group
	// line 61		- Leave Group

/* Helper/ServerHost Imports */
import { getAllRecipes } from './recipes';
import { postFetch } from './serverHost';

	/* Get Groups */
/* Get Groups from server for specific UserID (can be empty) */
export const getGroups = (userID, dispatch) => {
	postFetch(
	// Path:
		'groups/get',
	// Body:
		{ userID: userID },
	// SuccessHandler:
		(response) => {
			dispatch({ type: 'SETGROUPS', payload: response.payload });
			getAllRecipes(userID, response.payload, dispatch);
		}
	);
}

	/* Attempt Join Group */
/* Try to join an existing group with a groupName and password, display error if it fails */
export const joinGroup = (userID, groupName, groupPass, dispatch) => {
	postFetch(
	// Path:
		'groups/join',
	// Body:
		{ userID: userID, groupName: groupName, groupPass: groupPass },
	// SuccessHandler:
		(response) => {	dispatch({ type: 'JOINGROUP', payload: { group: response.payload } }); },
	// FailureHandler
		(msg) => { alert(`Error: ${msg}`); }
	);
}

	/* Attempt Create Group */
/* Try to create a group with supplied groupName and password, display error if it fails */
export const createGroup = (userID, groupName, groupPass, dispatch) => {
	postFetch(
	// Path:
		'groups/create',
	// Body:
		{ userID: userID, groupName: groupName, groupPass: groupPass },
	// SuccessHandler:
		(response) => {
			dispatch({ type: 'JOINGROUP', payload: { group: response.payload } });
		},
	// FailureHandler
		(msg) => {
			alert(`Error: ${msg}`);
		}
	);
}

	/* Leave Group */
/* Leave an existing group by removing relationship in DB */
export const leaveGroup = (userID, groupID, dispatch) => {
	postFetch(
	//Path:
		'groups/leave',
	// Body:
		{ userID: userID, groupID: groupID },
	// SuccessHandler:
		() => { dispatch({ type: 'LEAVEGROUP', payload: groupID }) }
	);
}