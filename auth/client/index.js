import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";

const link = new HttpLink({
	uri: "/graphql",
	credentials: "same-origin",
});

const client = new ApolloClient({
	link,
	connectToDevTools: true,
	cache: new InMemoryCache({
		dataIdFromObject: (o) => o.id,
	}),
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="login" element={<LoginForm />} />
						<Route path="signup" element={<SignupForm />} />
						<Route
							path="/dashboard"
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
};

ReactDOM.createRoot(document.querySelector("#root")).render(<Root />);

