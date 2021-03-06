const graphql = require('graphql')
const axios = require('axios')
// const _ = require('lodash')
const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLInt, 
        GraphQLSchema } = graphql;

// const users = [
//     { id: '23', firstName: 'Bill', age: 20 },
//     { id: '47', firstName: 'Samantha', age: 21 }
// ]

const UserType = new GraphQLObjectType({
    name: 'User', 
    fields: {
        id: { type: GraphQLString }, 
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const CompanieType = new GraphQLObjectType({
    name: 'Companie', 
    fields: {
        id: { type: GraphQLString }, 
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                            .then(resp => resp.data);
            }, 
        company: {
            type: CompanieType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                            .then(resp => resp.data);
            },             
        }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

