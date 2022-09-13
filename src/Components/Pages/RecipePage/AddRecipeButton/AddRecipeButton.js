// CSS Import
import classes from './AddRecipeButton.module.css';

// Open Add Recipe Modal to page
const AddRecipeButton = (props) => {
	return (
		<button onClick={props.onOpenModal}>Add Recipe</button>
	);
}

export default AddRecipeButton;