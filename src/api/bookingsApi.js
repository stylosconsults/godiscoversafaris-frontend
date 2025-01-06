const token = localStorage.getItem('IdToken');
const baseUrl = process.env.REACT_APP_BACKEND;

/**
 * @param {string} url
 * @param {object} reponse for news
 * @returns {object} server response
 */
 const getTourBookings = async url => {
	const request = new Request(baseUrl + url, {
		method: 'get',
		mode: 'cors',
		cache: 'reload',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			token: token || '',
		},
	});
	try {
		const response = await fetch(request);
		return response;
	} catch (error) {
		return error;
	}
};

export {getTourBookings}