import axios from 'axios';
import { toast } from 'react-toastify';
import 'dotenv/config';
import * as types from '../types';

const { REACT_APP_BACKEND } = process.env;

export const getEvents = () => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/api/events`)
		.then(res => {
			dispatch({
				type: types.FETCH_ALL_EVENTS_REQUEST,
				payload: res.data.data,
				eventsCount: res.data.eventsCount,
			});
		})
		.catch(error => {
			dispatch({
				type: types.FETCH_ALL_EVENTS_FAILURE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const getEvent = slug => dispatch => {
	axios
		.get(`${REACT_APP_BACKEND}/api/events/${slug}`)
		.then(res => {
			console.log('Error', res);

			dispatch({
				type: types.FETCH_EVENT_REQUEST,
				event: res.data.data,
			});
		})
		.catch(error => {
			console.log('Error', error);
			dispatch({
				type: types.FETCH_EVENT_FAILURE,
				error: error.response ? error.response.data.error : null,
			});
		});
};

export const deleteEvent = (slug, history) => async dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/api/events/${slug}`)
		.then(res => {
			dispatch({
				type: types.EVENT_DELETE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/events`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.EVENT_DELETE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};

export const changeEventStatus = (slug, data) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/events/approve/${slug}`, data)
		.then(res => {
			dispatch({
				type: types.EVENT_STATUS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/events`;
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.EVENT_STATUS_UPDATE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};

export const createEvent = data => async dispatch => {
	dispatch({ type: types.CREATE_EVENT_REQUEST, payload: data.event });
	axios
		.post(`${REACT_APP_BACKEND}/api/events/create`, data.event)
		.then(res => {
			dispatch({ type: types.CREATE_EVENT_SUCCESS, message: res.data.message });
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/events`;
			}, 600);
		})
		.catch(err => {
			dispatch({
				type: types.CREATE_EVENT_FAILURE,
				errors: err.response ? err.response.data.Errors : null,
			});
		});
};

export const updateAnEvent = (slug, data, history) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/events/${slug}`, data.event)
		.then(res => {
			dispatch({
				type: types.EVENT_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				history.push(`/account/events`);
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.EVENT_UPDATE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};
