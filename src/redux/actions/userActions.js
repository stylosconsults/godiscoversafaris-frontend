import 'dotenv/config';
import {
	GET_USERS_SUCCESS,
	GET_USERS_FAILURE,
	CREATE_USER_FAILURE,
	CREATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	UPDATE_USER_SUCCESS,
	BLOCK_USER_FAILURE,
	BLOCK_USER_SUCCESS,
	UNBLOCK_USER_FAILURE,
	UNBLOCK_USER_SUCCESS,
	SUBMIT_DATA,
	REQUEST_DATA,
	USER_STATUS_UPDATE_SUCCESS,
	USER_STATUS_UPDATE_FAILULE,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

export const getUsers = () => dispatch => {
	dispatch({ type: REQUEST_DATA, payload: 'loading' });
	axios
		.get(`${REACT_APP_BACKEND}/api/users`)
		.then(res => {
			dispatch({
				type: GET_USERS_SUCCESS,
				payload: res.data.data,
				countusers: res.data.usersCount,
			});
		})
		.catch(err => {
			dispatch({
				type: GET_USERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const createUser = userData => dispatch => {
	dispatch({ type: SUBMIT_DATA, payload: userData });
	axios
		.post(`${REACT_APP_BACKEND}/api/users/create`, userData)
		.then(res => {
			toast.success(
				`Successful created user. We have sent an email verification to ${userData.email}`
			);
			dispatch({
				type: CREATE_USER_SUCCESS,
				payload: res.data.message,
			});
		})
		.catch(err => {
			toast.error(
				err.response
					? err.response.data.error
					: null
			);
			dispatch({
				type: CREATE_USER_FAILURE,
				payload: err.response
					? err.response.data.error
					: null,
			});
		});
};

export const updateUser = id => dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/users/admin/update/${id}`)
		.then(res => {
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: res.data.message,
			});
		})
		.catch(err => {
			dispatch({
				type: UPDATE_USER_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const blockUser = id => dispatch => {
	dispatch({ type: SUBMIT_DATA, payload: id });
	axios
		.delete(`${REACT_APP_BACKEND}/api/users/${id}`)
		.then(res => {
			getUsers();
			toast.success('Successful blocked user');
			dispatch({
				type: BLOCK_USER_SUCCESS,
				payload: res.data.message,
			});
			setTimeout(function () {
				window.location.href = `/account/users`;
			}, 1000);
		})
		.catch(err => {
			toast.error('Failed to block a user check the error below');
			dispatch({
				type: BLOCK_USER_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const unblockUser = id => dispatch => {
	dispatch({ type: SUBMIT_DATA, payload: id });
	axios
		.patch(`${REACT_APP_BACKEND}/api/users/${id}`)
		.then(res => {
			toast.success('Successful unblocked user');
			dispatch({
				type: UNBLOCK_USER_SUCCESS,
				payload: res.data.message,
			});
			setTimeout(function () {
				window.location.href = `/account/users`;
			}, 1000);
		})
		.catch(err => {
			toast.error('Failed to unblock a user check the error below');
			dispatch({
				type: UNBLOCK_USER_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const changeUserStatus = (id, data) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/users/approve/${id}`, data)
		.then(res => {
			dispatch({
				type: USER_STATUS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/users`;
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: USER_STATUS_UPDATE_FAILULE,
				error: error.response ? error.response.data.error : null,
			});
		});
};
