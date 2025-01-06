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

const initialState = {
	usersData: null,
	errors: null,
	countUsers: null,
	submittedData: null,
	requestData: null,
	createdUser: null,
	updatedUser: null,
	blockedUser: null,
	unblockedUser: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SUBMIT_DATA:
			return {
				...state,
				submittedData: action.payload,
				createdUser: null,
				errors: null,
				blockedUser: null,
				unblockedUser: null,
			};
		case REQUEST_DATA:
			return {
				...state,
				requestData: action.payload,
				usersData: null,
				errors: null,
			};
		case GET_USERS_SUCCESS:
			return {
				...state,
				requestData: null,
				usersData: action.payload,
				countUsers: action.countusers,
				errors: null,
			};
		case GET_USERS_FAILURE:
			return {
				...state,
				requestData: null,
				usersData: null,
				errors: action.payload,
			};
		case CREATE_USER_SUCCESS:
			return {
				...state,
				submittedData: null,
				createdUser: action.payload,
				errors: null,
			};
		case CREATE_USER_FAILURE:
			return {
				...state,
				submittedData: null,
				createdUser: null,
				errors: action.payload,
			};

		case UPDATE_USER_SUCCESS:
			return {
				...state,
				createdUser: action.payload,
				countUsers: action.countusers,
				errors: null,
			};
		case UPDATE_USER_FAILURE:
			return {
				...state,
				updatedUser: null,
				errors: action.payload,
			};
		case BLOCK_USER_SUCCESS:
			return {
				...state,
				submittedData: null,
				usersData: state.usersData,
				blockedUser: action.payload,
				unblockedUser: null,
				errors: null,
			};
		case BLOCK_USER_FAILURE:
			return {
				...state,
				blockedUser: null,
				usersData: state.usersData,
				submittedData: null,
				unblockedUser: null,
				errors: action.payload,
			};
		case UNBLOCK_USER_SUCCESS:
			return {
				...state,
				submittedData: null,
				blockedUser: null,
				unblockedUser: action.payload,
				errors: null,
			};
		case UNBLOCK_USER_FAILURE:
			return {
				...state,
				blockedUser: null,
				submittedData: null,
				unblockedUser: null,
				errors: action.payload,
			};
		case USER_STATUS_UPDATE_SUCCESS: //update user status
			return {
				...state,
				message: action.message,
			};
		case USER_STATUS_UPDATE_FAILULE: //update user FAILURE
			return {
				...state,
				error: action.error,
			};
		default:
			return state; //or return initialState
	}
}
