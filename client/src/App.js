import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import Routes from './components/routing/Routes';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={SignIn} />
				<Route component={Routes} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
