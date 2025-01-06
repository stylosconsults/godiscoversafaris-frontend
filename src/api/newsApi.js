const token = localStorage.getItem('IdToken');
const baseUrl = process.env.REACT_APP_BACKEND;

/**
 * @param {string} url
 * @param {object} reponse for news
 * @returns {object} server response
 */
const getNews = async url => {
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

const createNews = async (data, url) => {
	const request = new Request(baseUrl + url, {
		method: 'POST',
		cache: 'reload',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			token: token || '',
		},
		body: JSON.stringify(data.news),
	});
	try {
		const response = await fetch(request);
		return response;
	} catch (error) {
		return error;
	}
};

export { getNews, createNews };
