// Table of Contents:
	// line 9		- Get All Recipes
	// line 26		- Add or Edit Recipe
	// line 87		- Delete Recipe

/* ServerHost Imports */
import { postFetch, deleteFetch } from './serverHost';

	/* Get All Recipes */
/* Get All Recipe IDs from User, Groups, and Owned lists and compile all recipes in object */
export const getAllRecipes = (userID, groups, dispatch) => {
	// If UserID or Groups are null (not empty), return early as this is being accessed out of initilization order
	if (!userID || !groups) { return };	
	postFetch(
	// Path:
		'recipes/get',
	// Body:
		{ userID: userID, groups: groups },
	// SuccessHandler
		(response) => { dispatch({ type: 'SETRECIPES', payload: response.payload }); },
	// FailureHandler
		() => {	dispatch({type: 'SETRECIPES', payload: { recipes: [] } }); }
	);
};

	/* Add or Edit Recipe */
/* Add or Edit a recipe in DB, no real difference between the two besides how client handles dispatch */
export const addEditRecipe = async (body, userID, groupsToAddTo, groupsToRemoveFrom, dispatch, imagePath, imageURL) => {
	// Remove Keys from ingredients/instructions as it is only used for React, and is added dynamically when displayed
	const ingredients = [];
	for (const ingredient of body.ingredients) {
		const { key, ...newIngredient } = ingredient;
		ingredients.push(newIngredient);
	};

	const instructions = [];
	for (const instruction of body.instructions) {
		const { key, ...newInstruction } = instruction;
		instructions.push(newInstruction);
	};

	postFetch(
	// Path:
		'recipes/addEdit',
	// Body:
		{
			recipeID: body.recipeID,						recipeName: body.recipeName,
			recipeDescription: body.recipeDescription,		ingredients: body.ingredients,
			instructions: body.instructions,				groupsToAddTo: groupsToAddTo,
			groupsToDeleteFrom: groupsToRemoveFrom,			userID: userID,
			imagePath: imagePath,							servings: body.servings
		},
	// SuccessHandler
		(response) => {
			const res = response.payload[0];
			// Structure Recipe Object
			const newRecipe = {
				recipeName: res.recipeName,					recipeDescription: res.recipeDescription,
				date: res.date,								recipeID: res.recipeID,
				ingredients: JSON.parse(res.ingredients),	instructions: JSON.parse(res.instructions),
				owner: res.owner,							imagePath: res.imgURL,
				servings: res.servings
			}
			
			// Check if a recipeID was provided by system, if so, it is from an existing recipe, and
				// we should edit the recipe in the Context, or else add a new recipe.
			if (body.recipeID) {
				dispatch({
					type: 'EDITRECIPE',
					payload: {
						recipe: newRecipe,				recipeID: body.recipeID,
						groupsToAddTo: groupsToAddTo,	groupsToRemoveFrom: groupsToRemoveFrom
					},
				});
			} else {
				dispatch({ type: 'ADDRECIPE', payload: [newRecipe, res.recipeID, groupsToAddTo]	});
			}

			// If a (new) image was provided, add/edit it in Context
			if (imageURL) {
				dispatch({ type: 'SETIMAGE', payload: { imgURL: imageURL, recipeID: res.recipeID } });
			}
		}
	);
}

	/* Delete Recipe */
/* Deletes Recipe from DB while also removing all Relationships to that recipeID */
export const deleteRecipe = (recipeID, userID, dispatch) => {
	deleteFetch(
	// Path:
		'recipes/delete',
	// Body: 
		{ recipeID: recipeID, userID: userID },
	// SuccessHandler
		() => { dispatch({ type: 'DELETERECIPE', payload: recipeID }) }
	);
}