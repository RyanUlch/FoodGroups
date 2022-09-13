// CSS Import
import classes from './Modal.module.css';
// Library Imports
import ReactDOM from 'react-dom';

// Modal Backdrop, used to check if user has clicked off the modal
const ModalBackdrop = (props) => {
	return (
		<div className={classes.backdrop} onClick={props.onClick}></div>
	)
}

// Modal popup, contains children where implimented, will always give confirm alert when clicked off of
const Modal = (props) => {
	const clickOffHandler = () => {
		if (window.confirm(`Do you wish to close the pop-up window? (changes won't be saved)`)) {
			props.onCloseModal();
		}
	}

	// Portals to the top of HTML page found in public/index.html to always be the top element when selected
	return ReactDOM.createPortal(
		<>
			<ModalBackdrop onClick={clickOffHandler}/>
			<section className={classes.modal}>
				{props.children}
			</section>
		</>, document.getElementById('modal-root')
	);
}

export default Modal;