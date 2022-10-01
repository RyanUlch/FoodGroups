// Table of Contents:
	// line 27		- AddFav
	// line 41		- AddRecipe
	// line 115		- DeleteRecipe
	// line 156		- EditRecipe
	// line 182		- RemFav
	// line 195		- SetImage
	// line 207		- SetRecipes
	// line 250		- Login
	// line 260		- Logout
	// line 266		- JoinGroup
	// line 275		- LeaveGroup
	// line 287		- SetGroups
	// line 293		- ChangePage
	// line 302		- SearchBy
	// line 312		- SortFilter
	// line 322		- Default

// Initial User State Import
import { nullUser } from "./user-context";

/* Reducer takes an action.type, and optional action.payload, will run a setState function for specified */
/* type from a switch statement */
const reducer = (state, action) => {
	switch (action.type) {
/* Regarding Recipes */ /* Regarding Recipes */ /* Regarding Recipes */ /* Regarding Recipes */ /* Regarding Recipes */ 
		// Add RecipeID to user's context
		case 'ADDFAV': {
			const addRecipes = state.user.recipeIDs;
			addRecipes.push(action.payload);
			return {
				...state,
				user: {
					...state.user,
					recipeIDs: addRecipes,
				},
			}
		}

		// Add a new recipe to context			
		case 'ADDRECIPE': {
			// If Recipes already exist, sort through current state to add
			// Else just add recipe to state as it's by itself
			if (state.recipes) {
				// Find which groups need to have the recipeID added to them
				const groupAdd = [...state.groups];
				for (const group of action.payload[2]) {
					const index = groupAdd.findIndex(ele => ele.groupID === Number(group));
					if (index > -1) { groupAdd[index].recipeIDs.push(action.payload[1]); };
				}

				// Add RecipeID for user
				let userRecipeIDs = [];
				if (state.user.recipeIDs) {
					userRecipeIDs = [...state.user.recipeIDs, action.payload[1]];
				} else {
					userRecipeIDs = [action.payload[1]];
				}

				// Create recipe with owner
				const recipe = {...action.payload[0], owner: state.user.userID};
				
				return {
					...state,
					recipes: [
						...state.recipes,
						recipe,
					],
					groups: [
						...groupAdd,
					],
					user: {
						...state.user,
						recipeIDs: userRecipeIDs,
					},
					recipeOrder: {
						...state.recipeOrder,
						allRecipes: [
							...state.recipeOrder.allRecipes,
							action.payload[0].recipeID,
						],
						order: [
							...state.recipeOrder.order,
							action.payload[0].recipeID
						],
						filtered: [
							...state.recipeOrder.filtered,
							action.payload[0].recipeID,
						],
					},
				}
			} else {
				return {
					user: {
						...state.user,
						recipeIDs: action.payload[0].recipeID,
					},
					groups: [
						...state.groups,
					],
					recipes: [
						action.payload[0],
					],
					recipeOrder: {
						allRecipes: [
							action.payload[0].recipeID,
						],
						order: [action.payload[0].recipeID],
					}
				}
			}
		}

		// Remove recipe and recipeID from all occurences
		case 'DELETERECIPE': {
			// Break state into it's constituent parts
			let newGroups 		= [...state.groups];
			let newOrder		= [...state.recipeOrder.order];
			let newAllRecipes	= [...state.recipeOrder.allRecipes];
			let newFiltered		= [...state.recipeOrder.filtered];
			let newRecipes		= [...state.recipes];
			let newUserRecipes	= [...state.user.recipeIDs];

			// Remove from userRecipes
			newUserRecipes = newUserRecipes.filter(ele => Number(ele) !== Number(action.payload));

			// Remove from each Group
			for (let group of newGroups) {
				newGroups[newGroups.findIndex(ele => Number(ele.groupID) === Number(group.groupID))].recipeIDs = group.recipeIDs.filter(ele => Number(ele) !== Number(action.payload));
			}

			// Remove from recipes
			newRecipes = newRecipes.filter(ele => Number(ele.recipeID) !== Number(action.payload));

			// Remove from sort/filter/all arrays
			newOrder		= newOrder.filter(ele => 		Number(ele) !== Number(action.payload));
			newFiltered		= newFiltered.filter(ele => 	Number(ele) !== Number(action.payload));
			newAllRecipes 	= newAllRecipes.filter(ele => 	Number(ele) !== Number(action.payload));
			
			return {
				...state,
				user: {
					...state.user,
					recipeIDs: [...newUserRecipes],
				},
				groups: [...newGroups],
				recipes: [...newRecipes],
				recipeOrder: {
					allRecipes: [...newAllRecipes],
					order: [...newOrder],
					filtered: [...newFiltered],
				}
			}
		}

		// Update existing recipe 
		case 'EDITRECIPE': {
			// Add Replace full recipe where previous recipe existed
			const newRecipes = state.recipes;
			const index = newRecipes.findIndex(ele => ele.recipeID === action.payload.recipeID);
			newRecipes[index] = action.payload.recipe;

			// Updating groups recipe is contained in, in case user changes groups
			let newGroups = [];
			for (const group of state.groups) {
				const index = group.recipeIDs.findIndex(ele => ele === action.payload.recipeID);
				const newGroup = group;
				if (action.payload.groupsToAddTo.includes(group.groupID)) {
					if (index === -1) { newGroup.recipeIDs.push(action.payload.recipeID); }
				} else if (action.payload.groupsToRemoveFrom.includes(group.groupID)) {
					if (index !== -1) {	newGroup.recipeIDs = group.recipeIDs.filter(ele => ele === action.payload.recipeID); }
				}
				newGroups.push(newGroup);
			}
			return {
				...state,
				recipes: newRecipes,
				groups: newGroups,
			};
		}

		// Remove RecipeID from user's context
		case 'REMFAV': {
			const delRecipes = state.user.recipeIDs;
			delRecipes.filter(ele => ele !== action.payload);
			return {
				...state,
				user: {
					...state.user,
					recipeIDs: delRecipes.filter(ele => ele !== action.payload),
				},
			};
		}

		// Set the image url for the RecipeID
		case 'SETIMAGE': {
			const index = state.recipes.findIndex(ele => ele.recipeID === action.payload.recipeID);
			const recipes = [...state.recipes];
			recipes[index].imgURL = action.payload.imgURL;
			console.log(action.payload.imgURL);
			return {
				...state,
				recipes: recipes,
			}
		}

		// Set All Recipes for initial setup
		case 'SETRECIPES': {
			// Copy state to alter
			const newState = { ...state };
			// Checks the entries, alter how it is handled based on property name
			for (const entry of Object.entries(action.payload)) {
				switch (entry[0]) {
					case 'userRecipes':
					newState.user.recipeIDs = entry[1];
						break;
					case 'recipes':
						newState.recipes = entry[1];
						break;
					case 'allRecipes':
						newState.recipeOrder = {
							allRecipes: [...entry[1]],
							order: [...entry[1]],
							filtered: [...entry[1]],
						};
						break;
					// If property is not one of the above, it will be a group, handle adding to groups below
					default: {
						const index = newState.groups.findIndex(group => Number(group.groupID) === Number(entry[0]));
						if (index > -1) {
							const hasRecipeIDs = newState.groups[index].hasOwnProperty('recipeIDs') ? newState.groups[index].recipeIDs : [];
							hasRecipeIDs.push(...entry[1]);
							const recipeIDs = [
								...hasRecipeIDs,
							];
							newState.groups[index] = {
								...newState.groups[index],
								recipeIDs: [...recipeIDs],
							};
						}
					}
				}
			}
			// Add loaded state to true so that images can load properly
			newState.loaded = true;
			return newState;
		}

/* Regarding User Account */ /* Regarding User Account */ /* Regarding User Account */ /* Regarding User Account */
		// Set user to logged in and show recipes page
		case 'LOGIN': {
			return { 
				...nullUser,
				user: action.payload.user,
				page: action.payload.page,
			};
		}

		// Set user to nullUser and show login page
		case 'LOGOUT': {
			console.log('logging out');
			return { ...nullUser, page: 'login'};
		}
		
/* Regarding Groups */ /* Regarding Groups */ /* Regarding Groups */ /* Regarding Groups */ /* Regarding Groups */
		// Add group to users groups
		case 'JOINGROUP': {
			const groups = [...state.groups];
			groups.push({groupID: action.payload.group.groupID, groupName: action.payload.group.groupName, recipeIDs: action.payload.group.recipeIDs});
			return {
				...state,
				groups: [...groups],
			};
		}
		
		// Remove group from users groups
		case 'LEAVEGROUP': {
			const index = state.groups.findIndex(ele => Number(ele.groupID) === Number(action.payload));
			let newGroups = [];
			newGroups.push(...state.groups.slice(0, index));
			newGroups.push(...state.groups.slice(index+1));
			return {
				...state,
				groups: [...newGroups],
			};
		}

		// Insert groups during initialization
		case 'SETGROUPS': {
			return { ...state, groups: action.payload};
		}

/* Regarding User Actions */ /* Regarding User Actions */ /* Regarding User Actions */ /* Regarding User Actions */
		// Change which page the user sees
		case 'CHANGEPAGE': {
			return {
				...state,
				page: action.payload,
			}
		}

		// Set which recipes can be shown
		case 'SEARCHBY': {
			return {
				...state,
				recipeOrder: {
					...state.recipeOrder,
					filtered: action.payload,
				}
			};
		}

		// Change how the recipes are displayed
		case 'SORTFILTER': {
			const newOrder = state;
			newOrder.recipeOrder.order = action.payload;
			return {
				...newOrder
			}
		}
	
/* Default */ /* Default */ /* Default */ /* Default */ /* Default */ /* Default */ /* Default */ /* Default */ 
		// In case there is a call that is not handled
		default: {
			throw new Error(`Didn't use correct action type in recipe-reducer`);
		}
	}
}

export default reducer;