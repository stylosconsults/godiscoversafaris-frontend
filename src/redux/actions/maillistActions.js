import 'dotenv/config';
import {
	SUBSCRIBE_DATA,
	SUBSCRIBE_SUCCESS,
	SUBSCRIBE_FAILURE,
	UNSUBSCRIBE_SUCCESS,
	UNSUBSCRIBE_FAILURE,
	GET_SUBSCRIBERS_SUCCESS,
	GET_SUBSCRIBERS_FAILURE,
} from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

export const userSubscribe = userEmail => dispatch => {
	dispatch({ type: SUBSCRIBE_DATA, payload: userEmail });
	axios
		.post(`${REACT_APP_BACKEND}/api/maillist/subscribe`, userEmail)
		.then(res => {
			dispatch({ type: SUBSCRIBE_SUCCESS, payload: res.data.message });
			toast.success(res.data.message);
		})

		.catch(err => {
			dispatch({
				type: SUBSCRIBE_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const userUnsubscribe = userId => dispatch => {
	dispatch({ type: SUBSCRIBE_DATA, payload: userId });
	axios
		.get(`${REACT_APP_BACKEND}/api/maillist/unsubcribe/${userId}`)
		.then(res => {
			dispatch({ type: UNSUBSCRIBE_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({
				type: UNSUBSCRIBE_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const getSubscribers = () => dispatch => {
	dispatch({ type: SUBSCRIBE_DATA, payload: 'loading' });
	axios
		.get(`${REACT_APP_BACKEND}/api/maillist/subcribers`)
		.then(res => {
			dispatch({
				type: GET_SUBSCRIBERS_SUCCESS,
				payload: res.data.subscribers,
			});
		})
		.catch(err => {
			dispatch({
				type: GET_SUBSCRIBERS_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};
