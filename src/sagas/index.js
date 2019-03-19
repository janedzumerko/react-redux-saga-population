import {
	fork,
	takeLatest
} from 'redux-saga/effects';
import {
	FETCH_COUNTRIES,
	FIND_HIGHEST_FEMALE_MALE_RATIO
} from '../actions';
import {
	fetchCountriesSaga,
	findHighestFemaleMaleRatioSaga
} from './mainSagas';

function* sagasWatcher() {
	yield takeLatest(FETCH_COUNTRIES, fetchCountriesSaga);
	yield takeLatest(FIND_HIGHEST_FEMALE_MALE_RATIO, findHighestFemaleMaleRatioSaga);
}

export default function* rootSaga() {
	yield fork(sagasWatcher);
}