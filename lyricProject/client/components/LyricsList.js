import React, {Component} from 'react'
import gql                from 'graphql-tag';
import { graphql }        from 'react-apollo';

class LyricsList extends Component{
	render(){
		return (
			<ul className="collection">
				{this.renderLyricItems()}
			</ul>
		);
	}

	renderLyricItems(){
		return this.props.lyrics.map(({ id, content, likes }) => {
			return (
				<li key={id} className="collection-item">
					{ content }
					<div className="vote-box">
						<i onClick={() => this.onLike(id, likes)} className="material-icons">thumb_up</i>
						{likes}
					</div>
				</li>
			)
		});
	}


	onLike(id, likes){
		this.props.mutate({
			variables: {id},
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					id: id,
					__typename: 'LyricType',
					likes: likes + 1
				}
			}
		})
	}
}

const mutation = gql`
    mutation likeLyric($id: ID!) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricsList);