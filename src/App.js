import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Report from './containers/Report/Report';
import Dashboard from './containers/Dashboard/Dashboard';
import Header from './components/Header/Header';
import CountryDetail from './containers/CountryDetail/CountryDetail';

const App = () => (
	<>
		<BrowserRouter>
			<>
				<Header />
				<Switch>
					<Redirect exact path="/" to="/report" />
					<Route exact path="/report" component={Report} />
					<Route exact path="/report/:country" component={CountryDetail} />
					<Route path="/dashboard" component={Dashboard} />
				</Switch>
			</>
		</BrowserRouter>
	</>
);

export default App;