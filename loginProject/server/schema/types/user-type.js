const {GraphQLObjectType, GraphQLString} = require('graphql');
const graphql = require('graphql');
const { GraphQLID } = require('graphql/type/scalars');


const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: {
		id: { type: GraphQLID },
		email: { type: GraphQLString }
	}
});

module.exports = UserType;