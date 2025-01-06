import * as types from '../types/newsTypes';

const initialState = {
	fiveNews: [],
	news: [],
	oneNews: {},
	currentNews: {},
	loading: true,
	error: '',
	errors: [],
	message: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ONENEWS_REQUEST: //fetch one news
			return {
				...state,
				oneNews: action.oneNews,
			};
		case types.FETCH_FIVE_NEWS_REQUEST: {
			//fetch six news
			const { payload: fiveNews } = action;
			return {
				...state,
				fiveNews,
			};
		}
		case types.FETCH_NEWS_REQUEST: {
			//fetch all news
			const { data: news } = action;
			return {
				...state,
				news,
			};
		}
		case types.CREATE_NEWS_REQUEST:
			return {
				...state,
				currentNews: action.news,
			};
		case types.CREATE_NEWS_SUCCESS:
			const { message } = action;
			return {
				...state,
				message,
				errors: [],
				loading: false,
				// currentNews: action.news,
			};
		case types.CREATE_NEWS_FAILURE:
			const { errors } = action;
			return {
				...state,
				errors,
				message: '',
			};
		case types.NEWS_DELETE_SUCCESS: //delete news
			return {
				...state,
				message: action.message,
			};
		case types.NEWS_DELETE_FAILULE: //delete news FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.NEWS_STATUS_UPDATE_SUCCESS: //update news stutus
			return {
				...state,
				message: action.message,
			};
		case types.NEWS_STATUS_UPDATE_FAILULE: //update news status FAILURE
			return {
				...state,
				error: action.error,
			};
		case types.NEWS_UPDATE_SUCCESS: //update news
			return {
				...state,
				message: action.message,
				error: '',
			};
		case types.NEWS_UPDATE_FAILULE: //update news FAILURE
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
