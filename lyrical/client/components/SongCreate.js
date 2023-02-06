import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import fetchSongs from "../queries/fetchSongs";

class SongCreate extends Component {
	constructor(props) {
		super(props);

		this.state = { title: "" };
	}

	onSubmit(event) {
		event.preventDefault();

		this.props
			.mutate({
				variables: { title: this.state.title },
				refetchQueries: [{ query: fetchSongs }],
			})
			.then(() => hashHistory.push("/"));
	}

	render() {
		return (
			<div>
				<Link to="/">Back</Link>

				<h3>Create a New Song</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label htmlFor="song_title">Song Title:</label>
					<input
						type="text"
						id="song_title"
						value={this.state.title}
						onChange={(event) => this.setState({ title: event.target.value })}
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			id
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);
