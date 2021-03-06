import React 			from 'react';

import MainScreen from './components/homescreen/MainScreen';

import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
	let user = null;

    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }

	console.log(user)
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />

				{/*<Route*/}
				{/*	path="/maps"*/}
				{/*	name="maps"*/}
				{/*	render={() =>*/}
				{/*		<Homescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>*/}
				{/*	}*/}
				{/*/>*/}

				<Route
					path="/home"
					name="home"
					render={() =>
						<MainScreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>
					}
				/>
				<Route/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;