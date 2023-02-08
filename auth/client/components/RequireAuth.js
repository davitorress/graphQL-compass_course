import React from "react";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";

import query from "../queries/CurrentUser";

const RequireAuth = (props) => {
	const { data, loading } = useQuery(query);

	if (!data.user && loading) {
		return <Navigate to="/login" />;
	}

	return props.children;
};

export default RequireAuth;
