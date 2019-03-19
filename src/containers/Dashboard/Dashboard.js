import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortCountries } from '../../actions';
import PieChart from '../../components/PieComponent/piechart';
import './Dashboard.css';
class Dashboard extends Component {
	state = {
		topTen: [],
	};

	componentDidMount() {
		if (this.props.sortedCountries.length !== 0) {
			this.getTopTen(this.props.sortedCountries);
		} else {
			this.props.dispatch(sortCountries(this.props.countries));
		}
	}

	getTopTen = sortedCountries => {
		const topTen = sortedCountries.slice(0, 11);
		topTen.map(country => (country.color = '#' + Math.floor(Math.random() * 16777215).toString(16)));
		this.setState({ topTen });
	};

	componentWillReceiveProps(newProps) {
		this.getTopTen(newProps.sortedCountries);
	}

	render() {
		return (
			<>
				<h1>Highest female to male ratio</h1>
				<p>
					{
					`Country ${this.props.highestFemaleMaleRatio.name}
					with ratio ${this.props.highestFemaleMaleRatio.ratio}`
					}
				</p>
				<h2>Top 10:</h2>
				{this.state.topTen.map(country => (
					<p key={country.name} style={{ color: country.color, fontWeight: 'bold' }}>
						{country.name.toUpperCase()} - {country.population}
					</p>
				))}
				<div className="pieWrapper">
					<PieChart slices={this.state.topTen} />
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ reportState }) => ({
	countries: reportState.countriesWithPopulation,
	sortedCountries: reportState.sortedCountries,
	highestFemaleMaleRatio: reportState.highestFemaleMaleRatio
});

export default connect(mapStateToProps)(Dashboard);
