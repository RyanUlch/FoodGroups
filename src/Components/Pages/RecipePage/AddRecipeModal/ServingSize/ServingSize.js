// CSS Import
import classes from './ServingSize.module.css';

// Let user set the standard serving size for recipe (used so that ingredient amounts are accurate when setting serving size in other parts of app)
const ServingSize = (props) => {
	// Set serving size in formState
	const onChangeHandler = (event) => {
		props.onChangeServings(prevState => {
			return {
				...prevState,
				servings: Number(event.target.value),
			};
		});
	};

	return (
		<label>This recipe should serve:
		<input className={classes.serving} onChange={onChangeHandler} value={props.formState.servings} name='serving' type='number' min='1' max='999' id='serving' step='1' required/>
		</label>
	);
}

export default ServingSize;