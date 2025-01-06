import * as types from '../types/toursTypes';

const initialState = {
	fiveTours: [],
	tours: [],
	oneTours: {},
	currentTours: {},
	loading: true,
	error: '',
	errors: [],
	message: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ONETOURS_REQUEST: //fetch one tours
			return {
				...state,
				oneTours: action.oneTours,
			};
		case types.FETCH_FIVE_TOURS_REQUEST: {
			//fetch six tours
			const { payload: fiveTours } = action;
			return {
				...state,
				fiveTours,
			};
		}
		case types.FETCH_TOURS_REQUEST: {
			//fetch all tours
			const { data: tours } = action;
			return {
				...state,
				tours,
			};
		}
		case types.CREATE_TOURS_REQUEST:
			return {
				...state,
				currentTours: action.tours,
			};
		case types.CREATE_TOURS_SUCCESS:
			const { message } = action;
			return {
				...state,
				message,
				errors: [],
				loading: false,
				// currentTours: action.tours,
			};
		case types.CREATE_TOURS_FAILURE:
			const { errors } = action;
			return {
				...state,
				errors,
				message: '',
			};
		case types.TOURS_DELETE_SUCCESS: //delete tours
			return {
				...state,
				message: action.message,
			};
		case types.TOURS_DELETE_FAILULE: //delete tours FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.TOURS_STATUS_UPDATE_SUCCESS: //update tours stutus
			return {
				...state,
				message: action.message,
			};
		case types.TOURS_STATUS_UPDATE_FAILULE: //update tours status FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.TOURS_UPDATE_SUCCESS: //update tours
			return {
				...state,
				message: action.message,
				error: '',
			};
		case types.TOURS_UPDATE_FAILULE: //update tours FAILURE
			return {
				...state,
				error: action.error,
				message: '',
			};
		case types.UPLOAD_IMAGE:
			return {
				...state,
				uploadedImage: action.payload,
			};
		default:
			return state; //or return initialState
	}
};
