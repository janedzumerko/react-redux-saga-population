import {
	FETCH_COUNTRIES_ERROR,
	FETCH_COUNTRIES_SUCCESS,
	SORT_COUNTRIES,
	FIND_HIGHEST_FEMALE_MALE_RATIO_SUCCESS,
	FIND_HIGHEST_FEMALE_MALE_RATIO_ERROR
} from '../actions';
import {
	handleCountriesSorting
} from '../utils';

const initialState = {
	countriesWithPopulation: [],
	sortedCountries: [],
	errorMsg: '',
	ratioErrMsg: '',
	highestFemaleMaleRatio: null
};

export default function (state = initialState, action) {

	switch (action.type) {
		case FETCH_COUNTRIES_SUCCESS:
			return {
				...state,
				countriesWithPopulation: action.payload,
			};
		case FETCH_COUNTRIES_ERROR:
			return {
				...state,
				errorMsg: 'Error fetching countries with population',
			};
		case SORT_COUNTRIES:
			const sorted = handleCountriesSorting(action.payload);
			return {
				...state,
				sortedCountries: sorted,
			};
		case FIND_HIGHEST_FEMALE_MALE_RATIO_SUCCESS:
			return {
				...state,
				highestFemaleMaleRatio: action.payload
			}
		case FIND_HIGHEST_FEMALE_MALE_RATIO_ERROR:
			return {
				...state,
				ratioErrMsg: 'Error finding highest ratio female to male'
			}
		default:
			return state;
	}
}