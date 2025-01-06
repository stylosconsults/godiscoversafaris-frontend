import * as types from '../types';

const initialState = {
	events: [],
	event: {},
	loading: true,
	error: '',
	errors: [],
	message: '',
	eventsCount: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL_EVENTS_REQUEST: {
			//fetch all events
			const { payload: events } = action;
			return {
				...state,
				events,
				eventsCount: action.eventsCount,
			};
		}
		case types.FETCH_ALL_EVENTS_FAILURE: {
			return {
				...state,
				error: action.error,
			};
		}
		case types.FETCH_EVENT_REQUEST: {
			return {
				...state,
				event: action.event,
			};
		}
		case types.FETCH_EVENT_FAILURE: {
			return {
				...state,
				error: action.error,
			};
		}
		case types.EVENT_DELETE_SUCCESS: //delete event
			return {
				...state,
				message: action.message,
			};
		case types.EVENT_DELETE_FAILULE: //delete event FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.EVENT_STATUS_UPDATE_SUCCESS: //update event stutus
			return {
				...state,
				message: action.message,
			};
		case types.EVENT_STATUS_UPDATE_FAILULE: //update event FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.CREATE_EVENT_REQUEST:
			return {
				...state,
				data: action.payload,
			};
		case types.CREATE_EVENT_SUCCESS:
			return {
				...state,
				message: action.message,
				errors: [],
				loading: false,
			};
		case types.CREATE_EVENT_FAILURE:
			const { errors } = action;
			return {
				...state,
				errors,
				message: '',
			};
		case types.EVENT_UPDATE_SUCCESS: //update event
			return {
				...state,
				message: action.message,
				error: '',
			};
		case types.EVENT_UPDATE_FAILULE: //update event FAILURE
			return {
				...state,
				error: action.error,
				message: '',
			};
		default:
			return state; //or return initialState
	}
};
