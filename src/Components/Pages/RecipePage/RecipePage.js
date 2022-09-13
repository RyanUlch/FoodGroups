// CSS Import
import classes from './RecipePage.module.css';
// Library Imports
import { useState, useEffect, useContext } from 'react';
// Component Imports
import Header from '../../Containers/Header/Header';
import SearchBar from './SearchBar/SearchBar';
import AccountDropDown from './AccountDropDown/AccountDropDown';
import RecipeBar from './RecipeBar/RecipeBar';
import DisplayButton from './DisplayButton/DisplayButton';
import AddRecipeButton from './AddRecipeButton/AddRecipeButton';
import RecipeList from './RecipeList/RecipeList';
import AddRecipeModal from './AddRecipeModal/AddRecipeModal';
import RecipeDisplay from './RecipeDisplay/RecipeDisplay';
import Sort from './Sort/Sort';
// Context Import
import { UserContext } from '../../../Context/user-context';

// Shows users recipes, and allows user to add new recipes
const RecipePage = (props) => {
	const [isShowAddModal, setIsShowAddModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [searchInput, setSearchInput] = useState('');
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [didUpdate, setDidUpdate] = useState(0);
	const [deselecter] = useState(document.getElementsByClassName('deselectItem'));
	const [editingRecipe, setEditingRecipe] = useState(null);
	const [disableButton, setDisableButton] = useState(true);
	const [nextKey, setNextKey] = useState(null);
	const [sortBy, setSortBy] = useState('nameUp');
	const [filterBy, setFilterBy] = useState('user');

	// Open up modal for adding a recipe
	const openModalHandler = () => {
		setIsShowAddModal(true);
	}

	// Close modal when user clicks 'x' or submits recipe
	const closeModalHandler = () => {
		setIsShowAddModal(false);
	}

	// Unselect specific Recipe
	const removeSelectionHandler = (event) => {
		for (const element of deselecter) {
			if (element === event.target) {
				setSelectedItem(null);
				break;
			}
		}
	};

	// Change page to 'Dinner' page
	const startDinnerHandler = () => {
		ctxDispatch({ type: 'CHANGEPAGE', payload: 'dinner'});
	}

	// Set the next key for React to handle list
	useEffect(() => {
		setNextKey(ctx.length + Math.random());
	}, [ctx.length]);

	// Disable button to go to 'Dinner' page if there is nothing set for 'Dinner'
	useEffect(() => {
		if (props.dinnerList.length > 0) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	}, [props.dinnerList]);

	// Set the filter for recipes when user uses search bar, or filter gets set
	useEffect(() => {
		if (ctx.loaded) {
			let filtered = [];
			if (filterBy === 'user') 		{ filtered = [...ctx.user.recipeIDs]; }
			else if (filterBy === 'all')	{ filtered = [...ctx.recipeOrder.allRecipes]; }
			else if (filterBy !== null)		{ filtered = [...ctx.groups[filterBy].recipeIDs]; }
			else							{ filtered = [...ctx.recipeOrder.allRecipes]; }	

			let filteredRecipes = [];
			if (searchInput.length > 0) {
				// Search is case-insensitive
				const searchAltered = searchInput.toLowerCase();
				for (const recipe of ctx.recipes) {
					// Check recipe name, description, and ingredients for search term, only if it is apart of the filtered recipes
					if (filtered.includes(recipe.recipeID)
						&& (recipe.recipeName.toLowerCase().includes(searchAltered)
						|| recipe.recipeDescription.toLowerCase().includes(searchAltered)
						|| recipe.ingredients.some(ele => ele.ingredient.toLowerCase().includes(searchAltered))))
					{ filteredRecipes.push(recipe.recipeID); }
				}
			} else {
				// There is no search term, set to all recipes that match filter
				filteredRecipes = filtered;
			}

			ctxDispatch({
				type: 'SEARCHBY',
				payload: filteredRecipes,
			});
		}
 	}, [searchInput, filterBy, ctx.recipeOrder.allRecipes]);

	// Set the order of the filtered recipes
	useEffect(() => {
		if (ctx.loaded) {
			
			// Start with the filtered recipes
			let recipeTemp = [];
			ctx.recipeOrder.filtered.forEach(orderElement => {
				recipeTemp.push(ctx.recipes.find(recipeElement => recipeElement.recipeID === orderElement))
			});

			// Sort into temporary Array based on specific Sorting method
			if (sortBy) {
				switch(sortBy) {
					case 'nameUp':
						recipeTemp = recipeTemp.sort((a, b) => a.recipeName.toLowerCase() > b.recipeName.toLowerCase() ? 1 : -1);
						break;
					case 'nameDown':
						recipeTemp = recipeTemp.sort((a, b) => a.recipeName.toLowerCase() < b.recipeName.toLowerCase() ? 1 : -1);
						break;
					case 'dateUp':
						recipeTemp = recipeTemp.sort((a, b) => a.date > b.date ? 1 : -1);
						break;
					case 'dateDown':
						recipeTemp = recipeTemp.sort((a, b) => a.date < b.date ? 1 : -1);
						break;
				}
			}

			// Get only the recipeIDs to set the order of the context
			const order = [];
			recipeTemp.forEach((element) => {
				order.push(element.recipeID);
			})

			ctxDispatch({
				type: 'SORTFILTER',
				payload: order,
			});
		}
	}, [sortBy, ctx.recipeOrder.filtered]);

	return (
		<div className={classes.container}>
			{isShowAddModal && <AddRecipeModal onUpdate={setDidUpdate} id={editingRecipe} onSubmitEdit={setEditingRecipe}  recipelength={nextKey} onCloseModal={closeModalHandler} onAddRecipe={props.onAddRecipe}></AddRecipeModal>}
			<Header>
				<h1 className={classes.title}>Food Groups</h1>
				<div className={classes.filter}>
					<SearchBar onSetSearch={setSearchInput} searchInput={searchInput}/>
					<Sort onSort={setSortBy} dispatch={ctxDispatch} />
				</div>
				<AccountDropDown dispatch={ctxDispatch} name={ctx.user.username}/>	
			</Header>
			<main className='deselectItem' onMouseDown={removeSelectionHandler}>
				<div className={classes.top}>
					<RecipeBar>
						<DisplayButton onFilter={setFilterBy} groups={ctx.groups} />
						<button disabled={disableButton} onClick={startDinnerHandler}>Start Dinner!{`(${props.dinnerList.length})`} </button>
						<AddRecipeButton onOpenModal={openModalHandler}/>
					</RecipeBar>
				</div>
				<RecipeList list={ctx.recipeOrder.order} selected={selectedItem} onSelectItem={setSelectedItem} onRemoveSelctItem={removeSelectionHandler}/>
				{selectedItem && <RecipeDisplay setSelection={setSelectedItem} dinnerList={props.dinnerList} onDinnerSelect={props.onDinnerRecipes} onSetEdit={setEditingRecipe} onSetEditModal={setIsShowAddModal} id={selectedItem} />}
			</main>
		</div>
	);
}

export default RecipePage;