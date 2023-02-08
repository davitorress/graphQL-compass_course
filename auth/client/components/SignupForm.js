import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import query from "../queries/CurrentUser";
import mutation from "../mutations/Signup";

const SignupForm = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);
	const [signup, { data }] = useMutation(mutation);

	const onSubmit = ({ email, password }) => {
		signup({
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
			<h3>Sign Up</h3>
			<AuthForm errors={errors} onSubmit={onSubmit} />
		</div>
	);
};

export default SignupForm;
