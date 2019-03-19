export const API_URL = 'https://api.population.io/1.0/population'

export const handleCountriesSorting = countries => {
	return countries.concat().sort((a, b) => b.population - a.population);
};