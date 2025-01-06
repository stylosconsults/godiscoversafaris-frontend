import axios from 'axios';
import { toast } from 'react-toastify';
import 'dotenv/config';
import * as API from '../../api';
import * as types from '../types';

const { REACT_APP_BACKEND } = process.env;

export const getFiveTours = () => async dispatch => {
	const tours = await API.getTours('/api/tours/five');
	try {
		const toursList = await tours.json();
		console.log('All tours========', toursList);
		if (tours.status === 200) {
			dispatch({
				type: types.FETCH_FIVE_TOURS_REQUEST,
				payload: toursList.tours,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const getAllTours = () => async dispatch => {
	const allTours = await API.getTours('/api/tours');

	try {
		const allToursList = await allTours.json();
		if (allTours.status === 200) {
			console.log('All tours', allToursList);
			dispatch({
				type: types.FETCH_TOURS_REQUEST,
				data: allToursList.tours,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const getSingleTours = slug => async dispatch => {
	const singleTours = await API.getTours(`/api/tours/${slug}`);

	try {
		const { tours } = await singleTours.json();

		if (singleTours.status === 200) {
			dispatch({
				type: types.FETCH_ONETOURS_REQUEST,
				oneTours: tours,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const createOneTours = data => async dispatch => {
	const createATours = await API.createTours(data, '/api/tours/create');
	try {
		const createdTours = await createATours.json();
		console.log('response here', createATours);
		const theError = createdTours.Errors;

		if (createATours.status === 400) {
			dispatch({
				type: types.CREATE_TOURS_FAILURE,
				errors: theError,
			});
		}

		if (createATours.status === 201) {
			dispatch({
				type: types.CREATE_TOURS_SUCCESS,
				message: createdTours.message,
			});
			toast.success(createdTours.message);
			window.location.href = `/account/tours`;
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const deleteTours = (slug, history) => async dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/api/tours/delete/${slug}`)
		.then(res => {
			dispatch({
				type: types.TOURS_DELETE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/tours`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.TOURS_DELETE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};

export const changeToursStatus = (slug, data) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/tours/publish/${slug}`, data)
		.then(res => {
			dispatch({
				type: types.TOURS_STATUS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/tours`;
			}, 500);
		})
		.catch(error => {
			dispatch({
				type: types.TOURS_STATUS_UPDATE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};

export const updateOneTours = (slug, data, history) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/tours/update/${slug}`, data.tours)
		.then(res => {
			dispatch({
				type: types.TOURS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/tours`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.TOURS_UPDATE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};
