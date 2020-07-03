import React from 'react';
import { Route, Switch } from 'react-router-dom';
import dummy from '../dummy';

export default function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path="/dummy" component={dummy} />
			</Switch>
		</div>
	);
}
