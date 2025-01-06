import * as types from '../types';

const initialState = {
	publications: [],
	publication: {},
	loading: true,
	error: '',
	errors: [],
	message: '',
	publicationsCount: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL_PUBLICATIONS_REQUEST: {
			//fetch all publications
			const { payload: publications } = action;
			return {
				...state,
				publications,
				publicationsCount: action.publicationsCount,
			};
		}
		case types.FETCH_ALL_PUBLICATIONS_FAILURE: {
			return {
				...state,
				error: action.error,
			};
		}
		case types.FETCH_PUBLICATION_REQUEST: {
			return {
				...state,
				publication: action.publication,
			};
		}
		case types.FETCH_PUBLICATION_FAILURE: {
			return {
				...state,
				error: action.error,
			};
		}
		case types.PUBLICATION_STATUS_UPDATE_SUCCESS: //update publication stutus
			return {
				...state,
				message: action.message,
			};
		case types.PUBLICATION_STATUS_UPDATE_FAILULE: //update publication FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.PUBLICATION_DELETE_SUCCESS: //delete publication
			return {
				...state,
				message: action.message,
			};
		case types.PUBLICATION_DELETE_FAILULE: //delete publication FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.PUBLICATION_UPDATE_SUCCESS: //update publication
			return {
				...state,
				message: action.message,
				error: '',
			};
		case types.PUBLICATION_UPDATE_FAILULE: //update publication FAILURE
			return {
				...state,
				error: action.error,
				message: '',
			};
			case types.CREATE_PUBLICATION_REQUEST:
			return {
				...state,
				data: action.payload,
			};
		case types.CREATE_PUBLICATION_SUCCESS:
			return {
				...state,
				message: action.message,
				errors: [],
				loading: false,
			};
		case types.CREATE_PUBLICATION_FAILURE:
			const { errors } = action;
			return {
				...state,
				errors,
				message: '',
			};
		default:
			return state; //or return initialState
	}
};
