const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		name: String!
		owner: String!
		items: [Item]
		sortRule: String!
		sortDirection: Int!
		
		    capital:String
            leader:String
            flag:String
            landmark:String
            parentRegion:String
            subregionNumber:Int
            regionLandmark:[String]
            subregionsID:[String]
            isRoot:Boolean
	}
	type Item {
		_id: String!
		description: String!
		due_date: String!
		assigned_to: String!
		completed:  Boolean!
	}
	extend type Query {
		getAllRegions: [Region]
		getRegionById(_id: String!): Region 
	}
	extend type Mutation {
		addItem(item: ItemInput!, _id: String!, index: Int!): String
		addRegion(region: RegionInput!): Region
		deleteItem(itemId: String!, _id: String!): [Item]		
		deleteRegion(_id: String!): Boolean
		updateRegionField(_id: String!, field: String!, value: String!): String
		updateItemField(itemId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Item]
		reorderItems(itemId: String!, _id: String!, direction: Int!): [Item]
		sortItems(_id: String!, criteria: String!): [Item]
	}
	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input RegionInput {
		_id: String
		name: String
		owner: String
		items: [ItemInput]
		sortRule: String
		sortDirection: Int
		
				    capital:String
            leader:String
            flag:String
            landmark:String
            parentRegion:String
            subregionNumber:Int
            regionLandmark:[String]
            subregionsID:[String]
            isRoot:Boolean
	}
	input ItemInput {
		_id: String
		description: String
		due_date: String
		assigned_to: String
		completed:  Boolean
	}
`;

module.exports = { typeDefs: typeDefs }