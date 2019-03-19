import {
	put,
	call,
	all
} from 'redux-saga/effects';
import {
	fetchCountries,
	fetchPopulationPerCountry,
	fetchCountryDetails
} from '../services';

import {
	FETCH_COUNTRIES_SUCCESS,
	FETCH_COUNTRIES_ERROR,
	FIND_HIGHEST_FEMALE_MALE_RATIO_ERROR,
	FIND_HIGHEST_FEMALE_MALE_RATIO,
	FIND_HIGHEST_FEMALE_MALE_RATIO_SUCCESS,
} from '../actions';

export function* fetchCountriesSaga() {
	try {
		const response = yield call(fetchCountries);

		const countriesWithPopulation =
			yield all(response.countries.map(country => call(fetchPopulationPerCountry, country)));

		yield put({
			type: FETCH_COUNTRIES_SUCCESS,
			payload: countriesWithPopulation,
		});

		yield put({
			type: FIND_HIGHEST_FEMALE_MALE_RATIO,
			payload: response.countries
		})
	} catch (error) {
		yield put({
			type: FETCH_COUNTRIES_ERROR,
			error,
		});
	}
}

export function* findHighestFemaleMaleRatioSaga({
	payload
}) {
	try {
		const countriesWithRatio = yield all(payload.map(
			country => call(fetchCountryDetails, country)))

		const highestRatio = findMaxRatio(countriesWithRatio);
		yield put({
			type: FIND_HIGHEST_FEMALE_MALE_RATIO_SUCCESS,
			payload: highestRatio
		})

	} catch (error) {
		yield put({
			type: FIND_HIGHEST_FEMALE_MALE_RATIO_ERROR,
			error,
		});
	}
}

function findMaxRatio(countriesWithRatio) {
	let max = countriesWithRatio[0].ratio;
	let id = 0;
	for (let i = 1, leng = countriesWithRatio.length; i < leng; i++) {
		if (countriesWithRatio[i] !== undefined) {
			let v = countriesWithRatio[i].ratio;
			if (v > max) {
				max = v;
				id = i;
			}
		}
	}
	return countriesWithRatio[id];
}