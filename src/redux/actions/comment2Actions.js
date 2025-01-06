import axios from 'axios';
import { toast } from 'react-toastify';
import 'dotenv/config';
import * as API from '../../api';
import * as types from '../types';

const { REACT_APP_BACKEND } = process.env;

export const createComment = (data, slug) => async dispatch => {
	const createAcomment = await API.createCommentTours(
		data,
		'/api/comments/create'
	);

	const commentsResponse = await API.getToursComments(
		`/api/comments/${slug}/tours`
	);

	try {
		const { comments } = await commentsResponse.json();

		const createdComment = await createAcomment.json();
		const theError = createdComment.Errors;

		if (createAcomment.status === 400) {
			dispatch({
				type: types.CREATE_COMMNET_FAILURE,
				errors: theError,
			});
		}

		if (createAcomment.status === 201) {
			dispatch({
				type: types.CREATE_COMMNET_SUCCESS,
				message: createdComment.message,
				comments: comments,
			});
			toast.success(createdComment.message);
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const getCommentsTours = slug => async dispatch => {
	const commentsResponse = await API.getToursComments(
		`/api/comments/${slug}/tours`
	);

	try {
		const { comments } = await commentsResponse.json();

		if (commentsResponse.status === 200) {
			dispatch({
				type: types.FETCH_COMMNET_REQUEST,
				comments: comments,
			});
		}
	} catch (error) {
		console.log(error);
		console.clear();
	}
};

export const changeCommentStatus = (id, data, slug) => async dispatch => {
	axios
		.put(`${REACT_APP_BACKEND}/api/comments/change/${id}`, data)
		.then(res => {
			dispatch({
				type: types.COMMENT_STATUS_UPDATE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/tours/comment/${slug}`;
			}, 1000);
		})
		.catch(error => {
			console.log(error);
			console.clear();
		});
};

export const deleteComment = (id, slug) => async dispatch => {
	axios
		.delete(`${REACT_APP_BACKEND}/api/comments/delete/${id}`)
		.then(res => {
			dispatch({
				type: types.COMMENT_DELETE_SUCCESS,
				message: res.data.message,
			});
			toast.success(res.data.message);
			setTimeout(function () {
				window.location.href = `/account/tours/comment/${slug}`;
			}, 1000);
		})
		.catch(error => {
			dispatch({
				type: types.COMMENT_DELETE_FAILULE,
				error: error.response ? error.response.data.errors.auth : null,
			});
		});
};
