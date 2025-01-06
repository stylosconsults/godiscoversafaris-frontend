import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SET_AUTHENTICATED,
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

const initialState = {
	loginData: null,
	loginSuccess: null,
	loginFailure: null,
	authenticated: false,
	credentials: {},
	sendLinkData: null,
	resetData: null,
	sendLinkSuccess: null,
	sendLInkFailure: null,
	resetPswdSuccess: null,
	resetPswdFailure: null,
	resetAccountData: null,
	resetAccountSuccess: null,
	resetAccountFailure: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loginData: action.payload,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loginSuccess: action.payload,
				loginFailure: null,
				loginData: null,
				authenticated: true,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loginFailure: action.payload,
				loginSuccess: null,
				loginData: null,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SENDLINK_REQUEST:
			return {
				...state,
				sendLinkData: action.payload,
			};
		case RESET_REQUEST:
			return {
				...state,
				resetData: action.payload,
			};
		case SEND_RESET_LINK_SUCCESS:
			return {
				...state,
				sendLinkSuccess: action.payload,
				sendLInkFailure: null,
				sendLinkData: null,
			};
		case SEND_RESET_LINK_FAILURE:
			return {
				...state,
				sendLinkSuccess: null,
				sendLinkData: null,
				sendLInkFailure: action.payload,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPswdSuccess: action.payload,
				resetPswdFailure: null,
				resetData: null,
			};
		case RESET_PASSWORD_FAILURE:
			return {
				...state,
				resetPswdSuccess: null,
				resetData: null,
				resetPswdFailure: action.payload,
			};
		case SUBMIT_DATA:
			return {
				...state,
				resetAccountData: action.payload,
			};
		case RESET_ACCOUNT_SUCCESS:
			return {
				...state,
				resetAccountSuccess: action.payload,
				resetAccountFailure: null,
				resetAccountData: null,
			};
		case RESET_ACCOUNT_FAILURE:
			return {
				...state,
				resetAccountSuccess: null,
				resetAccountFailure: action.payload,
				resetAccountData: null,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state; //or return initialState
	}
}
