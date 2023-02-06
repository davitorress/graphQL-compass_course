import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricCreate extends Component {
	constructor(props) {
		super(props);

		this.state = { content: "" };
	}

	onSubmit(event) {
		event.preventDefault();

		this.props
			.mutate({
				variables: {
					content: this.state.content,
					songId: this.props.songId,
				},
			})
			.then(() => this.setState({ content: "" }));
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<label htmlFor="lyric_text">Add a Lyric</label>
				<input
					type="text"
					id="lyric_text"
					value={this.state.content}
					onChange={(event) => this.setState({ content: event.target.value })}
				/>
			</form>
		);
	}
}

const mutation = gql`
	mutation AddLyricToSong($content: String, $songId: ID) {
		addLyricToSong(content: $content, songId: $songId) {
			id
			lyrics {
				id
				content
				likes
			}
		}
	}
`;

export default graphql(mutation)(LyricCreate);
