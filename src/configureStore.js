import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	return {
		...createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware))),
		runSaga: sagaMiddleware.run(rootSaga),
	};
};

export default configureStore;
