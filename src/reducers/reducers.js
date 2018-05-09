import { combineReducers } from 'redux';

const users = (state=[], action) => {
	switch(action.type){
		case "GET_USER": state = action.val; return state;
		default: return state;
	}
}

const records = (state=[], action) => {
	switch(action.type){
		case "GET_RECORD": state = action.val; return state;
		default: return state;
	}
}

const reducers = combineReducers({
	users,
	records,
});

export default reducers;