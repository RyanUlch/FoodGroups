// CSS Import
import classes from './UploadImage.module.css';

// Let user select and upload image for Recipe
const UploadImage = (props) => {

	// Check then set image when user selects new image
	const changeHandler = (event) => {
		const file = event.target.files[0];
		if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
			props.onSelectImage(event.target.files[0]);
		} else {
			alert('That file type is unsupported, please select another image');
		};
	};

	return(
   		<div className={classes.upload}>
			<input className={classes.chooseButton} title=' ' type="file" name="file" accept=".jpg, .jpeg, .png" onChange={changeHandler} />
		</div>
	)
}

export default UploadImage;