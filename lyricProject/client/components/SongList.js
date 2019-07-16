import React, {Component} from 'react'
import { graphql }        from 'react-apollo';
import gql  		     	  from 'graphql-tag';
import { Link }           from 'react-router';
import query 				  from '../queries/fetchSongs'

class SongList extends Component{
	render(){
		if(this.props.data.loading)
			return (<div>Loading...</div>);

		return (
			<div>
				<ul className="collection">
					{ this.renderSongs() }
				</ul>
				<Link to="/songs/new"
						className="btn-floating btn-large red right"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}

	renderSongs() {
		return this.props.data.songs.map(({id, title}) => {
			return (
					<li key={id} className="collection-item">
						<Link to={`/songs/${id}`}>
							{title}
						</Link>
						<i className="material-icons" onClick={() => this.onSongDelete(id)} >delete</i>
					</li>
			);
		});
	}

	onSongDelete(id){
		this.props.mutate({ variables: {id}})
			.then(() => this.props.data.refetch());
	}
}

const mutation = gql`
	mutation deleteSong($id: ID){
	  deleteSong(id: $id){
		 id
	  }
	}
`;

export default graphql(mutation)(
	graphql(query)(SongList)
);