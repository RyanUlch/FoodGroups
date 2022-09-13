// CSS Import
import classes from './Timer.module.css';
// Library Imports
import { useState, useEffect } from 'react';

const Timer = (props) => {
	const [timerState, setTimerState] = useState(props.initial);
	const [isRunning, setIsRunning] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [timerID, setTimerID] = useState(null);

	// Run the timer, stop and alert user when finished
	// Allow user to pause timer by clicking it again
	useEffect(() => {
		setTimerID(setInterval(() => {
			if (isRunning) {
				setTimerState(prevState => {
					const newTime = [Number(prevState[0]), Number(prevState[1])];
					if (newTime[1] === 0 && newTime[0] > 0) {
						newTime[0] -= 1;
						newTime[1] = 59;
					} else if (newTime[1] === 0) {
						newTime[0] = 0;
						newTime[1] = 0;
						clearInterval(timerID);
						setIsRunning(false);
						setIsComplete(true);
						props.onSetAlert(props.id);
					} else {
						newTime[1] -= 1;
					}
					return newTime;
				});
			}  else {
				setTimerID((prevState) => {
					clearInterval(prevState);
					return null;
				});
			}
		}, 1000));
	
		return () => {
			setTimerID(prevState => {
				clearInterval(prevState);
				return null;
			});
		};
	}, [isRunning]);

	// Start/Stop Timer
	const timerHandler = (event) => {
		if (!isComplete) {
			setIsRunning(prevState => {
				return prevState ? false : true
			});
		}		
	}

	// Checks to make sure there is still minutes left
	const checkMinutes = () => {
		if (Number(timerState[0]) > 0) {
			return `${timerState[0]} Minutes`;
		} else {
			return '';
		}
	};

	// Checks to make sure there is still seconds left
	const checkSeconds = () => {
		if (Number(timerState[1]) > 0 || Number(timerState[0]) > 0) {
			return `${timerState[1]} Seconds`;
		} else {
			return `Completed!`;
		}
	}

	return (
		<span className={`${classes.timer} ${isComplete ? classes.complete : ''} ${isRunning ? classes.running : ''}`} onClick={timerHandler}><p>{`${checkMinutes()}`}</p><p>{`${checkSeconds()}`}</p></span>
	);
}

export default Timer;