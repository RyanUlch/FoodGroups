// CSS Import
import classes from './JoinGroup.module.css';
// Library Imports
import { useState, useContext } from 'react';
// Component Imports
import Modal from '../../../Containers/Modal/Modal';
import Card from '../../../Containers/Card/Card';
// Context Import
import { UserContext } from '../../../../Context/user-context';
// Helper Function Import
import { joinGroup } from '../../../../HelperFunctions/groups';

// A Modal box allowing user to enter known group name and password
const JoinGroupModal = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [formState, setFormState] = useState({
		groupName: '',
		groupPassword: '',
	});

	// Close Modal (from hitting the 'x' or by submitting)
	const onCloseModal = () => {
		props.onCloseModal();
	};

	// Change the formState of the group name or password
	const onChangeHandler = (event) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[event.target.id]: event.target.value,
			};
		});
	};

	// When user submits, attempt to join group
	/* Note: currently the modal will close regardless of if there is a successful join or not.
		The user will be alerted to the failure through an alert box, but would have to reopen and
		re-enter the group name and password. Should be fixed to avoid user re-doing work */
	const joinGrouphandler = (event) => {
		event.preventDefault();
		joinGroup(ctx.user.userID, formState.groupName, formState.groupPassword, ctxDispatch);
		props.onCloseModal();
	}

	return (
		<Modal onCloseModal={onCloseModal}>
 			<Card>
 				<form onSubmit={joinGrouphandler}>
					<button type='button' className={classes.exitButton} onClick={props.onCloseModal}>x</button>
					<h2>Join An Existing Group:</h2>
					<label htmlFor='groupName'>Group Name: </label>
					<input autoFocus autoComplete='username' id='groupName' onChange={onChangeHandler} type='text' value={formState.groupName} required />
					<label htmlFor='groupPassword'>Group Password: </label>
					<input autoComplete='current-password' id='groupPassword' onChange={onChangeHandler} type='password' value={formState.groupPassword} required />
					<input className={classes.submitButton} type='submit' /> 				</form>
 			</Card>
 		</Modal>
	);
}

export default JoinGroupModal;