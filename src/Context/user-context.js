/* Context is used to store most of the applications state. */
/* It contains User, Recipe, and group information as well as */
/* a few other supplimental required states */

// React Imports
import { useState, createContext, useReducer } from 'react';
// Reducer Import
import reducer from './user-reducer';

// An initial user Context object to be used when first loading, and when user logs out
export const nullUser = {
	user: { userID: null, username: null, groupIDs: null, recipeIDs: null },
	groups: [],
	recipes: [],
	recipeOrder: { allRecipes: [], order: [], filtered: [] },
}

const Provider = (props) => {
	// User Info contains all Context Data accessed through provider in rest of application
	const [userInfo, setUserInfo] = useState({...nullUser, page: 'loading'});
	// Context Handles, gets called when useContext is invoked
	const [userContext, userDispatch] = useReducer(reducer, userInfo);
	// Provider that just supplies the ability to call useContext for all children
    return (<UserContext.Provider value={[userContext, userDispatch]}>{props.children}</UserContext.Provider>);
};

// Exports
export default Provider;
export const UserContext = createContext();