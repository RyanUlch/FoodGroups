// CSS Import
import classes from './AddRecipeModal.module.css';
// Library Imports
import { useState, useContext, useEffect } from 'react';
// Component Imports
import Modal from '../../../Containers/Modal/Modal';
import Card from '../../../Containers/Card/Card';
import IngredientForm from './IngredientForm/IngredientForm';
import InstructionForm from './InstructionForm/InstructionForm';
import UploadImage from './UploadImage/UploadImage';
import GroupSelectorForm from './GroupSelectorForm/GroupSelectorForm';
import ServingSize from './ServingSize/ServingSize';
// Context Import
import { UserContext } from '../../../../Context/user-context';
// Helper Function Imports
import { addEditRecipe } from '../../../../HelperFunctions/recipes';
import { uploadImage } from '../../../../HelperFunctions/images';

// Modal shown when user wants to add/edit a recipe
const AddRecipeModal = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [ingredientList, setIngredientList] = useState([]);
	const [instructionList, setInstructionList] = useState([]);
	const [groupList, setGroupList] = useState(null);
	const [descriptionLimit, setDescriptionLimit] = useState(500);
	const [img, setImg] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	// Large initial state, but needs to set up form if user is editing an existing recipe
	const [formState, setFormState] = useState(() => {
		if (props.id) {
			const recipe = ctx.recipes[ctx.recipes.findIndex(ele => ele.recipeID === Number(props.id))];
			const groups = [];
			ctx.groups.forEach(groupEle => {
				if (groupEle.recipeIDs.includes(recipe.recipeID)) {
					groups.push(groupEle.groupID);
				}
			});
			const ingredients = [...recipe.ingredients];
			ingredients.forEach(ele => ele.key = Date.now() + Math.random() * 1000);
			const instructions = [...recipe.instructions];
			instructions.forEach(ele => ele.key = Date.now() + Math.random() * 1000);
			setDescriptionLimit(500 - recipe.recipeDescription.length);
			return {
				recipeID: recipe.recipeID,
				recipeName: recipe.recipeName,
				recipeDescription: recipe.recipeDescription,
				ingredients: ingredients,
				instructions: instructions,
				groupSelections: [...groups],
				img: recipe.imgURL,
				servings: recipe.servings,
			}
		} else {
			return {
				recipeID: null,
				recipeName: '',
				recipeDescription: '',
				ingredients: [
					{
						key: Date.now() + Math.random() * 1000,
						ingredient: '',
						amount: 1,
						unit: '',
					},
				],
				instructions: [
					{
						key: Date.now() + Math.random() * 1000,
						instruction: '',
						timer: [0, 0],
					},
				],
				groupSelections: [],
				img: null,
				servings: 1,
			}
		}
	});

	// Display the image associated with recipe (even when the image is first uploaded)
	const displayImg = (url) => {
		if (url) {
			setImg(url);
		} else if (formState.img) {
			setImg(formState.img);
		} else {
			setImg(require(`../../../../Assets/default.jpeg`));
		}
	};

	// Try to display new image when one is selected by user for upload
	useEffect(() => {
		try {
			const imageObjectURL = URL.createObjectURL(selectedFile);
			displayImg(imageObjectURL);
		} catch {
			displayImg(null);
		}
	}, [selectedFile]);


	// Remove Ingredient from form
	const ingredientRemoveHandler = (event) => {
		setFormState((prevState) => {
			const index = prevState.ingredients.findIndex(element => Number(event.target.value) === Number(element.key));
			return {
				...prevState,
				ingredients: [
					...prevState.ingredients.slice(0, index),
					...prevState.ingredients.slice(index+1),
				],
			};
		});
	};

	// Remove Instruction from form
	const instructionRemoveHandler = (event) => {
		setFormState((prevState) => {
			const index = prevState.instructions.findIndex(element => Number(event.target.value) === Number(element.key));
			return {
				...prevState,
				instructions: [
					...prevState.instructions.slice(0, index),
					...prevState.instructions.slice(index+1),
				],
			};
		});
	};

	// Prep data to send to Server, then attempt to send it
	// Note: Modal will close regardless of whether or not the add/edit succeeds (but user will be alerted to the failure)
	const addRecipeHandler = (event) => {
		event.preventDefault();
		const groupsToAddTo = [];
		const groupsToRemoveFrom = [];
		ctx.groups.forEach(ele => formState.groupSelections.includes(ele.groupID) ? groupsToAddTo.push(ele.groupID) : groupsToRemoveFrom.push(ele.groupID));
		let fileName = null;
		let fileURL = null
		if (selectedFile) {
			fileName = Date.now()+formState.recipeName.replace(' ', '_')+'.'+selectedFile.name.split('.').pop();
			const newFile = new File([selectedFile], fileName, {type: selectedFile.type});
			uploadImage(newFile);
			fileURL = URL.createObjectURL(newFile);
		};
		addEditRecipe(formState, ctx.user.userID, groupsToAddTo, groupsToRemoveFrom, ctxDispatch, fileName, fileURL);
		onCloseModal();
	};

	// Add a new ingredient to list
	const ingredientListHandler = () => {
		const ingredientID = Date.now() + Math.random() * 1000;
		setFormState((prevState => {
			const allIngredients = [
				...prevState.ingredients,
				{
					ingredient: '',
					key: ingredientID,
					amount: '1',
					unit: '',
				},
			];
			return {
				...prevState,
				ingredients: allIngredients,
			}
		}));
	};

	// Add a new instruction to list
	const instructionListHandler = () => {
		const instructionID = Date.now() + Math.random() * 1000;
		setFormState((prevState => {
			const allInstructions = [
				...prevState.instructions,
				{
					key: instructionID,
					instruction: '',
					timer: [0, 0],
				},
			];
			return {
				...prevState,
				instructions: allInstructions,
			}
		}));
	};

	// Close modal from user clicking 'x' or submitting form
	const onCloseModal = () => {
		props.onSubmitEdit(null);
		props.onCloseModal();
	};

	// Change formstate upon user interaction (also set description limit if typing in description box)
	const onChangeHandler = (event) => {
		if (event.target.id === 'recipeDescription') {
			setDescriptionLimit(500 - event.target.value.length);
		}

		setFormState((prevState) => {
			return {
				...prevState,
				[event.target.id]: event.target.value,
			};
		});
	};

	// Create List of IngredientForms from formState
	useEffect(() => {
		const list = [];
		if (formState) {
			for (const ingredient of formState.ingredients) {
				list.push(<IngredientForm formState={formState} value={ingredient.key} setFormState={setFormState} edit={ingredient} key={ingredient.key} onRemove={ingredientRemoveHandler}/>);
			};
			list.push(<button key='ingredient' className={`${classes.addButton}`} type='button' onClick={ingredientListHandler}>+</button>);
			setIngredientList(list);
		};
	}, [formState.ingredients]);

	// Create List of InstructionForms from formState
	useEffect(() => {
		const list = [];
		if (formState) {
			for (const instruction of formState.instructions) {
				list.push(<InstructionForm formState={formState} value={instruction.key} setFormState={setFormState} edit={instruction} key={instruction.key} onRemove={instructionRemoveHandler}/>);
			};
			list.push(<button key='instruction' className={`${classes.addButton}`} type='button' onClick={instructionListHandler}>+</button>);
			setInstructionList(list);
		};
	}, [formState.instructions]);

	// Create List of GroupSelectorForms for all groups user could select to add recipe to
	useEffect(() => {
		if (formState) {
			const list = [];
			for (const group of ctx.groups) {
				list.push(<GroupSelectorForm key={group.groupID} groupID={group.groupID} groupName={group.groupName} onGroupChange={setFormState} formState={formState}/>)
			};
			
			setGroupList(list.length > 0 ? list : null);
		}
	}, [ctx.groups]);

	// If formState is not loaded, show loading text
	if (formState === null) {
		return (
			<Modal onCloseModal={onCloseModal}>
				<Card>
					Loading...
				</Card>
			</Modal>
		);
	} else {
		return (
			<Modal onCloseModal={onCloseModal}>
				<Card>
					<form onSubmit={addRecipeHandler}>
					<h4 className={classes.modalTitle}>Add New Recipe</h4>
					<button className={classes.exitButton} onClick={props.onCloseModal}>x</button>
					<hr />
					<div className={classes.together}>
						<label className={classes.label} htmlFor='recipeName'>Recipe Name:</label>
						<input autoFocus className={classes.name} onChange={onChangeHandler} type='text' id='recipeName' value={formState.recipeName} maxLength='50' required/>
					</div>
					<div className={classes.together}>
						<label className={classes.label} htmlFor='recipeDescription'>Recipe Description:</label>
						<textarea className={classes.description} onChange={onChangeHandler} value={formState.recipeDescription} id='recipeDescription' maxLength='500'/>
						<p>left: {descriptionLimit}</p>
					</div>
					<ServingSize onChangeServings={setFormState} formState={formState}/>
					<hr />
					<p className={classes.imageText}>Upload Recipe Image:</p>
					<img className={classes.image} src={img} alt=''/>
					<UploadImage onSelectImage={setSelectedFile}/>
					<p className={classes.imageText}>(jpeg and png files only)</p>
					<hr />
					<h5>Ingredients:</h5>
					{ingredientList}
					<hr />
					<h5>Instructions:</h5>
					{instructionList}
					<hr />
					{groupList ? <><h5>Add to Groups (Optional):</h5>{groupList}<hr /></> : ''}
					<input className={classes.submitButton} type='submit' />					</form>
				</Card>
			</Modal>
		);
	}
}
export default AddRecipeModal;