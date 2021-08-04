import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {

	const {isLoggedIn, handleLoggedIn} = props;
	const showLogIn = () => {
			// already logged in -> show Home page
			//case 2: has not logged in -> show Login page

		return isLoggedIn ? <Redirect to="/home" /> : <Login handleLoggedIn ={handleLoggedIn}/>;
	};

	return (
		<div className="main">
			<Switch>
				<Route path = "/" exact render={showLogIn}> </Route>
				<Route path="/login" render={showLogIn} />
				<Route path="/register" component={Register} />
				<Route path="/home" component={Home} />
			</Switch>
		</div>
	);
}

export default Main;