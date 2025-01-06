const token = localStorage.getItem('IdToken');
const baseUrl = process.env.REACT_APP_BACKEND;

/**
 * @param {string} url
 * @param {object} reponse for news
 * @returns {object} server response
 */
const getTours = async url => {
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

/**
 * @param {string} url
 * @param {object} data for news
 * @returns {object} server response
 */

const createTours = async (data, url) => {
	const token = localStorage.getItem('IdToken');
	const request = new Request(baseUrl + url, {
		method: 'POST',
		cache: 'reload',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			token: token || '',
		},
		body: JSON.stringify(data.tours),
	});
	try {
		const response = await fetch(request);
		return response;
	} catch (error) {
		return error;
	}
};

export { getTours, createTours };
