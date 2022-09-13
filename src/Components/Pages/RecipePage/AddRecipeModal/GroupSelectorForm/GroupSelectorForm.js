// CSS Import
import classes from './GroupSelectorForm.module.css';
// Library Imports
import { useState } from 'react';

// Let user set if recipe should be added or removed from group they belong to
const GroupSelectorForm = (props) => {
	const [selected, setSelected] = useState(props.formState.groupSelections.includes(props.groupID) ? true : false);

	// Change formState and if selected state
	const newSelectionHandler = (event) => {
		setSelected(event.target.checked);
		props.onGroupChange(prevState => {
			let selections = prevState.groupSelections;
			if (event.target.checked) {
				if (!selections.includes(props.groupID)) {
					selections.push(props.groupID);
				};
			} else {
				selections = selections.filter(ele => ele !== props.groupID);
			};

			return {
				...prevState,
				groupSelections: selections,
			};
		});
	}

	return (
		<span className={classes.groupSelector}>
			<input id={props.groupID} type='checkbox' onChange={newSelectionHandler} checked={selected}/><label htmlFor={props.groupID}>{props.groupName}</label>
		</span>
	);
}

export default GroupSelectorForm;