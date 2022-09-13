// Sets how many servings to use for this recipe
const ServingSizeSelector = (props) => {

	// Set serving size on Recipe Display
	const changeServingsHandler = (event) => {
		props.onSelectServingSize(prevState => {
			return {
				...prevState,
				servings: Number(event.target.value),
			}
		});
	}

	return (
		<label>Serving Size: <input type='number' min='1' max='999' value={props.servings} onChange={changeServingsHandler} /></label>
	);
}

export default ServingSizeSelector;