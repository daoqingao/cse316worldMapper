const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		name: String!
		owner: String!

		sortRule: String!
		sortDirection: Int!
		
		    capital:String
            leader:String
            flag:String
            landmark:String
            parentRegion:String
            subregionNumber:Int
            regionLandmark:[String]
            
            parentRegionID:String
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
		addSubregion(_id: String!,userID: String!): String
		
		deleteSubregionArray(parentID: String!,subregionID: String!): String
		addSubregionArray(parentID: String!,subregionID: String!): String
		setSubregionArray(parentID: String!,subregionID: [String]): String
		sortItems(_id: String!, criteria: String!): [Item]
		
				addLandmark(regionID: String!,landmarkName: String!  , index: Int!, op:Int!): String
		
		
		
		
		
		updateItemField(itemId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Item]
		reorderItems(itemId: String!, _id: String!, direction: Int!): [Item]

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

		sortRule: String
		sortDirection: Int
		
		    capital:String
            leader:String
            flag:String
            landmark:String
            parentRegion:String
            subregionNumber:Int
            regionLandmark:[String]
            
            parentRegionID:String
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