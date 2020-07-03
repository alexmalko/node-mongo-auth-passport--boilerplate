import React from 'react';
import { Route, Switch } from 'react-router-dom';
import dashboard from '../dashboard';

export default function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path="/dashboard" component={dashboard} />
			</Switch>
		</div>
	);
}
