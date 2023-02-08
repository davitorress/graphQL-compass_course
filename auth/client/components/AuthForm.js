import React, { useState } from "react";

const AuthForm = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (event) => {
		event.preventDefault();
		props.onSubmit({ email, password });
	};

	return (
		<div className="row">
			<form className="col s6" onSubmit={onSubmit}>
				<div className="input-field">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="input-field">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="errors">
					{props.errors.map((error) => (
						<p key={error}>{error}</p>
					))}
				</div>

				<button type="submit" className="btn">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AuthForm;
