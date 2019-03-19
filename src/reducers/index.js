import { combineReducers } from 'redux';
import reportReducer from './reportReducer';

const rootReducer = combineReducers({
	reportState: reportReducer,
});

export default rootReducer;
