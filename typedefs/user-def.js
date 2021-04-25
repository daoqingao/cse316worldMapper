const { gql } = require('apollo-server');

const typeDefs = gql `
	type User {
		_id: String
		name: String
		initials: String
		email: String
		password: String
	}
	extend type Query {
		getCurrentUser: User
		testQuery: String
	}
	extend type Mutation {
		login(email: String!, password: String!): User
		register(email: String!, password: String!, name: String!): User
		logout: Boolean!
	}
`;

module.exports = { typeDefs: typeDefs }