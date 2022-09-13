// CSS Import
import classes from './Sort.module.css';

// Set the Sorting method
const Sort = (props) => {

	// Set sorting method on Recipe Page
	const setSortHandler = (event) => {
		props.onSort(event.target.value);
	};

	return (
		<span>
			<label htmlFor='sort' className={classes.label}>Sort By: </label>
			<select defaultValue='dateUp' onChange={setSortHandler} className={classes.filter} name='sort' id='sort'>
				<option value='nameUp'>Name: Ascending</option>
				<option value='nameDown'>Name: Descending</option>
				<option value='dateUp'>Date Added: Ascending</option>
				<option value='dateDown'>Date Added: Descending</option>
			</select>
		</span>
	);
}

export default Sort;