// Table of Contents:
	// line 9		- Server Host Path
	// line 11		- Set Session Helper
	// line 23		- Use Fetch with POST
	// line 46		- Use Fetch with DELETE
	// line 70		- Use Fetch for image POST
	// line 84		- Use Fetch for image GET

// Server host is the URL to the Node Server - Change once here when Server moves
const serverHost = 'https://foodgroupsserver.herokuapp.com/';

	/* Set Session Helper */
/* If given a userID and sessionID, add it to sessionStorage, otherwise, remove from sessionStorage */
export const setSession = (payload = null) => {
	if (payload) {
		sessionStorage.setItem('userID', `${payload.userID}`);
		sessionStorage.setItem('sessionID', `${payload.sessionID}`);
	} else {
		sessionStorage.setItem('userID', '');
		sessionStorage.setItem('sessionID', '');
	}
}

	/* Use Fetch with POST */
/* Send Body to the Server Path, run success/error handlers if provided */
export const postFetch = async (path, body, successHandler = null, failureHandler = null) => {
	// Initialization settings with a stringified body (always an object), for Fetch
	const init = {
		method: 'POST',					headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),		mode: 'cors'
	};

	// Send request to Server and wait for response
	const response		= await fetch(`${serverHost}/${path}`, init);
	const jsonResponse 	= response.ok ? await response.json() : { response: response };

	// Deal with response from Server
	if (jsonResponse.response === 'success') {
		if (successHandler) { successHandler(jsonResponse); }
	} else {
		// If an failureHandler was not provided, output error in console
		if (failureHandler) { failureHandler(jsonResponse.msg); }
		else { console.error(jsonResponse.msg) }
	}
}

	/* Use Fetch with DELETE */
/* Send Body to the Server Path, run success/error handlers if provided */
export const deleteFetch = async (path, body, successHandler = null, failureHandler = null) => {
	// Initialization settings with a stringified body (always an object), for Fetch
	const init = {
		method: 'DELETE',				headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),		mode: 'cors'
	};

	// Send request to Server and wait for response
	const response		= await fetch(`${serverHost}/${path}`, init);
	const jsonResponse 	= response.ok ? await response.json() : { response: response };

	// Deal with response from Server
	if (jsonResponse.response === 'success') {
		if (successHandler) { successHandler(jsonResponse); }
	} else {
		// If an failureHandler was not provided, output error in console
		if (failureHandler) { failureHandler(jsonResponse.msg); }
		else { console.error(jsonResponse.msg) }
	}
}

	/* Use Fetch for Image POST */
/* Uploads image to server */
export const uploadImagePost = async (path, formData) => {
	// Initialization settings with a stringified body (always an object), for Fetch
	const init = { method: 'POST', body: formData, mode: 'cors'	};

	const response = await fetch(`${serverHost}/${path}`, init);
	const jsonResponse = response.ok ? await response.json() : { response: response };
	if (jsonResponse !== 'success') { console.error(jsonResponse.msg) }
}

	/* Use Fetch for Image GET */
/* Attempts to download image from Server for provided path */
export const retrieveImage = async (path, id, dispatch) => {
	// Send request to Server and wait for response
	const response = await fetch(`${serverHost}/images/download/${path}`);
	const imageBlob = response.ok ? await response.blob() : null;
	// Add image URL to recipe if provided
	if (imageBlob) {
		const imageObjectURL = URL.createObjectURL(imageBlob);
		dispatch({ type: 'SETIMAGE', payload: {	imgURL: imageObjectURL,	recipeID: id } });
	}
}