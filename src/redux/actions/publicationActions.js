import axios from 'axios';
import { toast } from 'react-toastify';
import 'dotenv/config';
import * as types from '../types';

const { REACT_APP_BACKEND } = process.env;

export const getPublications = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/api/publications`)
		.then(res => {
			dispatch({
				type: types.FETCH_ALL_PUBLICATIONS_REQUEST,
				payload: res.data.data,
				publicationsCount: res.data.publicationsCount,
			});
		})
		.catch(error => {
			dispatch({
				type: types.FETCH_ALL_PUBLICATIONS_FAILURE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const changePublicationStatus = (id, data) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/publications/approve/${id}`, data)
		.then(res => {
			dispatch({
				type: types.PUBLICATION_STATUS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/publications`;
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.PUBLICATION_STATUS_UPDATE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const deletePublication = (id, history) => async dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/api/publications/${id}`)
		.then(res => {
			dispatch({
				type: types.PUBLICATION_DELETE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/publications`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.PUBLICATION_DELETE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const getPublication = id => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/api/publications/${id}`)
		.then(res => {
			dispatch({
				type: types.FETCH_PUBLICATION_REQUEST,
				publication: res.data.data,
			});
		})
		.catch(error => {
			dispatch({
				type: types.FETCH_PUBLICATION_FAILURE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const updateAPublication = (id, data, history) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/publications/${id}`, data.publication)
		.then(res => {
			dispatch({
				type: types.PUBLICATION_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/publications`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.PUBLICATION_UPDATE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const createPublication = (data, history) => async dispatch => {
	dispatch({
		type: types.CREATE_PUBLICATION_REQUEST,
		payload: data.publication,
	});
	axios
		.post(`${REACT_APP_BACKEND}/api/publications/create`, data.publication)
		.then(res => {
			dispatch({
				type: types.CREATE_PUBLICATION_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/publications`);
			}, 1000);
		})
		.catch(err => {
			dispatch({
				type: types.CREATE_PUBLICATION_FAILURE,
				errors: err.response ? err.response.data.Errors : null,
			});
		});
};
