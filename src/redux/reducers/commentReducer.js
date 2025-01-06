import * as types from '../types';

const initialState = {
	comments: [],
	loading: true,
	errors: [],
	message: '',
	error: '',
	// oneNews: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CREATE_COMMNET_SUCCESS:
			const { message } = action;
			return {
				...state,
				message,
				errors: [],
				comments: action.comments,
			};
		case types.CREATE_COMMNET_FAILURE:
			const { errors } = action;
			return {
				...state,
				errors,
				message: '',
				// loading: true,
				// oneNews: action.oneNews,
			};
		case types.FETCH_COMMNET_REQUEST: //fetch all comments
			return {
				...state,
				comments: action.comments,
			};
		case types.COMMENT_STATUS_UPDATE_SUCCESS: //update status
			return {
				...state,
				message: action.message,
				// comments: action.comments,
			};
			case types.COMMENT_DELETE_SUCCESS: //delete comment
			return {
				...state,
				message: action.message,
			};
			case types.COMMENT_DELETE_FAILULE: //delete comment FAILURE
			return {
				...state,
				error: action.error,
			};
		default:
			return state; //or return initialState
	}
};
