import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const App = (props) => {
	return (
		<div className="container">
			<Header />
			<Outlet />
			{props.children}
		</div>
	);
};

export default App;
