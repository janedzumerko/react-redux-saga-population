import React, { Component } from 'react';
import { API_URL } from '../../utils';

class CountryDetail extends Component {
	state = {
		malePopulation: 0,
		femalePopulation: 0,
		totalPopulation: 0,
		loading: true,
	};

	componentDidMount() {
		fetch(`${API_URL}/2019/${this.props.match.params.country}/`)
			.then(response => response.json())
			.then(data => {
				let malePopulation = 0;
				let femalePopulation = 0;
				let totalPopulation = 0;
				data.map(eachYear => {
					malePopulation += eachYear.males;
					femalePopulation += eachYear.females;
					totalPopulation += eachYear.total;
				});
				this.setState({ malePopulation, femalePopulation, totalPopulation, loading: false });
			});
	}

	render() {
		return (
			<>
				<h1>{this.props.match.params.country}</h1>
				{this.state.loading ? (
					<p>Loading... </p>
				) : (
						<>
							<p>
								Total population of {this.props.match.params.country} is : {this.state.totalPopulation}
							</p>
							<p>Male : {this.state.malePopulation}</p>
							<p>Female: {this.state.femalePopulation}</p>
						</>
					)}
			</>
		);
	}
}

export default CountryDetail;
