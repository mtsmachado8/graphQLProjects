import { GraphQLInt, GraphQLList, GraphQLNonNull,
	GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import fetch                                         from 'node-fetch'
import axios from 'axios'


const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({
		id: {type: GraphQLString },
		name: {type: GraphQLString },
		description: {type: GraphQLString },
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args){
				const { id } = parentValue;

				return fetch(`http://localhost:3000/companies/${ id }/users`, { method: 'GET', })
					.then(response => response.json());

			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {type: GraphQLString },
		firstName: {type: GraphQLString },
		age: {type: GraphQLInt },

		company: {
			type: CompanyType,
			resolve(parentValue, args){
				const { companyId } = parentValue;

				return fetch(`http://localhost:3000/companies/${companyId}`, {method: 'GET',})
					.then(response => response.json());
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLString }},

			resolve(parentValue, args) {
				return fetch(`http://localhost:3000/users/${args.id}`, {method: 'GET',})
					.then(response => response.json());
			}
		},
		company: {
			type: CompanyType,
			args: {id: {type: GraphQLString }},

			resolve(parentValue, args) {
				return fetch(`http://localhost:3000/companies/${args.id}`, {method: 'GET',})
					.then(response => response.json());
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				firstName: {type: new GraphQLNonNull(GraphQLString)},
				age: {type: new GraphQLNonNull(GraphQLInt)},
				companyId: {type: GraphQLString}
			},
			resolve(parentValue, {firstName, age, companyId}){
				return axios.post(`http://localhost:3000/users`, {firstName, age, companyId})
					.then(response => response.data);
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, {id}){
				return axios.delete(`http://localhost:3000/users/${id}`)
					.then(response => response.data);
			}
		},
		editUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				firstName: {type: GraphQLString},
				age: {type: GraphQLInt},
				companyId: {type: GraphQLString}
			},
			resolve(parentValue, args){
				return axios.patch(`http://localhost:3000/users/${args.id}`, args)
					.then(response => response.data);
			}
		}
	}
});

export default new GraphQLSchema({
	query: RootQuery,
	mutation
});