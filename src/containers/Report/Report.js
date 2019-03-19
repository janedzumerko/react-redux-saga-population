import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCountries, sortCountries } from '../../actions';
import ReportFilter from '../../components/Filter/Filter';
import ReportCard from '../../components/ReportCard/ReportCard';
import './Report.css';

class Report extends Component {
	state = {
		activeFilter: 'ALL',
		filterByInput: false,
		isSorted: false,
	};

	componentDidMount() {
		if (this.props.countries.length === 0) {
			this.props.dispatch(fetchCountries());
		}
	}

	onSortClickHandler = () => {
		this.setState(prevState => ({
			isSorted: !prevState.isSorted,
		}));
		if (this.props.sortedCountries.length === 0) {
			this.props.dispatch(sortCountries(this.props.countries));
		}
	};

	onCountryClickHandler = countryName => {
		const country = countryName.split('/').pop();
		this.props.history.push(`/report/${country}`);
	};

	onAlphabetClickHandler = selectedLetter => {
		this.setState({ filterByInput: false, activeFilter: selectedLetter });
	};

	onInputChangeHandler = event => {
		this.setState({ filterByInput: true, activeFilter: event.target.value });
	};

	renderCountries = filteredCountries => {
		const afterSortCheck = this.state.isSorted
			? filteredCountries.sort((a, b) => {
				return b.population - a.population;
			})
			: filteredCountries;

		return afterSortCheck.map((country, idx) => (
			<ReportCard key={idx} country={country} onCountryClick={() => this.onCountryClickHandler(country.name)} />
		));
	};

	filterCountries = countries => {
		if (this.state.filterByInput) {
			const filtered = countries.filter(country =>
				country.name.toLowerCase().includes(this.state.activeFilter.toLowerCase())
			);
			return this.renderCountries(filtered);
		} else {
			if (this.state.activeFilter === 'ALL') {
				return this.renderCountries(countries);
			}
			const filtered = countries.filter(country => country.name.charAt(0) === this.state.activeFilter);
			return this.renderCountries(filtered);
		}
	};

	checkSort = () => {
		return this.state.isSorted
			? this.filterCountries(this.props.sortedCountries)
			: this.filterCountries(this.props.countries);
	};

	render() {
		const { countries, error } = this.props;
		const countriesWithPopulation =
			countries.length !== 0 ? this.checkSort() : error === '' ? <p>Loading...</p> : <p>{error}</p>;
		return (
			<>
				<ReportFilter
					activeFilter={this.state.activeFilter}
					isSorted={this.state.isSorted}
					onAlphabetClick={this.onAlphabetClickHandler}
					onInputChange={this.onInputChangeHandler}
					onSortClick={this.onSortClickHandler}
				/>
				<div className="reportList">{countriesWithPopulation}</div>
			</>
		);
	}
}

const mapStateToProps = ({ reportState }) => ({
	countries: reportState.countriesWithPopulation,
	sortedCountries: reportState.sortedCountries,
	error: reportState.errorMsg
});

export default connect(mapStateToProps)(withRouter(Report));
