import { combineReducers } from 'redux';
import auth from './authReducer';
import ui from './uiReducer';
import users from './userReducer';
import newsReducer from './newsReducer';
import commentReducer from './commentReducer';
import eventReducer from './eventReducer';
import contact from './contactReducer';
import publicationReducer from './publicationReducer';
import maillistReducer from './maillistReducer';
import toursReducer from './toursReducer';
import client from './clientReducer';
import order from './orderReducer';
import proforma from './proformaReducer';

export default combineReducers({
	auth,
	ui,
	users,
	newsReducer,
	commentReducer,
	eventReducer,
	contact,
	client,
	order,
	proforma,
	publicationReducer,
	maillistReducer,
	toursReducer,
});
