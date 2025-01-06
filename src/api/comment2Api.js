const token = localStorage.getItem('IdToken');
const baseUrl = process.env.REACT_APP_BACKEND;

/**
 * @param {string} url
 * @param {object} data for comment
 * @returns {object} server response
 */

const createCommentTours = async (data, url) => {
	const request = new Request(baseUrl + url, {
		method: 'POST',
		cache: 'reload',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			token,
		},
		body: JSON.stringify(data.comment),
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
 * @param {object} reponse for commentsBy news
 * @returns {object} server response
 */
const getToursComments = async (url) => {
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
 * @param {object} data for comment
 * @returns {object} server response
 */

const updateCommentStatus = async (id, data) => {
	const request = new Request(baseUrl + id, {
		method: 'PATCH',
		cache: 'reload',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			token,
		},
		body: JSON.stringify(data.status),
	});
	try {
		const response = await fetch(request);
		return response;
	} catch (error) {
		return error;
	}
};

export { createCommentTours, getToursComments, updateCommentStatus };
