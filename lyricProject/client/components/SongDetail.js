import React, { Component } from 'react'
import {graphql}            from 'react-apollo'
import fetchSong            from '../queries/fetchSong'
import { Link }             from 'react-router';
import LyricCreate          from './LyricCreate';
import LyricsList           from './LyricsList';

class SongDetail extends Component {
	render(){
		const {song} = this.props.data;

		if(!song)
			return (<div/>);

		return (
			<div>
				<Link to="/">Back</Link>
				<h3>{song.title}</h3>
				<LyricsList lyrics={song.lyrics}/>
				<LyricCreate songId={this.props.params.id} />
			</div>
		);
	}
}

export default graphql(fetchSong, {
	options: (props) => { return {variables: { id: props.params.id } } }
})(SongDetail);