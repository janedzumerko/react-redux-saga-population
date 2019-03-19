import {
	API_URL
} from "../utils";

export const fetchCountries = async () => {
	const response = await fetch(`${API_URL}/countries`);
	const json = await response.json();
	return json;
};

export const fetchPopulationPerCountry = async request => {
	const country = request.split('/').pop();
	const today = new Date();
	const todayFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const countryName = country;
	const countryFormat = countryName.replace(/ /g, '%20');

	try {
		const response = await fetch(`${API_URL}/${countryFormat}/${todayFormat}/`);
		const json = await response.json();
		return {
			name: request,
			population: typeof json.total_population !== 'undefined' ? json.total_population.population : undefined,
		};
	} catch (err) {
		console.log(err);
	}
};

export const fetchCountryDetails = async country => {
	const countrySingle = country.split('/').pop();
	const countryFormat = countrySingle.replace(/ /g, '%20');

	try {
		const response = await fetch(`${API_URL}/2019/${countryFormat}/`);
		const countryData = await response.json();
		if (Array.isArray(countryData)) {
			let malePopulation = 0;
			let femalePopulation = 0;
			countryData.map(eachYear => {
				malePopulation += eachYear.males;
				femalePopulation += eachYear.females;
			});
			return {
				name: country,
				ratio: femalePopulation / malePopulation,
			};
		}
	} catch (err) {
		console.log(err);
	}
}