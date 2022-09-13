// CSS Import
import classes from './SearchBar.module.css';

// Let user search for specific recipes
const SearchBar = (props) => {
	// Set the filtered term on Recipe Page
	const setSearchHandler = (event) => {
		props.onSetSearch(event.target.value);
	};

	return (
		<span>
			<label htmlFor='search' className={classes.label}>Search:</label>
			<input className={classes.input} id='search' type='search' name='search' value={props.searchInput} onChange={setSearchHandler}/>
		</span>
	);
};

export default SearchBar;