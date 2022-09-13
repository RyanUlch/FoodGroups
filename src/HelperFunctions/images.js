// Table of Contents:
	// line 8		- Retrieve Images
	// line 20		- Upload Image

/* ServerHost Imports */
import { postFetch, retrieveImage, uploadImagePost } from "./serverHost";

	/* Retrieve Images */
/* Retrieve images for all recipes that have a URL */
export const retrieveImages = (ctx, dispatch) => {
	if (ctx.recipes) {
		for (const recipe of ctx.recipes) {
			if (recipe.url) {
				retrieveImage(recipe.url, recipe.recipeID, dispatch);
			}
		}
	}
}

	/* Upload Image */
export const uploadImage = (imageFile) => {
	console.log('uploading image');
	const formData = new FormData();
	formData.append('file', imageFile);

	uploadImagePost(
	// Path:
		'images/upload',
	// Body:
		formData
	);
};


