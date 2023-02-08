import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import query from "../queries/CurrentUser";
import mutation from "../mutations/Logout";

const Header = () => {
	const navigate = useNavigate();
	const { data: userData, loading } = useQuery(query);
	const [logout, {}] = useMutation(mutation);

	const onLogout = () => {
		logout({
			refetchQueries: [{ query }],
		});

		navigate("/login");
	};

	const renderButtons = () => {
		if (loading) return <p>Loading...</p>;

		if (userData.user) {
			return (
				<li>
					<a onClick={onLogout}>Logout</a>
				</li>
			);
		} else {
			return (
				<div>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</div>
			);
		}
	};

	return (
		<nav>
			<div className="nav-wrapper">
				<Link to="/" className="brand-logo left">
					Home
				</Link>
				<ul className="right">{renderButtons()}</ul>
			</div>
		</nav>
	);
};

export default Header;
