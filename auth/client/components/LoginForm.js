import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import query from "../queries/CurrentUser";
import mutation from "../mutations/Login";

const LoginForm = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);
	const [login, { data }] = useMutation(mutation);

	const onSubmit = ({ email, password }) => {
		login({
			variables: { email, password },
			refetchQueries: [{ query }],
		}).catch((res) => {
			const errors = res.graphQLErrors.map((error) => error.message);
			setErrors(errors);
		});
	};

	useEffect(() => {
		if (data) {
			navigate("/dashboard");
		}
	}, [data]);

	return (
		<div>
			<h3>Login</h3>
			<AuthForm errors={errors} onSubmit={onSubmit} />
		</div>
	);
};

export default LoginForm;
