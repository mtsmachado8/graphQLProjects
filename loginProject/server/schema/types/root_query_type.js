const graphql = require('graphql');
const { GraphQLObjectType } = require('graphql');

const UserType = require('./user-type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    authorized: {
      type: UserType,
      resolve(parentValue, args, req){
        return req.user;
      }
    }
  }
});

module.exports = RootQueryType;
