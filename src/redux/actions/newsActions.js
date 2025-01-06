import axios from 'axios';
import { toast } from 'react-toastify';
import 'dotenv/config';
import * as API from '../../api';
import * as types from '../types';

const { REACT_APP_BACKEND } = process.env;

export const getFiveNews = () => async dispatch => {
	const news = await API.getNews('/api/news/five');
	try {
		const newsList = await news.json();
		if (news.status === 200) {
			dispatch({
				type: types.FETCH_FIVE_NEWS_REQUEST,
				payload: newsList.news,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const getAllNews = () => async dispatch => {
	const allNews = await API.getNews('/api/news');

	try {
		const allNewsList = await allNews.json();
		if (allNews.status === 200) {
			dispatch({
				type: types.FETCH_NEWS_REQUEST,
				data: allNewsList.news,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const getAllDestinations = () => async dispatch => {
	const allNews = await API.getNews('/api/news');

	try {
		const allNewsList = await allNews.json();
		if (allNews.status === 200) {
		return allNewsList.news;
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const getSingleNews = slug => async dispatch => {
	const singleNews = await API.getNews(`/api/news/${slug}`);

	try {
		const { news } = await singleNews.json();

		if (singleNews.status === 200) {
			dispatch({
				type: types.FETCH_ONENEWS_REQUEST,
				oneNews: news,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const createOneNews = data => async dispatch => {
	const createANews = await API.createNews(data, '/api/news/create');
	try {
		const createdNews = await createANews.json();
		const theError = createdNews.Errors;

		if (createANews.status === 400) {
			dispatch({
				type: types.CREATE_NEWS_FAILURE,
				errors: theError,
			});
		}

		if (createANews.status === 201) {
			dispatch({
				type: types.CREATE_NEWS_SUCCESS,
				message: createdNews.message,
			});
			toast.success(createdNews.message);
			window.location.href = `/account/destinations`;
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const deleteNews = (slug, history) => async dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/api/news/delete/${slug}`)
		.then(res => {
			dispatch({
				type: types.NEWS_DELETE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/destinations`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.NEWS_DELETE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};

export const changeNewsStatus = (slug, data) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/news/publish/${slug}`, data)
		.then(res => {
			dispatch({
				type: types.NEWS_STATUS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/destinations`;
			}, 500);
		})
		.catch(error => {
			dispatch({
				type: types.NEWS_STATUS_UPDATE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};

export const updateOneNews = (slug, data, history) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/news/update/${slug}`, data.news)
		.then(res => {
			dispatch({
				type: types.NEWS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.NEWS_UPDATE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};
