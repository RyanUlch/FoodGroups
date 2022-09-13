// CSS Import
import classes from './DisplayButton.module.css';

// Switch which recipes are shown based on users and groups recipes
const DisplayButton = (props) => {
  
	// Set which option is selected
	const setFilterHandler = (event) => {
		if (event.target.value === 'My Recipes') {
			props.onFilter('user');
		} else if (event.target.value === 'All Recipes') {
			props.onFilter('all');
		} else {
			props.onFilter(props.groups.findIndex(element => element.groupName === event.target.value));
		}
	};

	// Create option list based on groups user belongs to
	const optionGenerator = () => {
		if (props.groups) {
			const optionList = [];
			optionList.push(<option key={0} value='My Recipes'>My Recipes</option>);
			optionList.push(<option key={-1} value='All Recipes'>All Recipes</option>)
			for (const group of props.groups) {
				optionList.push(<option key={group.groupID} value={group.groupName}>{group.groupName}</option>);
			}
			return optionList;
		}
	}

    return (
		<select className={classes.dropdown} name='filter' id='filter' onChange={setFilterHandler}>
			{optionGenerator()}
		</select>
    );
};

export default DisplayButton;
