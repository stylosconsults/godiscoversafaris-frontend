import 'dotenv/config';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_UNAUTHENTICATED,
	SENDLINK_REQUEST,
	RESET_REQUEST,
	RESET_PASSWORD_FAILURE,
	RESET_PASSWORD_SUCCESS,
	SEND_RESET_LINK_FAILURE,
	SEND_RESET_LINK_SUCCESS,
	RESET_ACCOUNT_SUCCESS,
	RESET_ACCOUNT_FAILURE,
	SUBMIT_DATA,
} from '../types';
import axios from 'axios';

const { REACT_APP_BACKEND } = process.env;

export const loginUser = loginData => dispatch => {
	dispatch({ type: LOGIN_REQUEST, payload: loginData });
	axios
		.post(`${REACT_APP_BACKEND}/api/auth/login`, loginData)
		.then(res => {
			setAuthorization(res.data.token);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({
				type: LOGIN_FAILURE,
				payload: err.response ? err.response.data.error : null,
			});
		});
};

export const sendLinkResetPassword = sendtoData => dispatch => {
	dispatch({ type: SENDLINK_REQUEST, payload: sendtoData });
	axios
		.post(`${REACT_APP_BACKEND}/api/auth/send-forgot-password`, sendtoData)
		.then(res => {
			dispatch({ type: SEND_RESET_LINK_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({
				type: SEND_RESET_LINK_FAILURE,
				payload: err.response ? err.response.data.message : null,
			});
		});
};

export const resetPassword = resetData => dispatch => {
	dispatch({ type: RESET_REQUEST, payload: resetData });
	axios
		.post(`${REACT_APP_BACKEND}/api/auth/reset-password-account`, resetData)
		.then(res => {
			dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data.message });
		})
		.catch(err => {
			dispatch({
				type: RESET_PASSWORD_FAILURE,
				payload: err.response ? err.response.data.Errors : null,
			});
		});
};

export const resetAccount = userData => dispatch => {
	dispatch({ type: SUBMIT_DATA, payload: userData });
	axios
		.post(`${REACT_APP_BACKEND}/api/auth/reset-password-account`, userData)
		.then(res => {
			dispatch({
				type: RESET_ACCOUNT_SUCCESS,
				payload: res.data.message,
			});
		})
		.catch(err => {
			dispatch({
				type: RESET_ACCOUNT_FAILURE,
				payload: err.response ? err.response.data.Errors : null,
			});
		});
};

export const setAuthorization = token => {
	console.log(token);
	const IdToken = token;
	localStorage.setItem('IdToken', IdToken);
	//seting authorization to the header axios
	axios.defaults.headers.common['token'] = token;
};

export const logoutUser = async () => dispatch => {
	// set logout on backend later
	localStorage.removeItem('IdToken');
	delete axios.defaults.headers.common['token'];
	dispatch({ type: SET_UNAUTHENTICATED });
};
