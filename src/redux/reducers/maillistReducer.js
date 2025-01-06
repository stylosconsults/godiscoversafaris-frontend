import {
	SUBSCRIBE_DATA,
	SUBSCRIBE_SUCCESS,
	SUBSCRIBE_FAILURE,
	UNSUBSCRIBE_SUCCESS,
	UNSUBSCRIBE_FAILURE,
	GET_SUBSCRIBERS_SUCCESS,
	GET_SUBSCRIBERS_FAILURE,
} from '../types';

const initialState = {
	subscribeData: null,
	subscribeSuccess: null,
	subscribeFailure: null,
	unsubscribeSuccess: null,
	unsubscribeFailure: null,
	subscribersSuccess: null,
	subscribersFailure: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SUBSCRIBE_DATA:
			return {
				...state,
				subscribeData: action.payload,
			};
		case SUBSCRIBE_SUCCESS:
			return {
				...state,
				subscribeSuccess: action.payload,
				subscribeFailure: null,
				subscribeData: null,
			};
		case SUBSCRIBE_FAILURE:
			return {
				...state,
				subscribeSuccess: null,
				subscribeFailure: action.payload,
				subscribeData: null,
			};
		case UNSUBSCRIBE_SUCCESS:
			return {
				...state,
				unsubscribeSuccess: action.payload,
				unsubscribeFailure: null,
				unsubscribeData: null,
			};
		case UNSUBSCRIBE_FAILURE:
			return {
				...state,
				unsubscribeSuccess: null,
				unsubscribeFailure: action.payload,
				unsubscribeData: null,
			};
		case GET_SUBSCRIBERS_SUCCESS:
			return {
				...state,
				subscribersSuccess: action.payload,
				subscribersFailure: null,
				subscribeData: null,
			};
		case GET_SUBSCRIBERS_FAILURE:
			return {
				...state,
				subscribersSuccess: null,
				subscribersFailure: action.payload,
				subscribeData: null,
			};
		default:
			return state; //or return initialState
	}
}
