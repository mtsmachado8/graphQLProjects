import React, { Component } from 'react'
import {graphql}            from 'react-apollo'
import Link                 from 'react-router/es/Link';

import query                from '../queries/CurrentUser'
import mutation               from '../mutations/Logout';


class Header extends Component {
	render(){
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo left">
						Home
					</Link>
					<ul className="right">
						{this.renderButtons()}
					</ul>
				</div>
			</nav>
		);
	}


	renderButtons(){
		const { loading, authorized  } = this.props.data;

		if(this.props.data.loading) return <div />;

		if(authorized)
			return (
				<li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
			);
		else
			return (
				<div>
					<li><Link to="/signup">Signup</Link></li>
					<li><Link to="/login">Login</Link></li>
				</div>
			);
	}


	onLogoutClick(){
		this.props.mutate({
			refetchQueries: [{query}]
		});
	}
}

export default graphql(mutation)(
	graphql(query)(Header)
);