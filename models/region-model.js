const { model, Schema, ObjectId } = require('mongoose');
const Item = require('./item-model').schema;


const graphql = require('graphql');
const {GraphQLObjectType} = graphql





const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},

		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},

		sortRule: {
			type: String,
			required: true
		},
		sortDirection: {
			type: Number,
			required: true
		},

		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		flag: {
			type: String,
			required: true
		},
		landmark: {
			type: String,
			required: true
		},
		parentRegion: {
			type: String,
			required: true
		},
		subregionNumber: {
			type: Number,
			required: true
		},

		parentRegionID: {
			type: ObjectId,
			required: true
		},

		regionLandmark: [String],
		subregionsID:[ObjectId],

		isRoot: {
			type: Boolean,
			required: true
		},


	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;