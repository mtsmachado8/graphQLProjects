const {GraphQLObjectType, GraphQLString} = require('graphql');
const UserType = require('./types/user-type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password }, req){
				return AuthService.signup({ email, password, req });
			}
		},
		logout: {
			type: UserType,
			resolve(parentValue, args, req){
				return AuthService.logout(req);
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password }, req){
				return AuthService.login({ email, password, req });
			}
		}
	}
});

module.exports = mutation;