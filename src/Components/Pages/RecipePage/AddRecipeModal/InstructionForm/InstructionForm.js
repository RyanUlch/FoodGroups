// CSS Import
import classes from './InstructionForm.module.css';
// Library Imports
import { useState } from 'react';

// Form to set individual instructions
const InstructionForm = (props) => {
	// Set initial instruction state
	const [instruction, setInstruction] = useState({
		instruction: props.edit.instruction,
		timer: props.edit.timer,
		key: props.value,
		index: props.formState.instructions.findIndex(ele => ele.key === props.value),
	});

	// Change formState conditionally based on what is being changed (timer needs more logic than generic state setting)
	const onChangeHandler = (event) => {
		let newInstruction;
		let index;
		setInstruction((instPrevState) => {
			newInstruction = {...instPrevState};
			index = instPrevState.index;
			if (event.target.id === 'timerMin') {
				newInstruction.timer = [Number(event.target.value), instPrevState.timer[1]]
			} else if (event.target.id === 'timerSec') {
				newInstruction.timer = [instPrevState.timer[0], Number(event.target.value)]
			} else {
				newInstruction.instruction = event.target.value;
			}
			return newInstruction;
		});

		props.setFormState((formPrevState) => {
			const newInstructions = [...formPrevState.instructions];
			newInstructions[index] = newInstruction;
			return {
				...formPrevState,
				instructions: newInstructions,
			};
		});
	};

	return (
		<div className={classes.recipeInstructionInput}>
			<label htmlFor='instruction'>Recipe Instruction:</label>
			<textarea className={classes.instruction} onChange={onChangeHandler} name='instruction' value={instruction.instruction} type='text' id='instruction' maxLength='200' required/>
			<label htmlFor='timer'>Suggested Time:</label>
			<fieldset id='timer'>
				<input className={classes.timer} onChange={onChangeHandler} name='timerMin' value={instruction.timer[0]} type='number' id='timerMin' min='0' step='1'/>M
				<input className={classes.timer} onChange={onChangeHandler} name='timerSec' value={instruction.timer[1]} type='number' id='timerSec' min='0' step='1'/>S
			</fieldset>
			{props.onRemove && <button className={classes.removeButton} type='button' value={props.value} onClick={props.onRemove}>-</button>}
		</div>
	);
}

export default InstructionForm;